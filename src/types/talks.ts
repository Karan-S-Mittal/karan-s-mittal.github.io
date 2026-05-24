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
  venue: string;
  role: string;
  type: 'talk' | 'workshop' | 'panel' | 'keynote';
  tags: string[];
  links: TalkLink[];
}

export interface TalksData {
  talks: Talk[];
}
