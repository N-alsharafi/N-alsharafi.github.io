import { useState } from "react";

import Glyph from "@/components/Glyph";
import { glyphForTag } from "@/lib/glyphs";
import Prose from "@/components/Prose";
import SectionHead from "@/components/SectionHead";
import projectsData from "@/data/projects.json";
import { byEndDateDesc, formatRange, yearOf } from "@/lib/format";
import { useRevealGroup } from "@/lib/reveal";
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

export default function Archive() {
  const [filter, setFilter] = useState("all");
  const [openRows, setOpenRows] = useState<number[]>([]);
  const ref = useRevealGroup<HTMLElement>(filter);

  const visible = filter === "all" ? projects : projects.filter((project) => project.tags.includes(filter));

  const toggleRow = (id: number) =>
    setOpenRows((previous) =>
      previous.includes(id) ? previous.filter((value) => value !== id) : [...previous, id],
    );

  return (
    <section className="section" id="archive" ref={ref} data-progress>
      <div className="shell">
        <SectionHead
          num="05"
          title="Project Archive"
          meta={
            filter === "all"
              ? `${projects.length} projects`
              : `${visible.length} of ${projects.length} match “${filter}”`
          }
        />

        <div className="archive__filter" role="group" aria-label="Filter projects by tag">
          <button
            type="button"
            className={filter === "all" ? "chip is-active" : "chip"}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          {facets.map((tag) => (
            <button
              type="button"
              className={filter === tag ? "chip is-active" : "chip"}
              aria-pressed={filter === tag}
              key={tag}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <ul>
          {visible.map((project) => {
            const isOpen = openRows.includes(project.id);
            const year = project.endDate === "Present" ? `${yearOf(project.startDate)}–` : yearOf(project.endDate);
            return (
              <li className="archive__row" key={project.id} data-reveal>
                <button
                  type="button"
                  className="archive__head"
                  aria-expanded={isOpen}
                  aria-controls={`archive-${project.id}`}
                  onClick={() => toggleRow(project.id)}
                >
                  <span className="archive__glyph" aria-hidden="true">
                    <Glyph name={glyphForTag(project.tags[0] ?? "")} />
                  </span>
                  <span className="archive__year num">{year}</span>
                  <span className="archive__title">
                    {project.title}
                    {project.featured ? <span className="archive__flag">selected</span> : null}
                  </span>
                  <span className="archive__tags">{project.tags.join(" · ")}</span>
                  <span className="archive__sign" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen ? (
                  <div className="archive__panel" id={`archive-${project.id}`}>
                    <p className="archive__span">{formatRange(project.startDate, project.endDate)}</p>
                    <Prose text={project.description} />
                    <ul className="tags">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    {project.github || project.demo ? (
                      <p className="out-links">
                        {project.github ? (
                          <a className="link link--out" href={project.github} target="_blank" rel="noopener noreferrer">
                            Repository
                          </a>
                        ) : null}
                        {project.demo ? (
                          <a className="link link--out" href={project.demo} target="_blank" rel="noopener noreferrer">
                            Live
                          </a>
                        ) : null}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        {visible.length === 0 ? <p className="archive__empty">No projects match this tag.</p> : null}
      </div>
    </section>
  );
}
