import Scene from "@/components/Scene";
import siteData from "@/data/site.json";
import { pad } from "@/lib/format";
import { seq } from "@/lib/stage";
import type { Site } from "@/types";

const site = siteData as Site;
const areas = site.practice;

/**
 * Act 01. Three statements hold the same place on the stage: each one is
 * replaced by the next, the oversized numeral drifting behind it.
 */
export default function Practice() {
  return (
    <Scene id="practice" act="practice" num="01" title="What I Do" meta={`${areas.length} areas`} len="280vh">
      <ol className="practice">
        {areas.map((entry, index) => (
          <li
            className="practice__item"
            key={entry.title}
            data-step
            data-at={seq(index, areas.length, 0.08)}
            data-fade="0.06"
            data-fx="rise"
          >
            <span className="practice__num num">{pad(index + 1)}</span>
            <h3 className="practice__title">{entry.title}</h3>
            <p className="practice__body">{entry.body}</p>
          </li>
        ))}
      </ol>
    </Scene>
  );
}
