import { useRef, useEffect, type CSSProperties } from "react";

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer?.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
  }
  return observer;
}

/**
 * Observes every [data-reveal] element in the returned ref's subtree, plus the
 * root itself, adding `is-in` once. Re-scans when `key` changes.
 */
export function useRevealGroup<T extends HTMLElement>(key?: unknown) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (root.hasAttribute("data-reveal")) targets.push(root);

    const io = getObserver();
    if (!io) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    targets.forEach((el) => io.observe(el));
    return () => targets.forEach((el) => io.unobserve(el));
  }, [key]);

  return ref;
}

/** Stagger index consumed by the CSS reveal delay. */
export const revealDelay = (index: number) => ({ "--d": index }) as CSSProperties;
