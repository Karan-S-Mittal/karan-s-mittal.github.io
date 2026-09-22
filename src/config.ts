/**
 * Single source of truth for site identity.
 * Pages and components import from here instead of restating literals.
 */
export const SITE = {
  name: 'Karan Mittal',
  title: 'Karan Mittal | Knowledge systems that show their work',
  description:
    'Karan Mittal builds graph-grounded knowledge systems and LLM evaluations: answers that trace back to evidence, and failures caught before they reach users.',
  url: 'https://karan-s-mittal.github.io',
  author: 'Karan Mittal',
  email: 'karanshyammittal@gmail.com',
} as const;

export const SOCIALS = [
  { href: 'https://github.com/Karan-S-Mittal', label: 'GitHub', icon: 'github' },
  { href: 'https://www.linkedin.com/in/karansmittal/', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://twitter.com/KaranSMittal', label: 'X', icon: 'x' },
  { href: `mailto:${SITE.email}`, label: 'Email', icon: 'email' },
] as const;
