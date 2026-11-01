import { useEffect, useRef } from "react";

import Prose from "@/components/Prose";
import SectionHead from "@/components/SectionHead";
import workData from "@/data/work.json";
import { byStartDesc, formatRange } from "@/lib/format";
import { useRevealGroup } from "@/lib/reveal";
import { elementProgress, paintProgress, subscribeScroll } from "@/lib/scroll";
import type { WorkExperience } from "@/types";

const roles = [...(workData as WorkExperience[])].sort(byStartDesc);

export default function TrackRecord() {
  const groupRef = useRevealGroup<HTMLElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const spineRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () =>
      subscribeScroll(({ vh }) => {
        const track = trackRef.current;
        const spine = spineRef.current;
        if (!track || !spine) return;
        paintProgress(spine, elementProgress(track.getBoundingClientRect(), vh, 0.8));
      }),
    [],
  );

  return (
    <section className="section" id="track-record" ref={groupRef}>
      <div className="shell">
        <SectionHead num="02" title="Professional Experience" meta={`${roles.length} roles`} />

        <div className="track" ref={trackRef}>
          <div className="track__spine" aria-hidden="true" ref={spineRef}>
            <div className="track__spine-fill" />
          </div>

          <ol>
            {roles.map((role) => (
              <li className="track__item" key={role.id} data-reveal>
                <div className="track__when">
                  <span>{formatRange(role.startDate, role.endDate)}</span>
                  <span className="track__place">{role.location}</span>
                </div>

                <span className="track__dot" aria-hidden="true" />

                <div>
                  <h3 className="track__role">{role.position}</h3>
                  <p className="track__org">{role.company}</p>
                  <div className="track__what">
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
      </div>
    </section>
  );
}
