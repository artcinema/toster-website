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
  const url = `${BASE}/${locale}/vs/poster-pos`;
  return {
    title: 'Toster vs Poster POS: Which Is Better for Food Delivery Chains?',
    description:
      'Honest comparison of Toster and Poster POS for food delivery chains. Feature table, pricing model differences, and 3 scenarios where each platform wins.',
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}/vs/poster-pos`])),
    },
    openGraph: {
      url,
      title: 'Toster vs Poster POS — Food Delivery Chain Comparison',
      description:
        'Side-by-side comparison of Toster and Poster POS for delivery-first restaurant chains.',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent('Toster vs Poster POS')}&sub=${encodeURIComponent('Which platform is built for delivery chains?')}`,
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
  poster: 'yes' | 'no' | 'partial';
  note?: string;
}

const rows: Row[] = [
  { feature: 'Multi-location order management', toster: 'yes', poster: 'yes' },
  { feature: 'Unified Kanban order board', toster: 'yes', poster: 'partial', note: 'Poster has list view; Kanban is Toster-native' },
  { feature: 'Kitchen Display System (KDS)', toster: 'yes', poster: 'yes' },
  { feature: 'Per-roll kitchen assignment with timer', toster: 'yes', poster: 'no', note: 'Toster-specific workflow for sushi/roll operations' },
  { feature: 'Courier GPS tracking (live map)', toster: 'yes', poster: 'partial', note: 'Poster has delivery tracking; real-time GPS map is Toster' },
  { feature: 'Telegram bot for couriers', toster: 'yes', poster: 'no' },
  { feature: 'AI voice call operator', toster: 'yes', poster: 'no', note: 'Toster uses ElevenLabs AI; Poster requires human operator' },
  { feature: 'AI demand forecasting', toster: 'yes', poster: 'no' },
  { feature: 'Aggregator integrations (Bolt, Glovo, Wolt, Uber Eats)', toster: 'yes', poster: 'partial', note: 'Poster has Glovo/Bolt; Toster has all 4 major platforms' },
  { feature: 'Own customer mobile app (branded)', toster: 'yes', poster: 'partial', note: 'Poster has Poster WebShop (web only); Toster includes iOS + Android' },
  { feature: 'Customer loyalty / cashback', toster: 'yes', poster: 'yes' },
  { feature: 'RFM segmentation', toster: 'yes', poster: 'partial', note: 'Poster has basic analytics; RFM is Toster-native' },
  { feature: 'Managed marketing campaigns (team-run)', toster: 'yes', poster: 'no', note: 'Poster provides tools; Toster includes execution by their team' },
  { feature: 'Email / SMS / Viber / push marketing', toster: 'yes', poster: 'partial', note: 'Poster has integrations; Toster runs campaigns via SendPulse' },
  { feature: 'Photo verification at packing stage', toster: 'yes', poster: 'no' },
  { feature: 'Multi-country fiscal compliance (UA, PL, CZ, DE)', toster: 'yes', poster: 'partial', note: 'Poster focuses on UA/PL; Toster covers 4 countries natively' },
  { feature: 'Dine-in table management', toster: 'no', poster: 'yes', note: 'Toster is delivery-first; Poster is stronger for dine-in' },
  { feature: 'Inventory / stock control', toster: 'partial', poster: 'yes', note: 'Toster has basic inventory; Poster has deeper recipe costing' },
  { feature: 'Offline mode (POS without internet)', toster: 'partial', poster: 'yes', note: 'Poster has documented offline mode; Toster requires connection' },
  { feature: 'POS hardware ecosystem', toster: 'partial', poster: 'yes', note: 'Poster has wider hardware partner network' },
  { feature: 'Self-serve onboarding', toster: 'no', poster: 'yes', note: 'Poster can be set up independently; Toster is guided setup' },
  { feature: 'Pricing model', toster: 'partial', poster: 'partial', note: 'Toster: revenue-based (3%) + fixed €250 plan. Poster: monthly subscription per location' },
];

const faqItems = [
  {
    q: 'Is Poster POS good for food delivery chains?',
    a: 'Poster POS works well for single-location delivery operations and restaurants with a delivery component. For chains with 3+ locations that are delivery-first (not dine-in), Toster offers more purpose-built features: live courier tracking, AI voice operator, and multi-country fiscal support built into the core product.',
  },
  {
    q: "What's the main difference between Toster and Poster?",
    a: "Poster was built as a restaurant POS that added delivery features over time. Toster was built from day one for delivery chains — the data model, mobile apps, courier workflows, and AI automation are all delivery-native. If your primary business is delivery (not dine-in), that architectural difference matters in day-to-day operations.",
  },
  {
    q: 'Does Poster POS have an AI voice operator?',
    a: 'As of this writing, Poster POS does not include an AI voice call operator. Toster includes an ElevenLabs-powered AI agent that takes phone orders, confirms addresses, and creates orders automatically. This can eliminate 80%+ of inbound call handling cost for busy delivery operations.',
  },
  {
    q: 'How does the pricing compare?',
    a: 'Poster charges a monthly subscription per location (pricing varies by plan tier). Toster offers two models: a fixed €250/month Start plan for 1 location, and a revenue-based model (3% of monthly turnover) for multi-location chains. For high-volume chains, the revenue model means you pay more when you earn more — no surprise bills during slow months.',
  },
  {
    q: 'Can I migrate from Poster POS to Toster?',
    a: "Yes. Toster's onboarding team handles menu migration, customer data import, and staff training. The typical migration for a 5-location chain takes 3–7 days, including a parallel-run period where both systems operate simultaneously to verify data integrity before full cutover.",
  },
  {
    q: 'Which is better for a single-location restaurant?',
    a: "For a single location that has dine-in as a significant revenue stream: Poster POS is a solid, cost-effective choice. For a single location that's delivery-first (80%+ of orders are delivery): Toster's €250/month Start plan includes a branded website, iOS & Android apps, and full CRM — which often makes it more economical than piecing together Poster + a separate website + separate apps.",
  },
  {
    q: 'Does Toster work in Ukraine and Poland?',
    a: 'Yes. Toster was built in Ukraine and launched in Poland as its first export market. It includes LiqPay for Ukraine and Stripe for Poland, Ukrainian fiscal integration (ПРРО), and Polish fiscal integration (KSeF-ready). The interface is fully localized in both languages.',
  },
  {
    q: 'What aggregators does Toster integrate with versus Poster?',
    a: 'Toster integrates with Bolt Food, Glovo, Wolt, and Uber Eats — all four major platforms. Poster has integrations with Glovo and Bolt Food. If your operation depends on Wolt or Uber Eats orders flowing into the same queue, this is a meaningful difference.',
  },
  {
    q: "Who is Poster POS best for?",
    a: "Poster POS is a strong fit for: (1) single-location restaurants with dine-in as the primary revenue stream, (2) operators who want a well-documented, self-serve setup without a guided onboarding, (3) restaurants with complex recipe costing needs and inventory management requirements beyond basic stock tracking.",
  },
  {
    q: 'Who is Toster best for?',
    a: "Toster is a strong fit for: (1) delivery-first chains with 1–50+ locations, (2) operators expanding across multiple countries (UA, PL, CZ, DE), (3) businesses that want AI phone automation and managed marketing included rather than managing those tools separately, (4) sushi/roll operations that need the per-roll kitchen assignment workflow.",
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

export default async function VsPosterPage({
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
      { '@type': 'ListItem', position: 2, name: 'Toster vs Poster POS', item: `${BASE}/${locale}/vs/poster-pos` },
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
              Toster vs Poster POS
            </h1>
            <p className="mb-4 text-xl text-[#525252]">
              Which platform is better for food delivery chains in 2026?
            </p>
            <p className="text-sm text-[#A3A3A3]">
              Last reviewed: May 2026 · Sources: public documentation, G2 reviews, direct testing
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
              <strong>Poster POS</strong> is a mature, well-documented platform that excels for
              dine-in restaurants and single-location delivery operators who want a self-serve
              setup. It has deeper inventory management and a broader hardware ecosystem.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#0A0A0A]">
              <strong>Toster</strong> was built delivery-first for chains: live courier GPS tracking,
              AI voice operator, multi-country fiscal compliance (UA, PL, CZ, DE), and managed
              marketing campaigns are core features — not add-ons. For chains with 3+ delivery
              locations that process 100+ orders per day, Toster&apos;s architecture matters
              operationally.
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
              <MinusCircle className="h-4 w-4 text-amber-400" /> Partial / limited
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
                    Poster POS
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
                      <StatusCell status={row.poster} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-[#A3A3A3]">
            Data based on public documentation and user reviews as of May 2026. If you spot an
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
            {/* Poster wins */}
            <div className="rounded-2xl border border-[#E5E5E5] bg-white p-8">
              <h2 className="mb-6 text-xl font-bold text-[#0A0A0A]">
                When Poster POS is the better choice
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: 'Dine-in is your primary revenue stream',
                    body: "Poster has stronger table management, reservation handling, and floor plan tools. If 60%+ of your orders happen at the table, Poster's dine-in workflows are more mature.",
                  },
                  {
                    title: 'You need complex recipe costing and inventory',
                    body: "Poster's stock control and recipe management are deeper than Toster's. If you have a complex menu with multi-level recipes and need tight food cost control, Poster's inventory module is more developed.",
                  },
                  {
                    title: "You want self-serve setup without guided onboarding",
                    body: "Poster has extensive documentation and can be set up independently by a tech-savvy operator. Toster's setup is guided — better quality control, but requires scheduling time with the onboarding team.",
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
                    title: "You run a delivery-first chain with 3+ locations",
                    body: "Toster's architecture was built for multi-location delivery chains. Order routing, division-level analytics, and multi-country fiscal compliance are core features, not retrofit additions.",
                  },
                  {
                    title: "You process 100+ orders per day and need AI automation",
                    body: "At 100+ orders per day, the AI voice operator pays for itself — it handles 80–95% of phone orders without human involvement. Poster requires a human operator for every call.",
                  },
                  {
                    title: "You operate (or plan to expand) across multiple countries",
                    body: "Toster supports UA, PL, CZ, and DE with native fiscal integrations and local payment gateways. Poster's multi-country support requires more configuration and third-party add-ons.",
                  },
                  {
                    title: "You want marketing execution included, not just tools",
                    body: "Toster's Revenue plan includes managed marketing campaigns run by the Toster team. Poster gives you marketing integration tools that you need to operate yourself.",
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
            Sources: Poster POS public documentation (joinposter.com), G2 reviews (g2.com/products/poster-pos), Toster internal data. Last reviewed May 2026.
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
