import siteData from "@/data/site.json";
import { revealDelay, useRevealGroup } from "@/lib/reveal";
import type { Site } from "@/types";

const site = siteData as Site;

export default function Masthead() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section className="masthead" id="masthead" ref={ref}>
      <div className="shell masthead__grid">
        <div className="masthead__lede">
          <p className="label" data-reveal>
            {site.overline}
          </p>

          <h1 className="masthead__name" data-reveal style={revealDelay(1)}>
            {site.name.split(" ").map((word, index) => (
              <span key={word}>{index > 0 ? ` ${word}` : word}</span>
            ))}
          </h1>

          <ul className="masthead__roles" data-reveal style={revealDelay(2)}>
            {site.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>

          <div className="masthead__intro" data-reveal style={revealDelay(3)}>
            <p className="label">{site.intro.label}</p>
            {site.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <nav className="masthead__links" aria-label="Profiles" data-reveal style={revealDelay(4)}>
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
        </div>

        <figure className="masthead__plate" data-reveal style={revealDelay(2)}>
          <img src="./images/PFP.jpeg" alt={`Portrait of ${site.name}`} width={720} height={720} />
        </figure>
      </div>

      <div className="shell masthead__foot">
        <span>Scroll</span>
        <span aria-hidden="true" />
      </div>
    </section>
  );
}
