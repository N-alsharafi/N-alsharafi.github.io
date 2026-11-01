import SectionHead from "@/components/SectionHead";
import educationData from "@/data/education.json";
import { formatRange } from "@/lib/format";
import { revealDelay, useRevealGroup } from "@/lib/reveal";
import type { Education as EducationRecord } from "@/types";

const education = educationData as EducationRecord;

export default function Education() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section className="section" id="education" ref={ref} data-progress>
      <div className="shell">
        <SectionHead num="03" title="Education" />

        <div className="edu">
          <div className="edu__when" data-reveal>
            <span>{formatRange(education.startDate, education.endDate)}</span>
            <span className="edu__place">{education.location}</span>
          </div>

          <div data-reveal style={revealDelay(1)}>
            <h3 className="edu__degree">{education.degree}</h3>
            <p className="edu__school">{education.school}</p>
            <p className="edu__faculty">{education.faculty}</p>

            <dl className="edu__facts">
              <div className="edu__fact">
                <dt className="edu__key">GPA</dt>
                <dd className="edu__val num">{education.gpa}</dd>
              </div>
              <div className="edu__fact">
                <dt className="edu__key">Rank</dt>
                <dd className="edu__val num">{education.rank}</dd>
              </div>
            </dl>

            <p className="label edu__courses-label">Notable coursework</p>
            <ul className="tags edu__courses">
              {education.coursework.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
