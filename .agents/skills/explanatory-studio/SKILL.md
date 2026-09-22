---
name: explanatory-studio
description: Write and revise evidence-backed engineering essays for Karan Mittal's Astro studio. Use for article structure, primary citations, and requested syndication; standalone visuals use diagram-craft.
---

# Engineering essays

Explain the mechanism, the constraint, and what the evidence supports. `AGENTS.md` owns voice; the [site-design skill](../site-design/SKILL.md) owns page styling; do not restate a palette here.

## Author

Scaffold with `npm run new`, which fills `src/content/blog/_template.mdx`. Essays live in the `blog` collection, publish under `/writing/<slug>/`, and are listed automatically in the Writing section of `/publications/` and on the homepage. Preserve the structure of existing articles unless the request calls for restructuring.

Frontmatter is validated by `src/content.config.ts`. Beyond the scaffolded fields:

- `titleHtml` — display-only variant carrying `<wbr>` for line-break control. `title` stays plain text for meta, RSS, and SEO.
- `updatedDate`, `featured` — optional.
- `image` — a 1200×630 share card at `/social/<slug>.png`. Without it, previews fall back to the square profile photo, and `Layout.astro` declares the smaller dimensions accordingly. Pair it with `heroCaption`.

Lead with the engineering problem. Trace concrete state transitions, data movement, ownership, or memory layout before drawing conclusions. Distinguish measured results from estimates and illustrative examples.

## Verify every claim

Architecture, algorithms, and performance claims go to papers, official specifications, vendor documentation, or source pinned to a revision — never a secondary blog post or aggregation article. State the workload and hardware conditions behind any metric.

Put citations next to the claims they support. A short inline link is enough for a small claim. For a longer evidence ledger, write a plain table or list — the `PrimaryVerification` component was removed with the site's only essay; build one again only if an essay genuinely needs it.

Equations use KaTeX (`remark-math` + `rehype-katex`, already wired). Define every symbol and connect the equation to the mechanism it explains.

## Illustrate only when it earns the space

Build visuals with the sibling [diagram-craft skill](../diagram-craft/SKILL.md) in its Apple-style grammar (soft tiles, hairlines, one blue path) and import the component into the article. Caption it with a plain `<figure>` and `<figcaption class="dg-caption">`; never copy diagram markup into the MDX. There is no `<Exhibit>` component any more.

Show physical slots, indices, buffers, and state changes when those are central to the explanation. Keep entity names and visual encodings consistent across figures. An interactive control has to reveal a meaningful change — otherwise use a static figure.

Confirm a component exists in the current repository before referring to it. Add interactive infrastructure only when the explanation actually needs it.

## Deliver

There are currently no on-site essays: the previous one was LLM-generated and was removed. A new essay is the first real use of this route, so verify it end to end rather than assuming the template still renders.

Run `npm run build`, then inspect the rendered page and its figures in both themes:

```
npm run shot /writing/<slug>/
npm run shot -- /writing/<slug>/ --mobile
```

Read the PNGs it writes to `test-results/`. Report unresolved source or rendering gaps specifically rather than glossing them.

Generate distribution assets only when asked: LinkedIn takes a concise 4:5 visual sequence; Medium and Substack take Markdown with a canonical link header. Publication is a separate, user-directed action.
