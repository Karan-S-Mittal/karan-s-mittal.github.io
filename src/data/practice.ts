/**
 * The three kinds of work under "What I build" on the homepage.
 *
 * Deliberately compressed: one title line, one description line. Detail
 * belongs in a conversation, not on the homepage.
 */

/** The small charts drawn by src/components/diagram/home/PracticeChart.astro. */
export type ChartKind = 'metric' | 'versions' | 'network';

export interface PracticeArea {
  id: string;
  /** Which illustrative chart sits above the item on the homepage. */
  chart: ChartKind;
  /** What gets built, as a client would name it. */
  problem: string;
  /** What that involves. */
  intervention: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    id: 'dashboards',
    chart: 'metric',
    problem: 'Dashboards your team can run',
    intervention:
      'Plotly Dash and Streamlit apps on your own data, built so your team can change them after I leave.',
  },
  {
    id: 'model-charts',
    chart: 'versions',
    problem: 'Charts that explain a model',
    intervention:
      'Evaluation results and errors drawn so people outside the ML team can see where a model fails.',
  },
  {
    id: 'connected-data',
    chart: 'network',
    problem: 'Views of connected data',
    intervention:
      'Knowledge graphs and networks laid out so you can follow one record to the next.',
  },
];
