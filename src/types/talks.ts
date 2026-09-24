export interface TalkLink {
  label: string;
  url: string;
}

export interface Talk {
  id: string;
  title: string;
  description: string;
  date: string;
  year: string;
  event: string;
  org: string;
  // Id in communities.json when the talk was hosted by one of Karan's communities.
  community?: string;
  venue: string;
  role: string;
  type: 'talk' | 'workshop' | 'panel' | 'keynote' | 'walkthrough';
  tags: string[];
  links: TalkLink[];
  slides?: string;
  recording?: string;
  audience?: string;
  caption?: string;
}

export interface TalksData {
  talks: Talk[];
}

// How each kind of session is named wherever a talk is listed.
export const talkTypeLabel: Record<Talk['type'], string> = {
  talk: 'Talk',
  workshop: 'Workshop',
  panel: 'Panel',
  keynote: 'Keynote',
  walkthrough: 'Walkthrough',
};
