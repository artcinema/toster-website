import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { JsonLd } from '@/components/JsonLd';
import { posts, getPostBySlug, getRelatedPosts, getPostLocales, getLocalizedPost } from '@/data/posts';
import { siteConfig } from '@/config/site';

const BASE = siteConfig.url;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'uk', 'ru', 'pl', 'cs', 'de', 'es'];
  return posts.flatMap((post) =>
    locales.map((locale) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${BASE}/${locale}/blog/${slug}`;
  const localized = getLocalizedPost(post, locale);

  // Locales with a real translation are self-canonical and declare hreflang for
  // the translated set; every other locale serves the English fallback body and
  // is consolidated to the /en canonical so Google sees one page, not duplicates.
  const availableLocales = getPostLocales(slug);
  const isTranslated = availableLocales.includes(locale);
  const canonical = isTranslated ? url : `${BASE}/en/blog/${slug}`;
  const languages =
    isTranslated && availableLocales.length > 1
      ? {
          ...Object.fromEntries(availableLocales.map((l) => [l, `${BASE}/${l}/blog/${slug}`])),
          'x-default': `${BASE}/en/blog/${slug}`,
        }
      : undefined;

  return {
    title: `${localized.title} | Toster Blog`,
    description: localized.excerpt,
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      type: 'article',
      url,
      title: localized.title,
      description: localized.excerpt,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: ['Toster'],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(localized.title)}&sub=${encodeURIComponent(localized.excerpt.slice(0, 80))}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localized.title,
      description: localized.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const base = getPostBySlug(slug);
  if (!base) notFound();

  // Merge the locale's translation over the English source so post.title /
  // post.excerpt / post.content render localized (existing JSX is untouched).
  const localized = getLocalizedPost(base, locale);
  const post = { ...base, ...localized };
  const related = getRelatedPosts(slug, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    inLanguage: locale,
    headline: localized.title,
    description: localized.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Organization', name: 'Toster', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'Toster',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/icon.svg` },
    },
    url: `${BASE}/${locale}/blog/${slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/${locale}/blog/${slug}` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Toster', item: `${BASE}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE}/${locale}/blog/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Header */}
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href={`/${locale}/blog`}
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All articles
            </Link>

            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-[#FFD600]/15 px-3 py-1 text-xs font-semibold text-[#0A0A0A]">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#A3A3A3]">
                <Clock className="h-3 w-3" />
                {post.readingTime} min read
              </span>
              <time dateTime={post.date} className="text-xs text-[#A3A3A3]">
                {formatDate(post.date)}
              </time>
            </div>

            <h1 className="mb-5 text-3xl font-semibold leading-tight text-[#0A0A0A] sm:text-4xl">
              {localized.title}
            </h1>

            <p className="text-lg leading-relaxed text-[#525252]">{localized.excerpt}</p>
          </div>
        </Container>
      </section>

      <div className="border-t border-[#E5E5E5]" />

      {/* Content */}
      <section className="bg-white py-14">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div
              className="blog-content max-w-none leading-relaxed text-[#525252]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </Container>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-[#E5E5E5] bg-[#F5F5F5] py-16">
          <Container>
            <h2 className="mb-8 text-xl font-semibold text-[#0A0A0A]">Related articles</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${locale}/blog/${p.slug}`}
                  className="group rounded-2xl border border-[#E5E5E5] bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-[#FFD600]/15 px-2.5 py-0.5 text-xs font-semibold text-[#0A0A0A]">
                      {p.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#A3A3A3]">
                      <Clock className="h-3 w-3" />
                      {p.readingTime} min
                    </span>
                  </div>
                  <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-[#0A0A0A] transition-colors group-hover:text-[#525252]">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#525252]">
                    {p.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#0A0A0A] transition-all group-hover:gap-2">
                    Read <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-16">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-3 text-2xl font-semibold text-white">See Toster in action</h2>
            <p className="mb-7 text-sm text-white/60">
              Everything in this article is built into the platform. Book a 30-minute demo.
            </p>
            <Link
              href={`/${locale}/request-demo`}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD600] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#FFE566]"
            >
              Book a demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
