/**
 * Tag → line glyph. Drawn inline so there is no icon dependency: each glyph is
 * a few primitives on a 24×24 grid, stroked with currentColor.
 */

export type GlyphKey =
  | "text" | "network" | "database" | "code" | "container" | "graph" | "chart"
  | "shield" | "flask" | "signal" | "phone" | "gate" | "scales" | "cloud"
  | "pen" | "dot";

export const PATHS: Record<GlyphKey, string> = {
  text: "M4 7h16M4 12h11M4 17h7",
  network: "M6 6.5a2 2 0 1 0 0-.1M18 9a2 2 0 1 0 0-.1M10 18a2 2 0 1 0 0-.1M7.9 7.4l8.3 1.1M16.7 10.7l-5.3 5.5M8.4 17.4 6.6 8.3",
  database: "M12 4.5c3.6 0 6.5 1.1 6.5 2.5S15.6 9.5 12 9.5 5.5 8.4 5.5 7 8.4 4.5 12 4.5M5.5 7v10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V7M5.5 12c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5",
  code: "M9 6 4 12l5 6M15 6l5 6-5 6",
  container: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  graph: "M5 12a2 2 0 1 0 0-.1M19 6a2 2 0 1 0 0-.1M19 18a2 2 0 1 0 0-.1M7 11.5l10-4.6M7 12.5l10 4.6M19 8v8",
  chart: "M4 20h16M7 20v-9M12 20V6M17 20v-6",
  shield: "M12 3.5l7 2.7v4.9c0 4.1-2.8 7.4-7 8.9-4.2-1.5-7-4.8-7-8.9V6.2z",
  flask: "M9.5 3.5h5M10.5 3.5v5.6L5.6 18.9a1.2 1.2 0 0 0 1 1.8h10.8a1.2 1.2 0 0 0 1-1.8L13.5 9.1V3.5M8.4 14.5h7.2",
  signal: "M4.5 12a7.5 7.5 0 0 1 7.5-7.5M7.5 12a4.5 4.5 0 0 1 4.5-4.5M12 12a1.4 1.4 0 1 0 0-.1M12 13.4V20M8 20h8",
  phone: "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 17.5h2",
  gate: "M6 7h5a5 5 0 0 1 0 10H6zM6 7v10M2 12h4M16 12h5.5",
  scales: "M12 4.5V19M5.5 19h13M6.5 8.5h11M6.5 8.5 3.5 14h6zM17.5 8.5 14.5 14h6z",
  cloud: "M7.5 18.5h9.5a3.8 3.8 0 0 0 .5-7.6A6 6 0 0 0 6.3 10 3.9 3.9 0 0 0 7.5 18.5z",
  pen: "M4.5 19.5l4-1 10-10-3-3-10 10zM14.5 5.5l3 3",
  dot: "M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3M12 10.2a1.8 1.8 0 1 0 0-.1",
};

/** Tag → glyph, most specific match first. */
const RULES: [string, GlyphKey][] = [
  ["nlp", "text"], ["llm", "text"], ["text classification", "text"], ["sentiment", "text"],
  ["prompt", "text"], ["arabic", "text"], ["literature review", "text"],
  ["deep learning", "network"], ["machine learning", "network"], ["transformer", "network"],
  ["bert", "network"], ["pytorch", "network"], ["neural", "network"],
  ["database", "database"], ["sql", "database"], ["mysql", "database"], ["mongodb", "database"],
  ["postgres", "database"], ["firebase", "database"], ["indexeddb", "database"], ["dexie", "database"],
  ["kubernetes", "container"], ["docker", "container"], ["devops", "container"], ["deployment", "container"],
  ["graph", "graph"], ["algorithm", "graph"], ["network programming", "graph"], ["network science", "graph"],
  ["community detection", "graph"], ["big data", "graph"], ["cugraph", "graph"],
  ["data science", "chart"], ["data analysis", "chart"], ["statistic", "chart"], ["analytics", "chart"],
  ["hypothesis", "chart"], ["financial", "chart"], ["benchmarking", "chart"],
  ["security", "shield"], ["jwt", "shield"], ["rbac", "shield"], ["anonymity", "shield"],
  ["testing", "flask"], ["empirical research", "flask"], ["research tools", "flask"],
  ["real-time", "signal"], ["socket", "signal"], ["multi-threading", "signal"], ["anomaly detection", "signal"],
  ["pwa", "phone"], ["mobile", "phone"], ["react native", "phone"],
  ["digital logic", "gate"], ["circuit", "gate"], ["hardware", "gate"],
  ["ethics", "scales"], ["healthcare", "scales"], ["responsible ai", "scales"],
  ["gcp", "cloud"], ["cloud", "cloud"], ["aws", "cloud"],
  ["hackathon", "pen"], ["ui/ux", "pen"], ["web scraping", "pen"],
  ["faiss", "network"], ["vector", "network"], ["bi-encoder", "network"],
  ["sentence-transformer", "network"], ["mcp", "network"], ["agentic", "network"],
  ["multi-agent", "network"], ["langchain", "network"], ["fine-tuning", "network"],
  ["code", "code"], ["python", "code"], ["java", "code"], ["bash", "code"],
  ["nodejs", "code"], ["nest", "code"], ["fastapi", "code"], ["git", "code"],
  ["mmr", "chart"], ["ranking", "chart"], ["regression", "chart"], ["memory", "chart"],
  ["spaced repetition", "chart"], ["fsrs", "chart"], ["optimization", "chart"],
  ["automation", "container"], ["pipeline", "container"], ["microservice", "container"],
  ["state management", "database"], ["schema", "database"], ["weaviate", "database"],
  ["milvus", "database"], ["ollama", "database"], ["vector database", "database"],
  ["openrouter", "cloud"], ["open source", "cloud"],
  ["web", "code"], ["react", "code"], ["node", "code"], ["express", "code"], ["javascript", "code"],
  ["html", "code"], ["css", "code"], ["typescript", "code"], ["springboot", "code"],
];

export function glyphForTag(tag: string): GlyphKey {
  const lowered = tag.toLowerCase();
  return RULES.find(([needle]) => lowered.includes(needle))?.[1] ?? "dot";
}
