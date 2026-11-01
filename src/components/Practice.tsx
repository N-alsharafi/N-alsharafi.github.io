import Scene from "@/components/Scene";
import siteData from "@/data/site.json";
import { pad } from "@/lib/format";
import { seq } from "@/lib/stage";
import type { Site } from "@/types";

const site = siteData as Site;
const areas = site.practice;

/**
 * Act 01. All three areas stand in the frame at once and the scroll only moves
 * the light down the list — nothing leaves, so the act is readable at any
 * position and the frame stays composed.
 */
export default function Practice() {
  return (
    <Scene id="practice" act="practice" num="01" title="What I Do" meta={`${areas.length} areas`} len="260vh">
      <span className="ghost ghost--tr" aria-hidden="true">
        01
      </span>

      <ol className="practice">
        {areas.map((entry, index) => (
          <li
            className="practice__item"
            key={entry.title}
            data-step
            data-at={seq(index, areas.length, 0.05)}
            data-fade="0.05"
          >
            <span className="practice__num num">{pad(index + 1)}</span>
            <div>
              <h3 className="practice__title">{entry.title}</h3>
              <p className="practice__body">{entry.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Scene>
  );
}
