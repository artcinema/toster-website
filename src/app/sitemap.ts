import type { MetadataRoute } from 'next';
import { posts } from '@/data/posts';
import { integrations } from '@/data/integrations';

const BASE = 'https://toster.co';
const locales = ['en', 'uk', 'ru', 'pl', 'cs', 'de', 'es'];

const routes = [
  { path: '',                   priority: 1.0, changeFreq: 'weekly',  lastMod: '2026-05-07' },
  { path: '/features',          priority: 0.9, changeFreq: 'weekly',  lastMod: '2026-05-01' },
  { path: '/food-delivery',     priority: 0.9, changeFreq: 'weekly',  lastMod: '2026-04-20' },
  { path: '/ai',                priority: 0.9, changeFreq: 'weekly',  lastMod: '2026-05-01' },
  { path: '/for-chains',        priority: 0.9, changeFreq: 'weekly',  lastMod: '2026-04-20' },
  { path: '/for-single-location', priority: 0.8, changeFreq: 'monthly', lastMod: '2026-04-20' },
  { path: '/pricing',           priority: 0.9, changeFreq: 'monthly', lastMod: '2026-04-15' },
  { path: '/integrations',      priority: 0.8, changeFreq: 'monthly', lastMod: '2026-04-10' },
  { path: '/blog',              priority: 0.8, changeFreq: 'weekly',  lastMod: '2026-05-07' },
  { path: '/vs/poster-pos',     priority: 0.8, changeFreq: 'monthly', lastMod: '2026-04-10' },
  { path: '/about',             priority: 0.7, changeFreq: 'monthly', lastMod: '2026-04-01' },
  { path: '/api',               priority: 0.6, changeFreq: 'monthly', lastMod: '2026-04-01' },
  { path: '/security',          priority: 0.6, changeFreq: 'yearly',  lastMod: '2026-03-01' },
  { path: '/legal/privacy',     priority: 0.3, changeFreq: 'yearly',  lastMod: '2026-03-01' },
  { path: '/legal/terms',       priority: 0.3, changeFreq: 'yearly',  lastMod: '2026-03-01' },
  { path: '/legal/dpa',         priority: 0.3, changeFreq: 'yearly',  lastMod: '2026-03-01' },
  { path: '/legal/cookies',     priority: 0.3, changeFreq: 'yearly',  lastMod: '2026-03-01' },
  { path: '/legal/imprint',     priority: 0.3, changeFreq: 'yearly',  lastMod: '2026-03-01' },
  { path: '/request-demo',      priority: 0.8, changeFreq: 'monthly', lastMod: '2026-04-15' },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}${route.path}`,
        lastModified: route.lastMod,
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
        lastModified: '2026-04-10',
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

  // Blog posts
  for (const post of posts) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
