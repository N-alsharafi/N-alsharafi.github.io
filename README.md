# Personal Portfolio

Scrollytelling portfolio for Nuh Al-Sharafi, built as a **stage**: every act pins
one full-viewport frame and its content changes in place as you scroll, instead of
scrolling past. The design is hand-written — CSS custom properties, a sticky
reading rail, and one `requestAnimationFrame` loop that turns scroll position into
three numbers. No component library, no CSS framework.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:8080
```

## Content

All copy lives in JSON — edit these and the UI follows:

| File | Drives |
|---|---|
| `src/data/site.json` | name, roles, intro, profile links, "What I Do", colophon |
| `src/data/work.json` | Professional Experience cards |
| `src/data/education.json` | Education act (degree, GPA, rank, coursework) |
| `src/data/projects.json` | the featured acts and the archive contact sheet |
| `src/data/side-missions.json` | Side Missions |

`featured: true` on a project puts it in the featured act as well as the archive.
Projects and roles carry `startDate`/`endDate`; `endDate: "Present"` means ongoing and
sorts ahead of finished work. The email is stored split (`emailUser` + `emailDomain`)
and assembled at runtime, so the address never appears literally in the bundle.

Acts in order: masthead, practice, experience, education, work (featured), archive,
missions, contact. Their numbers and labels live in `src/lib/sections.ts`, which drives
the top bar, the reading rail and the scroll spy.

## The stage

`src/lib/stage.ts` is the whole motion system. One rAF loop reads scroll geometry and
writes CSS custom properties; nothing it does triggers a React render, so every effect
stays on the compositor.

| Attribute | Written | Meaning |
|---|---|---|
| `[data-scene]` | `--sp` | `0 → 1` across the act's pinned range (`--len` sets its length) |
| `[data-step]` | `--in`, `--out` | `0 → 1` as the step enters and leaves its window |

Windows are declarative: `data-at="0.2,0.5"` is explicit, `data-at="-,0.6"` is already
on stage when the act pins, `data-at="0.4-"` never leaves. `at()` and `seq()` in
`stage.ts` generate windows for items that take turns, and the first item of a sequence
starts early so an act never opens on an empty frame.

Effects are CSS only, composed from those numbers with `data-fx` tokens — `rise`,
`left`, `right`, `push`, `zoom`, `wipe`, `cut`, `char`, `cascade` — plus per-act
mechanics: the contact sheet's rows position themselves from `--j` against a fixed
light line, the film counter rolls its digits the same way, the featured act
inverts the palette and wipes each chapter in like a shutter, and each chapter
carries a plate drawn from the project's own tag glyphs.

Two composition rules keep a pinned frame from reading as a fragment floating in
it. Where a run is short (practice, missions) the items *stand in the frame* and
the scroll only moves the light down the list, with an opacity floor so nothing is
hidden; where it is long (experience) a standing index on the left points at the
item on the right. Anything that leaves a frame does so only after something else
has replaced it — the masthead's name and portrait hold for the whole act.

Two details worth keeping in mind when editing:

- `html.is-staged` is added only when the visitor allows motion. Without it (reduced
  motion, or before the engine runs) the acts are plain document flow, every step keeps
  its `--in: 1` default, and the subtractive layouts in `index.css` do not apply.
- A colour read by inheritance resolves where it is *declared*, so the featured act
  states its own `color` — redefining `--ink` alone would not reach its children.

Measured over a full-page scroll at 1440×900: median frame 16.7 ms, p95 16.7 ms, worst
16.8 ms, none above 32 ms.

## Structure

```
src/
  App.tsx                 act order, scroll spy, one initStage() call
  components/Scene.tsx    one act: pinned stage, header, progress rule
  components/             one file per act, plus Prose / Glyph
  lib/format.ts           ISO date formatting and sort comparators
  lib/glyphs.ts           hand-drawn line glyphs, one per tag family
  lib/stage.ts            the rAF loop, scene/step windows, scroll signal
  lib/sections.ts         act registry used by the top bar and the rail
  lib/theme.ts            light/dark preference, persisted in localStorage
  index.css               tokens, base, primitives, chrome, stage, acts
```

## Building

```bash
npm run build      # → dist/ (also copies the suchedule submodule)
npm run typecheck
npm run lint
```

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages.
