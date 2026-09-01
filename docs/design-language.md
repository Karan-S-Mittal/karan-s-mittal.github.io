# Instrumented Editorial — Working Design Language

**Status:** Active · selected 2026-09-01

**Full specification:** [`instrumented-editorial.md`](instrumented-editorial.md)

**Supersedes:** Soft Architecture v1, now retained only as historical context
**Site role:** Present Karan Mittal as an engineer-scientist who makes consequential systems inspectable.

## The idea

> **A technical journal where every important idea can be inspected.**

The visual system combines the authority of an editorial publication with the precision of an engineering instrument. Pages are quiet; exhibits are active. The repeated explanatory sequence is:

`Premise → Mechanism → Constraint → Evidence → Decision`

## Principles

1. **Explain before decorating.** Every visual element must clarify structure, state, sequence, evidence, or emphasis.
2. **Inspection is the signature interaction.** Readers manipulate a meaningful input and observe a meaningful result.
3. **Evidence has a visible address.** Claims connect to source, measurement, or implementation detail through a verification ledger.
4. **Quiet surrounds density.** Prose stays narrow; exhibits may widen when the mechanism needs space.
5. **Hierarchy comes from type, rules, and space.** Cards, tint, radii, and shadows are supporting tools rather than the default composition.
6. **Dark mode preserves meaning.** The hierarchy and semantic palette survive theme changes.

## Type

| Role | Typeface | Use |
| --- | --- | --- |
| Editorial | IBM Plex Serif | Display headings, essay titles, major section openings |
| Interface | IBM Plex Sans | Navigation, body copy, controls, diagram labels |
| Instrument | IBM Plex Mono | Measurements, metadata, citations, code, state readouts |

- Reading column: **700px**, 17px body, 1.68–1.78 line height.
- Essay H1: 48–90px depending on viewport; H2: 34–52px.
- Avoid mixing display and interface faces within the same semantic role.

## Colour

| Role | Light | Dark | Meaning |
| --- | --- | --- | --- |
| Canvas | `#F7F5EF` | `#111318` | Page field |
| Surface | `#FFFFFF` | `#181C22` | Exhibit and code-adjacent plane |
| Ink | `#171A1F` | `#F3F4F6` | Text and direct structure |
| Secondary ink | `#3F4752` | `#D5D9DF` | Body and supporting explanation |
| Muted | `#5B6470` | `#AEB6C2` | Metadata, dimensions, inferred state |
| Rule | `#D8D6CF` | `#2B3038` | Dividers and boundaries |
| Instrument blue | `#2857D9` | `#8DAAFF` | Links, active state, direct flow |
| Constraint rust | `#A63D17` | `#FFB36B` | Bottleneck, caveat, failure, decision |

Use `--ie-*` or mapped semantic tokens. Rust is never a generic decoration or default CTA. Do not carry old pink/lavender palette values into new work.

## Layout contract

- **700px:** reading and argumentative prose.
- **1040px:** diagrams, evidence, tables, and interactive inspection exhibits.
- **1280px:** outer page shell and two-column article-with-contents layout.
- No permanent background grid. Use local axes or measurement marks only inside exhibits.
- Prefer ruled registers, ledgers, and editorial lists to arrays of independent cards.

## Exhibit grammar

All meaningful figures use `<Exhibit />` with an exhibit number, descriptive title, technical badge, and accessible caption.

- 1–1.5px rules; 4–8px functional radii; no ambient shadows.
- Solid ink/blue paths are direct or synchronous.
- Dashed muted paths are async, inferred, optional, or eventual.
- Rust marks a constraint; use one dominant rust locus per figure.
- Labels use IBM Plex Sans; values, indices, and addresses use IBM Plex Mono.
- Colour must be redundant with shape, label, line style, or position.
- Use leader callouts for surprising behaviour: `← notice zero allocation here`.

## Page rhythm

`QUIET PREMISE → EXPLANATORY PROSE → DENSE MECHANISM → CONSTRAINT → EVIDENCE → QUIET DECISION`

The homepage opens with a clear proposition and a system trace, then presents selected work as a ledger. Essays use a narrow reading column, wide numbered exhibits, an optional progress rail, and a primary-source verification ledger.

## Interaction and motion

- Animate state changes, causal paths, and transitions—not decoration.
- Prefer 120–180ms transitions for controls and 250–450ms for explanatory state changes.
- No bounce, spring, hover scale, particle fields, or ambient topology.
- Pause canvases when off-screen and respect `prefers-reduced-motion`.

## Acceptance checklist

Before calling a page or exhibit complete:

1. The explanatory sequence is legible without relying on colour.
2. Prose and exhibit widths follow the 700 / 1040 / 1280 system.
3. Every exhibit has a title, badge, caption, and accessible explanation.
4. Claims and performance numbers connect to primary evidence.
5. Desktop light, desktop dark, and mobile layouts have been inspected.
6. `npm run prebuild` and `npm run build` complete without errors.
7. Visual baselines are updated only after the new language is approved.
