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

## P1 — open: move KaTeX out of the global layout path

- Location: `src/layouts/Layout.astro`, `src/pages/blog/[...slug].astro`.
- Opportunity: the full KaTeX stylesheet is inherited by pages that contain no equations.
- Desired invariant: equation styling loads on equation-bearing article routes while ordinary pages keep only the site shell CSS.
- Verification: compare route stylesheet links and visual output for a normal page and a mathematical essay.

## P1 — open: prune repository test and draft weight

- Locations: `tests/visual/__screenshots__/` (~32 MB committed), `test-results/` (generated output), `drafts/`, and superseded `docs/superpowers/` plans.
- Opportunity: keep representative baselines and canonical source drafts; ignore transient results and archive or remove duplicate exports, `.DS_Store`, and superseded working plans after confirming they are no longer needed.
- Desired invariant: CI can recreate test results and exhibits from a clean checkout, while authored research and required visual baselines remain available.
- Safety: review current diffs before adding ignores or removing history.

## P1 — open: bring interactive visuals back onto semantic tokens

- Locations: `src/components/visual-engine/ui/UniverSpreadsheet.tsx`, `src/components/visuals/ml/regression/LinearRegressionMafs.tsx`, `src/components/visuals/ml/regression/LossParabolaObservable.tsx`.
- Opportunity: these files contain repeated raw palettes and Tailwind-era colors, so dark mode and the editorial language can drift from the rest of the site.
- Desired invariant: one semantic palette works in light and dark modes, without changing the explanatory meaning of positive, negative, and constraint states.

## P2 — open: reduce the linear-regression island cost only if it matters in field data

- Location: `LinearRegressionMafs.tsx` and `LossParabolaObservable.tsx`.
- Opportunity: the island combines Mafs, Observable Plot, and the spreadsheet into a roughly 549 KB chunk; each slope/point update rebuilds the sampled Plot curve.
- Sequence: measure real interaction cost first; then consider separating the spreadsheet, lazy-loading the plot, reducing plot dependencies, or updating an existing plot instead of recreating it.
- Desired invariant: the first meaningful interaction stays immediate and the three views remain synchronized.

## P2 — open: consolidate repeated OLS calculations

- Locations: `LinearRegressionMafs.tsx`, `UniverSpreadsheet.tsx`, `LossParabolaObservable.tsx`.
- Opportunity: SSR and prediction calculations are duplicated across three components.
- Desired invariant: one tested pure calculation module owns the math, reducing correctness drift more than bundle size.

## P3 — open: reconcile documentation and dead assets

- Locations: `docs/README.md`, `docs/authoring-workflow.md`, stale superseded plan references, and unreferenced public files such as `public/avatar.svg`, the unused Go logo variants, and `public/images/paged-attention-memory-module.webp`.
- Desired invariant: every documented path exists, every shipped asset has a known consumer, and historical material is clearly marked or moved out of the active path.

## P1 — open: preserve architecture connections on narrow screens

- Locations: `CodingAgentArchitecture.astro` and `AgentContextTopology.astro`.
- Observed during compact-page verification (2026-09-08): existing mobile styles stack nodes and hide connector layers below 640px. Desktop diagrams and exports retain the topology; narrow exports inherit the simplified stack.
- Desired invariant: small-screen presentation and downloads preserve supplied relationships without clipping. Address diagram responsiveness separately from the compact page wrapper.

## P2 — open: confirm long timeline downloads in the in-app browser

- Location: `DiagramExportBar.astro`, `/visuals/coding-timeline/`.
- Verification boundary (2026-09-08): architecture PNG files were downloaded and inspected in both themes. Timeline rendering returned to its idle state without a console error, but no downloaded file or download event was observed in the in-app browser. Blob delivery was also attempted; do not treat button text alone as proof of file delivery.
- Next check: reproduce in a normal browser and verify file delivery, image bounds, and omitted interaction controls before declaring the timeline export verified.
