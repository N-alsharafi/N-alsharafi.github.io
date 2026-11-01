import type { CSSProperties, ReactNode } from "react";

type Block = { kind: "p"; text: string } | { kind: "ul"; items: string[] };

/**
 * Descriptions come from JSON as plain text: blank-line paragraphs and
 * "- " bullet runs. Turn that into real paragraphs and lists.
 *
 * `step` hands the block to the scroll stage, so a long description reveals
 * itself in place instead of appearing all at once.
 */
export interface ProseStep {
  at: string;
  fade?: string;
  stagger?: string;
}

function toBlocks(text: string): Block[] {
  const blocks: Block[] = [];

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("- ")) {
      const previous = blocks[blocks.length - 1];
      const item = line.slice(2);
      if (previous?.kind === "ul") previous.items.push(item);
      else blocks.push({ kind: "ul", items: [item] });
      continue;
    }

    blocks.push({ kind: "p", text: line });
  }

  return blocks;
}

export default function Prose({
  text,
  step,
  children,
}: {
  text: string;
  step?: ProseStep;
  children?: ReactNode;
}) {
  const staged = step
    ? {
        "data-step": true,
        "data-at": step.at,
        "data-fade": step.fade ?? "0.05",
        "data-fx": "cascade",
      }
    : {};

  return (
    <div
      className="prose"
      {...staged}
      style={step?.stagger ? ({ "--stagger": step.stagger } as CSSProperties) : undefined}
    >
      {toBlocks(text).map((block, index) =>
        block.kind === "ul" ? (
          <ul key={index} style={{ "--ci": String(index) } as CSSProperties}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={index} style={{ "--ci": String(index) } as CSSProperties}>
            {block.text}
          </p>
        ),
      )}
      {children}
    </div>
  );
}
