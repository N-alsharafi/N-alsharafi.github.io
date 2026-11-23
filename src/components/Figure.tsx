import type { CSSProperties } from "react";

import type { Figure as FigureData } from "@/lib/figures";

/**
 * One figure, drawn by the scroll. `--ci` on every stroke is its place in the
 * order and `--local` on the frame is how far the act has got, so the CSS turns
 * the two into a `stroke-dashoffset` — see the `.fig` block in index.css.
 */
export default function Figure({ figure }: { figure: FigureData }) {
  return (
    <svg className="fig" viewBox={figure.viewBox} role="img" aria-label={figure.caption}>
      {figure.strokes.map((stroke) => (
        <path
          key={stroke.d}
          d={stroke.d}
          data-draw
          pathLength={1}
          style={{ "--ci": String(stroke.ci) } as CSSProperties}
        />
      ))}
      {figure.labels.map((label) => (
        <text
          key={label.text}
          x={label.x}
          y={label.y}
          textAnchor={label.anchor ?? "start"}
          style={{ "--ci": String(label.ci) } as CSSProperties}
        >
          {label.text}
        </text>
      ))}
    </svg>
  );
}
