# Optimization and Pruning Backlog

Status values: `open`, `in progress`, `blocked`, `done`. Do not delete an artifact until its references and regeneration path have been checked.

## P0 — done: repair the mobile overflow

- Location: `/blog/deterministic-rag-intro/`; evidence in the recorded Playwright error context.
- Desired invariant: every generated route has zero horizontal overflow at the mobile viewport.
- Verification: targeted Playwright mobile route contract passed for all 50 routes on 2026-09-05.

## P1 — open: add evidence from representative organisational work

- Locations: `src/pages/work.astro`, homepage selected work, and future case studies.
- Next input: Karan’s choice of 2–3 projects, his specific contribution, the problem and constraints, observed results, and any approved public links or anonymised details.
- Current public examples are the independent studio implementation and documented teaching events. Additional LinkedIn activity should be added from specific event records, recordings, or supplied links; the existing list is a selection, not a complete career record.
- Desired invariant: every claimed outcome can be traced to evidence, and independent projects, workshops, and client work are identified accurately.

## P2 — open: evaluate enquiry quality after publication

- Desired outcome: assess relevant business conversations and engagements, rather than page traffic alone.
- Start with an aggregate monthly record of relevant enquiries, how people found the site, the problem they brought, and whether a useful conversation or engagement followed. Keep personal lead details outside repository memory.
- No tracking service is configured by this positioning change. Add analytics only for a defined measurement question and an agreed service.

## P1 — done: move KaTeX out of the global layout path

- Location: `src/layouts/Layout.astro`, `src/pages/blog/[...slug].astro`.
- Verified on 2026-09-11: KaTeX CSS removed from `Layout.astro` and scoped specifically to `src/pages/blog/[...slug].astro`. Non-math landing pages no longer load KaTeX stylesheets.

## P1 — done: prune repository test and draft weight

- Locations: `drafts/`, `public/images/`, `public/templates/`, `Excalidraw/`.
- Verified on 2026-09-20: Deleted obsolete `drafts/kimi-data-outgrows-tools/`, deleted `public/images/blog/` (.webp hero images), deleted `public/templates/` and `Excalidraw/` to maintain a 100% code-only repository.

## P1 — done: purge orphaned diagram components and decommission case studies

- Locations: `src/components/diagram/`, `src/pages/case-studies/`, `src/components/editorial/`, `src/components/content/HeroTelemetryWorkbench.astro`.
- Verified on 2026-09-20: Purged 28 orphaned diagram components (`go-runtime/`, `paged-attention/`, `rag/`, `xgboost/`, and unused agent diagrams). Deleted `/case-studies/` and 6 legacy editorial helpers (`DarkPlane`, `TintedPlane`, `MetaLabel`, `EvidenceObject`, `ArchitectureAnnotation`, `SectionBreak`). Realigned `work.astro`.

## P2 — done: consolidate and purge OLS calculations

- Locations: `src/utils/ols.ts`, `tests/ols.test.mjs`, `package.json`.
- Verified on 2026-09-20: OLS module and unit test deleted following removal of the linear-regression island. `npm test` streamlined to `npm run studio:check`. Visual tests updated for active static routes.

## P3 — done: reconcile documentation and dead assets

- Locations: `AGENTS.md`, `docs/README.md`, `docs/design-language.md`, `docs/authoring-workflow.md`.
- Verified on 2026-09-20: Fixed dangling links to deleted `instrumented-editorial.md` and Excalidraw templates; documented pure code-first diagram authoring.
