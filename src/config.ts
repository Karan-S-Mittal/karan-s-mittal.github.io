/**
 * Single source of truth for site identity.
 * Pages and components import from here instead of restating literals.
 */
export const SITE = {
  name: 'Karan Mittal',
  title: 'Karan Mittal',
  description:
    'Karan Mittal is a data visualisation expert. He builds dashboards in Plotly Dash and Streamlit, charts that explain models, and views of knowledge graphs.',
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
