/**
 * Client-facing systems engineering practice data:
 * Problem-solving scenarios and concrete core capabilities.
 */

export interface ProblemScenario {
  id: string;
  tag: string;
  problem: string;
  symptom: string;
  intervention: string;
  deliverable: string;
}

export interface CoreCapability {
  id: string;
  num: string;
  title: string;
  description: string;
  artifacts: string[];
}

export const problemScenarios: ProblemScenario[] = [
  {
    id: 'hallucinations-and-tools',
    tag: 'RELIABILITY & SAFETY',
    problem: 'Our agent is nondeterministic, hallucinates tool calls, and breaks in production.',
    symptom: 'Agents call invalid endpoints, generate corrupt JSON arguments, loop endlessly on error responses, or fail silently under edge-case inputs.',
    intervention: 'Implement deterministic finite-state transition wrappers, strict runtime schema validation, sandboxed execution boundaries, and bounded fallback routing.',
    deliverable: 'A hardened execution harness, schema-enforced tool router, and an automated regression test suite run on every prompt or model update.',
  },
  {
    id: 'memory-and-coordination',
    tag: 'STATE & CONTEXT',
    problem: 'We need stateful multi-agent coordination with persistent user memory.',
    symptom: 'Agents forget crucial user preferences between sessions, blow context window token limits, or supervisor-worker handoffs deadlock in recursive loops.',
    intervention: 'Design a multi-tiered memory plane (episodic recall, session compaction, semantic retrieval via Mem0 / vector / graph), explicit supervisor-worker state protocols, and loop-breaker safeguards.',
    deliverable: 'Production memory runtime, multi-agent orchestration pipeline with auditable handoffs, and deterministic state synchronization.',
  },
  {
    id: 'inference-cost-and-latency',
    tag: 'SCALE & PERFORMANCE',
    problem: 'Our LLM inference costs and latency are exploding as traffic grows.',
    symptom: 'Every interaction sends bloated context to high-cost frontier reasoning models, causing severe p99 latency spikes and unsustainable monthly token bills.',
    intervention: 'Introduce semantic response caching, prompt distillation, context-budget pruning, and dynamic model routing (frontier models for complex planning, compact local/open-source models for structured tool execution).',
    deliverable: 'Multi-tier model router, semantic cache layer, and automated token/cost benchmark harnesses demonstrating verified latency and cost reductions.',
  },
];

export const coreCapabilities: CoreCapability[] = [
  {
    id: 'eval-harnesses',
    num: '01',
    title: 'Evaluation & Test Harnesses',
    description: 'Deterministic trajectory benchmarks, synthetic adversarial test-cases, and automated CI/CD regression gates to ensure prompt, tool, or model changes do not cause silent degradation.',
    artifacts: ['Trajectory benchmarking harness', 'CI/CD regression gates', 'Adversarial eval suites'],
  },
  {
    id: 'runtime-sandboxing',
    num: '02',
    title: 'Agent Runtime & Tool Sandboxing',
    description: 'Secure, isolated tool execution environments (containerized/microVM), strict JSON Schema / Pydantic validation, fine-grained permission boundaries, and bounded retry state machines.',
    artifacts: ['Sandboxed tool executor', 'Schema enforcement layer', 'Deterministic state machines'],
  },
  {
    id: 'memory-state',
    num: '03',
    title: 'Memory & State Architecture',
    description: 'Persistent episodic memory, dynamic context-budget compaction, cross-session preference tracking, and hybrid vector/graph retrieval pipelines tailored for low latency and high relevance.',
    artifacts: ['Persistent episodic store (Mem0)', 'Dynamic context compactor', 'Hybrid retrieval graph'],
  },
  {
    id: 'multi-agent-orchestration',
    num: '04',
    title: 'Multi-Agent Orchestration',
    description: 'Disciplined supervisor-worker topologies, explicit transition protocols, distributed state synchronization, structured error-recovery, and loop-detection circuit breakers.',
    artifacts: ['Supervisor-worker protocols', 'State handoff channels', 'Cycle detection circuits'],
  },
  {
    id: 'cost-latency-opt',
    num: '05',
    title: 'Cost & Latency Optimization',
    description: 'Semantic vector caching for repetitive queries, prompt distillation, token budget optimization, and intelligent model routing between frontier APIs and self-hosted open models.',
    artifacts: ['Semantic caching engine', 'Dynamic model router', 'Token budget monitor'],
  },
];
