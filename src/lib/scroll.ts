export interface ScrollState {
  /** Current scroll offset in px. */
  y: number;
  /** Viewport height in px. */
  vh: number;
  /** Largest possible scroll offset. */
  max: number;
  /** Whole-document progress, 0 → 1. */
  progress: number;
}

type Subscriber = (state: ScrollState) => void;

const subscribers = new Set<Subscriber>();
let queued = false;

function measure(): ScrollState {
  const y = window.scrollY;
  const vh = window.innerHeight;
  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  return { y, vh, max, progress: Math.min(1, Math.max(0, y / max)) };
}

function flush() {
  queued = false;
  const state = measure();
  paintStage(state);
  subscribers.forEach((subscriber) => subscriber(state));
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(flush);
}

let listening = false;

function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  document.addEventListener("load", schedule);
  schedule();
}

/**
 * Subscribe to coalesced scroll geometry. Returns an unsubscribe function.
 * The callback runs once immediately so subscribers paint the correct frame.
 */
export function subscribeScroll(subscriber: Subscriber): () => void {
  listen();
  subscribers.add(subscriber);
  subscriber(measure());
  return () => {
    subscribers.delete(subscriber);
  };
}

/** How far the viewport's focus line has travelled through an element, 0 → 1. */
export function elementProgress(rect: DOMRect, vh: number, focus = 0.55): number {
  const span = Math.max(1, rect.height);
  return Math.min(1, Math.max(0, (vh * focus - rect.top) / span));
}

/** Writes progress to a CSS custom property instead of React state. */
export function paintProgress(element: HTMLElement, value: number) {
  element.style.setProperty("--progress", value.toFixed(4));
}

/* --- scroll-linked stage ------------------------------------------------- */

const progressTargets = new Set<HTMLElement>();

/** Registers elements whose `--p` (0 → 1 as they cross the viewport) is painted. */
export function trackProgress(elements: HTMLElement[]): () => void {
  elements.forEach((element) => progressTargets.add(element));
  listen();
  return () => elements.forEach((element) => progressTargets.delete(element));
}

function passThrough(element: HTMLElement, vh: number): number {
  const rect = element.getBoundingClientRect();
  return Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh)));
}

function paintStage(state: ScrollState) {
  if (progressTargets.size === 0) return;

  // one read pass, then one write pass — no interleaved layout thrash
  const reads: [HTMLElement, number][] = [];
  progressTargets.forEach((element) => reads.push([element, passThrough(element, state.vh)]));
  reads.forEach(([element, value]) => element.style.setProperty("--p", value.toFixed(4)));

  document.documentElement.style.setProperty("--sy", String(Math.round(state.y)));
}
