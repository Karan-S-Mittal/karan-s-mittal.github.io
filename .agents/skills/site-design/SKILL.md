---
name: site-design
description: Page UI rules for Karan Mittal's Astro site — the Apple-clean design system (neutral greys, blue for clickable only, whitespace-led layout, eight-size type scale, one button per page). Use whenever adding or changing a page, section, component, header/footer, or site copy. Figures use diagram-craft; essays use explanatory-studio.
---

# Site design: Apple-clean

The site should read like a well-edited Apple product page: a quiet field, confident type, generous space, and colour only where you can click. Follow this skill for any page, section, component, or copy change. `src/styles/global.css` holds the values; this file holds the rules. Refer to token names, never to the hex values behind them.

## Principles

1. **Text-led, whitespace-led.** Separate sections with space (`--gap-section`, see Spacing), not lines. A hairline (`--ie-rule`) only divides items inside a list.
2. **Blue means clickable.** `--ie-blue` marks links, `.more-link`, and the `.button` fill (`--ie-button`). Nothing decorative is blue. Header nav links are `--ie-ink-secondary` and turn ink on hover or when current.
3. **One button per page.** A single `.button` (blue rounded square, `--radius-control`, squircle where supported) for the page's main action. Every other action is a `.more-link` (blue text followed by a ›).
4. **No chrome on pages.** No cards, tiles, tinted bands, pills, chips, badges, shadows, glassmorphism, or decorative backdrops. Soft tiles exist only inside diagrams.
5. **Quiet labels.** A section label is an `.eyebrow` (or `.register` / `PageHeader` `label`): short, sentence case, semibold sans, `--ie-muted`. Never uppercase, never numbered, never accent-coloured.
6. **Dark mode keeps the hierarchy.** Every colour comes from a token that has both a light and a dark value.

## Type

The fonts are Plus Jakarta Sans (`--font-display`) for headings, Inter (`--font-sans`) for everything you read, and JetBrains Mono (`--font-mono`) **only** for dates (`<time>`) and code. Use two weights: 400 for reading and 600 for emphasis.

There are eight sizes. Use the tokens and never add a literal size:

| Token | Size | Use |
| --- | --- | --- |
| `--ie-type-caption` | 13px | dates, captions, footer |
| `--ie-type-small` | 15px | nav, eyebrows, meta lines, secondary text |
| `--ie-type-base` | 17px | body |
| `--ie-type-body` | 19px | page leads (in `--ie-muted`) |
| `--ie-type-h3` | 22px | list-item titles |
| `--ie-type-h2` | fluid | section headlines |
| `--ie-type-h1` | fluid | page headlines |
| `--ie-type-display` | fluid | homepage hero only |

The legacy names `--ie-type-micro`, `label`, `ui` and `h4` are aliases of these steps. Headlines use weight 600 with slightly negative letter-spacing. Leads sit in `--ie-muted` directly under the headline.

## Layout

- Pages use `.container` (960px) or `.practice-page`. Diagrams may run wider (up to about 1100px) when they sit in a centred hero.

### Spacing: six gaps, chosen by relationship

Every vertical gap between blocks comes from these tokens (`global.css`), never from a literal value or by eye:

| Token | Desktop / phone | Between |
| --- | --- | --- |
| `--gap-tight` | 8 | eyebrow → heading |
| `--gap-related` | 16 | heading → lead; a line that belongs to the one above it |
| `--gap-group` | 40 / 32 | heading block → its content; content → its actions or `›` links; lead → buttons |
| `--gap-block` | 64 / 48 | page intro (`PageHeader`) → page content; hero actions → hero figure |
| `--gap-section` | 128 / 80 | major sections (`.section` / `.pub-section`); last section → footer |
| `--page-top` | 128 / 80 | header bar → first heading on every page |

Rules:
- Related things must sit closer than unrelated things. A lead belongs directly under its headline; never put a figure between them.
- A heading block's last child has no bottom margin, so only the gap token separates it from what follows.
- Never pull an element up with a negative margin. Put page-intro actions in `PageHeader`'s slot.
- List items inside ruled lists reset the browser's `li` margin (`margin: 0`).
- To check, measure the rendered gaps, not the CSS. Every gap between blocks should be one of the values above.
- Don't add rules between sections.
- Lists (practice items, publications, talks, community) are rows separated by `--ie-rule` hairlines, with a hairline above the first row.
- Every layout must hold at 390px wide: grids collapse to one column, and nothing may cause horizontal scroll.

## Building blocks

Reuse these before writing anything new:

- **Global classes** (`global.css`): `.button`, `.more-link`, `.eyebrow`, `.container`.
- **Page parts** (`src/components/`):
  - `content/PageHeader.astro`: label, h1, lead and an optional actions slot for every inner page. It owns the `--gap-block` below it.
  - `content/YearGroup.astro`: a year heading over a list.
  - `content/TalkCard.astro`: one talk row.
  - `layout/Header.astro`: a solid 52px bar with centred nav and Contact as a blue link. No blur.
  - `layout/Footer.astro`: small grey text links on `--ie-surface-raised`.
- **Page styles:** `src/styles/practice.css`, shared by the homepage and About.
- **Data** (`src/data/`):
  - `practice.ts`: the three "What I fix" items and their figure kinds.
  - `publications.ts`: external writing, plus `software`, which renders only when it isn't empty.
  - `talks.json` and `communities.json`.
- **Figures:** `src/components/diagram/**`, built with the diagram-craft skill.

## Information architecture

- The nav is **Publications · About · Now**, with Contact as the standing action.
- `/publications/` holds Writing, Talks and Software. `/writing/`, `/speaking/`, `/talks/`, `/blog/`, `/tags/` and `/topics/` only redirect there.
- Essays live at `/writing/<slug>/`.
- Don't add sections or nav items for content that doesn't exist yet.

## Copy

- **Position:** graph-grounded knowledge systems and LLM evaluation, with graph theory research. AI agents are one application, not the headline. Karan is hired independently; Dextar is a credential, not the offer.
- **Voice:** calm, exact, first person, and sentence case everywhere, including headings, buttons, labels and titles.
- **Honest labels:** call a thing what it is. Don't use words like "research", "masterclass" or "case study" unless that is literally what it is. Never add placeholder, speculative or invented entries.
- **Brevity:** one idea per sentence and one purpose per section. Say something once per page.

## Checklist for a new page or section

1. Reuse `PageHeader` and the global controls; add no new colours or sizes.
2. One `.button`, `.more-link` for everything else, and an `.eyebrow` label.
3. Sections separated by space; hairlines only inside lists.
4. Mono only on `<time>` and code.
5. Links go where their label says.

## Verify

1. Run `npm run build`.
2. Run `npm run shot <route>` and `npm run shot -- <route> --mobile`. Read the light, dark and phone PNGs in `test-results/` yourself.
3. Check contrast when you introduce a new colour pairing. Text on its background must reach 4.5:1.
