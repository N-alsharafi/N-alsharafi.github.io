import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import Prose from "@/components/Prose";
import Scene from "@/components/Scene";
import workData from "@/data/work.json";
import { byStartDesc, formatRange, pad } from "@/lib/format";
import { subscribeScroll } from "@/lib/stage";
import type { WorkExperience } from "@/types";

const roles = [...(workData as WorkExperience[])].sort(byStartDesc);
const COUNT = roles.length;

/**
 * Act 02. The record runs sideways: the frame holds still, one panel per position
 * slides under it, and the vertical scroll is the hand that moves it. Panels are
 * exactly one frame wide and the travel is measured from the track, so every step
 * lands a card flush with the frame instead of drifting across it.
 */
export default function TrackRecord() {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const rail = railRef.current;
    const trackEl = rail?.querySelector<HTMLElement>(".track");
    if (!rail || !trackEl) return;

    const measure = () => {
      const travel = Math.max(0, trackEl.scrollWidth - rail.clientWidth);
      trackEl.style.setProperty("--step", `${Math.round(travel / Math.max(1, COUNT - 1))}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    observer.observe(trackEl);
    document.fonts.ready.then(measure).catch(() => undefined);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () =>
      subscribeScroll(({ vh }) => {
        const scene = document.getElementById("track-record");
        if (!scene || !document.documentElement.classList.contains("is-staged")) return;
        const rect = scene.getBoundingClientRect();
        const span = Math.max(1, rect.height - vh);
        const p = Math.min(1, Math.max(0, -rect.top / span));
        const next = Math.min(COUNT - 1, Math.max(0, Math.round(p * (COUNT - 1))));
        setActive((previous) => (previous === next ? previous : next));
      }),
    [],
  );

  return (
    <Scene
      id="track-record"
      act="track"
      num="02"
      title="Professional Experience"
      meta={`${COUNT} roles`}
      len="560vh"
    >
      <div className="reel">
        <div
          className="reel__rail"
          ref={railRef}
          style={{ "--index": String(active), "--n0": String(COUNT - 1) } as CSSProperties}
        >
          <ol className="track">
            {roles.map((role, index) => (
              <li
                className={index === active ? "role is-active" : "role"}
                key={role.id}
                aria-current={index === active ? "true" : undefined}
                style={{ "--d": String(index - active) } as CSSProperties}
              >
                <span className="role__ghost num" aria-hidden="true">
                  {pad(index + 1)}
                </span>

                <p className="role__index num">
                  {pad(index + 1)} / {pad(COUNT)}
                </p>

                <p className="role__when">
                  <span className="num">{formatRange(role.startDate, role.endDate)}</span>
                  <span className="role__place">{role.location}</span>
                </p>

                <div className="role__body">
                  <h3 className="role__title">{role.position}</h3>
                  <p className="role__org">{role.company}</p>
                  <div className="role__what">
                    <Prose text={role.description} />
                    <ul className="tags">
                      {role.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="reel__scale" aria-hidden="true">
          <span
            className="reel__fill"
            style={{ "--index": String(active), "--n0": String(COUNT - 1) } as CSSProperties}
          />
          <ol className="reel__ticks" style={{ "--n": String(COUNT) } as CSSProperties}>
            {roles.map((role, index) => (
              <li key={role.id} className={index === active ? "is-active" : undefined}>
                <span className="num">{pad(index + 1)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Scene>
  );
}
