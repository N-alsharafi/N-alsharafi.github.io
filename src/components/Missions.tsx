import Prose from "@/components/Prose";
import Scene from "@/components/Scene";
import missionsData from "@/data/side-missions.json";
import { pad } from "@/lib/format";
import { seq } from "@/lib/stage";
import type { SideMission } from "@/types";

const missions = missionsData as SideMission[];

/**
 * Act 06. The side missions step through the frame one at a time, entering and
 * leaving sideways so the act reads as a sideways advance.
 */
export default function Missions() {
  return (
    <Scene id="missions" act="missions" num="06" title="Side Missions" meta={`${missions.length} entries`} len="560vh">
      <span className="ghost ghost--tr" aria-hidden="true">
        06
      </span>

      <div className="missions">
        {missions.map((mission, index) => (
          <article
            className="mission"
            key={mission.id}
            data-step
            data-at={seq(index, missions.length, 0.05)}
            data-fade="0.05"
          >
            <p className="mission__num num">
              {pad(index + 1)} / {pad(missions.length)}
            </p>
            <div>
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
            </div>
          </article>
        ))}
      </div>
    </Scene>
  );
}
