---
name: diagram-craft
description: Turn a supplied sketch, Mermaid flow, or plain-language system description into a token-compliant Astro diagram component for Karan Mittal's studio, verified in light and dark mode.
---

# Diagrams for Karan Mittal

Take the supplied flow and build a finished visual. Choose sensible defaults and proceed; ask only when missing information changes the meaning.

## What you deliver

One reusable Astro component under `src/components/diagram/`, grouped by topic when it belongs to an essay:

```
src/components/diagram/<topic>/<DiagramName>.astro
```

The essay imports it and captions it with a plain figure:

```astro
import DiagramName from '../../components/diagram/<topic>/<DiagramName>.astro';

<figure>
  <DiagramName />
  <figcaption>
    A useful decomposition of responsibilities, not a claim that every hosting
    platform implements four identical services.
  </figcaption>
</figure>
```

There are no standalone diagram pages and no `<Exhibit>` wrapper. `/diagrams/`, `/visuals/`, and `VisualPage.astro` went in 812969a; `Exhibit.astro` and `VisualAttribution.astro` went with the site's only essay. Do not recreate them reflexively — build figure chrome only if a specific essay needs it. A diagram earns its place inside an essay.

**The repository currently contains no reference diagram.** Both prior implementations were deleted. Read `src/styles/global.css` for the tokens and follow the geometry rules below rather than looking for an existing component to copy.

## Workflow: ASCII blueprint first

1. **Draft a block schematic** in box-drawing ASCII: nodes, relationships, and direction only. No category banners, method tags, or explanatory headers inside the diagram.
2. **Review it with the author.** Align on topology, labels, junctions, and semantic tokens before generating code.
3. **Build the component** from the approved blueprint.

## Draw it

Preserve the supplied nodes, relationships, direction, and meaning. Shorten labels without silently dropping steps. Pick the simplest composition that works: flow, layered architecture, timeline, or comparison.

**Block focus.** The canvas starts directly with the top-level blocks. No inner headers, subtitles, category meta-badges, substrate banners, or runtime footers — the `<figcaption>` and the surrounding prose supply the title and context.

**Text discipline.** Keep text inside blocks punchy and high-signal: single-line tags, tokens, or chips, never paragraphs. Stop inline `<code>` badges from wrapping with `code { white-space: nowrap; }`.

**Icons, never emoji.** Emoji break visual discipline and dark-mode contrast.
- Monoline glyphs: `@lucide/astro`, `stroke-width={1.5}`, `currentColor`, 14–16px.
- Vendor marks: `src/components/diagram/icons/BrandIcon.astro`.
- Find either with `npm run icon <keyword>` — flags `-b` (brand), `-l` (lucide), `-e` (exact), `-n <limit>`.

**Typography.** `var(--font-diagram)` for node titles, descriptions, and labels. `var(--font-mono)` for metrics, code tokens, and tags. Sizes from the `--ie-type-*` scale. Never a serif heading inside a diagram.

**Color.** Every color resolves through `var(--ie-*)` or `var(--brand-*)`. `npm run build` fails on a raw hex in `src/components/diagram/**`, and a hex would not survive the theme switch anyway. If you need a color no token provides, add it to both the light and dark blocks of `src/styles/global.css` first.

| Role | Token |
| --- | --- |
| Canvas / surface / raised | `--ie-canvas`, `--ie-surface`, `--ie-surface-raised` |
| Text hierarchy | `--ie-ink`, `--ie-ink-secondary`, `--ie-muted` |
| Boundaries | `--ie-rule`, `--ie-rule-strong` |
| Active flow, emphasis | `--ie-blue` |
| Confirmed / verified state | `--ie-verified` |
| Constraint, caveat, failure | `--ie-rust` |

`--ie-blue` is the accent slot, not a literal hue — it currently resolves to amber. Name the token, never the color you see.

At most **one** rust constraint node per diagram: the human gate, the budget threshold, the thing that actually binds.

**Connectors.**
- 1.5px strokes, stealth blueprint arrowheads, tidy bends, rounded fillets (R=10–14px).
- Arrowhead markers: 8×8 viewBox, `refX="7"` (or `6.5`), `refY="4"`, `markerWidth="6"`, `markerHeight="6"`, `stroke-width="1.5"`, round caps and joins. Compute coordinates so tips snap to node borders without clipping or gaps.
- Labels on arrows sit on an opaque chip so the line never runs through the text: `background: var(--ie-surface)`, `border: 1px solid var(--ie-rule-strong)`, `color: var(--ie-ink)`, `font-size: 0.6875rem`, `font-weight: 600`. Never faint muted text, never sub-10px. (This is the one place a bordered chip is allowed — it is legibility, not decoration. Page UI carries none.)
- T-junction pins (`r="3"`) only at real splits and merges.
- Allow 70–80px minimum for horizontal bridge labels. Align downward bus branches to the exact centers of the columns below.

**Canvas.** Transparent or a clean `var(--ie-surface)` plane, with no frame, badge, or inner header. Mark interaction-only controls `data-export-ignore`.

**Accessibility.** Every diagram needs a text explanation — the `<figcaption>` or surrounding prose. No meaning carried by color alone.

## Verify before delivering

1. `npm run build` — runs `studio:check`, which fails on raw hex and unbundled fonts in `src/components/diagram/**`.
2. `npm run shot <route> [selector]` — writes light and dark screenshots to `test-results/`. Frame the figure to inspect it closely:
   ```
   npm run shot /writing/<slug>/ "figure"
   ```
3. **Read both PNGs.** Check label legibility, no clipped or overlapping text, complete connector paths, correct branch alignment, and that hierarchy survives the theme flip.
4. Report the component path and what you verified.

Runtime tokens live in `src/styles/global.css`. This skill is the delivery source of truth — do not write a second diagram specification that can drift from it.
