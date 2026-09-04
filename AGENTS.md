# Agent Instructions: Soft Architecture

Welcome to Karan Mittal's personal engineering studio repository (`karan-s-mittal.github.io`).

When assisting Karan with content creation, architectural diagrams, technical writing, or web development in this workspace, you **MUST** strictly adhere to the following guidelines:

---

## 1. Identity & Tone

- **Persona**: Karan Mittal is an **engineer-scientist and innovator** focused on hard systems engineering problems (AI inference, distributed data systems, security, microarchitecture, and low-level performance optimization).
- **Voice**: Authoritative, calm, exacting, and evidence-backed. Avoid generic AI marketing fluff, hype-words, and superficial summaries.
- **Reference Models**: Bartosz Ciechanowski (mechanistic rigor), 3Blue1Brown (visual intuition), GitHub Next (disciplined presentation).

---

## 2. The Verification Standard: Primary Citations Only

**NON-NEGOTIABLE RULE**: Every architectural claim, performance metric, or algorithm breakdown must be verified against **Primary Sources**:
- **Academic Whitepapers / DOIs**: Direct links to arXiv, IEEE, ACM (e.g. `arXiv:2309.06180`).
- **Source Code & Commits**: Direct permalinks to specific lines or commit SHAs in open-source repositories.
- **Official Specifications & RFCs**: IETF RFCs, W3C standards, CUDA/PTX programming guides, ISO docs.
- **Hardware Architecture Whitepapers**: Official vendor technical documentation (NVIDIA, AMD, Intel, Apple Silicon).

*Never cite secondary blog posts, aggregation articles, or third-party marketing claims.*

---

## 3. Visual & Diagram Grammar

All pages and diagrams must adhere to the **Soft Architecture** visual language ([`docs/design-language.md`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/design-language.md); full specification in [`docs/instrumented-editorial.md`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/instrumented-editorial.md)):

### Semantic Palette:
Every value below is a CSS custom property in `src/styles/global.css` — light, then dark.
- **Canvas** (`--ie-canvas`): `#F8F9FC`; dark `#0C0A09`. Page field.
- **Surface** (`--ie-surface`): `#FFFFFF`; dark `#18181B`. Exhibit / card plane.
- **Ink** (`--ie-ink`): `#1A1A2E`; dark `#F3F4F6`. Text, direct structure.
- **Secondary ink** (`--ie-ink-secondary`): `#4A4A6A`; dark `#D5D9DF`. Body, supporting explanation.
- **Muted** (`--ie-muted`): `#5B6470`; dark `#AEB6C2`. Dimensions, byte offsets, metadata, inferred state.
- **Rule** (`--ie-rule`): `#E8ECF4`; dark `#27272A`. Dividers, boundaries.
- **Anchor blue** (`--ie-blue`): `#2676AA`; dark `#8DAAFF`. Links, active state, direct/synchronous flow, selected controls.
- **Constraint rust** (`--ie-rust`): `#A63D17`; dark `#FFB36B`. Bottlenecks, caveats, constraints, **and failures** — there is deliberately no separate failure red; rust covers both.
- **Verified green** (`--ie-verified`): `#157F5F`; dark `#5FD3A6`. Confirmed/validated state, success path.
- Use rules and spatial grouping before cards, radii, tint, or shadows. Dark mode is supported and must preserve the same hierarchy.

### Standard Visual Archetypes:
1. **C4 & System Maps**: Clean subsystem boundaries, data vs. control plane separation.
2. **Memory & Layout Grids**: Page allocations, physical frames, ring buffers, tensor strides.
3. **Lifecycle & Sequence Flows**: Protocol handshakes, step-by-step kernel gathers.
4. **Trade-Off Curves**: Multi-axis latency vs. memory vs. cost comparisons.

### Diagram Rules:
- **Never write a raw hex color in a diagram component.** Every color in `src/components/diagram/**` must be a `var(--ie-*)` token so light and dark mode both work. A build check enforces this and will fail on raw hex. If you need a color that no token provides, add the token to `src/styles/global.css` for BOTH light and dark first — do not inline a value.
- Tailwind default palette values (`#2563EB`, `#059669`, `#E11D48`, the `slate-*` ramp, etc.) are forbidden. They are not part of this system.
- 1.5px stroke weight, solid edges = direct/synchronous, dashed muted edges = async/inferred, one rust constraint node max per diagram.
- Fonts: IBM Plex Sans (labels) + IBM Plex Mono (metrics/code); IBM Plex Serif is reserved for editorial headings.
- Use leader line callouts for unexpected behavior: `"← notice zero allocation here"`.
- Every diagram needs an accessible text explanation; no meaning carried by colour alone.

---

## 4. Components & Content Schema

- **`<Exhibit />` Container**: Wrap all figures, diagrams, and Excalidraw SVGs in `<Exhibit exhibit="01" title="..." badge="..." caption="...">` ([`src/components/editorial/Exhibit.astro`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/components/editorial/Exhibit.astro)).
- **Post Template**: All new posts should be scaffolded via `npm run new` (or directly duplicated from [`src/content/blog/_template.mdx`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/content/blog/_template.mdx)).
- **Obsidian / Excalidraw**: Diagrams are drawn locally in Obsidian Excalidraw and auto-exported to `.svg`. Pre-built swatches and components are located at [`public/templates/studio-starter.excalidraw`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/public/templates/studio-starter.excalidraw).

---

## 5. Distribution & Syndication

Every canonical deep-dive on the site is designed to be repurposed for:
- **LinkedIn (4:5 Carousel / 1080x1350)**: 5–6 slide visual breakdown with Exhibit 01 (Problem), Exhibit 02 (Fix), and Benchmark Table.
- **Medium / Substack**: Markdown cross-post with canonical link header.

---

## 6. Key Documentation Reference

- [**`docs/design-language.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/design-language.md) — Visual design tokens, typography, diagram rules.
- [**`docs/authoring-workflow.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/authoring-workflow.md) — Step-by-step authoring, Obsidian/Excalidraw, and syndication guide.
- [**`docs/README.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/README.md) — Documentation index.
