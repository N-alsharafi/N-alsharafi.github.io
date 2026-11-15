import type { CSSProperties } from "react";

import Glyph from "@/components/Glyph";
import Scene from "@/components/Scene";
import siteData from "@/data/site.json";
import { pad } from "@/lib/format";
import type { GlyphKey } from "@/lib/glyphs";
import { seq } from "@/lib/stage";
import type { Site } from "@/types";

const site = siteData as Site;
const areas = site.practice;

/**
 * Each area gets a plate of line art, drawn from the site's own glyphs and laid
 * out like a technical figure: modules and a gate for the software work, a
 * network over a baseline for the learning work, a graph and a scale for the
 * research.
 */
const PLATES: GlyphKey[][] = [
  ["container", "code", "gate", "cloud"],
  ["network", "text", "chart", "flask"],
  ["graph", "scales", "pen", "dot"],
];

/**
 * Act 01. One long pin holding a single frame: the scale in the margin names all
 * three areas at once and fills as the act is read, the write-up changes in
 * place, and the plate on the right draws itself as each chapter plays.
 */
export default function Practice() {
  return (
    <Scene id="practice" act="practice" num="01" title="What I Do" meta={`${areas.length} areas`} len="420vh">
      <div className="sheet">
        <aside className="gauge" aria-hidden="true">
          <span className="gauge__rail" />
          <span className="gauge__fill" />
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
                {PLATES[index].map((name, glyphIndex) => (
                  <span className="plate__glyph" key={name} style={{ "--ci": String(glyphIndex) } as CSSProperties}>
                    <Glyph name={name} draw />
                  </span>
                ))}
              </div>
              <figcaption className="plate__tag num">Fig. {pad(index + 1)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Scene>
  );
}
