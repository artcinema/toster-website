import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { LucideIcon } from 'lucide-react';
import {
  ShoppingCart, ChefHat, Truck, Brain, Star, Megaphone,
  CheckCircle2, ArrowRight, Phone, Globe, Bot,
  BarChart3, Zap,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { OrderBoardMockup } from '@/components/product/OrderBoardMockup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/config/site';
import { type Locale } from '@/i18n/config';

const BASE = siteConfig.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FoodDelivery' });
  const url = `${BASE}/${locale}/food-delivery`;
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE}/en/food-delivery`,
        uk: `${BASE}/uk/food-delivery`,
        ru: `${BASE}/ru/food-delivery`,
        pl: `${BASE}/pl/food-delivery`,
        cs: `${BASE}/cs/food-delivery`,
        de: `${BASE}/de/food-delivery`,
        es: `${BASE}/es/food-delivery`,
        'x-default': `${BASE}/en/food-delivery`,
      },
    },
    openGraph: {
      url,
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}`, width: 1200, height: 630 }],
    },
  };
}

const featureIcons: LucideIcon[] = [ShoppingCart, ChefHat, Truck, Brain, Star, Megaphone];
const painIcons: LucideIcon[] = [Phone, Globe, Bot];
const usecaseIcons: LucideIcon[] = [Zap, BarChart3, Globe];

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function FoodDeliveryPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FoodDelivery' });
  const tc = await getTranslations({ locale, namespace: 'Common' });

  const painItems = [0, 1, 2].map((i) => ({
    title: t(`pain.items.${i}.title`),
    body: t(`pain.items.${i}.body`),
    Icon: painIcons[i] as LucideIcon,
  }));

  const featureItems = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`features.items.${i}.title`),
    body: t(`features.items.${i}.body`),
    Icon: featureIcons[i] as LucideIcon,
  }));

  const usecaseItems = [0, 1, 2].map((i) => ({
    size: t(`usecases.items.${i}.size`),
    title: t(`usecases.items.${i}.title`),
    body: t(`usecases.items.${i}.body`),
    Icon: usecaseIcons[i] as LucideIcon,
  }));

  const integrations: string[] = [0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
    t(`integrations.items.${i}`),
  );

  const faqItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }));

  const relatedItems = [0, 1, 2].map((i) => ({
    title: t(`related.items.${i}.title`),
    href: `/${locale}${t(`related.items.${i}.href`)}`,
    desc: t(`related.items.${i}.desc`),
  }));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Toster', item: `${BASE}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t('hero.badge'), item: `${BASE}/${locale}/food-delivery` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
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
      <section className="bg-[#0A0A0A] pb-20 pt-24 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-[#FFD600]/30 bg-[#FFD600]/10 text-[#FFD600]">
              {t('hero.badge')}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t('hero.h1')}
            </h1>
            <p className="mb-10 text-lg text-white/70 sm:text-xl">
              {t('hero.sub')}
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-[#FFD600] text-[#0A0A0A] hover:bg-[#FFD600]/90">
                <Link href={`/${locale}/request-demo`}>{t('hero.cta1')}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary-dark">
                <a href="https://demo.toster.co" target="_blank" rel="noopener noreferrer">
                  {t('hero.cta2')}
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Product UI — order board screenshot */}
      <section className="bg-[#0A0A0A] pb-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <OrderBoardMockup />
          </div>
        </Container>
      </section>

      {/* Pain points */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-[#0A0A0A] sm:text-4xl">
            {t('pain.h2')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {painItems.map(({ title, body, Icon }) => (
              <div key={title} className="rounded-2xl border border-[#E5E5E5] p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                  <Icon className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#0A0A0A]">{title}</h3>
                <p className="text-[#525252]">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-[#F5F5F5] py-20">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-[#0A0A0A] sm:text-4xl">
            {t('features.h2')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map(({ title, body, Icon }) => (
              <div key={title} className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFD600]/15">
                  <Icon className="h-6 w-6 text-[#0A0A0A]" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#0A0A0A]">{title}</h3>
                <p className="text-[#525252]">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Use cases */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-[#0A0A0A] sm:text-4xl">
            {t('usecases.h2')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {usecaseItems.map(({ size, title, body, Icon }) => (
              <div key={title} className="rounded-2xl border border-[#E5E5E5] p-8">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFD600]">
                  <Icon className="h-5 w-5 text-[#0A0A0A]" />
                </div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-[#525252]">
                  {size}
                </p>
                <h3 className="mb-3 text-xl font-semibold text-[#0A0A0A]">{title}</h3>
                <p className="text-[#525252]">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Integrations */}
      <section className="bg-[#0A0A0A] py-16 text-white">
        <Container>
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
            {t('integrations.h2')}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((name) => (
              <span
                key={name}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white/80"
              >
                {name}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-[#0A0A0A] sm:text-4xl">
            {t('faq.h2')}
          </h2>
          <div className="mx-auto max-w-3xl divide-y divide-[#E5E5E5]">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="group py-6 [&[open]>summary>svg]:rotate-180">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-[#0A0A0A]">{q}</h3>
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#525252] transition-transform duration-200"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-[#525252]">{a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Related solutions */}
      <section className="bg-[#F5F5F5] py-16">
        <Container>
          <h2 className="mb-10 text-center text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
            {t('related.h2')}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {relatedItems.map(({ title, href, desc }) => (
              <Link
                key={title}
                href={href}
                className="group flex items-center justify-between rounded-2xl border border-[#E5E5E5] bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div>
                  <p className="mb-1 font-semibold text-[#0A0A0A] group-hover:text-[#0A0A0A]">
                    {title}
                  </p>
                  <p className="text-sm text-[#525252]">{desc}</p>
                </div>
                <ArrowRight className="ml-4 h-5 w-5 flex-shrink-0 text-[#525252] transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#FFD600] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <CheckCircle2 className="mx-auto mb-6 h-14 w-14 text-[#0A0A0A]/40" />
            <h2 className="mb-4 text-3xl font-bold text-[#0A0A0A] sm:text-4xl">
              {t('cta.h2')}
            </h2>
            <p className="mb-8 text-lg text-[#0A0A0A]/70">{t('cta.body')}</p>
            <Button asChild size="lg" className="bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/90">
              <Link href={`/${locale}/request-demo`}>
                {t('cta.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
