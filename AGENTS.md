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
- `--ie-canvas` and `--ie-surface` define the page and figure planes.
- `--ie-ink`, `--ie-ink-secondary`, and `--ie-muted` define the text hierarchy.
- `--ie-rule` and `--ie-rule-strong` define boundaries.
- `--ie-blue` is the accent slot (currently amber). It marks inline prose links, hover, direct flow, and at most one focal element per page. Standalone navigational links are ink and take the accent on hover only. Small uppercase labels are `--ie-muted` mono, never accent.
- `--ie-rust` marks constraints, caveats, and failures.
- `--ie-verified` marks confirmed or validated state.
- Use rules and spatial grouping before cards, radii, tint, or shadows. The site carries no pills, chips, or badges: numbers and labels are plain mono text, and section boundaries are hairline rules. Dark mode must preserve the same hierarchy.

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
- **Visuals Workflow**: Follow [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md). Create one reusable Astro diagram in `src/components/diagram/`, transparent or on a clean `var(--ie-surface)` plane. Omit decorative standards or design-method labels. Import the component into an essay and caption it there with a plain `<figure>`. There are no standalone diagram pages or galleries; do not recreate `/diagrams/`, `/visuals/`, or `VisualPage.astro`. Inspect both rendered themes with `npm run shot <route> [selector]` before delivery.

---

## 4. Components & Content Schema

- **Figures**: Wrap a diagram in a plain `<figure>` with a `<figcaption>` stating what it shows and what it does not claim. The `<Exhibit />`, `<PrimaryVerification />`, and `<VisualAttribution />` components were removed along with the site's only essay; rebuild them deliberately if figure chrome is wanted again rather than assuming they exist.
- **Post Template**: All new posts should be scaffolded via `npm run new` (or directly duplicated from [`src/content/blog/_template.mdx`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/content/blog/_template.mdx)).
- **Code-First Architecture Diagrams**: Diagrams are authored directly as clean, token-compliant Astro/SVG components under `src/components/diagram/` following the [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md) workflow.

---

## 5. Distribution & Syndication

Every canonical deep-dive on the site is designed to be repurposed for:
- **LinkedIn (4:5 Carousel / 1080x1350)**: 5–6 slide visual breakdown — problem, mechanism, evidence.
- **Medium / Substack**: Markdown cross-post with canonical link header.

---

## 6. Sources of Truth

- [`src/styles/global.css`](src/styles/global.css) owns runtime design tokens, typography, spacing, and shared interaction defaults.
- [`src/components/`](src/components/) owns implemented UI and diagram primitives.
- [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md) owns diagram authoring and verification.
- [`.agents/skills/explanatory-studio/SKILL.md`](.agents/skills/explanatory-studio/SKILL.md) owns evidence-backed essay authoring.
- `package.json` and `scripts/` define the executable build and verification contract.

Prefer correcting these executable sources over adding narrative documentation that can drift from them.

---

## 7. Current State & Continuation

This section is the compact handoff for future sessions. Keep it short and update it only when the implemented site direction or active priority changes.

### Implemented foundation (2026-09-22)

- The site is a statically generated Astro 7 studio deployed through GitHub Pages. Essays use the `blog` content collection and MDX; custom Remark/Rehype behavior intentionally remains on the Unified processor through the direct `@astrojs/markdown-remark` dependency.
- Canonical public sections are `/writing/`, `/speaking/`, `/about/`, `/now/`, and `/contact/`. Header navigation carries the first four; `/contact/` is the standing call to action. `/blog/`, `/publications/`, `/talks/`, `/tags/`, and `/topics/` are compatibility redirects only.
- `/work/`, `/ideas/`, `/diagrams/<slug>/`, and `/visuals/<slug>/` were removed in 812969a. Their content now lives as the homepage sections `#practice` and `#proof`. Do not recreate those routes, `VisualPage.astro`, or a diagram gallery.
- Topic archives are retired. `/topics/` and `/tags/*` redirect to `/writing/`, post tags render as plain text, and the `remarkAutoTag` plugin plus its `sync-tags` build step were deleted with the section they linked into. Rebuild both together if topics ever return.
- The former narrative documentation tree under `docs/` was deliberately removed. Do not recreate it. The executable sources of truth are the files listed in Section 6 and this concise handoff.
- The design language is **Soft Architecture / Instrumented Editorial**: restrained paper-like field, rule-led grouping, sparse semantic colour, Plus Jakarta Sans headings, Inter prose and diagram labels, and JetBrains Mono only for code, metadata, indices, and technical readouts.
- The palette is minimal neutral monochromatic with a single amber accent. `--ie-blue` is the accent slot, not a literal hue — name the token, never the colour it currently resolves to. Hover states derive from it through `--accent-hover`; do not reintroduce a literal hex.
- The homepage is a centred three-element hero (title, lead, one action) over a plain canvas, then two ruled ledgers: `#practice` (three failure modes, one problem line and one intervention line each) and `#proof`, closing on a single amber rule above the contact section. The decorative `SiteBackdrop` was deleted — it collided with headline text on four pages and carried no information.
- There are no on-site essays. The only prior essay was LLM-generated and was removed along with its apparatus: `Exhibit`, `PrimaryVerification`, `VisualAttribution`, and both version-control diagram components. `/writing/` lists external publications; the essay route, `TableOfContents`, `RelatedPosts`, and `PostCTA` remain and build zero pages until a real essay lands.
- Every page family is now a ruled ledger: no cards, pills, chips, badges, or filled state pills anywhere. The header marks the current section with a rule rather than a filled pill. `/now/` uses a narrow index rail plus entries held to a 68ch measure. `/contact/` is flat, so the embedded Tally form reads as the foreign instrument it is.
- The About page is method and intellectual history only. Its evidence-trail section was cut for restating the header nav and the homepage proof section a third time on one page load.
- The public proof model favors external publications, talks, and inspectable source work. Do not add speculative case studies or unsupported client claims.
- The default share image is the square 800×800 profile photo, and `Layout.astro` declares matching dimensions. An essay supplying a 1200×630 card at `/social/<slug>.png` gets `summary_large_image` automatically.

### Active design priority

The page-by-page visual pass is done and the direction is settled: text-led, rule-led, one accent moment per page. Hold that line. Do not reintroduce pills, chips, badges, card borders, or decorative backdrops, and do not paint small uppercase labels with the accent.

The open work is content, not chrome: a real, human-written essay to replace the one that was removed, and whatever figure component that essay genuinely needs.

Keep verification proportional to the change. Use `npm run build` as the normal structural check — its `prebuild` runs `studio:check`, which fails on raw hex and unbundled fonts in `src/components/diagram/**`. Inspect affected pages in both themes with `npm run shot <route> [selector]`. Run `npm audit` after dependency work, not after ordinary content or CSS edits. Do not add tooling or checks unless they protect a defect the site has actually encountered.

There is no automated visual-regression suite. The Playwright specs were deleted rather than repaired: they had drifted two architectures behind, and a suite nobody trusts is worse than none. `@playwright/test` stays as a devDependency because `npm run shot` drives it — that command, plus reading the PNGs, is the verification contract now. Do not reintroduce a snapshot suite unless it guards a defect the site has actually shipped.

---

## 8. Git & Trunk-Based Development

- **Single Branch (`main`)**: Karan operates strictly on a single trunk (`main`).
- **No Autonomous Branch Sprawl**: Coding agents must **NOT** create auxiliary feature, chore, or prototype branches (e.g. `codex/*`, `chore/*`) unless Karan explicitly requests a branch. Commit directly to `main` with clean, atomic commits.
