import Figure from "@/components/Figure";
import { box, circle, down, line, type Figure as FigureData } from "@/lib/figures";
import type { Project } from "@/types";

/**
 * The plate that arrives first in a chapter of act 04: a schematic of what the
 * project is made of, drawn from its own vocabulary — the title and the tags in
 * projects.json. Keyed by project id, because each drawing is laid out by hand.
 *
 * A project that has no drawing yet falls back to its tags as ruled rows, so
 * featuring another one does not leave the plate empty.
 */

/* 19 · the retrieval pipeline behind the adaptive learning platform */
const retrieval: FigureData = {
  viewBox: "8 9 224 280",
  caption: "A retrieval pipeline: query, bi-encoder, FAISS, MMR, LLM",
  strokes: [
    box(45, 20, 150, 34, 0),
    ...down(120, 54, 76, 1),
    box(45, 76, 150, 34, 2),
    ...down(120, 110, 132, 3),
    box(45, 132, 150, 34, 4),
    ...down(120, 166, 188, 5),
    box(45, 188, 150, 34, 6),
    ...down(120, 222, 244, 7),
    box(45, 244, 150, 34, 8),
  ],
  labels: [
    { x: 120, y: 43, text: "query", ci: 0.4, anchor: "middle" },
    { x: 120, y: 99, text: "bi-encoder", ci: 2.4, anchor: "middle" },
    { x: 120, y: 155, text: "faiss", ci: 4.4, anchor: "middle" },
    { x: 120, y: 211, text: "mmr", ci: 6.4, anchor: "middle" },
    { x: 120, y: 267, text: "llm", ci: 8.4, anchor: "middle" },
  ],
};

/* 20 · what the study compares: a code sample read by a person and by a model */
const review: FigureData = {
  viewBox: "16 7 208 260",
  caption: "A code sample reviewed by a human and by an LLM, meeting in an agreement",
  strokes: [
    box(45, 20, 150, 54, 0),
    { d: "M60 36h120M60 48h90M60 60h105", ci: 1 },
    { d: "M120 74v18M65 92h110M65 92v26M175 92v26", ci: 2 },
    { d: "M60 112l5 6 5-6", ci: 2.4 },
    { d: "M170 112l5 6 5-6", ci: 2.6 },
    box(20, 118, 90, 44, 3),
    box(130, 118, 90, 44, 3.4),
    { d: "M65 162v18M175 162v18M65 180h110M120 180v22", ci: 4 },
    { d: "M115 204l5 6 5-6", ci: 4.4 },
    box(45, 210, 150, 44, 5),
  ],
  labels: [
    { x: 65, y: 144, text: "human", ci: 3.2, anchor: "middle" },
    { x: 175, y: 144, text: "llm", ci: 3.6, anchor: "middle" },
    { x: 120, y: 238, text: "agreement", ci: 5.4, anchor: "middle" },
  ],
};

/* 14 · the mapping study: a corpus read by a set of agents */
const mapping: FigureData = {
  viewBox: "16 6 208 260",
  caption: "A corpus read by a set of agents, feeding a systematic mapping",
  strokes: [
    box(30, 30, 180, 40, 0),
    ...down(120, 70, 112, 1),
    box(30, 112, 180, 44, 2),
    box(89, 118, 14, 14, 3),
    box(113, 118, 14, 14, 3.3),
    box(137, 118, 14, 14, 3.6),
    ...down(120, 156, 198, 4),
    box(30, 198, 180, 44, 5),
  ],
  labels: [
    { x: 120, y: 55, text: "corpus", ci: 0.4, anchor: "middle" },
    { x: 120, y: 148, text: "agents", ci: 3.9, anchor: "middle" },
    { x: 120, y: 226, text: "mapping", ci: 5.4, anchor: "middle" },
  ],
};

/* 16 · one encoder for every language the classifier is asked about */
const multilingual: FigureData = {
  viewBox: "8 17 224 280",
  caption: "Three texts meeting in one BERT encoder and leaving as one label",
  strokes: [
    box(20, 30, 60, 48, 0),
    box(90, 30, 60, 48, 0.4),
    box(160, 30, 60, 48, 0.8),
    { d: "M32 48h36M32 60h26", ci: 1 },
    { d: "M102 48h36M102 60h26", ci: 1.3 },
    { d: "M172 48h36M172 60h26", ci: 1.6 },
    { d: "M50 78v14M190 78v14M50 92 120 110M190 92 120 110M120 78v32", ci: 2 },
    { d: "M115 104l5 6 5-6", ci: 2.5 },
    box(45, 110, 150, 90, 3),
    ...[0, 1, 2].flatMap((row) =>
      [0, 1, 2].map((column) =>
        box(115.5 + (column - 1) * 16, 122 + (row - 1) * 16, 9, 9, 3.6 + (row * 3 + column) * 0.2),
      ),
    ),
    ...down(120, 200, 240, 5),
    box(75, 240, 90, 44, 6),
  ],
  labels: [
    { x: 120, y: 188, text: "bert", ci: 5.4, anchor: "middle" },
    { x: 120, y: 268, text: "label", ci: 6.4, anchor: "middle" },
  ],
};

/* 13 · the graph the study ranks: two communities and a centrality order */
const communities: FigureData = {
  viewBox: "9 13 224 280",
  caption: "Two communities in a graph, ranked by centrality underneath",
  strokes: [
    circle(48, 72, 5, 1),
    circle(86, 48, 5, 1.2),
    circle(102, 96, 5, 1.4),
    circle(62, 124, 5, 1.6),
    line(48, 72, 86, 48, 2),
    line(48, 72, 102, 96, 2.2),
    line(86, 48, 102, 96, 2.4),
    line(48, 72, 62, 124, 2.6),
    line(102, 96, 62, 124, 2.8),
    box(157, 79, 10, 10, 3),
    box(189, 119, 10, 10, 3.2),
    box(143, 137, 10, 10, 3.4),
    box(175, 171, 10, 10, 3.6),
    line(162, 84, 194, 124, 4),
    line(162, 84, 148, 142, 4.2),
    line(194, 124, 180, 176, 4.4),
    line(148, 142, 180, 176, 4.6),
    line(102, 96, 162, 84, 5),
    box(45, 224, 110, 12, 5.5),
    box(45, 244, 80, 12, 5.7),
    box(45, 264, 50, 12, 5.9),
  ],
  labels: [
    { x: 45, y: 30, text: "communities", ci: 0.6 },
    { x: 45, y: 208, text: "centrality", ci: 5.3 },
  ],
};

/* 02 · the shop: a client, the server it talks to, and the board it is built on */
const shop: FigureData = {
  viewBox: "25 29 210 262",
  caption: "A React client talking to an Express server, over a scrum board",
  strokes: [
    box(25, 45, 90, 90, 0),
    line(25, 63, 115, 63, 0.5),
    circle(34, 54, 1.6, 0.8),
    circle(41, 54, 1.6, 0.9),
    circle(48, 54, 1.6, 1),
    { d: "M37 82h60M37 96h44", ci: 1.2 },
    box(145, 45, 90, 90, 2),
    { d: "M157 66h66M157 84h48M157 102h58", ci: 2.4 },
    line(120, 80, 140, 80, 3),
    { d: "M134 75l5 5-5 5", ci: 3.2 },
    line(140, 96, 120, 96, 3.4),
    { d: "M126 91l-5 5 5 5", ci: 3.6 },
    box(25, 195, 60, 80, 4),
    box(90, 195, 60, 80, 4.2),
    box(155, 195, 60, 80, 4.4),
    box(33, 208, 44, 16, 5),
    box(33, 234, 44, 16, 5.2),
    box(98, 208, 44, 16, 5.4),
    box(98, 234, 44, 16, 5.6),
    box(163, 208, 44, 16, 5.8),
    box(163, 234, 44, 16, 6),
  ],
  labels: [
    { x: 70, y: 152, text: "react", ci: 2.6, anchor: "middle" },
    { x: 190, y: 152, text: "express", ci: 2.8, anchor: "middle" },
    { x: 25, y: 185, text: "scrum", ci: 3.8 },
  ],
};

const FIGURES: Record<number, FigureData> = {
  2: shop,
  13: communities,
  14: mapping,
  16: multilingual,
  19: retrieval,
  20: review,
};

export default function ProjectPlate({ project }: { project: Project }) {
  const figure = FIGURES[project.id];
  if (figure) return <Figure figure={figure} />;

  return (
    <ol className="fig-list">
      {project.tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ol>
  );
}
