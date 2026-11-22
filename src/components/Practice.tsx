import type { CSSProperties } from "react";

import AreaPlate from "@/components/AreaPlate";
import Scene from "@/components/Scene";
import siteData from "@/data/site.json";
import { pad } from "@/lib/format";
import { seq } from "@/lib/stage";
import type { Site } from "@/types";

const site = siteData as Site;
const areas = site.practice;

/**
 * Act 01. One long pin holding a single frame: the index in the margin names all
 * three areas at once, the write-up changes in place, and the figure beside it —
 * one technical drawing per area, see AreaPlate — is written by the scroll as
 * each chapter plays.
 */
export default function Practice() {
  return (
    <Scene id="practice" act="practice" num="01" title="What I Do" len="420vh">
      <div className="sheet">
        <aside className="gauge">
          <ol className="gauge__ticks">
            {areas.map((entry, index) => (
              <li key={entry.title} data-step data-at={seq(index, areas.length, 0.04)} data-fade="0.02">
                <span className="gauge__num num">{pad(index + 1)}</span>
                <span className="gauge__label">{entry.title}</span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="briefs">
          {areas.map((entry, index) => (
            <article
              className="brief"
              key={entry.title}
              data-step
              data-at={seq(index, areas.length, 0.04)}
              data-fade="0.02"
            >
              <span className="ghost" aria-hidden="true">
                {pad(index + 1)}
              </span>
              <p className="brief__num num">
                {pad(index + 1)} / {pad(areas.length)}
              </p>
              <h3 className="brief__title">{entry.title}</h3>
              <span className="brief__rule" aria-hidden="true" />
              <p className="brief__body">{entry.body}</p>
            </article>
          ))}
        </div>

        <div className="plates">
          {areas.map((entry, index) => (
            <figure
              className="plate"
              key={entry.title}
              data-step
              data-at={seq(index, areas.length, 0.04)}
              data-fade="0.02"
              style={{ "--i": String(index) } as CSSProperties}
            >
              <div className="plate__frame">
                <AreaPlate index={index} />
              </div>
              <figcaption className="plate__tag num">Fig. {pad(index + 1)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Scene>
  );
}
