import { PATHS, type GlyphKey } from "@/lib/glyphs";

/**
 * One line glyph. Drawn inline so there is no icon dependency: a few primitives
 * on a 24×24 grid, stroked with currentColor. Used for the tags of projects and
 * side missions.
 */
export default function Glyph({ name, className }: { name: GlyphKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d={PATHS[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
