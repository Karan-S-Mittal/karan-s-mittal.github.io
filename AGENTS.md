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

The implemented **Soft Architecture / Instrumented Editorial** system is the source of truth. Runtime values live in [`src/styles/global.css`](src/styles/global.css); reusable page and diagram behavior lives in `src/components/`. Do not duplicate token values in prose documentation.

### Semantic Palette

Use the existing `--ie-*` and `--brand-*` custom properties from `src/styles/global.css`:
- `--ie-canvas` and `--ie-surface` define the page and exhibit planes.
- `--ie-ink`, `--ie-ink-secondary`, and `--ie-muted` define the text hierarchy.
- `--ie-rule` and `--ie-rule-strong` define boundaries.
- `--ie-blue` marks links, active state, and direct flow.
- `--ie-rust` marks constraints, caveats, and failures.
- `--ie-verified` marks confirmed or validated state.
- Use rules and spatial grouping before cards, radii, tint, or shadows. Dark mode must preserve the same hierarchy.

### Standard Visual Archetypes:
1. **Subsystem & System Maps**: Clean subsystem boundaries, data vs. control plane separation.
2. **Memory & Layout Grids**: Page allocations, physical frames, ring buffers, tensor strides.
3. **Lifecycle & Sequence Flows**: Protocol handshakes, step-by-step kernel gathers.
4. **Trade-Off Curves**: Multi-axis latency vs. memory vs. cost comparisons.

### Diagram Rules

- The active workflow and geometry rules live in [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md).
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

## 6. Sources of Truth

- [`src/styles/global.css`](src/styles/global.css) owns runtime design tokens, typography, spacing, and shared interaction defaults.
- [`src/components/`](src/components/) owns implemented UI and diagram primitives.
- [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md) owns diagram authoring and verification.
- [`.agents/skills/explanatory-studio/SKILL.md`](.agents/skills/explanatory-studio/SKILL.md) owns evidence-backed essay authoring.
- `package.json`, `scripts/`, and `tests/` define the executable build and verification contract.

Prefer correcting these executable sources over adding narrative documentation that can drift from them.

---

## 7. Current State & Continuation

This section is the compact handoff for future sessions. Keep it short and update it only when the implemented site direction or active priority changes.

### Implemented foundation (2026-09-21)

- The site is a statically generated Astro 7 studio deployed through GitHub Pages. Essays use the `blog` content collection and MDX; custom Remark/Rehype behavior intentionally remains on the Unified processor through the direct `@astrojs/markdown-remark` dependency.
- Canonical public sections are `/work/`, `/writing/`, `/ideas/`, `/speaking/`, `/about/`, `/now/`, `/contact/`, and `/topics/`. The Ideas hub begins with system diagrams and can grow to hold other inspectable concepts; individual diagram pages remain under `/diagrams/<slug>/`. `/blog/`, `/diagrams/`, `/visuals/`, `/talks/`, `/publications/`, and `/tags/` are compatibility redirects only.
- The former narrative documentation tree under `docs/` was deliberately removed. Do not recreate it. The executable sources of truth are the files listed in Section 6 and this concise handoff.
- The design language is **Soft Architecture / Instrumented Editorial**: restrained paper-like field, rule-led grouping, sparse semantic colour, Plus Jakarta Sans headings, Inter prose and diagram labels, and JetBrains Mono only for code, metadata, indices, and technical readouts.
- The homepage is a scroll-led explanation built around a four-stage semiconductor traceability graph: dependency structure, PFAS evidence, cost of quality, and specialized review. Stage titles and process labels use Inter; stages are spatially separate; connector labels are unboxed.
- The About page, canonical URL scheme, index-page naming, header/footer navigation, mobile navigation, and responsive page families have been harmonized. The `/now/` page uses a ruled information ledger rather than a generic card grid.
- The public proof model favors external publications, ideas and visual models, talks, and inspectable source work. On-site essays belong under Writing and should not be repeated on Work; external publications may appear there as independent public proof. Do not add speculative case studies or unsupported client claims.

### Active design priority

Return to page-by-page visual refinement. Improve information hierarchy, scroll pacing, spatial rhythm, diagram legibility, and responsive composition without reopening settled information architecture or adding generic decorative graphs. Prefer one meaningful visual idea per viewport over additional cards, badges, or ornamental UI.

Keep verification proportional to the change. Use `npm run build` as the normal structural check. During design iteration, inspect only the affected pages and viewports; run the full `npm run test:visual` suite before publishing or after a cross-site layout, navigation, or routing change. Run `npm audit` after dependency work, not after ordinary content or CSS edits. Preserve visual baselines only after inspecting an intentional change, and do not add tooling or checks unless they protect a defect the site has actually encountered.

---

## 8. Git & Trunk-Based Development

- **Single Branch (`main`)**: Karan operates strictly on a single trunk (`main`).
- **No Autonomous Branch Sprawl**: Coding agents must **NOT** create auxiliary feature, chore, or prototype branches (e.g. `codex/*`, `chore/*`) unless Karan explicitly requests a branch. Commit directly to `main` with clean, atomic commits.
