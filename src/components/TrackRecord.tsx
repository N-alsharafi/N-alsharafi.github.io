import Prose from "@/components/Prose";
import Scene from "@/components/Scene";
import workData from "@/data/work.json";
import { byStartDesc, formatRange } from "@/lib/format";
import { seq } from "@/lib/stage";
import type { WorkExperience } from "@/types";

const roles = [...(workData as WorkExperience[])].sort(byStartDesc);

/**
 * Act 02. The roles are a deck: each card pushes the previous one up and out of
 * the frame, so the record is read one position at a time, newest first.
 */
export default function TrackRecord() {
  return (
    <Scene
      id="track-record"
      act="track"
      num="02"
      title="Professional Experience"
      meta={`${roles.length} roles`}
      len="600vh"
    >
      <div className="track__axis" aria-hidden="true">
        <span className="track__axis-fill" />
      </div>

      <ol className="track">
        {roles.map((role, index) => (
          <li
            className="track__item"
            key={role.id}
            data-step
            data-at={seq(index, roles.length, 0.035)}
            data-fade="0.035"
            data-fx="push"
          >
            <p className="track__when">
              <span className="num">{formatRange(role.startDate, role.endDate)}</span>
              <span className="track__place">{role.location}</span>
            </p>

            <div className="track__body">
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
    </Scene>
  );
}
