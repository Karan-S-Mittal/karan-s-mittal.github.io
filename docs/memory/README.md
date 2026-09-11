# Durable Project Memory

This directory is the repository's compact, versioned memory. It keeps the working context needed to continue development across sessions without turning the repo into a chat transcript.

## Read order

1. [`current-state.md`](./current-state.md) — what exists now, important boundaries, and verified baselines.
2. [`decisions.md`](./decisions.md) — decisions that should not be casually reversed, with their evidence.
3. [`backlog.md`](./backlog.md) — the ordered queue of improvements, pruning, and known failures.

## Update protocol

- Update `current-state.md` when the implementation, build contract, or active work changes.
- Add a dated entry to `decisions.md` only when there is a durable trade-off or an explicit choice.
- Keep `backlog.md` actionable: each item has a priority, location, desired invariant, and status.
- Prefer links to source files and primary references over copied explanations.
- Remove stale entries when their source of truth changes; do not preserve contradictory “memories.”
- Never record secrets, tokens, private contact data, or a full conversation log.

The source of truth for visual semantics remains `docs/design-language.md`; this memory layer records how the system is being operated around that source, not a second design system.
