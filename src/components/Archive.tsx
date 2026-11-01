import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import Glyph from "@/components/Glyph";
import Prose from "@/components/Prose";
import Scene from "@/components/Scene";
import projectsData from "@/data/projects.json";
import { byEndDateDesc, formatRange, pad } from "@/lib/format";
import { glyphForTag } from "@/lib/glyphs";
import { subscribeScroll } from "@/lib/stage";
import type { Project } from "@/types";

const projects = [...(projectsData as Project[])].sort(byEndDateDesc);

// Only tags used by more than one project make a useful filter row; the rest
// still show up on every project that carries them.
const tagCounts = new Map<string, number>();
projects.forEach((project) =>
  project.tags.forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)),
);
const facets = Array.from(tagCounts)
  .filter(([, count]) => count > 1)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([tag]) => tag);

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

/**
 * Act 05, the contact sheet. Projects run as a strip past a fixed light line —
 * the nearest one sharpens, its record assembles on the left, and the rest stay
 * legible as a catalogue. Rows are buttons: in the staged reading they scroll
 * the strip to themselves, otherwise they just select.
 */
export default function Archive() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(0);

  const visible = filter === "all" ? projects : projects.filter((project) => project.tags.includes(filter));
  const rows = Math.max(1, visible.length);
  const active = visible[Math.min(selected, rows - 1)] ?? projects[0];
  const catalogueNumber = projects.indexOf(active) + 1;

  // the strip owns the selection while it is pinned
  useEffect(() => {
    return subscribeScroll(({ vh }) => {
      if (!document.documentElement.classList.contains("is-staged")) return;

      const scene = document.getElementById("archive");
      if (!scene) return;
      const rect = scene.getBoundingClientRect();
      const span = Math.max(1, rect.height - vh);
      const p = clamp01(-rect.top / span);
      const next = Math.min(rows - 1, Math.round(p * (rows - 1)));
      setSelected((previous) => (previous === next ? previous : next));
    });
  }, [rows]);

  useEffect(() => {
    setSelected((previous) => (previous < rows ? previous : 0));
  }, [rows]);

  const pick = (index: number) => () => {
    const scene = document.getElementById("archive");
    if (!scene || !document.documentElement.classList.contains("is-staged")) {
      setSelected(index);
      return;
    }

    const rect = scene.getBoundingClientRect();
    const span = Math.max(1, rect.height - window.innerHeight);
    const top = window.scrollY + rect.top + (rows > 1 ? (index / (rows - 1)) * span : 0);
    // the strip reads its own position back from the scroll, so the jump is
    // instant: a glided scroll would fight the scroll-derived selection
    setSelected(index);
    window.scrollTo({ top, behavior: "auto" });
  };

  return (
    <Scene
      id="archive"
      act="archive"
      num="05"
      title="Archive"
      meta={`${projects.length} projects`}
      len="480vh"
    >
      <aside className="panel">
        <div className="panel__head">
          <p className="panel__id num">
            Project {pad(catalogueNumber)} / {pad(projects.length)}
          </p>
          <span className="panel__glyph" key={active.id} aria-hidden="true">
            <Glyph name={glyphForTag(active.tags[0] ?? "")} />
          </span>
        </div>

        <div className="panel__body" key={active.id}>
          <h3 className="panel__title">{active.title}</h3>
          <p className="panel__meta num">
            <span>{formatRange(active.startDate, active.endDate)}</span>
            {active.featured ? <span className="panel__flag"> · Featured</span> : null}
          </p>
          <Prose text={active.description} />
          <ul className="tags">
            {active.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {active.github || active.demo ? (
            <p className="out-links">
              {active.github ? (
                <a className="link link--out" href={active.github} target="_blank" rel="noopener noreferrer">
                  Repository
                </a>
              ) : null}
              {active.demo ? (
                <a className="link link--out" href={active.demo} target="_blank" rel="noopener noreferrer">
                  Live
                </a>
              ) : null}
            </p>
          ) : null}
        </div>
      </aside>

      <div className="strip" style={{ "--rows": String(rows) } as CSSProperties}>
        {visible.map((project, index) => (
          <button
            type="button"
            className="strip__row"
            key={project.id}
            style={{ "--j": String(index) } as CSSProperties}
            aria-current={project.id === active.id ? "true" : undefined}
            onClick={pick(index)}
          >
            <span className="strip__num num">{pad(projects.indexOf(project) + 1)}</span>
            <span className="strip__title">{project.title}</span>
            <span className="strip__year num">{project.endDate.slice(0, 4)}</span>
            <span className="strip__glyph" aria-hidden="true">
              <Glyph name={glyphForTag(project.tags[0] ?? "")} />
            </span>
          </button>
        ))}
        <span className="strip__light" aria-hidden="true" />
      </div>

      <div className="archive__filter" role="group" aria-label="Filter projects by tag">
        <button
          type="button"
          className={filter === "all" ? "chip is-active" : "chip"}
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
        >
          All
        </button>
        {facets.map((tag) => (
          <button
            type="button"
            className={tag === filter ? "chip is-active" : "chip"}
            key={tag}
            onClick={() => setFilter(tag)}
            aria-pressed={tag === filter}
          >
            {tag}
          </button>
        ))}
      </div>

      {visible.length === 0 ? <p className="archive__empty">No projects match this tag.</p> : null}
    </Scene>
  );
}
