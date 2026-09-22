/**
 * src/data/diagrams.ts
 *
 * Canonical catalog of systems diagrams and architecture blueprints.
 * Single source of truth for diagram slugs, canonical IDs, titles,
 * model statuses, and verification provenance.
 */

export interface DiagramProvenanceSource {
  label: string;
  url?: string;
  type?: 'primary-doc' | 'specification' | 'standard' | 'whitepaper';
}

export interface DiagramEntry {
  slug: string;
  canonicalId: string;
  title: string;
  category: string;
  description: string;
  modelStatus: 'explanatory' | 'specification' | 'comparison';
  previewArchetype: 'loop' | 'pipeline' | 'memory' | 'tree' | 'hierarchy' | 'comparison';
  targetId: string;
  filename: string;
  href: string;
  socialImage: string;
  provenance: {
    sources: DiagramProvenanceSource[];
    illustrativeScope?: string;
  };
  explanation: string;
}

export const diagrams: DiagramEntry[] = [
  {
    slug: 'semiconductor-traceability',
    canonicalId: 'SGR-01',
    title: 'Semiconductor Traceability Graph',
    category: 'GRAPH ENGINEERING',
    description:
      'A dependency graph connecting suppliers, material disclosures, PFAS evidence, quality events, and agent-review boundaries.',
    modelStatus: 'explanatory',
    previewArchetype: 'pipeline',
    targetId: 'semiconductor-traceability-export',
    filename: 'semiconductor-traceability-graph',
    href: '/diagrams/semiconductor-traceability/',
    socialImage: '/social/semiconductor-traceability.png',
    provenance: {
      sources: [
        {
          label: 'EPA TSCA Section 8(a)(7) PFAS Reporting Rule',
          url: 'https://www.epa.gov/assessing-and-managing-chemicals-under-tsca/tsca-section-8a7-reporting-and-recordkeeping-requirements',
          type: 'standard',
        },
        {
          label: 'IPC-1752B Material Declaration Standard',
          url: 'https://www.ipc.org/ipc-1752b-standard',
          type: 'standard',
        },
        {
          label: 'ISO 9001:2015 Clause 8.5.2 Traceability',
          url: 'https://www.iso.org/standard/62085.html',
          type: 'standard',
        },
      ],
      illustrativeScope:
        'Explanatory conceptual model of semiconductor component pedigree and PFAS compliance screening. Specific entity codes (e.g., Supplier S-14, Material Lot C17, Part P-4821) and workflow linkages illustrate the architectural pattern rather than a single proprietary bill of materials.',
    },
    explanation:
      'Read from the physical dependency chain into its evidence records and operational consequences. The lower rail compares a general agent with a distilled reviewer: repeatable, bounded checks take the specialized path, while missing evidence and novel relationships retain an explicit escalation route to broader reasoning and human review.',
  },
  {
    slug: 'developer-platform-stack',
    canonicalId: 'VCS-01',
    title: 'Developer Platform Stack',
    category: 'SYSTEMS ARCHITECTURE',
    description:
      'A functional model separating Git storage, collaboration policy, CI execution, and optional remote workspaces.',
    modelStatus: 'explanatory',
    previewArchetype: 'hierarchy',
    targetId: 'platform-stack-export',
    filename: 'developer-platform-stack',
    href: '/diagrams/developer-platform-stack/',
    socialImage: '/social/developer-platform-stack.png',
    provenance: {
      sources: [
        {
          label: 'Git Data Model Documentation',
          url: 'https://git-scm.com/docs/gitdatamodel',
          type: 'primary-doc',
        },
        {
          label: 'git-receive-pack Specification',
          url: 'https://git-scm.com/docs/git-receive-pack',
          type: 'primary-doc',
        },
        {
          label: 'OCI Image Format Specification v1.1.1',
          url: 'https://github.com/opencontainers/image-spec/blob/v1.1.1/spec.md',
          type: 'specification',
        },
      ],
      illustrativeScope:
        'Functional decomposition of developer platform boundaries. Illustrates responsibility layering and migration boundaries across object storage, collaboration logic, and isolated runner execution.',
    },
    explanation:
      'Read from the source-control foundation upward. Each layer adds a different operational responsibility—object storage, collaboration policy, automated execution, and development environments—without implying that every hosting vendor implements all four as distinct isolated services.',
  },
  {
    slug: 'code-review-topologies',
    canonicalId: 'VCS-02',
    title: 'Three Code Review Topologies',
    category: 'REVIEW PROTOCOLS',
    description:
      'A comparison of review identity and revision flow across branch, Change-Id, and email patch-series workflows.',
    modelStatus: 'comparison',
    previewArchetype: 'comparison',
    targetId: 'code-review-export',
    filename: 'code-review-topologies',
    href: '/diagrams/code-review-topologies/',
    socialImage: '/social/code-review-topologies.png',
    provenance: {
      sources: [
        {
          label: 'GitHub Pull Request Overview',
          url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests',
          type: 'primary-doc',
        },
        {
          label: 'Gerrit Change-Id Documentation',
          url: 'https://gerrit-review.googlesource.com/Documentation/user-changeid.html',
          type: 'primary-doc',
        },
        {
          label: 'Linux Kernel Submitting Patches Guide',
          url: 'https://docs.kernel.org/process/submitting-patches.html',
          type: 'primary-doc',
        },
      ],
    },
    explanation:
      'Read each column as a distinct review topology rather than a maturity ranking. The diagram compares where review identity lives, how revisions are represented, and how accepted work reaches the target history; individual hosting services and projects can vary.',
  },
];

export function getDiagramBySlug(slug: string): DiagramEntry | undefined {
  return diagrams.find((d) => d.slug === slug);
}
