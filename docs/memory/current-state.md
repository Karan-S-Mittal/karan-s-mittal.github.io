# Current State

Last reviewed: 2026-09-08

## Product and architecture

- Personal engineering studio built with Astro 6 in static-output mode.
- Published content lives in `src/content/blog/`; the collection currently builds seven non-draft essays.
- The site currently emits 60 static pages, including tag pages, essays, and the dedicated `/visuals/` directory.
- `src/styles/global.css` is the runtime token source of truth. Shared UI and exhibit primitives live under `src/components/`.
- Authoring skills: `diagram-craft` handles compact attributed visuals; `explanatory-studio` handles evidence-backed essays and routes visuals to the diagram skill. The skill is the workflow authority, `docs/diagram-framework.md` is a short component/composition reference, and `src/styles/global.css` owns runtime tokens. As of 2026-09-08:
  - **ASCII Blueprint First**: Authoring workflow requires drafting and reviewing an ASCII layout first before writing Astro code.
  - **Standalone Diagrams**: All standalone visuals in `src/components/diagram/` omit `<Exhibit />`, render background-less or on a clean white background (`var(--ie-surface)`), and enclose `<VisualAttribution />` (`karansmittal`) inside a standard rounded box (`var(--radius-card)`) with white background and dark text.
  - The site emits 60 static pages including `/visuals/claude-code-loop/`, `/visuals/codex-cloud-sandbox-loop/`, `/visuals/claude-code-harness/`, and `/visuals/coding-evolution/`.
- Visuals library (2026-09-08): `/visuals/` automatically discovers and lists all standalone visual routes (`src/pages/visuals/*.astro`) without manual registration. Exhibit numbering was removed, presenting a clean, quiet list with direct inspection links and 3× PNG export tags.
- React is intentionally limited to explanatory islands: the linear-regression explorer hydrates with `client:visible`.
- Editable paged-attention SVG sources live in `src/components/diagram/paged-attention/Excalidraw*.astro`. `scripts/render-exhibits.js` rasterizes the registered sources into ignored `public/generated/exhibits/*.webp` files during the prebuild.

## Verification baseline

- `npm run studio:check` passes; it scanned 101 source files on the last review.
- `npm run build` passes; the static build completed in about 5.3 seconds (60 static routes emitted).
- Visual regression covers representative layout families at mobile, tablet, and desktop widths, plus a route-level layout contract.
- Always inspect `git status` before editing; the repository may be used with an in-progress design-system repair or other user-owned work.

## Known performance shape

- The ordinary site is static HTML and small route CSS. The largest global stylesheet emitted in the last build was about 49 KB.
- The linear-regression React island emitted a roughly 549 KB client chunk because Mafs, Observable Plot, and the spreadsheet explorer share one interactive boundary.
- KaTeX CSS is imported from `src/layouts/Layout.astro`, so its full stylesheet is currently part of the global layout path even on pages without equations.

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
