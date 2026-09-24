---
name: site-design
description: Page UI rules for Karan Mittal's Astro site — the Apple-clean design system (neutral greys, blue for clickable only, one 1200px page width with a single left edge, stacked sections on alternating bands, eight-size type scale, one button per page). Use whenever adding or changing a page, section, component, header/footer, or site copy. Figures use diagram-craft; essays use explanatory-studio.
---

# Site design: Apple-clean

The site should read like a well-edited Apple product page with a person behind it: a quiet field, confident type, one left edge, and colour only where you can click. Karan himself (name, photo, role, communities) is on the first screen. Follow this skill for any page, section, component, or copy change. `src/styles/global.css` holds the values; this file holds the rules. Refer to token names, never to the hex values behind them.

## Principles

1. **One edge, one width.** Header, sections and footer share `--width-page` through `.wrap`, so everything starts at the same left x. Sections are full-width `.band`s; alternate plain and `.band--tint` to give the page structure. A hairline (`--ie-rule`) only divides items inside a list.
2. **Blue means clickable.** `--ie-blue` marks links, `.more-link`, and the `.button` fill (`--ie-button`). Nothing decorative is blue. Header nav links are `--ie-ink-secondary` and turn ink on hover or when current. List titles are links, so `AccentTitle` may pick out a short name in them (up to three words before ": " or " — ", as in "Agentverse:") in blue. Titles without one stay ink, so the accent falls unevenly down a list. Keep it to list titles: never whole titles, and never headlines.
3. **One button per page.** A single `.button` (blue rounded square, `--radius-control`, squircle where supported) for the page's main action. Every other action is a `.more-link` (blue text followed by a ›).
4. **Bands, not boxes.** The tinted band is the only surface on a page. No cards, tiles, pills, chips, badges, shadows, glassmorphism, or decorative backdrops. Soft tiles exist only inside diagrams.
5. **Titles do the labelling.** A section title names the section, so it gets no eyebrow. Use an `.eyebrow` (or `PageHeader` `label`) only where it adds information the headline doesn't. It is short, sentence case, semibold sans, `--ie-muted`; never uppercase, numbered, or accent-coloured.
6. **Dark mode keeps the hierarchy.** Every colour comes from a token that has both a light and a dark value.
7. **Built for scanning.** Visitors don't read a page; they hunt for one answer. Help them with structure, not decoration:
   - **Lock repeated fields to an edge.** Dates lead every meta line (`date · kind`), so they form one column, like prices on a receipt.
   - **Only align what's related.** Lining things up says they belong together. Don't put unrelated items on the same grid, such as a row of community logos over a row of articles.
   - **Differentiate dense lists.** When rows look alike, give each one a recognisable mark in a fixed column (the community icon on talks), or group them (years in a rail).
   - **Emphasis comes from context.** To make something stand out, quiet what's around it. Don't add colour or weight to it.

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

- **Page width.** `--width-page` (1200px) is the only page width. `.wrap` applies it with the side gutter; `.container` is `.wrap` plus `--page-top`. The header, the footer and every band use it. Never centre a narrower column inside it: cap the *measure* with `max-width` in `ch` on text instead (about 64ch for body, 52ch for leads).
- **Sections stack.** On the homepage every section is the same shape: title (and lead) on the page edge, then its content below. Don't mix a side title with full-width content in one section; the eye loses the structure and sections seem to run into each other.
- **Parallel items in columns.** Three items of the same kind (recent work, the practice rows) sit side by side in three columns, so a section fits on about one laptop screen. They stack below 900px.
- **Rail rows.** `.rail` puts a short heading in a left column and its entries on the right. Use it for list pages (the areas on `/now/`, the years on `/publications/` through `YearGroup`), not for homepage sections. It collapses to one column at 720px.
- **Bands.** `.band` is a full-width section with `--gap-section` padding top and bottom; `.band--tint` fills it with `--ie-surface-raised`. Alternate plain and tinted; never put two tinted bands next to each other. When the last band is tinted it runs into the footer (the footer drops its top gap).
- **Heroes are left-aligned** on the page edge: text on the left, the portrait on the right, stacking on phones. No centred heroes.

### Spacing: six gaps, chosen by relationship

Every vertical gap between blocks comes from these tokens (`global.css`), never from a literal value or by eye:

| Token | Desktop / phone | Between |
| --- | --- | --- |
| `--gap-tight` | 8 | eyebrow → heading |
| `--gap-related` | 16 | heading → lead; a line that belongs to the one above it |
| `--gap-group` | 40 / 32 | heading block → its content; content → its actions or `›` links; lead → buttons |
| `--gap-block` | 64 / 48 | page intro (`PageHeader`) → page content; a section's lead figure → the list below it |
| `--gap-section` | 96 / 64 | band padding (`.band`); major sections (`.section` / `.pub-section`); last section → footer |
| `--page-top` | 96 / 64 | header bar → first heading on every page |

Rules:
- Related things must sit closer than unrelated things. A lead belongs directly under its headline; never put a figure between them.
- A heading block's last child has no bottom margin, so only the gap token separates it from what follows.
- Never pull an element up with a negative margin. Put page-intro actions in `PageHeader`'s slot.
- List items inside ruled lists reset the browser's `li` margin (`margin: 0`).
- To check, measure the rendered gaps, not the CSS. Every gap between blocks should be one of the values above.
- Don't add rules between sections; the band change is the divider.
- Lists (practice items, publications, talks, community) are rows separated by `--ie-rule` hairlines, with a hairline above the first row.
- Every layout must hold at 390px wide: grids collapse to one column, and nothing may cause horizontal scroll.

## Building blocks

Reuse these before writing anything new:

- **Global classes** (`global.css`): `.button`, `.more-link`, `.eyebrow`, `.wrap`, `.container`, `.band`, `.band--tint`, `.rail`.
- **Page parts** (`src/components/`):
  - `content/PageHeader.astro`: label, h1, lead and an optional actions slot for every inner page. It owns the `--gap-block` below it.
  - `content/YearGroup.astro`: one rail row, with the year on the left and its entries on the right. Consecutive groups share hairlines.
  - `content/TalkCard.astro`: one talk row. The community icon sits in a fixed 36px column, which stays empty when the talk wasn't hosted by one of Karan's communities, so every row's text starts at the same edge.
  - `content/AccentTitle.astro`: renders a list title with its short name in blue. Use it for every list title (talks, writing, recent work) so the rule applies the same way everywhere.
  - `content/CommunityIcon.astro`: a community's square icon with its 1px outline. It's the only place that icon is styled.
  - `layout/Header.astro`: a solid 52px bar: the `Mark` and name on the left, centred nav, Contact as a blue link. No blur, and not sticky: it scrolls away with the page, because a fixed bar sliding over tinted bands reads as overlapping sections.
  - `layout/Mark.astro`: the 8 mark, a flat two-tone redraw of `docs/brand/symbol.png`: blue top loop and front strand, ink bottom loop cut away where the blue crosses. `public/favicon.svg` (switches colours with the browser theme), `favicon-32.png` (on a white tile) and `apple-touch-icon.png` are the same drawing; change them together. The 3D render and the lockups in `docs/brand/` are for large uses off the site; the tagline in them never appears on the site.
  - `layout/Footer.astro`: small grey text links on `--ie-surface-raised`.
- **Page styles:** `src/styles/practice.css`, shared by the homepage and About.
- **Data** (`src/data/`):
  - `practice.ts`: the three "What I fix" items and their figure kinds.
  - `publications.ts`: external writing, plus `software`, which renders only when it isn't empty.
  - `communities.json`: Karan's communities. Their icons appear in three places, always through `CommunityIcon`: a free-flowing row on the homepage (never locked to the column grid below it), the avatar column on talk rows, and the About community list.
  - `talks.json`: one entry per session. Set `community` only when one of Karan's own communities hosted it; never to suggest a connection that isn't there. `type` names what he did (`talk`, `workshop`, `panel`, `keynote`, `walkthrough`), and `talkTypeLabel` in `src/types/talks.ts` holds the single label map for every page and the RSS feed. Order `links` by strength of proof: the organiser's event page first (it names him), then the paper, slides or his own post (for example LinkedIn). The title links to the first one.
  - `now.ts`: the /now content; its date is the file's last commit.
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
- **Headlines** have no trailing full stop. Avoid slogan-shaped one-liners, tidy lists of three, and paired dashes: they read as generated. Give each lead one concrete detail (a domain, a number, an event).

## Checklist for a new page or section

1. Reuse `PageHeader`, `.wrap`, `.band` and `.rail`; add no new colours or sizes.
2. One `.button`, `.more-link` for everything else. An eyebrow only if it adds information.
3. One left edge; sections separated by bands or space; hairlines only inside lists.
4. Mono only on `<time>` and code.
5. Links go where their label says.
6. Dates lead meta lines; nothing sits on a shared grid unless it's related.

## Verify

1. Run `npm run build`.
2. Run `npm run shot <route>` and `npm run shot -- <route> --mobile`. Read the light, dark and phone PNGs in `test-results/` yourself. Check that the header name, the headline and every section title share one left edge.
3. Check contrast when you introduce a new colour pairing. Text on its background must reach 4.5:1.
