import type { CSSProperties } from "react";

import Scene from "@/components/Scene";
import siteData from "@/data/site.json";
import type { Site } from "@/types";

const site = siteData as Site;

/**
 * The address is assembled at runtime from its parts, so no complete address
 * ever appears as a literal in the JSON, the JS bundle, or the HTML. The @ is
 * written as a code point for the same reason, and the visible text is the
 * reversed string flipped back by CSS (.obfuscated).
 */
const AT = String.fromCharCode(64);
const mailAddress = `${site.links.emailUser}${AT}${site.links.emailDomain}`;
const mailDisplay = [...mailAddress].reverse().join("");

/** Act 07. The last frame holds the address, the profiles and the colophon. */
export default function Colophon() {
  const year = new Date().getFullYear();

  return (
    <Scene id="contact" act="contact" num="07" title="Get in Touch" len="40vh">
      <a className="colophon__mail" href={`mailto:${mailAddress}`} data-step data-at="-,1.05" data-fade="0.12" data-fx="wipe">
        <span className="obfuscated">{mailDisplay}</span>
      </a>

      <dl
        className="colophon__list"
        data-step
        data-at="0.08-"
        data-fade="0.08"
        data-fx="cascade"
        style={{ "--stagger": "0.06" } as CSSProperties}
      >
        <div className="colophon__row" style={{ "--ci": "0" } as CSSProperties}>
          <dt className="colophon__key">GitHub</dt>
          <dd className="colophon__val">
            <a className="link link--out" href={site.links.github} target="_blank" rel="noopener noreferrer">
              {site.links.githubLabel}
            </a>
          </dd>
        </div>
        <div className="colophon__row" style={{ "--ci": "1" } as CSSProperties}>
          <dt className="colophon__key">LinkedIn</dt>
          <dd className="colophon__val">
            <a className="link link--out" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
              {site.links.linkedinLabel}
            </a>
          </dd>
        </div>
        <div className="colophon__row" style={{ "--ci": "2" } as CSSProperties}>
          <dt className="colophon__key">Resume</dt>
          <dd className="colophon__val">
            <a className="link link--out" href={site.links.resume} target="_blank" rel="noopener noreferrer">
              {site.links.resumeLabel}
            </a>
          </dd>
        </div>
      </dl>

      <div className="colophon__base" data-step data-at="0.3-" data-fx="rise">
        <span>
          © {year} {site.name}
        </span>
        <span>{site.colophon}</span>
        <a href="#masthead">Back to top ↑</a>
      </div>
    </Scene>
  );
}
