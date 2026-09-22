/**
 * The three failure modes this practice exists to fix.
 *
 * Deliberately compressed: one problem line, one intervention line. Detail
 * belongs in a conversation, not on the homepage. Agents are one application
 * of graph-grounded verification, not the headline.
 */

/** The small figures drawn by src/components/diagram/home/PracticeGlyph.astro. */
export type GlyphKind = 'provenance' | 'evaluation' | 'verification';

export interface PracticeArea {
  id: string;
  /** Which small figure sits beside the item on the homepage. */
  diagram: GlyphKind;
  /** The failure as a team would describe it. */
  problem: string;
  /** What gets built in response. */
  intervention: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    id: 'traceability',
    diagram: 'provenance',
    problem: 'Answers can’t be traced back to evidence.',
    intervention:
      'Knowledge graphs that keep provenance on every entity and claim — source, version, and confidence — so any answer can be walked back to the records behind it.',
  },
  {
    id: 'evaluation',
    diagram: 'evaluation',
    problem: 'No one can say whether the model is getting better or worse.',
    intervention:
      'Evaluation suites built from real questions and graded against ground truth, run as a regression gate on every prompt, model, or data change.',
  },
  {
    id: 'agents',
    diagram: 'verification',
    problem: 'Agents act on claims no one has checked.',
    intervention:
      'Graph-grounded verification between retrieval and action: what an agent is about to rely on is checked against the knowledge graph before the tool call goes through.',
  },
];
