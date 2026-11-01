/**
 * Scroll stage.
 *
 * One rAF loop turns scroll geometry into CSS custom properties; nothing here
 * re-renders React, so every staged effect stays on the compositor.
 *
 *   [data-scene]  a pinned act        --sp          0 -> 1 across its pinned range
 *   [data-step]   a staged element    --in / --out  0 -> 1 across its window
 *
 * `html.is-staged` is only added when the visitor allows motion, so the act
 * layouts are opt-in: without it scenes fall back to document flow and every
 * step keeps its `--in: 1` default.
 */

export interface ScrollState {
  /** Current scroll offset in px. */
  y: number;
  /** Viewport height in px. */
  vh: number;
  /** Largest possible scroll offset. */
  max: number;
  /** Whole-document progress, 0 -> 1. */
  progress: number;
}

type Subscriber = (state: ScrollState) => void;

interface Step {
  el: HTMLElement;
  start: number;
  end: number;
  fade: number;
  paintedIn: number;
  paintedOut: number;
}

interface Scene {
  el: HTMLElement;
  steps: Step[];
  /** Document offset of the scene's top edge, in px. */
  top: number;
  /** Scroll distance the stage stays pinned for, in px. */
  span: number;
  painted: number;
}

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const smooth = (t: number) => t * t * (3 - 2 * t);

const scenes: Scene[] = [];
const subscribers = new Set<Subscriber>();
let queued = false;
let listening = false;

function geometry(): ScrollState {
  const y = window.scrollY;
  const vh = window.innerHeight;
  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  return { y, vh, max, progress: clamp01(y / max) };
}

/**
 * A step's window in scene progress. `data-at="0.2,0.5"` is explicit;
 * `data-at="0.2-"` never exits, `data-at="-,0.5"` is already there when the
 * act pins. Without one, steps share the scene in document order.
 */
function windowOf(el: HTMLElement, index: number, count: number): [number, number] {
  const raw = el.dataset.at;
  if (raw !== undefined) {
    const [from, to] = raw.split(",");
    const open = (value: string | undefined) => value === undefined || value === "" || value === "-";
    const num = (value: string) => Number(value.replace(/-+$/, ""));
    const start = open(from) ? -1 : num(from);
    const end = open(to) ? 1.25 : num(to);
    if (Number.isFinite(start) && Number.isFinite(end)) return [start, end];
  }
  const slot = 0.84 / Math.max(1, count);
  const start = 0.08 + index * slot;
  return [start, start + slot * 1.2];
}

function collect(scene: Scene) {
  const nodes = Array.from(scene.el.querySelectorAll<HTMLElement>("[data-step]"));
  scene.steps = nodes.map((el, index) => {
    const [start, end] = windowOf(el, index, nodes.length);
    const fade = Number(el.dataset.fade);
    return {
      el,
      start,
      end,
      fade: Number.isFinite(fade) && fade > 0 ? fade : 0.09,
      paintedIn: -1,
      paintedOut: -1,
    };
  });
}

function measure() {
  const y = window.scrollY;
  const vh = window.innerHeight;
  scenes.forEach((scene) => {
    const rect = scene.el.getBoundingClientRect();
    scene.top = y + rect.top;
    scene.span = Math.max(1, rect.height - vh);
    scene.painted = -1;
  });
}

function paint() {
  queued = false;
  const { y, vh, max, progress } = geometry();

  if (document.documentElement.classList.contains("is-staged")) {
    for (const scene of scenes) {
      if (y + vh < scene.top || y > scene.top + scene.span + vh) continue;

      const p = clamp01((y - scene.top) / scene.span);
      if (Math.abs(p - scene.painted) > 0.0003) {
        scene.el.style.setProperty("--sp", p.toFixed(4));
        scene.painted = p;
      }

      for (const step of scene.steps) {
        const enter = smooth(clamp01((p - step.start) / step.fade));
        const exit = smooth(clamp01((p - step.end) / step.fade));
        if (Math.abs(enter - step.paintedIn) > 0.002) {
          step.el.style.setProperty("--in", enter.toFixed(3));
          step.paintedIn = enter;
        }
        if (Math.abs(exit - step.paintedOut) > 0.002) {
          step.el.style.setProperty("--out", exit.toFixed(3));
          step.paintedOut = exit;
        }
      }
    }
  }

  const state: ScrollState = { y, vh, max, progress };
  subscribers.forEach((subscriber) => subscriber(state));
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(paint);
}

function onResize() {
  measure();
  schedule();
}

function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("pageshow", onResize);
  schedule();
}

/** Shared scroll signal. Returns an unsubscribe function. */
export function subscribeScroll(subscriber: Subscriber): () => void {
  listen();
  subscribers.add(subscriber);
  subscriber(geometry());
  return () => {
    subscribers.delete(subscriber);
  };
}

/** How far the viewport's focus line has travelled through an element, 0 -> 1. */
export function elementProgress(rect: DOMRect, vh: number, focus = 0.55): number {
  const span = Math.max(1, rect.height);
  return clamp01((vh * focus - rect.top) / span);
}

/** Writes progress to a CSS custom property instead of React state. */
export function paintProgress(element: HTMLElement, value: number) {
  element.style.setProperty("--progress", value.toFixed(4));
}

/**
 * `data-at` window for item `index` of `count` sharing one scene, so the
 * window boundaries line up with `activeIndex` below.
 */
export function at(index: number, count: number, from = 0, to = 1): string {
  return `${((index + from) / count).toFixed(4)},${((index + to) / count).toFixed(4)}`;
}

/**
 * The same, for a run of items that take turns: the first is already on stage
 * when the act pins, because a sequence's opening frame should not be empty.
 */
export function seq(index: number, count: number, fade = 0.06): string {
  const start = index === 0 ? -fade : index / count;
  return `${start.toFixed(4)},${((index + 1) / count).toFixed(4)}`;
}

/** The item currently occupying the stage, using live geometry. */
export function activeIndex(el: HTMLElement, count: number, vh: number): number {
  if (count < 2) return 0;
  const rect = el.getBoundingClientRect();
  const span = Math.max(1, rect.height - vh);
  const p = clamp01(-rect.top / span);
  return Math.min(count - 1, Math.floor(p * count + 0.000001));
}

/**
 * Starts the stage: marks the document as staged, collects scenes and keeps the
 * pinned acts in sync with the scroll. Returns a teardown.
 */
export function initStage(): () => void {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  let observer: ResizeObserver | null = null;

  const start = () => {
    document.documentElement.classList.add("is-staged");

    scenes.length = 0;
    document.querySelectorAll<HTMLElement>("[data-scene]").forEach((el) => {
      const scene: Scene = { el, steps: [], top: 0, span: 1, painted: -1 };
      collect(scene);
      scenes.push(scene);
    });

    measure();
    if (!observer) observer = new ResizeObserver(onResize);
    observer.observe(document.body);
    document.fonts.ready.then(onResize).catch(() => undefined);
    schedule();
  };

  const stop = () => {
    document.documentElement.classList.remove("is-staged");
    observer?.disconnect();
    observer = null;
    scenes.forEach((scene) => {
      scene.el.style.removeProperty("--sp");
      scene.steps.forEach((step) => {
        step.el.style.removeProperty("--in");
        step.el.style.removeProperty("--out");
      });
    });
    scenes.length = 0;
  };

  const sync = () => {
    if (query.matches) stop();
    else start();
  };

  listen();
  sync();
  query.addEventListener("change", sync);

  return () => {
    query.removeEventListener("change", sync);
    stop();
  };
}
