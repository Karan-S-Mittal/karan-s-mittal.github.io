/**
 * Single source of truth for site identity.
 * Pages and components import from here instead of restating literals.
 */
export const SITE = {
  name: 'Karan Mittal',
  title: 'Karan Mittal | Deterministic Engineering',
  description:
    'Karan Mittal turns ambiguous AI problems into deterministic systems — knowledge architecture, inference engineering, and technical leadership.',
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
