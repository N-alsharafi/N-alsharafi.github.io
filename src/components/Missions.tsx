import Prose from "@/components/Prose";
import SectionHead from "@/components/SectionHead";
import missionsData from "@/data/side-missions.json";
import { revealDelay, useRevealGroup } from "@/lib/reveal";
import type { SideMission } from "@/types";

const missions = missionsData as SideMission[];

export default function Missions() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section className="section" id="missions" ref={ref}>
      <div className="shell">
        <SectionHead num="06" title="Side Missions" />

        <div className="missions">
          {missions.map((mission, index) => (
            <article className="mission" key={mission.id} data-reveal style={revealDelay(index)}>
              <h3 className="mission__title">{mission.title}</h3>
              {mission.date ? <p className="mission__date num">{mission.date}</p> : null}
              {mission.description ? <Prose text={mission.description} /> : null}
              {mission.link ? (
                <p className="out-links">
                  <a className="link link--out" href={mission.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
