/**
 * One figure language for the acts that show art: hairline strokes in
 * currentColor on a 4:5 field, mono labels, and a stroke order the scroll can
 * write out. components/Figure renders it; each act keeps its own drawings.
 *
 * Everything is a path — a box, a circle and an ellipse included — because the
 * drawing hand is `pathLength="1"` plus `stroke-dashoffset`, and that pair is
 * only dependable on `path`.
 */

export interface Stroke {
  d: string;
  /** where this stroke falls in the drawing order */
  ci: number;
}

export interface Label {
  x: number;
  y: number;
  text: string;
  ci: number;
  anchor?: "start" | "middle" | "end";
}

export interface Figure {
  /** the field, framed around the drawing */
  viewBox: string;
  /** what the figure shows, for assistive technology */
  caption: string;
  strokes: Stroke[];
  labels: Label[];
}

/** A rounded box: one closed path, drawn from its top-left corner. */
export const box = (x: number, y: number, w: number, h: number, ci: number): Stroke => ({
  d: `M${x} ${y}h${w}v${h}h${-w}z`,
  ci,
});

/** A shaft and its head, arriving at `to` — the top of the box below. */
export const down = (x: number, y: number, to: number, ci: number): Stroke[] => [
  { d: `M${x} ${y}v${to - y - 8}`, ci },
  { d: `M${x - 5} ${to - 6}l5 6 5-6`, ci: ci + 0.3 },
];

/** A circle as two half-arcs, so pathLength can measure it. */
export const circle = (x: number, y: number, r: number, ci: number): Stroke => ({
  d: `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`,
  ci,
});

/** A line segment, written as a path so it draws like everything else. */
export const line = (x1: number, y1: number, x2: number, y2: number, ci: number): Stroke => ({
  d: `M${x1} ${y1} ${x2} ${y2}`,
  ci,
});
