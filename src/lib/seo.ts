/**
 * SEO helpers for consistent hreflang + canonical across all page layouts.
 *
 * Usage:
 *   import { buildAlternates } from '@/lib/seo';
 *   // in generateMetadata:
 *   alternates: buildAlternates(locale, '/pricing'),
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
