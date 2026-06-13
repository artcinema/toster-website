import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, XCircle, MinusCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/config/site';

const BASE = siteConfig.url;

const locales = ['en', 'uk', 'ru', 'pl', 'cs', 'de', 'es'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE}/${locale}/vs/iiko`;
  return {
    title: 'Toster vs iiko: Delivery-First SaaS or Full Restaurant ERP?',
    description:
      'Honest comparison of Toster and iiko for restaurant and delivery operations. iiko is a deep all-round ERP; Toster is delivery-first SaaS with AI and own apps. Feature table, pricing, and when each wins.',
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}/vs/iiko`])),
    },
    openGraph: {
      url,
      title: 'Toster vs iiko — Delivery-First SaaS vs Restaurant ERP',
      description:
        'Side-by-side comparison of Toster (delivery-first platform) and iiko (full restaurant management ERP).',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent('Toster vs iiko')}&sub=${encodeURIComponent('Delivery-first SaaS or full restaurant ERP?')}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

interface Row {
  feature: string;
  toster: 'yes' | 'no' | 'partial';
  competitor: 'yes' | 'no' | 'partial';
  note?: string;
}

const rows: Row[] = [
  { feature: 'Multi-location management', toster: 'yes', competitor: 'yes' },
  { feature: 'Built-in POS terminal', toster: 'yes', competitor: 'yes' },
  { feature: 'Kitchen Display System (KDS)', toster: 'yes', competitor: 'yes' },
  { feature: 'Deep inventory, warehouse & production costing', toster: 'partial', competitor: 'yes', note: 'iiko’s inventory/production/food-cost engine is one of the deepest in the industry. Toster covers core inventory.' },
  { feature: 'Financial & management accounting', toster: 'partial', competitor: 'yes', note: 'iiko includes broad back-office accounting; Toster focuses on operational P&L and unit economics.' },
  { feature: 'Dine-in table & floor management', toster: 'no', competitor: 'yes', note: 'Toster is delivery-first; iiko has mature dine-in tooling.' },
  { feature: 'Franchise / multi-entity management', toster: 'partial', competitor: 'yes', note: 'iiko has dedicated franchise tooling; Toster supports multi-division operations.' },
  { feature: 'Delivery module (orders, couriers, map)', toster: 'yes', competitor: 'yes', note: 'Both have delivery; Toster is built delivery-first throughout.' },
  { feature: 'Telegram bots for staff (cook / packer / courier)', toster: 'yes', competitor: 'no', note: 'Toster runs operations through role-specific Telegram bots.' },
  { feature: 'AI voice call operator', toster: 'yes', competitor: 'no', note: 'Toster uses an ElevenLabs-powered AI agent for inbound phone orders; iiko has a call-centre module but not an AI voice agent.' },
  { feature: 'AI demand forecasting', toster: 'yes', competitor: 'partial', note: 'iiko offers analytics/forecasting in places; AI forecasting is core to Toster.' },
  { feature: 'RFM segmentation & LTV', toster: 'yes', competitor: 'partial', note: 'iiko has loyalty analytics (iikoCard); Toster ships RFM + LTV out of the box.' },
  { feature: 'Own branded customer website + iOS/Android apps', toster: 'yes', competitor: 'partial', note: 'iiko offers customer web/app products, often as add-ons; Toster includes a branded site and native iOS + Android apps.' },
  { feature: 'Customer loyalty & cashback', toster: 'yes', competitor: 'yes', note: 'iikoCard is a strong loyalty product; Toster includes 1% cashback loyalty.' },
  { feature: 'Aggregator integrations (Bolt Food, Glovo, Wolt, Uber Eats)', toster: 'yes', competitor: 'partial', note: 'iiko connects aggregators via its marketplace/integrations; Toster integrates the 4 major platforms natively.' },
  { feature: 'Managed marketing campaigns (team-run)', toster: 'yes', competitor: 'no', note: 'iiko provides marketing tools; Toster’s Revenue plan includes campaigns run by the Toster team.' },
  { feature: 'Multi-country fiscal compliance', toster: 'yes', competitor: 'yes', note: 'Both cover multiple countries; Toster ships native UA, PL, CZ, DE integrations.' },
  { feature: 'Cloud SaaS, fast guided onboarding', toster: 'yes', competitor: 'partial', note: 'iiko is powerful but a heavier implementation; Toster is cloud SaaS with guided onboarding, typically days not weeks.' },
  { feature: 'Pricing model', toster: 'partial', competitor: 'partial', note: 'Toster: revenue-based (from 3%) + a fixed €250 Start plan. iiko: licence/module-based pricing that varies by configuration and region.' },
];

const faqItems = [
  {
    q: "What's the main difference between Toster and iiko?",
    a: 'iiko is a comprehensive restaurant-management ERP — deep inventory and production costing, back-office accounting, strong dine-in, and franchise tooling, used by large restaurant networks. Toster is a delivery-first SaaS platform: it is lighter and more focused, with AI phone automation, Telegram-bot operations, branded customer apps, and managed marketing built in. iiko optimises for full-service restaurant operations; Toster optimises for delivery chains.',
  },
  {
    q: 'Is iiko better than Toster?',
    a: 'It depends on your business. If you need the deepest possible inventory, production and food-cost control, strong dine-in management, and franchise tooling, iiko is a more complete ERP. If your business is delivery-first and you want AI voice ordering, own-fleet courier management, branded apps, and managed marketing as core features without a heavy ERP implementation, Toster is the better fit. Neither is universally “better”.',
  },
  {
    q: 'Does iiko have an AI voice operator?',
    a: 'iiko includes a call-centre module for taking phone orders with human operators. As of this writing it does not include an AI voice agent. Toster includes an ElevenLabs-powered AI operator that answers calls, confirms addresses, and creates orders automatically — which can remove most inbound call-handling cost for busy delivery operations.',
  },
  {
    q: 'Can Toster handle inventory like iiko?',
    a: 'Toster covers core inventory and operational food cost, but iiko’s warehouse, multi-level recipe and production-costing engine is deeper and more configurable. If tight, accountant-grade inventory control is central to your operation, that is a genuine strength of iiko.',
  },
  {
    q: 'Which is faster to launch?',
    a: 'Toster is a cloud SaaS with guided onboarding — menu import, delivery zones, and staff setup typically take days. iiko is a more powerful, more configurable system, and a full implementation (especially with inventory, accounting and franchise modules) usually takes longer and often involves an implementation partner.',
  },
  {
    q: 'Does Toster integrate with iiko?',
    a: 'No. Toster is its own all-in-one platform and is an alternative to iiko rather than an add-on — it does not act as a layer on top of iiko or other POS systems. If you are evaluating a switch, Toster’s onboarding team handles menu and customer-data migration.',
  },
  {
    q: 'Who is iiko best for?',
    a: 'iiko is a strong fit for full-service restaurants and large networks that need deep inventory/production costing, robust back-office accounting, mature dine-in management, and franchise tooling — and have the resources for a more involved implementation.',
  },
  {
    q: 'Who is Toster best for?',
    a: 'Toster is a strong fit for delivery-first chains (1–50+ locations) that want a modern, focused SaaS with AI voice ordering, Telegram-bot operations, own-fleet courier tracking, branded iOS/Android apps, managed marketing, and native multi-country fiscal support (UA, PL, CZ, DE) — without the overhead of a full ERP.',
  },
];

type CellStatus = 'yes' | 'no' | 'partial';

function StatusCell({ status }: { status: CellStatus }) {
  if (status === 'yes') {
    return <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />;
  }
  if (status === 'no') {
    return <XCircle className="mx-auto h-5 w-5 text-[#A3A3A3]" />;
  }
  return <MinusCircle className="mx-auto h-5 w-5 text-amber-400" />;
}

export default async function VsIikoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Toster', item: `${BASE}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Toster vs iiko', item: `${BASE}/${locale}/vs/iiko` },
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
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 bg-[#FFD600]/15 text-[#0A0A0A]">Comparison</Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[#0A0A0A] sm:text-5xl">
              Toster vs iiko
            </h1>
            <p className="mb-4 text-xl text-[#525252]">
              Delivery-first SaaS, or a full restaurant-management ERP?
            </p>
            <p className="text-sm text-[#A3A3A3]">
              Last reviewed: June 2026 · Sources: public documentation, user reviews
            </p>
          </div>
        </Container>
      </section>

      {/* Quick verdict */}
      <section className="bg-[#F5F5F5] py-12">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-[#E5E5E5] bg-white p-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A3A3A3]">
              TL;DR
            </p>
            <p className="text-lg leading-relaxed text-[#0A0A0A]">
              <strong>iiko</strong> is a deep, mature restaurant-management ERP — industry-leading
              inventory and production costing, broad back-office accounting, strong dine-in, and
              franchise tooling. For full-service restaurants and large networks, that breadth is a
              real advantage.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#0A0A0A]">
              <strong>Toster</strong> is delivery-first SaaS: lighter and more focused, with an AI
              voice operator, Telegram-bot operations, own-fleet courier tracking, branded iOS and
              Android apps, and managed marketing built in. For delivery chains that want modern
              automation without a heavy ERP implementation, Toster is purpose-built.
            </p>
          </div>
        </Container>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-16">
        <Container>
          <h2 className="mb-10 text-center text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
            Feature comparison
          </h2>

          {/* Legend */}
          <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm text-[#525252]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Fully supported
            </span>
            <span className="flex items-center gap-1.5">
              <MinusCircle className="h-4 w-4 text-amber-400" /> Partial / different depth
            </span>
            <span className="flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-[#A3A3A3]" /> Not available
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E5E5] bg-[#F5F5F5]">
                  <th className="py-4 pl-6 pr-4 text-left text-sm font-semibold text-[#0A0A0A]">
                    Feature
                  </th>
                  <th className="w-28 py-4 text-center text-sm font-bold text-[#0A0A0A]">
                    Toster
                  </th>
                  <th className="w-28 py-4 pr-4 text-center text-sm font-semibold text-[#525252]">
                    iiko
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-[#F5F5F5] ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}
                  >
                    <td className="py-4 pl-6 pr-4">
                      <p className="text-sm font-medium text-[#0A0A0A]">{row.feature}</p>
                      {row.note && (
                        <p className="mt-0.5 text-xs text-[#A3A3A3]">{row.note}</p>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      <StatusCell status={row.toster} />
                    </td>
                    <td className="py-4 pr-4 text-center">
                      <StatusCell status={row.competitor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-[#A3A3A3]">
            Data based on public documentation and user reviews as of June 2026. If you spot an
            inaccuracy,{' '}
            <Link href={`/${locale}/request-demo`} className="underline hover:text-[#0A0A0A]">
              let us know
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* When each wins */}
      <section className="bg-[#F5F5F5] py-16">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            {/* iiko wins */}
            <div className="rounded-2xl border border-[#E5E5E5] bg-white p-8">
              <h2 className="mb-6 text-xl font-bold text-[#0A0A0A]">
                When iiko is the better choice
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: 'You need deep inventory & production costing',
                    body: 'iiko’s warehouse, multi-level recipe and food-cost engine is among the most powerful available. If accountant-grade stock control is central to your operation, iiko leads here.',
                  },
                  {
                    title: 'Dine-in and full-service are core',
                    body: 'iiko has mature table, floor and service-workflow tooling. If a large share of revenue happens at the table, iiko’s dine-in features are deeper.',
                  },
                  {
                    title: 'You run a large franchise network',
                    body: 'iiko offers dedicated franchise and back-office accounting tooling built for big, multi-entity restaurant groups.',
                  },
                ].map(({ title, body }) => (
                  <li key={title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#525252]" />
                    <div>
                      <p className="font-semibold text-[#0A0A0A]">{title}</p>
                      <p className="mt-1 text-sm text-[#525252]">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Toster wins */}
            <div className="rounded-2xl border-2 border-[#FFD600] bg-white p-8">
              <h2 className="mb-6 text-xl font-bold text-[#0A0A0A]">
                When Toster is the better choice
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: 'You are delivery-first, not dine-in-first',
                    body: 'Toster’s data model, apps, courier workflows and AI are delivery-native. For a chain where most orders are delivery, that focus shows in daily operations.',
                  },
                  {
                    title: 'You want AI phone automation and bot-run operations',
                    body: 'The ElevenLabs AI operator handles inbound phone orders, and cook/packer/courier Telegram bots run the floor — automation that a traditional ERP does not include.',
                  },
                  {
                    title: 'You want branded apps and managed marketing included',
                    body: 'A branded customer website, native iOS/Android apps, and team-run marketing campaigns are part of the platform rather than separate add-ons.',
                  },
                  {
                    title: 'You want a fast, light implementation',
                    body: 'Cloud SaaS with guided onboarding measured in days — without the heavier rollout of a full ERP.',
                  },
                ].map(({ title, body }) => (
                  <li key={title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#FFD600]" />
                    <div>
                      <p className="font-semibold text-[#0A0A0A]">{title}</p>
                      <p className="mt-1 text-sm text-[#525252]">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-12 text-center text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mx-auto max-w-3xl divide-y divide-[#E5E5E5]">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="group py-6 [&[open]>summary>svg]:rotate-180">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <h3 className="text-base font-semibold text-[#0A0A0A]">{q}</h3>
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

      {/* Sources */}
      <section className="bg-[#F5F5F5] py-8">
        <Container>
          <p className="text-center text-xs text-[#A3A3A3]">
            Sources: iiko public documentation (iiko.com), user reviews, and Toster internal data.
            Last reviewed June 2026. Competitor capabilities change — tell us if anything is out of
            date.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              See Toster&apos;s delivery features live
            </h2>
            <p className="mb-8 text-lg text-white/60">
              Book a 30-minute demo tailored to your delivery chain size and market.
            </p>
            <Link
              href={`/${locale}/request-demo`}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD600] px-8 py-4 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#FFE566]"
            >
              Request a demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
