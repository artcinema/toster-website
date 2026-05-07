/**
 * SEO helpers for consistent hreflang + canonical + JSON-LD across all page layouts.
 *
 * Usage:
 *   import { buildAlternates, buildBreadcrumbSchema } from '@/lib/seo';
 *   // in generateMetadata:
 *   alternates: buildAlternates(locale, '/pricing'),
 *   // in layout JSX:
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{
 *     __html: JSON.stringify(buildBreadcrumbSchema(locale, [{ name: 'Pricing', path: '/pricing' }]))
 *   }} />
 */

const BASE = 'https://toster.co';
export const LOCALES = ['en', 'ru', 'uk', 'pl', 'cs', 'de', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * Returns `alternates` object for Next.js Metadata API:
 * - canonical → BASE/locale/path
 * - languages → all 7 locales + x-default → /en/path
 */
export function buildAlternates(locale: string, path: string) {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, `${BASE}/${l}${path}`])
  ) as Record<string, string>;
  languages['x-default'] = `${BASE}/en${path}`;

  return {
    canonical: `${BASE}/${locale}${path}`,
    languages,
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string; // e.g. '/pricing' — appended after /{locale}
}

/**
 * Builds a Schema.org BreadcrumbList JSON-LD object.
 * Always prepends "Home" as the first item.
 *
 * @param locale - current locale (e.g. 'en')
 * @param items  - ordered breadcrumb items after Home
 */
export function buildBreadcrumbSchema(locale: string, items: BreadcrumbItem[]) {
  const crumbs = [
    { name: 'Home', item: `${BASE}/${locale}` },
    ...items.map((b) => ({ name: b.name, item: `${BASE}/${locale}${b.path}` })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}
