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
      { text: 'Co-founder and CTO at ', link: { text: 'Dextar', url: 'https://dextar.co' } },
    ],
  },
  {
    id: 'teaching',
    category: 'Teaching',
    items: [
      { text: 'Organising hands-on AI systems and LLMOps workshops at ', link: { text: 'ML Indore', url: 'https://gdg.community.dev/events/details/google-gdg-indore-presents-build-with-ai-hands-on-ai-agents-amp-llmops-workshop-ml-indore-amp-gdg-indore/' } },
      { text: 'Mentoring at ', link: { text: 'CodeVipassana', url: 'https://www.codevipassana.dev/' } },
      { text: 'Organising events with ', link: { text: 'GDG Cloud Indore', url: 'https://gdg.community.dev/gdg-cloud-indore/' } },
    ],
  },
];
