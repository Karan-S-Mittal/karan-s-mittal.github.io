# Agent instructions

Karan Mittal's personal site (`karan-s-mittal.github.io`): a static Astro 7 site deployed to GitHub Pages. For commands and layout, see [README.md](README.md). This file covers how to work here and where the site stands.

## 1. Who and how

- **Karan** is a data visualisation expert and the co-founder and CTO of Dextar. He has built data apps in Plotly Dash since 2019, worked at Plotly as a software engineer (dash-DAQ, dash-VTK), and built analytics for semiconductor manufacturing (Lam Research) and oncology teams (UsefulBI). He is hired as a client engagement; clients are the main reader. Writing, talks and community work build community trust; they aren't offered as proof of client work.
- **Facts** about his career come from his resume (2026-09). Don't add a claim it doesn't support. Removed as untrue or unsupported: a distributed storage and Linux internals background, graph theory research, semiconductor supply chain work at Dextar.
- **Voice:** calm, exact, evidence-backed, first person. No hype and no marketing filler. For rigour and clarity, aim for Bartosz Ciechanowski and 3Blue1Brown.
- **Honesty:** never add placeholder, speculative or invented content (clients, metrics, case studies, entries). Label things as what they are.

## 2. Evidence

Architecture, algorithm and performance claims cite **primary sources** next to the claim: papers (arXiv, ACM, IEEE), specs and RFCs, vendor architecture docs, or source code pinned to a commit. Never cite a secondary blog post or an aggregator. State the workload and hardware behind any number.

## 3. Rules live in skills

Read the relevant skill before changing anything, and don't restate its rules elsewhere:

| Work | Skill |
| --- | --- |
| Pages, components, type, spacing, copy | [`.agents/skills/site-design/SKILL.md`](.agents/skills/site-design/SKILL.md) |
| Figures and diagrams | [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md) |
| Essays, citations, syndication | [`.agents/skills/explanatory-studio/SKILL.md`](.agents/skills/explanatory-studio/SKILL.md) |

The non-negotiables:
- **Values:** design values live only in `src/styles/global.css` as tokens with light and dark values. No raw hex in components.
- **Blue:** blue marks clickable things (and the active path in figures). One `.button` per page; `.more-link` for everything else.
- **Layout:** one page width (`--width-page` via `.wrap`) and one left edge for header, sections and footer. Sections are full-width bands, alternating plain and tinted; on the homepage each one stacks its title above its content. The header scrolls away (not sticky). Vertical gaps come from the `--gap-*` scale. Hairlines divide list items only. No cards, pills, badges, glass or backdrops.
- **Type:** eight sizes; weights 400 and 600; sentence-case labels; mono for dates and code only.

## 4. Verify

- `npm run build` is the only automated check.
- Every visual change also needs `npm run shot <route>` and `npm run shot -- <route> --mobile`. Read the PNGs in `test-results/` yourself.
- Run `npm audit` after dependency changes. Regenerate the lockfile with npm 12 (see README → Deploy).
- Don't add tooling unless it guards a defect the site actually shipped. There is deliberately no linter and no snapshot suite.

## 5. Git

- Work and commit directly on `main` in this checkout. No feature branches and no extra worktrees unless Karan asks.
- Make small, atomic commits. Push only when asked. Pushing to `main` deploys the live site.

## 6. Current state (2026-09-23)

**Site.**
- Nav is Writing and talks (`/publications/`) · About, with Contact as the standing action. Now is linked from the footer only until it has real current items again.
- `/publications/` lists Writing and Talks. `/rss.xml` carries essays, external articles and talks; the footer's RSS link opens `/feed/`, which explains how to subscribe.
- `/now/` content lives in `src/data/now.ts` and is updated in the first week of each month. Its date is that file's last commit. Its Software section appears once `software` in `src/data/publications.ts` has an entry.
- `/writing/`, `/speaking/`, `/talks/`, `/blog/`, `/tags/` and `/topics/` only redirect.
- Essays publish at `/writing/<slug>/`. There are none yet, so Astro warns that the `blog` collection is empty. That's expected; don't add a placeholder to silence it.

**Homepage**, from top to bottom, one band each:
- hero (plain): Karan's name, role line, lead and actions on the left; his photo on the right
- "What I build" (tinted): three items from `src/data/practice.ts` in three columns, each with an illustrative `PracticeChart`, and a caption saying the data is illustrative. The offer comes before the community proof.
- writing and talks (plain): community icons, then the Mem0 article and the latest talks in three columns. These are for community trust, not proof of client work.
- closing (tinted): one question and one contact link

**Design.** Apple-clean with the blue accent, which Karan likes: keep it. After friends' feedback (2026-09-23) the layout was widened to one 1200px edge with stacked sections on tinted bands, and Karan was moved onto the first screen. Don't reintroduce centred heroes, eyebrows above every headline, or headlines ending in full stops. Don't bring back removed patterns either: uppercase mono labels, pills or chips, blueprint-style diagrams, decorative backdrops, a diagram gallery, topic archives.

**Photos.** The hero and the default share image are a portrait of Karan (September 2026). Web crops live in `public/photos/` with metadata (including GPS) stripped. About still uses `portrait.jpg`, the speaking photo.

**Open work is proof, which Karan supplies:**
- a public repo
- an anonymised case write-up with one measured outcome
- a human-written essay, plus whatever figure it genuinely needs

**Distribution.** Only when asked, turn an essay into a 4:5 LinkedIn carousel or a Markdown cross-post with a canonical link. Karan publishes essays on Medium first, then here: set `firstPublished: { site, url }` in the essay's frontmatter, which shows "First published on Medium" and points the canonical link at the original. If he'd rather this site rank, leave the field out and set the canonical link in Medium's story settings to the site URL instead.
