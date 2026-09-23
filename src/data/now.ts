/**
 * The /now page. Edit this file in the first week of each month: the page's
 * "Updated" date is this file's last commit date (see src/pages/now.astro).
 */

export interface NowItem {
  text: string;
  link?: { text: string; url: string };
}

export interface NowArea {
  id: string;
  category: string;
  items: NowItem[];
}

export const nowAreas: NowArea[] = [
  {
    id: 'building',
    category: 'Building',
    items: [
      { text: 'Co-founding and leading systems engineering at ', link: { text: 'Dextar.co', url: 'https://dextar.co' } },
      { text: 'Graph-grounded traceability and evidence screening pipelines for complex manufacturing supply chains' },
      { text: 'Knowledge systems that combine graph structure with LLM retrieval, where every answer carries its provenance' },
    ],
  },
  {
    id: 'investigating',
    category: 'Investigating',
    items: [
      { text: 'Knowledge systems: when graph structure beats vector similarity for retrieval, and how to combine the two' },
      { text: 'LLM evaluation: building ground-truth suites from real questions, and measuring where automated graders disagree with people' },
      { text: 'Graph theory: what the structure of a knowledge graph reveals about missing or contradictory facts' },
    ],
  },
  {
    id: 'teaching',
    category: 'Teaching',
    items: [
      { text: 'Organizing hands-on AI systems and LLMOps workshops at ', link: { text: 'MLIndore', url: 'https://gdg.community.dev/events/details/google-gdg-indore-presents-build-with-ai-hands-on-ai-agents-amp-llmops-workshop-ml-indore-amp-gdg-indore/' } },
      { text: 'Mentoring engineers in systems architecture and distributed systems at ', link: { text: 'CodeVipassana', url: 'https://www.codevipassana.dev/' } },
      { text: 'Running distributed systems and cloud infrastructure workshops with ', link: { text: 'GDG Cloud Indore', url: 'https://gdg.community.dev/gdg-cloud-indore/' } },
    ],
  },
  {
    id: 'changed-mind',
    category: 'Changed my mind about',
    items: [
      { text: 'General-purpose agent loops: shifted from open-ended autonomous agent workflows to bounded, specialized paths backed by explicit graph-grounded verification gates' },
    ],
  },
];
