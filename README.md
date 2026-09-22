# karan-s-mittal.github.io

Karan Mittal's personal site: graph-grounded knowledge systems, LLM evaluation, writing and talks. Live at **https://karan-s-mittal.github.io**.

It's a static [Astro](https://astro.build) site. Every push to `main` deploys to GitHub Pages.

## Run it

Requires Node 22.12 or later.

```sh
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run build` | Builds to `dist/`. This is the only automated check: it fails on broken imports, bad CSS or an invalid post. |
| `npm run preview` | Serves the built site. |
| `npm run shot <route> [selector]` | Screenshots a built page in light and dark mode to `test-results/`. |
| `npm run shot -- <route> --mobile` | The same at phone width (390px). |
| `npm run new` | Creates a new essay from `src/content/blog/_template.mdx`. |
| `npm run icon <query>` | Searches Lucide and brand icons for diagrams. |

## Where things live

```
src/
  pages/            index, about, now, contact, publications (+ redirects)
  components/
    content/        PageHeader, YearGroup, TalkCard, essay parts
    layout/         Header, Footer, TableOfContents
    diagram/        figures: home/ (hero + practice), primitives/diagram.css
  data/             practice.ts, publications.ts (writing + software), talks.json, communities.json
  content/blog/     essays (MDX), published at /writing/<slug>/
  styles/           global.css (all design tokens), practice.css
scripts/            capture-page.js (shot), new-post.js, find-icon.js
.agents/skills/     design, figure and essay rules (linked into .claude/skills/)
```

## Common edits

- **Add an article published elsewhere:** add an entry to `externalWriting` in `src/data/publications.ts`.
- **Add a talk:** add an entry to `src/data/talks.json`.
- **Add a repo:** add an entry to `software` in `src/data/publications.ts`. The Software section appears on `/publications/` once the list isn't empty.
- **Write an essay:** run `npm run new`, write it in `src/content/blog/`, and set `draft: false` to publish.
- **Update /now:** edit `src/pages/now.astro` and change `lastUpdated`.

## Design rules

The site follows one design system: neutral greys, blue only for things you can click, spacing instead of dividers, and Apple-style figures. The rules live in:

- [`.agents/skills/site-design/SKILL.md`](.agents/skills/site-design/SKILL.md): pages, type, spacing, copy
- [`.agents/skills/diagram-craft/SKILL.md`](.agents/skills/diagram-craft/SKILL.md): figures
- [`.agents/skills/explanatory-studio/SKILL.md`](.agents/skills/explanatory-studio/SKILL.md): essays and citations
- [`AGENTS.md`](AGENTS.md): instructions and current state for AI coding agents

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main`. It runs `npm ci` and a build, then deploys to Pages. The runner uses npm 12, which checks `package-lock.json` more strictly than older npm. After changing dependencies, run `npx npm@latest install --package-lock-only` before committing.
