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
  const url = `${BASE}/${locale}/vs/deliverect`;
  return {
    title: 'Toster vs Deliverect: All-in-One Platform or Integration Layer?',
    description:
      'Honest comparison of Toster and Deliverect for food delivery operations. Deliverect connects aggregators to your POS; Toster is the all-in-one platform. Feature table, pricing, and when each wins.',
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}/vs/deliverect`])),
    },
    openGraph: {
      url,
      title: 'Toster vs Deliverect — Platform vs Integration Layer',
      description:
        'Side-by-side comparison of Toster (all-in-one delivery platform) and Deliverect (aggregator/menu middleware).',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent('Toster vs Deliverect')}&sub=${encodeURIComponent('All-in-one platform or integration layer?')}`,
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
  { feature: 'Aggregator order consolidation', toster: 'partial', competitor: 'yes', note: 'Deliverect’s core strength — hundreds of aggregator/POS integrations. Toster connects the 4 major platforms (Bolt Food, Glovo, Wolt, Uber Eats) natively.' },
  { feature: 'Menu management across channels', toster: 'partial', competitor: 'yes', note: 'Channel-level menu sync is Deliverect’s flagship feature; Toster manages one menu pushed to its own apps + connected aggregators.' },
  { feature: 'Built-in POS terminal', toster: 'yes', competitor: 'no', note: 'Deliverect sits on top of your existing POS; Toster is the POS.' },
  { feature: 'Kitchen Display System (KDS)', toster: 'yes', competitor: 'partial', note: 'Deliverect provides order/prep screens; Toster includes a full KDS with per-station routing and timers.' },
  { feature: 'Own courier fleet management + live GPS', toster: 'yes', competitor: 'partial', note: 'Deliverect Dispatch books third-party couriers (Uber Direct etc.); Toster manages your own couriers with live GPS map and a Telegram bot.' },
  { feature: 'Telegram bots for staff (cook / packer / courier)', toster: 'yes', competitor: 'no' },
  { feature: 'AI voice call operator', toster: 'yes', competitor: 'no', note: 'Toster uses an ElevenLabs-powered AI agent to take phone orders; Deliverect does not handle inbound phone orders.' },
  { feature: 'AI demand forecasting', toster: 'yes', competitor: 'no' },
  { feature: 'Own branded customer website + iOS/Android apps', toster: 'yes', competitor: 'partial', note: 'Deliverect offers Direct web ordering; Toster includes a branded site plus native iOS and Android apps.' },
  { feature: 'Customer CRM, loyalty & cashback', toster: 'yes', competitor: 'no', note: 'Deliverect is order/menu middleware, not a customer CRM.' },
  { feature: 'RFM segmentation & LTV', toster: 'yes', competitor: 'no' },
  { feature: 'Managed marketing campaigns (team-run)', toster: 'yes', competitor: 'no' },
  { feature: 'Stock / availability sync to channels', toster: 'partial', competitor: 'yes', note: 'Deliverect pushes 86/availability across every channel; Toster syncs stop-lists to its own apps and connected aggregators.' },
  { feature: 'Virtual / ghost brand orchestration across many channels', toster: 'partial', competitor: 'yes', note: 'Deliverect is built for running many virtual brands across many marketplaces.' },
  { feature: 'Breadth of third-party POS integrations', toster: 'no', competitor: 'yes', note: 'By design Toster is one all-in-one platform and does not integrate with external POS systems; Deliverect’s value is its huge integration catalog.' },
  { feature: 'Multi-country fiscal compliance (UA, PL, CZ, DE)', toster: 'yes', competitor: 'partial', note: 'Toster has native fiscal integrations; with Deliverect fiscalization is handled by the underlying POS.' },
  { feature: 'Pricing model', toster: 'partial', competitor: 'partial', note: 'Toster: revenue-based (from 3%) + a fixed €250 Start plan. Deliverect: subscription per location/channel, typically plus setup — and you still pay for your separate POS.' },
];

const faqItems = [
  {
    q: 'Is Deliverect a POS or a CRM?',
    a: 'Neither. Deliverect is an integration/middleware layer: it consolidates orders from delivery aggregators into your existing POS, syncs menus and availability across channels, and reports on it. It is not itself a point-of-sale, and it is not a customer CRM. Toster, by contrast, is an all-in-one platform that includes the POS, kitchen display, courier management, customer CRM, and marketing.',
  },
  {
    q: "What's the main difference between Toster and Deliverect?",
    a: 'Deliverect connects the tools you already run; Toster replaces them. With Deliverect you keep your POS, your website, your apps and your CRM, and Deliverect glues aggregator orders into that stack. With Toster, the POS, branded apps, courier fleet, AI phone operator and CRM are one product. If you are happy with your current POS and only need aggregator/menu orchestration, Deliverect is excellent. If you want one system for a delivery-first chain, Toster is the all-in-one route.',
  },
  {
    q: 'Does Deliverect manage my own couriers?',
    a: 'Deliverect Dispatch arranges delivery through third-party courier networks (for example Uber Direct). It is not a fleet-management tool for your own riders. Toster manages your own courier team with live GPS tracking, route assignment, and a courier Telegram bot — and can still be used with third-party couriers.',
  },
  {
    q: 'Which one handles aggregators better?',
    a: 'Deliverect has the broader catalog — hundreds of aggregator and POS integrations worldwide — which is its core product. Toster integrates natively with the four platforms most relevant to its markets: Bolt Food, Glovo, Wolt, and Uber Eats. If you depend on a long tail of regional marketplaces, Deliverect’s breadth is a genuine advantage.',
  },
  {
    q: 'Can I use Toster instead of Deliverect + a separate POS?',
    a: 'Often, yes. The all-in-one model means you replace the POS, website builder, mobile apps, CRM, and the integration layer with a single platform — which can be simpler and cheaper than licensing a POS plus Deliverect plus a website plus apps separately. The trade-off is integration breadth: Toster connects the major aggregators rather than every marketplace in the world.',
  },
  {
    q: 'Who is Deliverect best for?',
    a: 'Deliverect is a strong fit for operators who (1) already run a POS they like, (2) sell across many delivery marketplaces and need one place to manage menus and availability, and (3) run multiple virtual/ghost brands that need channel orchestration. It is an integration layer, and a very good one.',
  },
  {
    q: 'Who is Toster best for?',
    a: 'Toster is a strong fit for delivery-first chains that want one platform instead of a stack: built-in POS, branded customer apps, own courier fleet with live tracking, AI voice operator, managed marketing, and multi-country fiscal compliance (UA, PL, CZ, DE) — rather than buying and integrating those pieces separately.',
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

export default async function VsDeliverectPage({
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
      { '@type': 'ListItem', position: 2, name: 'Toster vs Deliverect', item: `${BASE}/${locale}/vs/deliverect` },
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
              Toster vs Deliverect
            </h1>
            <p className="mb-4 text-xl text-[#525252]">
              An all-in-one delivery platform, or an integration layer on top of your POS?
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
              <strong>Deliverect</strong> is best-in-class middleware: it consolidates orders from a
              huge catalog of delivery marketplaces into your existing POS and keeps menus and
              availability in sync across every channel. If you already run a POS you like and sell
              across many aggregators or virtual brands, it is hard to beat.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#0A0A0A]">
              <strong>Toster</strong> is the all-in-one alternative: the POS, branded customer apps,
              own courier fleet with live GPS, AI voice operator, CRM, and managed marketing are one
              platform — not a stack you assemble and integrate. For a delivery-first chain that
              would otherwise buy a POS <em>plus</em> Deliverect <em>plus</em> a website <em>plus</em>{' '}
              apps <em>plus</em> a CRM, Toster consolidates that into a single system.
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
              <MinusCircle className="h-4 w-4 text-amber-400" /> Partial / different approach
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
                    Deliverect
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
            {/* Deliverect wins */}
            <div className="rounded-2xl border border-[#E5E5E5] bg-white p-8">
              <h2 className="mb-6 text-xl font-bold text-[#0A0A0A]">
                When Deliverect is the better choice
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: 'You already have a POS you want to keep',
                    body: 'Deliverect is designed to enhance an existing POS, not replace it. If your team is happy with your current point-of-sale, Deliverect adds aggregator orders and menu sync without ripping it out.',
                  },
                  {
                    title: 'You sell across many delivery marketplaces',
                    body: 'Deliverect’s integration catalog is its superpower — hundreds of aggregators and POS systems. If you depend on a long tail of regional marketplaces, that breadth is hard to match.',
                  },
                  {
                    title: 'You run multiple virtual / ghost brands',
                    body: 'Channel and menu orchestration across many brands and storefronts is exactly what Deliverect was built for.',
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
                    title: 'You want one platform instead of a stack',
                    body: 'Toster is the POS, the branded website and apps, the courier system, the CRM, and the AI operator in one product — no POS-plus-Deliverect-plus-website-plus-apps assembly.',
                  },
                  {
                    title: 'You run your own couriers',
                    body: 'Toster manages your own delivery fleet with live GPS tracking, assignment, and a courier Telegram bot — beyond booking third-party couriers.',
                  },
                  {
                    title: 'You want AI phone automation and marketing included',
                    body: 'The AI voice operator takes phone orders, and the Revenue plan includes managed marketing campaigns run by the Toster team — areas a pure integration layer does not cover.',
                  },
                  {
                    title: 'You operate across UA, PL, CZ, DE',
                    body: 'Native fiscal integrations and local payment gateways are built into Toster, rather than handled by a separate underlying POS.',
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
            Sources: Deliverect public documentation (deliverect.com), user reviews, and Toster
            internal data. Last reviewed June 2026. Competitor capabilities change — tell us if
            anything is out of date.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              See the all-in-one platform live
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
