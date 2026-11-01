import { useEffect, useState } from "react";

import Archive from "@/components/Archive";
import Colophon from "@/components/Colophon";
import Education from "@/components/Education";
import Masthead from "@/components/Masthead";
import Missions from "@/components/Missions";
import Practice from "@/components/Practice";
import Rail from "@/components/Rail";
import SelectedWork from "@/components/SelectedWork";
import TrackRecord from "@/components/TrackRecord";
import TopBar from "@/components/TopBar";
import { SECTIONS } from "@/lib/sections";
import { trackProgress } from "@/lib/scroll";
import { useTheme } from "@/lib/theme";

export default function App() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    return trackProgress(targets);
  }, []);

  return (
    <>
      <a className="skip" href="#practice">
        Skip to content
      </a>
      <TopBar sections={SECTIONS} active={active} theme={theme} onToggleTheme={toggle} />
      <Rail sections={SECTIONS} active={active} />
      <main>
        <Masthead />
        <Practice />
        <TrackRecord />
        <Education />
        <SelectedWork />
        <Archive />
        <Missions />
      </main>
      <Colophon />
    </>
  );
}
