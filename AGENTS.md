# Agent instructions

Karan Mittal's personal site (`karan-s-mittal.github.io`): a static Astro 7 site deployed to GitHub Pages. For commands and layout, see [README.md](README.md). This file covers how to work here and where the site stands.

## 1. Who and how

- **Karan** is an independent engineer working on graph-grounded knowledge systems and LLM evaluation, with research in graph theory. He co-founded Dextar; it's a credential, not the offer. AI agents are one application of his work, not the headline.
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
- **Space:** use space, not chrome. Vertical gaps come from the `--gap-*` scale. Hairlines divide list items only. No cards, pills, badges, glass or backdrops.
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
- Nav is Publications · About · Now, with Contact as the standing action.
- `/publications/` lists Writing and Talks. Its Software section appears once `software` in `src/data/publications.ts` has an entry.
- `/writing/`, `/speaking/`, `/talks/`, `/blog/`, `/tags/` and `/topics/` only redirect.
- Essays publish at `/writing/<slug>/`. There are none yet, so Astro warns that the `blog` collection is empty. That's expected; don't add a placeholder to silence it.

**Homepage**, from top to bottom:
- a centred hero: headline, lead, actions, then the `EvidenceTrail` figure
- "What I fix": three items from `src/data/practice.ts`, each with a `PracticeGlyph`
- recent writing and talks
- a closing contact section beside the portrait

**Design.** The Apple-clean system is settled and Karan is happy with it. Hold the line; don't reintroduce removed patterns (uppercase mono labels, pills or chips, blueprint-style diagrams, decorative backdrops, a diagram gallery, topic archives).

**Open work is proof, which Karan supplies:**
- a public repo
- an anonymised case write-up with one measured outcome
- a human-written essay, plus whatever figure it genuinely needs

**Distribution.** Only when asked, turn an essay into a 4:5 LinkedIn carousel or a Markdown cross-post with a canonical link.
