import type { MetadataRoute } from 'next';
import { posts } from '@/data/posts';

const BASE = 'https://toster.co';
const locales = ['en', 'uk', 'ru', 'pl', 'cs', 'de', 'es'];

const routes = [
  { path: '',           priority: 1.0,  changeFreq: 'weekly'  },
  { path: '/features',  priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/ai',        priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/for-chains',priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/pricing',   priority: 0.9,  changeFreq: 'monthly' },
  { path: '/integrations', priority: 0.8, changeFreq: 'monthly' },
  { path: '/blog',      priority: 0.8,  changeFreq: 'weekly'  },
  { path: '/about',     priority: 0.7,  changeFreq: 'monthly' },
  { path: '/security',  priority: 0.6,  changeFreq: 'yearly'  },
  { path: '/privacy-policy', priority: 0.5, changeFreq: 'yearly' },
  { path: '/terms',     priority: 0.5,  changeFreq: 'yearly'  },
  { path: '/request-demo', priority: 0.8, changeFreq: 'monthly' },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFreq as MetadataRoute.Sitemap[number]['changeFrequency'],
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}${route.path}`])
          ),
        },
      });
    }
    // Canonical without locale prefix (redirects to /en)
    entries.push({
      url: `${BASE}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFreq as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: route.priority,
    });
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
    entries.push({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
