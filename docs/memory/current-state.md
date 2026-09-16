# Current State

Last reviewed: 2026-09-17

## Product and architecture

- Personal engineering studio built with Astro 6 in static-output mode.
- Published content lives in `src/content/blog/`; the collection currently builds seven non-draft essays.
- The site emits static pages, tag pages, essays, and the dedicated `/visuals/` directory.
- `src/styles/global.css` is the runtime token source of truth. Shared UI and exhibit primitives live under `src/components/`.
- As of 2026-09-17:
  - **Single Trunk (`main`)**: The repository operates strictly on `main`. Autonomous coding agents must never spawn side branches.
  - **Display Typography**: Standardized on `@fontsource/plus-jakarta-sans` (`var(--font-display)`) across all display headings (`h1`, `h2`, `h3`), hero titles, and diagram headers, paired with `IBM Plex Sans` (body), `Inter` (diagram labels), and `IBM Plex Mono` (instrument readouts).
  - **Mechanistic Primitives**: Added `<MemoryGrid />` (Distill-style proportional memory frames and tensor strides) and `<StepScrubber />` (Ciechanowski-style zero-overhead step controller) under `src/components/diagram/primitives/`.
  - **Tufte Data-Ink Rule**: Pruned nested card borders in favor of hairline rules (`--ie-rule`) and direct leader annotations.
- Authoring skills: `diagram-craft` handles compact attributed visuals; `explanatory-studio` handles evidence-backed essays.
- React is intentionally limited to explanatory islands: the linear-regression explorer hydrates with `client:visible`.

## Verification baseline

- Single trunk `main` clean. Always commit directly to `main`.

## Known performance shape

- The ordinary site is static HTML and small route CSS. The largest global stylesheet emitted in the last build was about 49 KB.
- The linear-regression React island emitted a roughly 549 KB client chunk because Mafs, Observable Plot, and the spreadsheet explorer share one interactive boundary.
- As of 2026-09-11, KaTeX CSS is scoped strictly to `src/pages/blog/[...slug].astro`, removing math stylesheet and font payload from all non-mathematical pages.
- Closed-form OLS regression calculations are centralized in `src/utils/ols.ts` and verified by `tests/ols.test.mjs` (`npm test`).

## Correctness note

- A previously recorded error context reported 12 px horizontal overflow on mobile `/blog/deterministic-rag-intro/`. The targeted mobile route-contract test was re-run on 2026-09-05 and passed for all 50 generated routes; treat that old artifact as stale unless a new run reproduces it.

## Positioning and enquiry flow — 2026-09-05

- The professional anchor is an engineer-scientist who solves organisational problems by building systems people can rely on. Lead with the problem and useful outcome; technical specialisms support this identity.
- Home now presents recognisable problems, a public implementation study, engagement options, selected writing, documented events, and a personal introduction. Work distinguishes public contributions from proposed engagements.
- Shared engagement copy lives in `src/data/practice.ts`, rendered by `EngagementList.astro`; the commercial pages share `src/styles/practice.css`.
- `/case-studies/explanatory-studio/` documents the existing independent publication and regression explorer with source links pinned to the implementation revision. The older Soft Architecture case study remains an archive.
- About includes an anchored community section; Contact explains the first note and next steps, keeps the existing Tally form, and offers direct email above the form. The external form uses a fixed light surface because its text styling is independent of the site theme.
- `tests/visual/practice.spec.ts` follows the public-work → engagements → contact journey at 375px and 1440px without submitting a form. Existing route-contract checks cover all 50 routes at three widths; the homepage theme smoke check passes.
- Implementation is local and reviewable; publication still follows the repository’s GitHub Pages workflow. No new hosting provider or analytics service was introduced.
