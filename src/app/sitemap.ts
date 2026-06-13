import type { MetadataRoute } from 'next';
import { posts, getPostLocales } from '@/data/posts';
import { integrations } from '@/data/integrations';

const BASE = 'https://toster.co';
const locales = ['en', 'uk', 'ru', 'pl', 'cs', 'de', 'es'];

// Honest last-modified for static routes: the date of the last meaningful
// content/structure update. Bump this when static pages change materially —
// `new Date()` reports fake freshness on every crawl, which Google learns to
// ignore. Blog posts use their own real publish/updated date below.
const STATIC_LAST_MODIFIED = new Date('2026-06-13');

const routes = [
  { path: '',           priority: 1.0,  changeFreq: 'weekly'  },
  { path: '/features',       priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/food-delivery',  priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/ai',             priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/for-chains',     priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/for-single-location', priority: 0.8, changeFreq: 'monthly' },
  { path: '/kitchen-display-system', priority: 0.9, changeFreq: 'monthly' },
  { path: '/courier-management', priority: 0.9, changeFreq: 'monthly' },
  { path: '/pricing',   priority: 0.9,  changeFreq: 'monthly' },
  { path: '/integrations', priority: 0.8, changeFreq: 'monthly' },
  { path: '/blog',      priority: 0.8,  changeFreq: 'weekly'  },
  { path: '/vs/poster-pos', priority: 0.8, changeFreq: 'monthly' },
  { path: '/vs/deliverect', priority: 0.8, changeFreq: 'monthly' },
  { path: '/vs/iiko', priority: 0.8, changeFreq: 'monthly' },
  { path: '/about',     priority: 0.7,  changeFreq: 'monthly' },
  { path: '/security',         priority: 0.6,  changeFreq: 'yearly'  },
  { path: '/legal/privacy',   priority: 0.3,  changeFreq: 'yearly'  },
  { path: '/legal/terms',     priority: 0.3,  changeFreq: 'yearly'  },
  { path: '/legal/dpa',       priority: 0.3,  changeFreq: 'yearly'  },
  { path: '/legal/cookies',   priority: 0.3,  changeFreq: 'yearly'  },
  { path: '/legal/imprint',   priority: 0.3,  changeFreq: 'yearly'  },
  { path: '/request-demo', priority: 0.8, changeFreq: 'monthly' },
] as const;

// Sitemaps should list only canonical 200-URLs. We emit the locale-prefixed
// URLs (each is its own canonical via generateMetadata) with hreflang
// alternates. The bare `${BASE}${path}` URLs 301-redirect to /en, so they are
// intentionally NOT listed here.
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}${route.path}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: route.changeFreq as MetadataRoute.Sitemap[number]['changeFrequency'],
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}${route.path}`])
          ),
        },
      });
    }
  }

  // Integration pages
  for (const integration of integrations) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}/integrations/${integration.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}/integrations/${integration.slug}`])
          ),
        },
      });
    }
  }

  // Blog posts — list /en plus any locale with a real translation (getPostLocales
  // returns ['en', ...translated]). Translated posts get per-locale URLs with
  // hreflang alternates; English-only posts stay a single /en URL (no fake
  // hreflang equality). Real publish date, or the updated date when set.
  for (const post of posts) {
    const postLocales = getPostLocales(post.slug);
    for (const l of postLocales) {
      entries.push({
        url: `${BASE}/${l}/blog/${post.slug}`,
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
        ...(postLocales.length > 1
          ? {
              alternates: {
                languages: Object.fromEntries(
                  postLocales.map((x) => [x, `${BASE}/${x}/blog/${post.slug}`])
                ),
              },
            }
          : {}),
      });
    }
  }

  return entries;
}
