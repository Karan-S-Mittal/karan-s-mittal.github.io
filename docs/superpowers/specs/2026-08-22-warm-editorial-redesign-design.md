# Warm Editorial + Interactive Explainer — Site Redesign Design

Date: 2026-08-22
Status: Approved direction, pending implementation plan

## Context

Personal site (Astro, static, content collections) for Karan Mittal — consulting-first, writing-second.
Current problems, diagnosed with the user:

- The site reads as a generic consulting landing template (SaaS card grids, dual CTAs, pull-quote cards).
- The design language is undecided: warm serif (Fraunces) + warm grays fight Inter + royal blue product-SaaS cues.
- The strongest asset — deep technical essays with hand-made diagrams (paged-attention components) — is buried as a "field notes" list.

Reference points the user cited: ciechanow.ski/sound (craft, interactive essays), ui.com (restraint, precision), claude.ai/Anthropic (warm editorial).

Decisions locked with the user:

- Design language: **Warm Editorial + Explainer** (Claude/Anthropic warmth as shell; ciechanowski-style deep writing as centerpiece).
- Site's #1 job: **consulting-first, writing second**.
- Scope: **full redesign of core pages + the interactive system (all three interactive pieces) in one pass**.
- Essay prose stays **sans (Inter)**; Fraunces is display-only.

## 1. Foundations

### Color

Warm paper, warm ink, one clay/copper accent used sparingly (links, exhibit numbers, one rule under page titles). Royal blue and stone-gray neutrals are removed.

Light theme:
- `--bg: #FAF8F4` (paper), `--bg-elevated: #F3F0EA`, text `#211D18`, muted `#6E675D`
- `--accent: #C14A21` (burnt clay)
- Borders: 1px warm hairlines

Dark theme (same warmth, not cold blue-black):
- `--bg: #171410`, text `#E8E2D8`, `--accent: #E07850` (lit copper)

Token structure in `public/styles/global.css` stays; values are replaced.

### Typography

Three voices, one job each:
- **Fraunces** — headlines, essay titles, pull quotes. Homepage H1 ~3.5rem with comfortable leading (down from 4.5rem tight).
- **Inter** — all body prose (essays included) and UI chrome.
- **Mono** — dates, tags, exhibit labels, kickers; small, tracked-out, uppercase.

### Texture

- No graph-paper grid background.
- Cards are removed site-wide; ruled lists with generous row padding and hairline separators replace them.
- Corners sharpen to 4px max, mostly 0.

### Signature detail

Every figure/diagram becomes a numbered **Exhibit**: mono label above (`EXHIBIT 02 — KV CACHE EVICTION`), hairline frame, paper-inset background, caption below (Inter, muted, ~14px) explaining what to notice. Exhibits may break out to ~110% of text width on desktop.

## 2. Homepage

Top to bottom:

1. **Masthead header**: name + one-line positioning in header like a journal nameplate. Nav: Essays, Work, About, Contact — all text links, no buttons.
2. **Hero — a statement, not a pitch**: full-width Fraunces headline ("Engineering systems you can rely on" survives), 2–3 sentences plain prose, one quiet text link "→ Work with me". Grayscale portrait + floating quote card deleted (quote moves to About).
3. **Proof strip**: single hairline-ruled row, 3–4 stats in exhibit voice (mono number, short serif phrase).
4. **Selected work — annotated list, not cards**: ruled rows with mono index, serif title, one-line description, mono tag cluster. Hover shifts title to clay. `WorkCard` flattens into rows.
5. **Essays — the centerpiece**: renamed from "Field notes". Latest 4–5 posts as dated typographic rows (mono date, serif title, one-line description). Posts with exhibits get a small mono marker ("3 exhibits"). LinkedIn sidebar card deleted (link moves to footer/About).
6. **Speaking/community**: three proof cards collapse into compact ruled rows.
7. **Contact — closing paragraph, not a panel**: full-width hairline-ruled block, one serif sentence, one line of prose, one clay text link. No button.

Net effect: front page of a good journal — masthead, statement, table of contents — that still answers "who is this, can I hire him" within one screen.

## 3. Essay template & interactive system

### Reading experience

- Essay body in Inter, ~65ch measure.
- Title block: mono kicker (date · reading time · tags), large Fraunces title, one-line standfirst. No hero images.
- TOC: sticky marginalia-style on desktop, hairline-separated, current section highlighted (replaces boxed TOC).

### Exhibit system

- New `Exhibit.astro` component: mono numbered label, hairline frame, inset paper background, caption below, optional ~110% breakout.
- Existing `src/components/paged-attention/*.astro` diagrams get re-skinned into this frame; diagram content unchanged.

### Interactives (all three built this pass)

1. **Scroll-linked exhibits** (`ScrollExhibit.astro`): diagrams advance through steps as the reader scrolls the associated explanation. Vanilla-JS IntersectionObserver wrapper, no framework.
2. **Playable inline demos**: small self-contained widgets (sliders, toggles) embedded mid-essay. Scoped Astro components with vanilla JS; no hydration framework.
3. **Essay series navigation** (`EssaySeries.astro`): "Part 2 of 3 — Serving LLMs" header with prev/next links, driven by a new optional `series` field added to the blog schema in `src/content.config.ts`.

### Code blocks

Warm-dark inset, mono, exhibit-label treatment when referenced in prose.

### Deliberate exclusions

No reactions, comments, share buttons, or reading-progress bar.

## 4. Secondary pages

- **Essays index (`/blog`)**: journal table of contents — title + standfirst, dated typographic rows grouped by year (`YearGroup` restyled with hairline year markers), tags as quiet mono suffixes. No cards/thumbnails.
- **Work**: annotated-list language expanded — mono index, serif title, prose paragraph, mono outcome line; exhibit frames for architecture diagrams.
- **About**: portrait + operating-principle quote as two-column editorial opening; prose + ruled lists after.
- **Talks / Now / Tags / Contact**: simple typographic pages — title, standfirst, ruled rows. Contact: short paragraph, email + LinkedIn as clay text links.
- **Header**: nameplate left, nav right, no blur bar; hairline bottom rule appears on scroll only.
- **Footer**: one hairline rule, mono small print (©, RSS, LinkedIn, GitHub).

## 5. Technical plan

- Changes live in: `public/styles/global.css` (tokens + base styles), `src/layouts/Layout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/WorkCard.astro` (→ rows), `src/components/BlogPostCard.astro`, `src/components/YearGroup.astro`, `src/components/TableOfContents.astro`, `src/components/PageHeader.astro`, and the pages `index`, `blog/index`, `blog/[...slug]`, `work`, `about`, `talks`, `now`, `contact`, `tags/*`.
- New components: `Exhibit.astro`, `ScrollExhibit.astro`, `EssaySeries.astro`.
- Schema: optional `series` field (name + ordered part number) and optional `exhibits` count in the blog schema in `src/content.config.ts`; `exhibits` drives the homepage "N exhibits" marker and is set manually per post in frontmatter.
- Fonts: no additions, no removals (Fraunces + Inter + system mono all stay).
- No new dependencies; no hydration framework; interactives are vanilla JS in scoped `<script>` tags.
- Dark theme recalibrated warm with the same token structure.
- Existing content untouched: all `.md` posts, `src/data/work.json`, talks data. Only paged-attention diagram components get wrapped in Exhibit frames.

## 6. Verification

- `npm run build` passes clean.
- Visual pass on every route, both themes, mobile widths (≤480px, ≤720px).
- Interactive checks: scroll-linked exhibit advances correctly; demos respond; series nav renders only on posts with `series` set.

## Error handling / risks

- Font swap is value-only; fallback stacks unchanged, so no FOUT regression risk.
- Scroll-linked exhibits must degrade gracefully: with JS disabled they render as static exhibits.
- The `series` field is optional; posts without it render exactly as before.
