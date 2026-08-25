# Soft Architecture — Site Design Language

**Status:** Active · Soft Architecture v1 selected 2026-08-25
**Canonical spec:** [`soft-architecture-design-system-v1 (2).md`](../soft-architecture-design-system-v1%20(2).md) (repo root)
**Replaces:** Technical Blueprint (2026-08-24) and Warm Editorial (2026-08-22)
**Site role:** Establish Karan Mittal as a trustworthy engineer-scientist for teams building consequential data and AI systems.

## The idea

> **Complex systems rendered into clarity through gentle, precise structure.**

The identity comes from one consistent transformation: **ambiguity → structure → system → evidence**. Every visual, component, diagram, and content pattern should reinforce it. This document is the working digest; the canonical specification linked above wins on any conflict.

## Core tension

**Approachable precision.** Blue and ink carry structure; pink and lavender add warmth and editorial emphasis. Warmth accents precision and never dominates the composition.

## Principles

1. **Complexity is concentrated.** Dense information gets one intentional place to exist; everything around it breathes.
2. **Decoration must become information.** Lines, dots, planes, motion, and colour communicate relationships, boundaries, emphasis, sequence, or state.
3. **Evidence interrupts assertion.** Show the architecture, decision, constraint, measurement, or outcome instead of claiming expertise.
4. **Motion explains relationships.** Nothing moves simply because it can ("Ink, not bounce").
5. **Darkness is semantic.** `light = exploration / explanation`; `dark = decision / conclusion / conversion`. No site-wide dark mode in v1 (spec §21).

## Colour

| Token | Value | Meaning |
| --- | --- | --- |
| Anchor blue | `#2676AA` (`--blue-500`) | Headings, links, primary action, diagram nodes, active nav |
| Hover blue | `#246FA0` (`--blue-600`) | Stronger interactive blue |
| Subtle blue | `#DCEEFF` (`--blue-100`) | Subtle backgrounds, diagram planes |
| Surface blue | `#A2D2FF` (`--blue-400`) | Soft fills, ambient shadows |
| Canvas blue | `#BDE0FE` (`--blue-300`) | Large tinted sections, hero ambience |
| Signal warm | `#FFAFCC` (`--pink-400`) | Attention, bottleneck/decision/constraint nodes, editorial marks — sparse by rule |
| Emphasis | `#FFC8DD` (`--pink-300`) | Soft emphasis plane; never the default CTA |
| Lavender | `#CDB4DB` (`--lavender-400`) | Meta separators, async/inferred edges, secondary metadata |
| Ink | `#1A1A2E` (`--ink-900`) | Body text, code surfaces, dark CTA planes |
| Page | `#F8F9FC` (`--neutral-050`) | Global background |
| Card | `#FFFFFF` | Component surface |
| Border | `#E8ECF4` (`--neutral-150`) | Hairlines |

Rules: never hardcode palette values in components when a semantic token exists (spec §27.1). Pink is never the default primary button. Shadows stay blue-tinted (`rgba(162, 210, 255, …)`).

## Type

- **Sans:** Inter (documented deviation from Google Sans Flex — not available under an open licence; recorded in `src/styles/global.css`). **Mono:** JetBrains Mono.
- Reading column: 680px, 18px body, 1.7 line height, ≤75 characters per line.
- Display 48–64px / H1 42–56 / H2 30–40 / H3 22–30 per the spec §4.2 scale.
- Evidence metrics: 36–64px, weight 600–700, tight leading.

## Shape & surface

- Cards: white surface, 1px `--border-default`, **16px radius**, blue-tinted shadow `0 4px 24px rgba(162,210,255,.12)`; hover lifts 1–2px with a deeper shadow — no scale.
- Buttons: 8px radius, no pill by default, subtle 1px lift; primary is blue, secondary is bordered ink-text.
- Dark CTA plane: `#1A1A2E` with a soft radial blue glow at 85% 15%; white heading, soft blue description, blue primary action only.

## Architecture grammar (spec §10)

No decorative topology. Every visible node, edge, or plane maps to meaning:

- **Node** (●) — something that exists: service, store, model, actor. Default blue; **attention node** pink, used sparingly (one per diagram).
- **Solid edge** — direct, synchronous, explicit dependency.
- **Dashed edge** — async, inferred, optional, eventual. Prefer lavender.
- **Plane** — system/trust/ownership boundary: light-blue fill, subtle border, generous padding.

Diagram acceptance criteria live in spec §37; every diagram needs an accessible text explanation (§20.2).

## Layout contract

- Canonical widths: reading 680 / content 960 / architecture 1200 / wide 1440.
- Essay rhythm: prose stays narrow; architecture figures break out to 960px.
- Density rhythm per page: QUIET → EXPLANATION → COMPLEXITY → EVIDENCE → QUIET.
- SVG exhibit geometry: 32-unit outer inset, 16-unit node inset, ≥16-unit connector corridors, text-safe padding inside every block. Route connectors through whitespace via `src/lib/diagram-routing/`; rounded orthogonal corners only.
- One filled arrowhead primitive everywhere; arrowheads stay ink even when the flow line is blue.

## Component kit

Production components live in `src/components/`: `MetaLabel`, `Button`, `EvidenceObject`, `ArchitectureAnnotation`, `SectionBreak`, `DarkPlane`, `Exhibit`. The live specimen page is `/studio/components` — every primitive appears there before propagating across the site (spec §40). Pull quotes: 24px, weight 500, 3px blue left border, no wash, no quote glyph. Code blocks: `--ink-900` surface, 12px radius, 3px blue left border, JetBrains Mono.

## Interaction

A reader changes a meaningful input and observes resulting behaviour. Allowed hover vocabulary: 1–2px lift, shadow deepening, opacity shift, line emphasis. Never spring, bounce, scale, replay draw animations on hover, or animate ambient topology. Scroll reveal: opacity 0→1, translateY 16→0, ~500ms ease-out. Reduced-motion kill-switch is global (spec §18.5).

## Things we deliberately avoid

Neon gradients · blurred glowing orbs · dense random node backgrounds · particle fields · exaggerated glass panels · capsule buttons by default · spring animation · hover scale · constant scroll-triggered animation · generic metric-card dashboards · technology logo walls · random pink CTAs · deep grey shadows · pure black body copy · decorative graph edges with no meaning · any site-wide dark mode.

## Visual regression (spec §26)

`npm run test:visual` captures the six canonical pages (home, essay, work, talks,
about, specimen) at 375×812, 768×1024, and 1440×900 — full-page, reduced motion,
animations disabled — and diffs them against committed baselines in
`tests/visual/__screenshots__/`.

- Baselines are per-OS (font rasterisation differs); regenerate on a new machine
  with `npm run test:visual:update` and review the diff before committing.
- Threshold is 2% pixel ratio to absorb antialiasing noise; anything structural
  exceeds it.
- A visual change touching spacing, type wrapping, radii, line weight, or page
  density (spec §26.3) must re-run this suite before merge.
