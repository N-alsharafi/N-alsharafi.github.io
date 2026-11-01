import { useEffect, useRef, useState } from "react";

import Prose from "@/components/Prose";
import SectionHead from "@/components/SectionHead";
import projectsData from "@/data/projects.json";
import { byEndDateDesc, formatRange, pad } from "@/lib/format";
import { useRevealGroup } from "@/lib/reveal";
import { subscribeScroll } from "@/lib/scroll";
import type { Project } from "@/types";

const selected = (projectsData as Project[]).filter((project) => project.featured).sort(byEndDateDesc);

export default function SelectedWork() {
  const groupRef = useRevealGroup<HTMLElement>();
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(
    () =>
      subscribeScroll(({ vh }) => {
        const line = vh * 0.45;
        let next = 0;
        stepsRef.current.forEach((step, index) => {
          if (step && step.getBoundingClientRect().top <= line) next = index;
        });
        setCurrent((previous) => (previous === next ? previous : next));
      }),
    [],
  );

  return (
    <section className="section" id="work" ref={groupRef}>
      <div className="shell">
        <SectionHead num="04" title="Featured Projects" meta={`${selected.length} selected`} />

        <div className="work__grid">
          <aside className="work__aside">
            <p className="work__counter num">
              <b>{pad(current + 1)}</b> / {pad(selected.length)}
            </p>
            <ol>
              {selected.map((project, index) => (
                <li className="work__index-item" key={project.id}>
                  <a
                    href={`#project-${project.id}`}
                    className={index === current ? "is-active" : undefined}
                    aria-current={index === current ? "true" : undefined}
                  >
                    <span className="work__index-num num">{pad(index + 1)}</span>
                    <span className="work__index-title">{project.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <ol className="work__steps">
            {selected.map((project, index) => (
              <li
                className="work__step"
                id={`project-${project.id}`}
                key={project.id}
                data-reveal
                ref={(node) => {
                  stepsRef.current[index] = node;
                }}
              >
                <h3 className="work__step-title">{project.title}</h3>
                <p className="work__meta">
                  <span className="num">{formatRange(project.startDate, project.endDate)}</span>
                </p>
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
