/** Shared client-facing engagement descriptions; outcomes are proposed deliverables, not past results. */
export const engagements = [
  {
    id: 'diagnose', title: 'Understand what is getting in the way', label: 'System review',
    situation: 'A system is unreliable, slow, expensive, or difficult to change—and the next step is unclear.',
    approach: 'We examine the workflow, the implementation, and the evidence before choosing what to change.',
    deliverable: 'A diagnosis, prioritised recommendations, and a practical plan for the next decision.',
  },
  {
    id: 'build', title: 'Build a solution the team can run', label: 'Design & implementation',
    situation: 'You have an important problem to solve, or a promising prototype that needs to work in everyday use.',
    approach: 'We define success, build around the real constraints, and test the system with the people who will use it.',
    deliverable: 'An agreed implementation, validation against its requirements, and documentation for operation and handover.',
  },
  {
    id: 'guide', title: 'Help the team make progress', label: 'Technical advisory',
    situation: 'Your team needs experienced engineering input as requirements, architecture, or delivery evolve.',
    approach: 'I work with the team on design decisions, implementation reviews, and the questions blocking delivery.',
    deliverable: 'Documented decisions, clear next steps, and knowledge the team can carry forward.',
  },
];
