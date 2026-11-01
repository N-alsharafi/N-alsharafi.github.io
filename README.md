# Personal Portfolio

Single-page scrollytelling portfolio for Nuh Al-Sharafi. The design is
hand-written: CSS custom properties, sticky reading rail, and a sticky project
index that tracks the step you are on. No component library, no CSS framework.

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
| `src/data/work.json` | Professional Experience entries |
| `src/data/education.json` | Education section (degree, GPA, rank, coursework) |
| `src/data/projects.json` | Featured Projects (sticky index) and the Project Archive table |
| `src/data/side-missions.json` | Side Missions |

`featured: true` on a project puts it in the scroll narrative as well as the archive.
Projects and roles carry `startDate`/`endDate`; `endDate: "Present"` means ongoing and
sorts ahead of finished work. The email is stored split (`emailUser` + `emailDomain`)
and assembled at runtime, so the address never appears literally in the bundle.

Sections in order: masthead, practice, experience, education, work, archive, missions,
contact. Their numbers and labels live in `src/lib/sections.ts`, which drives the top
bar, the reading rail and the scroll spy.

## Structure

```
src/
  App.tsx                 section order
  components/             one file per section, plus Prose / SectionHead
  lib/format.ts           ISO date formatting and sort comparators
  lib/reveal.ts           shared IntersectionObserver for the reveal animation
  lib/scroll.ts           coalesced scroll geometry (rAF), writes CSS variables
  lib/sections.ts         section registry used by the top bar and the rail
  lib/theme.ts            light/dark preference, persisted in localStorage
  index.css               tokens, layout, blocks
```

Motion is limited to one entrance animation and scroll-linked progress fills;
everything is disabled under `prefers-reduced-motion`.

## Building

```bash
npm run build      # → dist/ (also copies the suchedule submodule)
npm run typecheck
npm run lint
```
