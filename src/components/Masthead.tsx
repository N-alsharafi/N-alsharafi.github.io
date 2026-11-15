import Scene from "@/components/Scene";
import siteData from "@/data/site.json";
import type { Site } from "@/types";

const site = siteData as Site;

/**
 * Act 00, the opening frame.
 *
 * It is a finished composition rather than a sequence: everything is on screen
 * at the first paint and the act owns no scroll of its own (`--len: 0`), so the
 * page hands over to the acts after it one viewport down. The portrait sits in a
 * matted print: a paper margin between an outer rule and the picture's own rule.
 */
export default function Masthead() {
  return (
    <Scene id="masthead" act="index" num="00" title="Index" len="0vh">
      <div className="spread">
        <div className="spread__main">
          <p className="label index__overline">{site.overline}</p>

          <h1 className="index__name masthead__name">{site.name}</h1>

          <ul className="roster">
            {site.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>

          <div className="index__text masthead__intro">
            <p className="label">{site.intro.label}</p>
            {site.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <nav className="index__links masthead__links" aria-label="Profiles">
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

          <p className="index__hint">
            <span>Scroll</span>
          </p>
        </div>

        <figure className="index__plate masthead__plate">
          <img src="./images/profile.jpg" alt={`Portrait of ${site.name}`} width={1200} height={1600} />
        </figure>
      </div>
    </Scene>
  );
}
