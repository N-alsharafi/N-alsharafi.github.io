import Figure from "@/components/Figure";
import { box, circle, down, type Figure as FigureData } from "@/lib/figures";

/**
 * One technical figure per area of act 01: the software figure is a layered
 * service, the learning figure is the NLP pipeline with the encoder's attention
 * matrix, the research figure is a fitted line over its observations.
 */

/* 01 · software: client, service, store — the store drawn as a cylinder */
const service: FigureData = {
  viewBox: "20 33 200 250",
  caption: "A layered service: interface over service over a data store",
  strokes: [
    box(45, 44, 150, 48, 0),
    ...down(120, 92, 128, 1),
    box(45, 128, 150, 48, 2),
    ...down(120, 176, 212, 3),
    { d: "M45 212a75 12 0 1 0 150 0a75 12 0 1 0-150 0", ci: 4 },
    { d: "M45 212v48", ci: 4.4 },
    { d: "M195 212v48", ci: 4.4 },
    { d: "M45 260a75 12 0 0 0 150 0", ci: 4.8 },
  ],
  labels: [
    { x: 120, y: 77, text: "interface", ci: 0.4, anchor: "middle" },
    { x: 120, y: 161, text: "service", ci: 2.4, anchor: "middle" },
    { x: 120, y: 246, text: "store", ci: 5.2, anchor: "middle" },
  ],
};

/* 02 · learning: the pipeline, with the encoder holding its attention matrix */
const attention: FigureData = {
  viewBox: "12 16 216 270",
  caption: "An NLP pipeline: text, tokens, encoder holding an attention matrix, label",
  strokes: [
    box(45, 24, 150, 40, 0),
    ...down(120, 64, 86, 1),
    box(45, 86, 150, 40, 2),
    ...down(120, 126, 148, 3),
    box(45, 148, 150, 68, 4),
    ...[0, 1, 2].flatMap((row) =>
      [0, 1, 2].map((column) =>
        box(115.5 + (column - 1) * 16, 167.5 + (row - 1) * 16, 9, 9, 5 + (row * 3 + column) * 0.2),
      ),
    ),
    ...down(120, 216, 238, 7),
    box(45, 238, 150, 40, 8),
  ],
  labels: [
    { x: 120, y: 49, text: "text", ci: 0.4, anchor: "middle" },
    { x: 120, y: 111, text: "tokens", ci: 2.4, anchor: "middle" },
    { x: 120, y: 210, text: "encoder", ci: 6.4, anchor: "middle" },
    { x: 120, y: 263, text: "label", ci: 9, anchor: "middle" },
  ],
};

/* 03 · research: observations under a fitted line */
const OBSERVATIONS: [number, number][] = [
  [62, 230],
  [80, 206],
  [96, 214],
  [114, 178],
  [132, 168],
  [148, 142],
  [166, 124],
  [184, 96],
];

const fit: FigureData = {
  viewBox: "28 37 184 230",
  caption: "A scatter of observations with a fitted line through them",
  strokes: [
    { d: "M48 244h150", ci: 0 }, // x axis
    { d: "M48 244V54", ci: 0.3 }, // y axis
    ...[48, 78, 108, 138, 168, 198].map((x, index) => ({ d: `M${x} 244v6`, ci: 0.6 + index * 0.2 })),
    ...[244, 206, 168, 130, 92, 54].map((y, index) => ({ d: `M48 ${y}h-6`, ci: 0.6 + index * 0.2 })),
    ...OBSERVATIONS.map(([x, y], index) => circle(x, y, 3.2, 3 + index * 0.5)),
    { d: "M58 232 192 96", ci: 7.5 }, // the fit
    { d: "M60 66h16", ci: 8.4 }, // legend: the fit
    circle(60, 84, 3.2, 8.6), // legend: an observation
  ],
  labels: [
    { x: 82, y: 70, text: "fit", ci: 8.8 },
    { x: 82, y: 88, text: "obs", ci: 9 },
  ],
};

const FIGURES: FigureData[] = [service, attention, fit];

export default function AreaPlate({ index }: { index: number }) {
  return <Figure figure={FIGURES[index]} />;
}
