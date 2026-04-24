export interface NavItem {
  href: string;
  i18nKey: string;
}

export interface NavGroup {
  i18nKey: string;
  items: NavItem[];
}

export const mainNav: NavItem[] = [
  { href: '/features', i18nKey: 'Nav.features' },
  { href: '/ai', i18nKey: 'Nav.ai' },
  { href: '/integrations', i18nKey: 'Nav.integrations' },
  { href: '/for-chains', i18nKey: 'Nav.forChains' },
  { href: '/pricing', i18nKey: 'Nav.pricing' },
  { href: '/about', i18nKey: 'Nav.about' },
];

export const footerNav = {
  product: [
    { href: '/features', i18nKey: 'Footer.nav.features' },
    { href: '/ai', i18nKey: 'Footer.nav.ai' },
    { href: '/integrations', i18nKey: 'Footer.nav.integrations' },
    { href: '/for-chains', i18nKey: 'Footer.nav.forChains' },
    { href: '/for-single-location', i18nKey: 'Footer.nav.forSingleLocation' },
    { href: '/pricing', i18nKey: 'Footer.nav.pricing' },
  ],
  company: [
    { href: '/about', i18nKey: 'Footer.nav.about' },
    { href: '/blog', i18nKey: 'Footer.nav.blog' },
    { href: '/security', i18nKey: 'Footer.nav.security' },
  ],
  legal: [
    { href: '/privacy-policy', i18nKey: 'Footer.nav.privacy' },
    { href: '/terms', i18nKey: 'Footer.nav.terms' },
  ],
};
