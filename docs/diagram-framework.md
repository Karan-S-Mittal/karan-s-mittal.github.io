# Diagram reference

The short [diagram-craft skill](../.agents/skills/diagram-craft/SKILL.md) owns the authoring and delivery workflow. This file is a small reference for choosing a composition and finding existing code.

## Choose the shape that explains the mechanism

| Content | Useful composition |
| --- | --- |
| Components and dependencies | Layered architecture with explicit system boundaries |
| Ordered steps or decisions | Flow with labeled branches |
| Events over time | Timeline; aligned tracks for comparison |
| Memory or storage | Uniform slots with indices and before/after state |
| Trade-offs or measurements | Comparable axes with units and source conditions |

Keep an entity's label and semantic encoding consistent across figures. Explain complex mechanisms in stages only when that improves understanding. Do not force every visual into a multi-step narrative or fixed node budget.

## Reuse the existing pieces

- [`Exhibit.astro`](../src/components/editorial/Exhibit.astro): title, frame, and accessible caption.
- [`VisualAttribution.astro`](../src/components/diagram/VisualAttribution.astro): the `karansmittal` wordmark inside the artwork.
- [`VisualPage.astro`](../src/layouts/VisualPage.astro): small download page with theme controls.
- [`DiagramExportBar.astro`](../src/components/diagram/DiagramExportBar.astro): 3× PNG pixel resolution; interaction-only controls use `data-export-ignore`.
- [`BrandIcon.astro`](../src/components/diagram/icons/BrandIcon.astro): supported technology logos and system glyphs.
- `@lucide/astro`: 1,400+ monoline system icons (`stroke-width={1.5}`, `currentColor`).
- `npm run icon <keyword>`: CLI search tool to find and copy vector icons immediately.
- Online directories: [lucide.dev/icons](https://lucide.dev/icons) and [simpleicons.org](https://simpleicons.org).
- [`CodingAgentArchitecture.astro`](../src/components/diagram/CodingAgentArchitecture.astro) and [`CodingTimelineComparison.astro`](../src/components/diagram/CodingTimelineComparison.astro): composition references, not boilerplate to copy wholesale.

Runtime colors and type tokens come from [`global.css`](../src/styles/global.css); broader visual semantics live in [`design-language.md`](design-language.md). Use Inter for diagram labels and IBM Plex Mono for metrics/code as specified in `AGENTS.md`.

## Geometry that survives export

Route connections around unrelated nodes and labels. Use 1.5px strokes, clear arrowheads, and rounded bends where useful. Put junction pins only at true splits or merges. Place explanatory callouts in available margin space.

Check label size after scaling, not only inside the source SVG. Inspect the actual exported image for clipping, missing paths, and the author signature. Attribution identifies the author; it is not tamper protection. Pixel resolution is not a print-DPI guarantee.

The individual download page is also the inspection surface. No extra preview page, mandatory showroom registration, or duplicate diagram markup is needed for blog use.

Keep visible text about the diagram’s subject. Omit design-method labels such as “C4 Topology” or “IEEE 315 Bus Grammar” unless they are the requested subject.
