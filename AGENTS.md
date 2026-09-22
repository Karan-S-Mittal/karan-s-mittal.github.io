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

The design is **Soft Architecture v2 (Apple-clean)**. Two skills own it; read the relevant one before touching UI or figures, and do not restate their rules here:

- [`.agents/skills/site-design/SKILL.md`](.agents/skills/site-design/SKILL.md): pages, components, type scale, controls, layout, copy voice.
- [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md): figures (soft borderless tiles, hairline connectors, one blue active path, at most one rust stop).

The non-negotiables, in short:
- Values live only in [`src/styles/global.css`](src/styles/global.css) as `--ie-*` tokens with light and dark values. No raw hex in components, and no Tailwind palette values.
- Blue (`--ie-blue`) is for clickable things on pages and the active path in figures. There is one `.button` per page and `.more-link` for everything else.
- Whitespace separates sections; hairlines only divide list items. No cards, pills, chips, badges, glass or backdrops on pages.
- Eight type sizes, weights 400/600, Plus Jakarta for headings, Inter for text, JetBrains Mono for dates and code only. Labels are sentence case and never uppercase.
- Verify every visual change with `npm run build`, `npm run shot <route>` and `npm run shot -- <route> --mobile`, and read the PNGs.

---

## 4. Components & Content Schema

- **Figures**: Wrap a diagram in a plain `<figure>` with a `<figcaption class="dg-caption">` stating what it shows and what it does not claim. The `<Exhibit />`, `<PrimaryVerification />`, and `<VisualAttribution />` components were removed along with the site's only essay; rebuild them deliberately if figure chrome is wanted again rather than assuming they exist.
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
- [`.agents/skills/site-design/SKILL.md`](.agents/skills/site-design/SKILL.md) owns page UI rules and copy voice.
- [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md) owns figure authoring and verification; `src/components/diagram/primitives/diagram.css` holds the shared figure classes.
- [`.agents/skills/explanatory-studio/SKILL.md`](.agents/skills/explanatory-studio/SKILL.md) owns evidence-backed essay authoring.
- `package.json` and `scripts/` define the executable build and verification contract.

Prefer correcting these executable sources over adding narrative documentation that can drift from them.

---

## 7. Current State & Continuation

This section is the compact handoff for future sessions. Keep it short and update it only when the implemented site direction or active priority changes.

### Implemented foundation (2026-09-22)

- The site is a statically generated Astro 7 studio deployed through GitHub Pages. Essays use the `blog` content collection and MDX; custom Remark/Rehype behavior intentionally remains on the Unified processor through the direct `@astrojs/markdown-remark` dependency.
- Canonical public sections are `/publications/`, `/about/`, `/now/`, and `/contact/`. Header navigation carries the first three; `/contact/` is the standing call to action. `/publications/` holds Writing, Talks, and Software sections; Software (from `software` in `src/data/publications.ts`) and the headline wording appear only when entries exist. `/writing/`, `/speaking/`, `/talks/`, `/blog/`, `/tags/`, and `/topics/` are compatibility redirects only. On-site essays still live at `/writing/<slug>/`.
- Positioning (2026-09-23): graph-grounded knowledge systems and LLM evaluation, with graph theory research; AI agents are one application, not the headline. Karan is hired independently; Dextar is a credential, not the offer.
- `/work/`, `/ideas/`, `/diagrams/<slug>/`, and `/visuals/<slug>/` were removed in 812969a. Their content now lives as the homepage sections `#practice` and `#proof`. Do not recreate those routes, `VisualPage.astro`, or a diagram gallery.
- Topic archives are retired. `/topics/` and `/tags/*` redirect to `/writing/`, post tags render as plain text, and the `remarkAutoTag` plugin plus its `sync-tags` build step were deleted with the section they linked into. Rebuild both together if topics ever return.
- The former narrative documentation tree under `docs/` was deliberately removed. Do not recreate it. The executable sources of truth are the files listed in Section 6 and this concise handoff.
- The design language is **Soft Architecture v2 (Apple-clean, 2026-09-23)**: white field (black in dark mode), neutral Apple greys, whitespace-led grouping, Plus Jakarta Sans headings at weight 600, Inter body at 17px, and JetBrains Mono only for dates, code, and data.
- The palette is neutral greys with a single blue accent for clickable things. `--ie-blue` is the accent slot, not a literal hue — name the token, never the colour it currently resolves to. Hover states derive from it through `--accent-hover`; do not reintroduce a literal hex.
- The homepage is a centred hero (title, the `EvidenceTrail` figure, lead, one action) over a plain canvas, then two ruled lists (each practice item carries a `PracticeGlyph` figure): `#practice` (three failure modes, one problem line and one intervention line each) and `#proof`, then a closing contact section beside the portrait, separated by space alone. The decorative `SiteBackdrop` was deleted — it collided with headline text on four pages and carried no information.
- There are no on-site essays. The only prior essay was LLM-generated and was removed along with its apparatus: `Exhibit`, `PrimaryVerification`, `VisualAttribution`, and both version-control diagram components. `/publications/` lists external articles; the essay route, `TableOfContents`, `RelatedPosts`, and `PostCTA` remain and build zero pages until a real essay lands.
- Every page family is a whitespace-separated list: no cards, pills, chips, badges, or status labels anywhere. The header is a solid 52px band (no blur) with centred nav, the current section in ink, and Contact as a blue link; the footer is small grey text links on `--ie-surface-raised`. `/now/` uses a narrow heading rail plus entries held to a 64ch measure. `/contact/` is flat, so the embedded Tally form reads as the foreign instrument it is.
- The About page is method and intellectual history only. Its evidence-trail section was cut for restating the header nav and the homepage proof section a third time on one page load.
- The public proof model favors external publications, talks, and inspectable source work. Do not add speculative case studies or unsupported client claims.
- The default share image is the square 800×800 profile photo, and `Layout.astro` declares matching dimensions. An essay supplying a 1200×630 card at `/social/<slug>.png` gets `summary_large_image` automatically.

### Active design priority

The Apple-clean visual pass is done and Karan is happy with it (2026-09-23): text-led, whitespace-led, blue only for what is clickable, one `.button` per page, Apple-style figures. Hold that line through the site-design and diagram-craft skills. Do not reintroduce pills, chips, badges, card borders, uppercase mono labels, blueprint-style diagrams, or decorative backdrops.

The open work is proof, and Karan supplies it: a public repo (add it to `software` in `src/data/publications.ts`), an anonymised case write-up with one measured outcome, and a human-written essay. Do not add placeholder or speculative entries in the meantime.

The open work is content, not chrome: a real, human-written essay to replace the one that was removed, and whatever figure component that essay genuinely needs.

Keep verification proportional to the change. `npm run build` is the structural check: it fails on a broken import, invalid CSS, or a bad content schema. There are no other automated checks — no linter, no snapshot suite, no `npm test`. Everything else is inspection: `npm run shot <route> [selector]` writes light and dark screenshots to `test-results/`, and you are expected to read them. Run `npm audit` after dependency work, not after ordinary content or CSS edits. Do not add tooling unless it protects a defect the site has actually shipped.

There is no automated visual-regression suite. The Playwright specs were deleted rather than repaired: they had drifted two architectures behind, and a suite nobody trusts is worse than none. `@playwright/test` stays as a devDependency because `npm run shot` drives it — that command, plus reading the PNGs, is the verification contract now. Do not reintroduce a snapshot suite unless it guards a defect the site has actually shipped.

---

## 8. Git & Trunk-Based Development

- **Single Branch (`main`)**: Karan operates strictly on a single trunk (`main`).
- **No Autonomous Branch Sprawl**: Coding agents must **NOT** create auxiliary feature, chore, or prototype branches (e.g. `codex/*`, `chore/*`) unless Karan explicitly requests a branch. Commit directly to `main` with clean, atomic commits.
