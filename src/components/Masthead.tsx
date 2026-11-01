import type { CSSProperties } from "react";

import Scene from "@/components/Scene";
import siteData from "@/data/site.json";
import type { Site } from "@/types";

const site = siteData as Site;

const roles = site.roles;
const words = site.name.split(" ");

/** Character offsets so the name reveals letter by letter across both words. */
let offset = 0;
const nameChars = words.map((word) =>
  word.split("").map((char) => {
    const index = offset;
    offset += 1;
    return { char, index };
  }),
);

/** The cycling slot is over by 54% of the act, when the full list takes over. */
const CYCLE = 0.54;
const roleWindow = (index: number) => {
  const span = CYCLE / roles.length;
  const start = index === 0 ? -0.05 : index * span;
  return `${start.toFixed(4)},${((index + 1) * span).toFixed(4)}`;
};

/**
 * Act 00. The frame recomposes rather than emptying: the name and the overline
 * stay for the whole act, the portrait fills its column from the first frame,
 * the roles cycle in one slot, and the intro and links rise into the space
 * below. Anything that leaves does so after something else has replaced it.
 */
export default function Masthead() {
  return (
    <Scene
      id="masthead"
      act="index"
      num="00"
      title="Index"
      meta={site.overline.split("—")[1]?.trim() ?? ""}
      len="200vh"
    >
      <div className="spread">
        <div className="spread__main">
          <p className="label index__overline" data-step data-at="-,1.05" data-fx="rise">
            {site.overline}
          </p>

          <h1
            className="index__name masthead__name"
            data-step
            data-at="-,1.05"
            data-fade="0.14"
            data-fx="char zoom"
            style={{ "--stagger": "0.06" } as CSSProperties}
          >
            {nameChars.map((word, w) => (
              <span className="name__word" key={words[w]}>
                {word.map(({ char, index }) => (
                  <span className="name__char" key={index} style={{ "--ci": String(index) } as CSSProperties}>
                    {char}
                  </span>
                ))}
                {w < nameChars.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <div className="index__roles">
            <ul
              className="roster index__slot"
              aria-hidden="true"
              data-step
              data-at="-0.2,0.56"
              data-fade="0.07"
            >
              {roles.map((role, index) => (
                <li key={role} data-step data-at={roleWindow(index)} data-fade="0.03" data-fx="right">
                  {role}
                </li>
              ))}
            </ul>

            <ul
              className="roster index__slot index__slot--all"
              data-step
              data-at="0.56-"
              data-fade="0.09"
              data-fx="rise"
            >
              {roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>

          <div className="index__text masthead__intro" data-step data-at="0.36-" data-fx="rise">
            <p className="label">{site.intro.label}</p>
            {site.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <nav className="index__links masthead__links" aria-label="Profiles" data-step data-at="0.52-" data-fx="rise">
            <a className="link link--out" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="link link--out" href={site.links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="link link--out" href={site.links.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </nav>

          <p className="index__hint" data-step data-at="-,0.14">
            <span>Scroll</span>
          </p>
        </div>

        <figure className="index__plate masthead__plate" data-step data-at="-0.05,1.05" data-fx="wipe">
          <img src="./images/PFP.jpeg" alt={`Portrait of ${site.name}`} width={720} height={720} />
        </figure>
      </div>
    </Scene>
  );
}
