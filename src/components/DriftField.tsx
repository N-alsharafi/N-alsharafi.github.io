import type { CSSProperties } from "react";

import Glyph from "@/components/Glyph";
import { glyphForTag, type GlyphKey } from "@/lib/glyphs";

function hash(seed: string): number {
  let value = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    value ^= seed.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

/** Seeded PRNG: the field is identical on every render, so nothing jitters. */
function seeded(seed: string) {
  let state = hash(seed);
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COUNT = 6;

/**
 * A field of tag glyphs behind a block. Positions come from the seed, motion
 * from the parent's `--p` (painted by the scroll engine), so nothing here
 * re-renders while scrolling.
 */
export default function DriftField({ seed, tags }: { seed: string; tags: string[] }) {
  const glyphs: GlyphKey[] = tags.length ? tags.map(glyphForTag) : ["dot"];
  const random = seeded(seed);

  const items = Array.from({ length: COUNT }, (_, index) => ({
    glyph: glyphs[index % glyphs.length],
    inset: 1 + random() * 42,
    top: -12 + random() * 122,
    travel: 80 + random() * 190,
    spin: -32 + random() * 64,
    spinTravel: -80 + random() * 160,
    size: 42 + random() * 58,
    opacity: 0.07 + random() * 0.07,
  }));

  return (
    <div className="drift" aria-hidden="true">
      {items.map((item, index) => (
        <span
          key={index}
          className="drift__item"
          style={
            {
              "--x": item.inset,
              "--y": item.top,
              "--dy": item.travel,
              "--r0": item.spin,
              "--dr": item.spinTravel,
              "--s": item.size,
              "--o": item.opacity,
            } as CSSProperties
          }
        >
          <Glyph name={item.glyph} />
        </span>
      ))}
    </div>
  );
}
