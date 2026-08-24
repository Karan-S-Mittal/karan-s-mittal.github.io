# Agent Instructions: Explanatory Systems Studio

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

All diagrams must adhere to the **Explanatory Systems Studio** visual language ([`docs/design-language.md`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/design-language.md)):

### Semantic Palette:
- **Canvas / Surface**: `#F4F7FB` (Light) / `#111820` (Dark)
- **Ink / Structure**: `#13213A` (Headlines, strokes, primary boxes)
- **Signal (`#1F66E5`)**: Active step, highlighted flow, current buffer, key insight.
- **Model (`#7C3AED`)**: Neural network layers, weights, learned embeddings.
- **Verified (`#168663`)**: Deterministic outputs, cache hits, validated bounds.
- **Constraint (`#D97706`)**: Headroom limits, memory pressure, lock contention, warnings.
- **Failure (`#D64545`)**: OOM threshold, cache miss, packet drop.
- **Muted (`#68768B`)**: Dimensions, byte offsets, secondary annotations.

### Standard Visual Archetypes:
1. **C4 & System Maps**: Clean subsystem boundaries, data vs. control plane separation.
2. **Memory & Layout Grids**: Page allocations, physical frames, ring buffers, tensor strides.
3. **Lifecycle & Sequence Flows**: Protocol handshakes, step-by-step kernel gathers.
4. **Trade-Off Curves**: Multi-axis latency vs. memory vs. cost comparisons.

### Diagram Rules:
- 1.5px stroke weight, sharp/subtle 4px corners, clean font settings (Inter / Geist Mono).
- Use leader line callouts for unexpected behavior: `"← notice zero allocation here"`.

---

## 4. Components & Content Schema

- **`<Exhibit />` Container**: Wrap all figures, diagrams, and Excalidraw SVGs in `<Exhibit exhibit="01" title="..." badge="..." caption="...">` ([`src/components/Exhibit.astro`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/components/Exhibit.astro)).
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
