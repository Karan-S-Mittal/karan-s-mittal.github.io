/** Structured project brief definitions and client-facing engagement models.
 * Outcomes are proposed deliverables and operating protocols, not speculative past results.
 */

export interface EngagementBrief {
  id: string;
  label: string;
  operatingModel: string;
  title: string;
  problem: string;
  constraint: string;
  intervention: string;
  outcome: string;
  responsibility: string;
}

export const engagements: EngagementBrief[] = [
  {
    id: 'diagnose',
    label: 'System Review',
    operatingModel: 'Independent Advisory',
    title: 'Bottleneck diagnosis and architectural audit',
    problem: 'A production service, data pipeline, or inference path suffers from unacceptable latency, unbounded memory growth, or brittle operational boundaries, with no consensus on root cause.',
    constraint: 'Production traffic cannot be interrupted; source code access may be restricted; findings must rest on empirical telemetry and microarchitectural profiling rather than speculative rewrites.',
    intervention: 'Instrument critical execution paths, trace memory footprints and thread contention, map subsystem boundaries, and verify behaviour against hardware constraints.',
    outcome: 'An evidence-backed audit report, reproducible benchmark harness, and prioritized engineering recommendations.',
    responsibility: 'Karan leads instrumentation, profiling, and architectural diagnosis; internal engineering leadership approves operational parameters and reviews recommendations.',
  },
  {
    id: 'build',
    label: 'Design & Implementation',
    operatingModel: 'Venture Delivery via Dextar / Studio',
    title: 'Production subsystem design, implementation, and handover',
    problem: 'The team needs a core systems capability—such as an evidence graph, semantic cache, or structured agent evaluation boundary—that requires deep systems rigor and rapid execution.',
    constraint: 'Must integrate cleanly with existing CI/CD pipelines, runtime stacks, and deployment targets without introducing vendor lock-in or orphan abstractions.',
    intervention: 'Specify clean component interfaces, implement verified modules with rigorous automated test suites, and write operational playbooks for day-two maintenance.',
    outcome: 'Production-ready code merged to your repository, end-to-end integration tests, and full handover documentation.',
    responsibility: 'Karan (or Dextar engineering team for venture-scale builds) designs and implements the subsystem; in-house engineers review PRs and take operational ownership.',
  },
  {
    id: 'guide',
    label: 'Technical Advisory',
    operatingModel: 'Independent Advisory',
    title: 'Retained advisory for engineering leadership',
    problem: 'Engineering leaders face high-stakes technical inflection points—such as model evaluation topology, storage engine selection, or version control architecture—with conflicting internal trade-offs.',
    constraint: 'Leadership requires objective, evidence-backed challenge without hiring full-time executives or relying on vendor-sponsored roadmaps.',
    intervention: 'Bi-weekly architectural reviews, design RFC scrutiny, benchmark verification, and structured decision records.',
    outcome: 'Written architectural RFC evaluations, trade-off matrices backed by primary sources, and unblocked engineering decisions.',
    responsibility: 'Karan provides external technical review, rigorous critique, and primary research; internal leadership retains ultimate decision and execution authority.',
  },
];
