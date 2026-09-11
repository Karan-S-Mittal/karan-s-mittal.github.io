---
name: explanatory-studio
description: Write and revise evidence-backed engineering essays for Karan Mittal's Astro blog. Use for article structure, primary citations, and requested syndication; standalone diagrams use diagram-craft.
---

# Engineering essays

Explain the mechanism, the constraint, and what the evidence supports. Follow the repository's `AGENTS.md` for voice, design tokens, and project memory; do not maintain another palette here.

## Author

- Scaffold new posts with `npm run new` or `src/content/blog/_template.mdx`. Preserve the structure of existing articles unless the request calls for restructuring.
- Lead with the engineering problem. Trace concrete state transitions, data movement, ownership, or memory layout before drawing conclusions. Distinguish measured results from estimates and illustrative examples.
- Verify architecture, algorithms, and performance claims against papers, official specifications, vendor documentation, or source code pinned to a revision. State relevant workload and hardware conditions for metrics.
- Put citations near claims. For a longer evidence ledger, use `src/components/editorial/PrimaryVerification.astro` with explicit article-specific citation data; never rely on its sample defaults. A short linked citation is sufficient for a small claim.
- Use KaTeX for equations. Define symbols and connect each equation to the mechanism it explains.

## Illustrate only as needed

Use the sibling [diagram-craft skill](../diagram-craft/SKILL.md) for visuals. Import its reusable component into the article; do not copy markup or create a second preview page.

Show physical slots, indices, buffers, and state changes when those are central to the explanation. Keep entity names and visual encodings consistent between figures. An interactive control should reveal a meaningful change; otherwise prefer a static exhibit.

Before referring to a reusable component or library, confirm it exists in the current repository. Add interactive infrastructure only when the requested explanation needs it.

## Deliver

Run `npm run build` after article edits and inspect the affected page and exhibits. Report unresolved source or rendering gaps specifically.

Generate distribution assets only when requested: LinkedIn uses a concise 4:5 visual sequence; Medium/Substack use Markdown with a canonical link. Adapt to the requested length and channel. Publication is a separate user-directed action.
