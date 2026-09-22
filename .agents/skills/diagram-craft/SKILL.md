---
name: diagram-craft
description: Turn a supplied sketch, Mermaid flow, or plain-language system description into an Apple-style, token-compliant Astro/SVG figure for Karan Mittal's site (soft borderless tiles, hairline connectors, one blue active path), verified in light, dark and phone widths. Use for homepage figures and essay figures.
---

# Figures for Karan Mittal

Take the supplied flow and build a finished figure in the house style. Choose sensible defaults and proceed; ask only when missing information would change the meaning. Page-level rules (tokens, type, controls) live in the sibling [site-design skill](../site-design/SKILL.md).

## The look: Apple-inspired

Think of an apple.com feature diagram: calm tiles on a clean field, thin lines, one path that matters highlighted, and nothing else competing for attention.

- **Tiles:** borderless rounded rectangles filled with `--ie-surface-raised`, radius 12–14 (10 for small figures). No strokes, shadows or gradients.
- **The path that matters:** tiles on it use `--ie-blue-soft` and its connectors use `--ie-blue`. Everything off the path stays grey, and its labels drop to `--ie-muted` at weight 400.
- **Successful end state:** `--ie-verified-soft` tile with a `--ie-verified` label, or a small check glyph (`.dg-check`) beside a line of text.
- **Failure branch:** `--ie-rust-soft` tile with a `--ie-rust` label and a rust connector. Use **at most one** per figure.
- **Connectors:** 1.5px, round caps and joins, and rounded bends (quadratic corners, r ≈ 6–7). Grey (`--ie-rule-strong`) by default. Arrowheads are small open chevrons, used only where the direction isn't already obvious. No junction pins and no bordered label chips.
- **Labels:** `--font-diagram` (Inter). Titles at weight 600 in `--ie-ink`, 14–15px in viewBox units. Sub-labels at weight 400 in `--ie-muted`, 13px. Branch labels sit as plain muted text beside the line. Keep them to one or two words; no paragraphs and no emoji.
- **No chrome inside the canvas:** no inner headers, category badges, legends in boxes or frames. The `<figcaption>` carries the context.

## Shared building blocks

- `src/components/diagram/primitives/diagram.css` holds the grammar as classes: `.dg`, `.dg-tile(--active|--ok|--stop)`, `.dg-label(--lg|--muted|--ok|--stop)`, `.dg-sub`, `.dg-line(--active|--stop)`, `.dg-arrow(--stop)`, `.dg-check`, `.dg-draw`, `.dg-caption` and `.sr-only`. Import it and reuse the classes; add a class there rather than styling colours inside a component.
- **Reference implementations:**
  - `src/components/diagram/home/EvidenceTrail.astro`: the hero. Wide and narrow layouts, draw-on motion, data-driven tiles and lines.
  - `src/components/diagram/home/PracticeGlyph.astro`: small three- or four-step figures with a single stop branch.

## Workflow: sketch first

1. **Draft a text sketch** of nodes, relationships and direction, and mark which path is active, which state is verified, and which (if any) is the stop.
2. **Review it with Karan** before writing code: topology, labels, and where it sits on the page.
3. **Build the component** at `src/components/diagram/<topic>/<Name>.astro`. Keep tile and line data in frontmatter arrays and render them with maps, as the reference components do.

## Rules that keep it working

- **Colour:** only `var(--ie-*)` / `var(--brand-*)` through the shared classes. No raw hex anywhere in `src/components/diagram/**`. If no token fits, add one to both the light and dark blocks of `global.css` first.
- **Legibility:** text must never render below 12px. Work out the scale (rendered width ÷ viewBox width). If a figure would shrink below that on phones, give it a narrow layout: a second `<svg>` switched by a media query, as `EvidenceTrail` does below 860px.
- **Motion (optional, the hero only by default):** the active path traces in once when the figure enters view. Give the paths `pathLength="1"` and the `.dg-draw` class, set `data-draw` on the wrapper, and use a small inline script that sets `pending` and then `done`, skipped under `prefers-reduced-motion`. Without JavaScript the figure renders fully drawn. No looping animation.
- **Accessibility:** use `role="img"` with `<title>`/`<desc>` (or an `aria-label`) that explains the whole figure in words. No meaning may be carried by colour alone: stops and ends are also labelled ("Block", "Stop", "Ship").
- **Placement:**
  - In an essay, wrap the figure in a plain `<figure>` with a `<figcaption class="dg-caption">` that states what it shows and what it doesn't claim.
  - On the homepage, figures can illustrate the practice.
  - Never build a diagram gallery, `/diagrams/` or `/visuals/` page.
  - Mark illustrative data as illustrative.

## Verify before delivering

1. Run `npm run build`.
2. Run `grep -rnE "#[0-9a-fA-F]{3,6}\b" src/components/diagram`. It must return nothing (in-page `href="#…"` anchors aside).
3. Run `npm run shot <route> "<figure selector>"` and `npm run shot -- <route> --mobile`. Read the light, dark and phone PNGs and check:
   - labels are legible and not clipped
   - connectors meet tile edges
   - the active path clearly reads as blue
   - the narrow layout is the one used on phones
   - there is no overflow warning
4. Report the component path and what you checked.
