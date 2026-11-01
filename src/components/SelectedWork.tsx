import type { CSSProperties } from "react";

import Prose from "@/components/Prose";
import Scene from "@/components/Scene";
import projectsData from "@/data/projects.json";
import { byEndDateDesc, formatRange, pad } from "@/lib/format";
import { at, seq } from "@/lib/stage";
import type { Project } from "@/types";

const selected = (projectsData as Project[]).filter((project) => project.featured).sort(byEndDateDesc);
const COUNT = selected.length;

/**
 * Act 04, the movie. One frame, six chapters: the paper turns to ink as the act
 * begins, then each project is cut in on the same stage — art first, then the
 * title, the tag row and finally the write-up, in place.
 */
export default function SelectedWork() {
  return (
    <Scene id="work" act="movie" num="04" title="Featured Projects" meta={`${COUNT} selected`} len="860vh">
      <div className="movie__veil" aria-hidden="true" />

      <div className="movie">
        <div className="movie__hud">
          <p className="movie__count num">
            <span className="roll" style={{ "--n": String(COUNT) } as CSSProperties}>
              {selected.map((project, index) => (
                <span key={project.id} style={{ "--j": String(index) } as CSSProperties}>
                  {pad(index + 1)}
                </span>
              ))}
            </span>
            <span> / {pad(COUNT)}</span>
          </p>

          <ol className="movie__reel" aria-hidden="true">
            {selected.map((project, index) => (
              <li
                className="movie__tick"
                key={project.id}
                style={{ "--j": String(index), "--n": String(COUNT) } as CSSProperties}
              />
            ))}
          </ol>
        </div>

        <div className="movie__frame">
          {selected.map((project, index) => (
            <article
              className="chapter"
              key={project.id}
              id={`project-${project.id}`}
              data-step
              data-at={seq(index, COUNT, 0.02)}
              data-fade="0.02"
              data-fx="cut"
            >
              <img className="chapter__art" src={project.image} alt="" aria-hidden="true" />

              <span className="chapter__num" aria-hidden="true">
                {pad(index + 1)}
              </span>

              <h3
                className="chapter__title"
                data-step
                data-at={at(index, COUNT, 0.04, 1.05)}
                data-fade="0.05"
                data-fx="wipe"
              >
                {project.title}
              </h3>

              <p className="chapter__meta" data-step data-at={at(index, COUNT, 0.1, 1.05)} data-fade="0.05" data-fx="rise">
                <span className="num">{formatRange(project.startDate, project.endDate)}</span>
              </p>

              <ul
                className="tags chapter__tags"
                data-step
                data-at={at(index, COUNT, 0.14, 1.05)}
                data-fade="0.06"
                data-fx="cascade"
                style={{ "--stagger": "0.045" } as CSSProperties}
              >
                {project.tags.map((tag, tagIndex) => (
                  <li key={tag} style={{ "--ci": String(tagIndex) } as CSSProperties}>
                    {tag}
                  </li>
                ))}
              </ul>

              <Prose
                text={project.description}
                step={{ at: at(index, COUNT, 0.18, 1.05), fade: "0.06", stagger: "0.055" }}
              />

              {project.github || project.demo ? (
                <p
                  className="chapter__links"
                  data-step
                  data-at={at(index, COUNT, 0.3, 1.05)}
                  data-fade="0.05"
                  data-fx="rise"
                >
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
            </article>
          ))}
        </div>
      </div>
    </Scene>
  );
}
