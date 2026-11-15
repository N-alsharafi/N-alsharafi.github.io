import { PATHS, type GlyphKey } from "@/lib/glyphs";

/**
 * One line glyph. `draw` normalises the path length so CSS can animate
 * `stroke-dashoffset` and have the stroke draw itself — used by the practice
 * plates, where the figure is written by the scroll.
 */
export default function Glyph({ name, className, draw }: { name: GlyphKey; className?: string; draw?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d={PATHS[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(draw ? { pathLength: 1 } : {})}
      />
    </svg>
  );
}
