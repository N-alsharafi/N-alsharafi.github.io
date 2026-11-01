import SectionHead from "@/components/SectionHead";
import siteData from "@/data/site.json";
import { useRevealGroup } from "@/lib/reveal";
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

export default function Colophon() {
  const ref = useRevealGroup<HTMLElement>();
  const year = new Date().getFullYear();

  return (
    <footer className="colophon" id="contact" ref={ref} data-progress>
      <div className="shell">
        <SectionHead num="07" title="Get in Touch" />

        <a className="colophon__mail" href={`mailto:${mailAddress}`} data-reveal>
          <span className="obfuscated">{mailDisplay}</span>
        </a>

        <dl className="colophon__list" data-reveal>
          <div className="colophon__row">
            <dt className="colophon__key">GitHub</dt>
            <dd className="colophon__val">
              <a className="link link--out" href={site.links.github} target="_blank" rel="noopener noreferrer">
                {site.links.githubLabel}
              </a>
            </dd>
          </div>
          <div className="colophon__row">
            <dt className="colophon__key">LinkedIn</dt>
            <dd className="colophon__val">
              <a className="link link--out" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
                {site.links.linkedinLabel}
              </a>
            </dd>
          </div>
          <div className="colophon__row">
            <dt className="colophon__key">Resume</dt>
            <dd className="colophon__val">
              <a className="link link--out" href={site.links.resume} target="_blank" rel="noopener noreferrer">
                {site.links.resumeLabel}
              </a>
            </dd>
          </div>
        </dl>

        <div className="colophon__base">
          <span>
            © {year} {site.name}
          </span>
          <span>{site.colophon}</span>
          <a href="#masthead">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
