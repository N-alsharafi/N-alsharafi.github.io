import SectionHead from "@/components/SectionHead";
import siteData from "@/data/site.json";
import { pad } from "@/lib/format";
import { revealDelay, useRevealGroup } from "@/lib/reveal";
import type { Site } from "@/types";

const site = siteData as Site;

export default function Practice() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section className="section" id="practice" ref={ref}>
      <div className="shell">
        <SectionHead num="01" title="What I Do" />
        <ol className="practice">
          {site.practice.map((entry, index) => (
            <li className="practice__item" key={entry.title} data-reveal style={revealDelay(index)}>
              <span className="practice__num num">{pad(index + 1)}</span>
              <h3 className="practice__title">{entry.title}</h3>
              <p className="practice__body">{entry.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
