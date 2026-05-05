import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { JsonLd } from '@/components/JsonLd';
import {
  integrations,
  getIntegrationBySlug,
  getRelatedIntegrations,
} from '@/data/integrations';
import { siteConfig } from '@/config/site';

const BASE = siteConfig.url;
const locales = ['en', 'uk', 'ru', 'pl', 'cs', 'de', 'es'];

export async function generateStaticParams() {
  return integrations.flatMap((integration) =>
    locales.map((locale) => ({ locale, slug: integration.slug })),
  );
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const integration = getIntegrationBySlug(slug);
  if (!integration) return {};

  const url = `${BASE}/${locale}/integrations/${slug}`;
  const title = `${integration.name} Integration with Toster | ${integration.category}`;
  const description = integration.description.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE}/${l}/integrations/${slug}`]),
      ),
    },
    openGraph: {
      url,
      title,
      description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(`${integration.name} + Toster`)}&sub=${encodeURIComponent(integration.tagline)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function IntegrationPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const integration = getIntegrationBySlug(slug);
  if (!integration) notFound();

  const related = getRelatedIntegrations(slug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Toster', item: `${BASE}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Integrations', item: `${BASE}/${locale}/integrations` },
      { '@type': 'ListItem', position: 3, name: integration.name, item: `${BASE}/${locale}/integrations/${slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: integration.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href={`/${locale}/integrations`}
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
            >
              ← All integrations
            </Link>

            <div className="mb-8 flex items-center gap-5">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white"
                style={{ backgroundColor: integration.color }}
              >
                {integration.abbr}
              </div>
              <div>
                <Badge className="mb-2 bg-[#F5F5F5] text-[#525252]">{integration.category}</Badge>
                <h1 className="text-3xl font-bold text-[#0A0A0A] sm:text-4xl">
                  {integration.name} integration with Toster
                </h1>
              </div>
            </div>

            <p className="mb-6 text-xl font-medium text-[#0A0A0A]">{integration.tagline}</p>
            <p className="text-lg leading-relaxed text-[#525252]">{integration.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/request-demo`}
                className="inline-flex items-center gap-2 rounded-full bg-[#FFD600] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#FFE566]"
              >
                See it in action <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={integration.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] px-6 py-3 text-sm font-medium text-[#525252] transition-colors hover:bg-[#F5F5F5]"
              >
                {integration.name} website <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* What you get */}
      <section className="bg-[#F5F5F5] py-16">
        <Container>
          <h2 className="mb-10 text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
            What you get with {integration.name} in Toster
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {integration.features.map(({ title, body }) => (
              <div key={title} className="rounded-2xl bg-white p-6">
                <div className="mb-3 flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    style={{ color: integration.color }}
                  />
                  <h3 className="font-semibold text-[#0A0A0A]">{title}</h3>
                </div>
                <p className="pl-8 text-sm leading-relaxed text-[#525252]">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
              How the {integration.name} integration works
            </h2>
            <p className="leading-relaxed text-[#525252]">{integration.howItWorks}</p>
          </div>
        </Container>
      </section>

      {/* Use cases */}
      <section className="bg-[#F5F5F5] py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
              Real-world use cases
            </h2>
            <ul className="space-y-4">
              {integration.useCases.map((uc, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: integration.color }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[#525252]">{uc}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-[#E5E5E5]">
              {integration.faq.map(({ q, a }) => (
                <details key={q} className="group py-5 [&[open]>summary>svg]:rotate-180">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <h3 className="text-base font-semibold text-[#0A0A0A]">{q}</h3>
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#525252] transition-transform duration-200"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-[#525252]">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Related integrations */}
      {related.length > 0 && (
        <section className="bg-[#F5F5F5] py-12">
          <Container>
            <h2 className="mb-6 text-xl font-bold text-[#0A0A0A]">Related integrations</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${locale}/integrations/${rel.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-[#E5E5E5] bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: rel.color }}
                  >
                    {rel.abbr}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0A0A0A]">{rel.name}</p>
                    <p className="truncate text-xs text-[#525252]">{rel.category}</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 flex-shrink-0 text-[#A3A3A3] transition-transform group-hover:translate-x-1" />
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
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Ready to connect {integration.name}?
            </h2>
            <p className="mb-7 text-sm text-white/60">
              Book a demo and we&apos;ll show you the {integration.name} integration working with your menu and order flow.
            </p>
            <Link
              href={`/${locale}/request-demo`}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD600] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#FFE566]"
            >
              Request a demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
