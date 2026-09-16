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

- Locations: `drafts/`, superseded `docs/superpowers/` plans, and dead binary assets.
- Verified on 2026-09-17: Removed stale `docs/superpowers/`, duplicate `drafts/xgboost-series/`, and binary `.docx`/section slices from `drafts/kimi-data-outgrows-tools/`. Canonical Markdown drafts preserved.

## P1 — open: bring interactive visuals back onto semantic tokens

- Locations: `src/components/visual-engine/ui/UniverSpreadsheet.tsx`, `src/components/visuals/ml/regression/LinearRegressionMafs.tsx`, `src/components/visuals/ml/regression/LossParabolaObservable.tsx`.
- Opportunity: these files contain repeated raw palettes and Tailwind-era colors, so dark mode and the editorial language can drift from the rest of the site.
- Desired invariant: one semantic palette works in light and dark modes, without changing the explanatory meaning of positive, negative, and constraint states.

## P2 — open: reduce the linear-regression island cost only if it matters in field data

- Location: `LinearRegressionMafs.tsx` and `LossParabolaObservable.tsx`.
- Opportunity: the island combines Mafs, Observable Plot, and the spreadsheet into a roughly 549 KB chunk; each slope/point update rebuilds the sampled Plot curve.
- Sequence: measure real interaction cost first; then consider separating the spreadsheet, lazy-loading the plot, reducing plot dependencies, or updating an existing plot instead of recreating it.
- Desired invariant: the first meaningful interaction stays immediate and the three views remain synchronized.

## P2 — done: consolidate repeated OLS calculations
 
- Locations: `LinearRegressionMafs.tsx`, `UniverSpreadsheet.tsx`, `LossParabolaObservable.tsx`, `src/utils/ols.ts`.
- Verified on 2026-09-11: Consolidated into pure, unit-tested module `src/utils/ols.ts` (`tests/ols.test.mjs`). All three components consume shared OLS and regression statistics.

## P3 — done: reconcile documentation and dead assets

- Locations: `docs/README.md`, unreferenced public assets (`public/avatar.svg`, `public/images/go/`, `public/images/paged-attention-memory-module.webp`), stale `docs/instrumented-editorial.md` and `docs/studio-engine.md`, and `.kimi/skills/`.
- Verified on 2026-09-17: Removed all unreferenced assets, deleted stale docs, updated `docs/README.md` to reference live files (`_template.mdx`), and deleted duplicate Kimi skills.

## P1 — open: preserve architecture connections on narrow screens

- Locations: `CodingAgentArchitecture.astro` and `AgentContextTopology.astro`.
- Observed during compact-page verification (2026-09-08): existing mobile styles stack nodes and hide connector layers below 640px. Desktop diagrams and exports retain the topology; narrow exports inherit the simplified stack.
- Desired invariant: small-screen presentation and downloads preserve supplied relationships without clipping. Address diagram responsiveness separately from the compact page wrapper.

## P2 — open: confirm long timeline downloads in the in-app browser

- Location: `DiagramExportBar.astro`, `/visuals/coding-timeline/`.
- Verification boundary (2026-09-08): architecture PNG files were downloaded and inspected in both themes. Timeline rendering returned to its idle state without a console error, but no downloaded file or download event was observed in the in-app browser. Blob delivery was also attempted; do not treat button text alone as proof of file delivery.
- Next check: reproduce in a normal browser and verify file delivery, image bounds, and omitted interaction controls before declaring the timeline export verified.
