import type { CSSProperties } from "react";

import Scene from "@/components/Scene";
import siteData from "@/data/site.json";
import { seq } from "@/lib/stage";
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

const profiles = [
  { key: "GitHub", href: site.links.github, label: site.links.githubLabel },
  { key: "LinkedIn", href: site.links.linkedin, label: site.links.linkedinLabel },
  { key: "Resume", href: site.links.resume, label: site.links.resumeLabel },
];

/** Act 07. The last frame: the address, then the profiles, then the colophon. */
export default function Colophon() {
  const year = new Date().getFullYear();

  return (
    <Scene id="contact" act="contact" num="07" title="Get in Touch" len="60vh">
      <div className="spread">
        <a
          className="colophon__mail"
          href={`mailto:${mailAddress}`}
          data-step
          data-at="-,1.05"
          data-fade="0.12"
          data-fx="wipe"
        >
          <span className="obfuscated">{mailDisplay}</span>
        </a>

        <dl className="colophon__list">
          {profiles.map((profile, index) => (
            <div
              className="colophon__row"
              key={profile.key}
              data-step
              data-at={seq(index, profiles.length, 0.04)}
              data-fade="0.06"
              data-fx="rise"
              style={{ "--ci": String(index) } as CSSProperties}
            >
              <dt className="colophon__key">{profile.key}</dt>
              <dd className="colophon__val">
                <a className="link link--out" href={profile.href} target="_blank" rel="noopener noreferrer">
                  {profile.label}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <div className="colophon__base" data-step data-at="0.3-" data-fx="rise">
          <span>
            © {year} {site.name}
          </span>
          <span>{site.colophon}</span>
          <a href="#masthead">Back to top ↑</a>
        </div>
      </div>
    </Scene>
  );
}
