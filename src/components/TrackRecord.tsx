import Prose from "@/components/Prose";
import Scene from "@/components/Scene";
import workData from "@/data/work.json";
import { byStartDesc, formatRange, pad } from "@/lib/format";
import { seq } from "@/lib/stage";
import type { WorkExperience } from "@/types";

const roles = [...(workData as WorkExperience[])].sort(byStartDesc);

/**
 * Act 02. Seven positions are too many to stand in one frame, so the act keeps a
 * standing index on the left — every role readable at once — and deals the cards
 * through on the right, each one pushing the previous out.
 */
export default function TrackRecord() {
  return (
    <Scene
      id="track-record"
      act="track"
      num="02"
      title="Professional Experience"
      meta={`${roles.length} roles`}
      len="620vh"
    >
      <div className="spread">
        <ol className="indexlist">
          {roles.map((role, index) => (
            <li key={role.id} data-step data-at={seq(index, roles.length, 0.03)} data-fade="0.03">
              <span className="lit__num num">{pad(index + 1)}</span>
              <span>
                <span className="lit__label">{role.position}</span>
                <span className="lit__meta">
                  {role.company} · {formatRange(role.startDate, role.endDate)}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <div className="spread__main">
          {roles.map((role, index) => (
            <article
              className="track__item"
              key={role.id}
              data-step
              data-at={seq(index, roles.length, 0.03)}
              data-fade="0.035"
              data-fx="push"
            >
              <p className="track__when">
                <span className="num">{formatRange(role.startDate, role.endDate)}</span>
                <span className="track__place">{role.location}</span>
              </p>

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
            </article>
          ))}
        </div>
      </div>
    </Scene>
  );
}
