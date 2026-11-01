import { useEffect, useRef, useState } from "react";

import { paintProgress, subscribeScroll } from "@/lib/scroll";
import type { SectionRef } from "@/lib/sections";

interface Tick {
  id: string;
  nav: string;
  offset: number;
}

export default function Rail({ sections, active }: { sections: SectionRef[]; active: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [ticks, setTicks] = useState<Tick[]>([]);

  useEffect(() => {
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setTicks(
        sections.flatMap((section) => {
          const element = document.getElementById(section.id);
          if (!element) return [];
          const top = window.scrollY + element.getBoundingClientRect().top;
          return [{ id: section.id, nav: section.nav, offset: Math.min(1, Math.max(0, top / max)) }];
        }),
      );
    };

    measure();
    window.addEventListener("resize", measure);
    const settle = window.setTimeout(measure, 800);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(settle);
    };
  }, [sections]);

  useEffect(
    () =>
      subscribeScroll(({ progress }) => {
        if (ref.current) paintProgress(ref.current, progress);
      }),
    [],
  );

  return (
    <nav className="rail" aria-label="Reading progress" ref={ref}>
      <div className="rail__track" aria-hidden="true">
        <div className="rail__fill" />
      </div>
      {ticks.map((tick) => (
        <a
          key={tick.id}
          className={tick.id === active ? "rail__tick is-active" : "rail__tick"}
          href={`#${tick.id}`}
          style={{ top: `${tick.offset * 100}%` }}
        >
          <span className="rail__dot" aria-hidden="true" />
          <span className="rail__name">{tick.nav}</span>
        </a>
      ))}
    </nav>
  );
}
