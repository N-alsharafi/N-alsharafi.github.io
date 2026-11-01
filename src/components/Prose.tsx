import type { ReactNode } from "react";

type Block = { kind: "p"; text: string } | { kind: "ul"; items: string[] };

/**
 * Descriptions come from JSON as plain text: blank-line paragraphs and
 * "- " bullet runs. Turn that into real paragraphs and lists.
 */
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

export default function Prose({ text, children }: { text: string; children?: ReactNode }) {
  return (
    <div className="prose">
      {toBlocks(text).map((block, index) =>
        block.kind === "ul" ? (
          <ul key={index}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={index}>{block.text}</p>
        ),
      )}
      {children}
    </div>
  );
}
