export const externalWriting = [
  {
    title: 'OpenAI Codex vs Claude Code: Which AI Coding Agent Wins in 2026?',
    publication: 'Mem0',
    pubDate: '2026-09-17',
    href: 'https://mem0.ai/blog/openai-codex-vs-claude-code-which-ai-coding-agent-wins-in-2026',
    description:
      'A systems-level comparison of coding-agent harnesses: context assembly, execution boundaries, memory, supervision, and review workflow.',
  },
] as const;

/**
 * Public source work. The Software section on /publications/ renders only
 * when this list has entries, so it stays hidden until a real repo ships.
 */
export interface SoftwareEntry {
  title: string;
  href: string;
  description: string;
  /** ISO date of the first public release. */
  released: string;
}

export const software: SoftwareEntry[] = [];
