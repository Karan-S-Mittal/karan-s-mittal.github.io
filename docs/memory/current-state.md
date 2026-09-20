# Current State

Last reviewed: 2026-09-17

## Product and architecture

- Personal engineering studio built with Astro 6 in static-output mode.
- Published content lives in `src/content/blog/`; the collection currently builds seven non-draft essays.
- The site emits static pages, tag pages, essays, and the dedicated `/visuals/` directory.
- `src/styles/global.css` is the runtime token source of truth. Shared UI and exhibit primitives live under `src/components/`.
- As of 2026-09-20:
  - **Single Trunk (`main`)**: The repository operates strictly on `main`. Autonomous coding agents must never spawn side branches.
  - **Complete Minimal Repository Pruning**:
    - Purged all 28 orphaned diagram components (`go-runtime/`, `paged-attention/`, `rag/`, `xgboost/`, and the 9 unused agent/coding assistant diagrams).
    - Removed `/case-studies/` route (`explanatory-studio.astro` and `soft-architecture.astro`) and deleted 6 legacy soft-architecture helper components (`DarkPlane`, `TintedPlane`, `MetaLabel`, `ArchitectureAnnotation`, `EvidenceObject`, `SectionBreak`).
    - Streamlined `src/pages/work.astro` to focus on public sessions and direct client engagements.
    - Cleaned out all dead static assets (`public/images/`, `public/visuals/`, `public/templates/`), `Excalidraw/`, and `drafts/`.
    - Removed dead OLS math utilities (`src/utils/ols.ts`) and unit test (`tests/ols.test.mjs`), streamlining `npm test` to `npm run studio:check`.
    - Updated `tests/visual/` Playwright test suite to target only active routes.
    - Updated `src/pages/visuals/index.astro` to a clean empty state with no stale metadata.
  - **Modern Version Control Deep-Dive**: Authored `src/content/blog/exploring-version-control.mdx` (`draft: true`) breaking down raw Git vs developer platforms, SCM Merkle DAGs, the 4-tier platform stack, multi-platform sovereignty trade-offs (GitHub, GitLab, Codeberg, Forgejo, SourceHut), 3-way code review topologies (Branch PR vs Stacked Changes vs Patch-over-email), CI/CD runner execution & OCI isolation, hypervisor SMT vCPU cache contention, and decoupled ephemeral storage.
  - **New Diagram Exhibits**: Added `PlatformStackHierarchy.astro` (Exhibit 01) and `CodeReviewTopologies.astro` (Exhibit 02) under `src/components/diagram/version-control/` — 100% token compliant with Soft Architecture grammar.
  - **Universal Diagram Verification & 100% Token Compliance**: Automated via `scripts/studio-check.js` (runs on `npm test` and `npm run prebuild`).
- Authoring skills: `diagram-craft` handles compact attributed visuals; `explanatory-studio` handles evidence-backed essays.

## Verification baseline

- Single trunk `main` clean. Always commit directly to `main`.
- `npm test` runs `studio:check`.
- Full production build verified via `npm run build`.

## Known performance shape

- The ordinary site is static HTML and small route CSS.
- KaTeX CSS is scoped strictly to `src/pages/blog/[...slug].astro`, removing math stylesheet and font payload from all non-mathematical pages.

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
