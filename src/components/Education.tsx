import type { CSSProperties } from "react";

import Scene from "@/components/Scene";
import educationData from "@/data/education.json";
import { formatRange } from "@/lib/format";
import type { Education as EducationRecord } from "@/types";

const education = educationData as EducationRecord;

function digits(value: string, from: number) {
  return value.split("").map((char, index) => ({ char, index: from + index }));
}

/**
 * Act 03. A single record assembles itself: date, degree, then the two measured
 * facts and the coursework, each digit and chip arriving in turn.
 */
export default function Education() {
  return (
    <Scene id="education" act="edu" num="03" title="Education" len="260vh">
      <span className="ghost ghost--tr" aria-hidden="true">
        03
      </span>

      <div className="edu">
        <p className="edu__when" data-step data-at="-,1.05" data-fx="left">
          <span className="num">{formatRange(education.startDate, education.endDate)}</span>
          <span className="edu__place">{education.location}</span>
        </p>

        <h3 className="edu__degree" data-step data-at="0.05,1.05" data-fade="0.11" data-fx="wipe">
          {education.degree}
        </h3>

        <p className="edu__school" data-step data-at="0.15-" data-fx="rise">
          {education.school}
        </p>

        <p className="edu__faculty" data-step data-at="0.2-" data-fx="rise">
          {education.faculty}
        </p>

        <dl className="edu__facts" data-step data-at="0.3-" data-fx="rise">
          <div className="edu__fact">
            <dt className="edu__key">GPA</dt>
            <dd
              className="edu__val num"
              data-step
              data-at="0.34-"
              data-fade="0.07"
              data-fx="cascade"
              style={{ "--stagger": "0.07" } as CSSProperties}
            >
              {digits(education.gpa, 0).map(({ char, index }) => (
                <span key={index} style={{ "--ci": String(index) } as CSSProperties}>
                  {char}
                </span>
              ))}
            </dd>
          </div>

          <div className="edu__fact">
            <dt className="edu__key">Rank</dt>
            <dd className="edu__val edu__val--line num" data-step data-at="0.4-" data-fx="rise">
              {education.rank}
            </dd>
          </div>
        </dl>

        <div className="edu__courses">
          <p className="label edu__courses-label" data-step data-at="0.44-" data-fx="rise">
            Notable coursework
          </p>
          <ul
            className="tags"
            data-step
            data-at="0.5-"
            data-fade="0.1"
            data-fx="cascade"
            style={{ "--stagger": String(0.5 / Math.max(1, education.coursework.length)) } as CSSProperties}
          >
            {education.coursework.map((course, index) => (
              <li key={course} style={{ "--ci": String(index) } as CSSProperties}>
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Scene>
  );
}
