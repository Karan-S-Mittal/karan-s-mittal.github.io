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

All pages and diagrams must adhere to the **Soft Architecture / Instrumented Editorial** visual language ([`docs/design-language.md`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/design-language.md)):

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
1. **Subsystem & System Maps**: Clean subsystem boundaries, data vs. control plane separation.
2. **Memory & Layout Grids**: Page allocations, physical frames, ring buffers, tensor strides.
3. **Lifecycle & Sequence Flows**: Protocol handshakes, step-by-step kernel gathers.
4. **Trade-Off Curves**: Multi-axis latency vs. memory vs. cost comparisons.

### Diagram Rules:
- Full specifications and guidelines live in [**`docs/diagram-framework.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/diagram-framework.md) (supported by the `.agents/skills/diagram-craft/SKILL.md` skill).
- **Never write a raw hex color in a diagram component.** Every color in `src/components/diagram/**` must be a `var(--ie-*)` or `var(--brand-*)` token so light and dark mode both work. A build check enforces this and will fail on raw hex. If you need a color that no token provides, add the token to `src/styles/global.css` for BOTH light and dark first — do not inline a value.
- Tailwind default palette values (`#2563EB`, `#059669`, `#E11D48`, the `slate-*` ramp, etc.) are forbidden. They are not part of this system.
- 1.5px stroke weight, stealth blueprint arrows, circular terminal junction pins, and smooth rounded fillets (R=10-14px). One rust constraint node max per diagram.
- **Fonts**: Standardized on two core proportional fonts plus JetBrains Mono: `Plus Jakarta Sans` (`var(--font-display)`) for display headings, `Inter` (`var(--font-sans)` / `var(--font-diagram)`) for body prose, UI, and diagram labels/descriptions, and `JetBrains Mono` (`var(--font-mono)`) for code, memory offsets, terminal readouts, and tags. Legacy IBM Plex fonts are strictly forbidden.
- Use leader line callouts for unexpected behavior: `"← notice zero allocation here"`.
- Every diagram needs an accessible text explanation; no meaning carried by colour alone.
- **Simple Visuals Workflow**: Follow [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md). Create one reusable Astro diagram in `src/components/diagram/`, background-less or on a clean white background, without `<Exhibit />`, and `<VisualAttribution />` (the `karansmittal` wordmark in a standard rounded box with white background and black font) inside the artwork. Omit decorative standards or design-method labels. Add a tiny standalone download page using `src/layouts/VisualPage.astro`. Import the same component into blog posts. No separate preview page or mandatory showroom/gallery registration. Add directory entries only when requested. Keep labels, files, and page chrome small; inspect the actual page and PNG before delivery.

---

## 4. Components & Content Schema

- **`<Exhibit />` Container**: Wrap all figures, diagrams, and architectural maps in `<Exhibit exhibit="01" title="..." badge="..." caption="...">` ([`src/components/editorial/Exhibit.astro`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/components/editorial/Exhibit.astro)).
- **Post Template**: All new posts should be scaffolded via `npm run new` (or directly duplicated from [`src/content/blog/_template.mdx`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/content/blog/_template.mdx)).
- **Code-First Architecture Diagrams**: Diagrams are authored directly as clean, token-compliant Astro/SVG components under `src/components/diagram/` following the [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md) workflow.

---

## 5. Distribution & Syndication

Every canonical deep-dive on the site is designed to be repurposed for:
- **LinkedIn (4:5 Carousel / 1080x1350)**: 5–6 slide visual breakdown with Exhibit 01 (Problem), Exhibit 02 (Fix), and Benchmark Table.
- **Medium / Substack**: Markdown cross-post with canonical link header.

---

## 6. Key Documentation Reference

- [**`docs/diagram-framework.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/diagram-framework.md) — Comprehensive diagramming framework, Inter typography, blueprint arrows, and brand logo registry.
- [**`docs/design-language.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/design-language.md) — Visual design tokens, typography, diagram rules.
- [**`docs/authoring-workflow.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/authoring-workflow.md) — Step-by-step authoring, diagram craftsmanship, and syndication guide.
- [**`docs/README.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/README.md) — Documentation index.

---

## 7. Durable Project Memory

Before making repository changes, read [`docs/memory/README.md`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/memory/README.md) and the current-state, decisions, and backlog files it points to. These files are the durable project context for future agents and collaborators; chat history is not.

When work changes architecture, workflow, or an agreed priority, update the smallest relevant memory file in the same change. Do not store credentials, secrets, private correspondence, or a transcript of the conversation. Record decisions and observations, not every command run.

---

## 8. Git & Trunk-Based Development

- **Single Branch (`main`)**: Karan operates strictly on a single trunk (`main`).
- **No Autonomous Branch Sprawl**: Coding agents must **NOT** create auxiliary feature, chore, or prototype branches (e.g. `codex/*`, `chore/*`) unless Karan explicitly requests a branch. Commit directly to `main` with clean, atomic commits.
