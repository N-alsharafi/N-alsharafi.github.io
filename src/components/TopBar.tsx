import { useEffect, useState } from "react";

import siteData from "@/data/site.json";
import { subscribeScroll } from "@/lib/stage";
import type { SectionRef } from "@/lib/sections";
import type { Theme } from "@/lib/theme";
import type { Site } from "@/types";

const site = siteData as Site;

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.2 5.2l1.8 1.8M17 17l1.8 1.8M18.8 5.2L17 7M7 17l-1.8 1.8" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M20 14.8A8.6 8.6 0 0 1 9.2 4a8.6 8.6 0 1 0 10.8 10.8Z" />
  </svg>
);

export default function TopBar({
  sections,
  active,
  theme,
  onToggleTheme,
}: {
  sections: SectionRef[];
  active: string;
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(
    () =>
      subscribeScroll(({ y }) => {
        const next = y > 24;
        setScrolled((previous) => (previous === next ? previous : next));
      }),
    [],
  );

  return (
    <header className={scrolled ? "topbar is-scrolled" : "topbar"}>
      <div className="topbar__inner shell">
        <a className="topbar__id" href="#masthead">
          {site.name}
        </a>

        <nav className="topbar__nav" aria-label="Sections">
          {sections.map((section) => (
            <a
              key={section.id}
              className={section.id === active ? "topbar__link is-active" : "topbar__link"}
              href={`#${section.id}`}
              aria-current={section.id === active ? "true" : undefined}
            >
              <span className="topbar__num num">{section.num}</span>
              {section.nav}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
