/**
 * The three failure modes this practice exists to fix.
 *
 * Deliberately compressed: one problem line, one intervention line. Detail
 * belongs in a conversation, not on the homepage.
 */

export interface PracticeArea {
  id: string;
  num: string;
  /** The failure as a team would describe it. */
  problem: string;
  /** What gets built in response. */
  intervention: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    id: 'reliability',
    num: '01',
    problem: 'Agents hallucinate tool calls and break in production.',
    intervention:
      'Deterministic state machines, schema-enforced tool routing, sandboxed execution, and regression gates that run on every prompt or model change.',
  },
  {
    id: 'state',
    num: '02',
    problem: 'Multi-agent state leaks across sessions and handoffs deadlock.',
    intervention:
      'A tiered memory plane — episodic recall, session compaction, semantic retrieval — with explicit supervisor-worker protocols and loop-breakers.',
  },
  {
    id: 'scale',
    num: '03',
    problem: 'Inference cost and p99 latency scale out of control.',
    intervention:
      'Semantic caching, prompt distillation, context-budget pruning, and dynamic routing between frontier and compact models.',
  },
];
