import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Bot, Route, Camera, BarChart3, Users } from 'lucide-react';
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
  const url = `${BASE}/${locale}/courier-management`;
  return {
    title: 'Courier Management & Dispatch Software',
    description:
      'Toster’s courier management software assigns deliveries, tracks riders live on a map, optimizes routes, and runs your fleet through a courier Telegram bot with proof-of-delivery photos. Built for delivery chains.',
    keywords: [
      'courier management software',
      'delivery dispatch software',
      'courier tracking',
      'driver management food delivery',
      'last mile delivery software',
    ],
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}/courier-management`])),
    },
    openGraph: {
      url,
      title: 'Courier Management & Dispatch — Toster',
      description:
        'Assign, track live, and optimize your delivery fleet — with a courier Telegram bot and proof-of-delivery photos.',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent('Courier Management')}&sub=${encodeURIComponent('Dispatch, live GPS, and route optimization')}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const capabilities = [
  {
    icon: MapPin,
    title: 'Live GPS tracking',
    body: 'See every active courier on a live map. Dispatchers know where each order is, and customers get accurate "on the way" updates.',
  },
  {
    icon: Bot,
    title: 'Courier Telegram bot',
    body: 'Riders work from a Telegram bot: accept a delivery, share live location, and mark it delivered — no extra app to install.',
  },
  {
    icon: Route,
    title: 'Route optimization',
    body: 'Distances and ETAs are calculated with DistanceMatrix.ai so dispatch can assign the closest courier and avoid late deliveries.',
  },
  {
    icon: Camera,
    title: 'Proof of delivery',
    body: 'Couriers confirm completion from the bot, creating a clean record of when each order was handed over.',
  },
  {
    icon: BarChart3,
    title: 'Courier KPIs',
    body: 'Track deliveries per courier, on-time rate, and average delivery time to see who is performing and where to coach.',
  },
  {
    icon: Users,
    title: 'Your fleet or third-party',
    body: 'Manage your own riders end to end, and still bring in third-party couriers when you need extra capacity at peak.',
  },
];

const faqItems = [
  {
    q: 'What is courier management software?',
    a: 'Courier management software assigns deliveries to riders, tracks them live on a map, optimizes their routes, and records when each order is delivered. For food delivery it connects the kitchen, the dispatcher, and the customer so everyone sees an accurate, real-time status of every delivery in progress.',
  },
  {
    q: 'How do couriers use Toster?',
    a: 'Couriers work through a Telegram bot rather than a separate app. They accept an assigned delivery, share their live location so it appears on the dispatch map, and mark the order delivered when it is handed over. Because it runs in Telegram, there is nothing extra to install and onboarding a new rider takes minutes.',
  },
  {
    q: 'Does Toster optimize delivery routes?',
    a: 'Yes. Toster uses DistanceMatrix.ai for distance and ETA calculations, so dispatch can assign the closest available courier and customers get realistic delivery-time estimates. This reduces late deliveries, which are a leading cause of one-star reviews.',
  },
  {
    q: 'Can customers track their delivery?',
    a: 'Live courier location feeds the order status, so customers receive accurate "on the way" information instead of a vague window. Dispatchers see the same live map across all active orders.',
  },
  {
    q: 'Can I use third-party couriers as well as my own?',
    a: 'Yes. Toster is built to manage your own delivery fleet end to end — assignment, tracking, KPIs — and you can still bring in third-party couriers to cover peak demand when your own riders are at capacity.',
  },
  {
    q: 'What courier metrics can I track?',
    a: 'You can track deliveries per courier, on-time delivery rate, and average delivery time. These KPIs make it clear who is performing well and where dispatch or routing needs attention.',
  },
];

export default async function CourierLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Toster', item: `${BASE}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Courier Management', item: `${BASE}/${locale}/courier-management` },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="yellow" className="mb-4">Courier Management</Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[#0A0A0A] sm:text-5xl">
              Courier management & dispatch, built in
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-[#525252]">
              <strong>Courier management software</strong> assigns deliveries to riders, tracks them
              live on a map, optimizes their routes, and records proof of delivery. Toster runs your
              whole delivery fleet — through a courier Telegram bot, with live GPS and route
              optimization — as part of the same platform that takes the order.
            </p>
            <Link
              href={`/${locale}/request-demo`}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD600] px-8 py-4 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#FFE566]"
            >
              See dispatch in a demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20">
        <Container>
          <h2 className="mb-10 text-center text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
            What Toster’s courier management does
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-[#E5E5E5] bg-white p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD600]/10">
                  <Icon className="h-5 w-5 text-[#0A0A0A]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#0A0A0A]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#525252]">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Narrative */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
              Why dispatch belongs in the same system as the order
            </h2>
            <p className="mb-4 text-[#525252] leading-relaxed">
              When dispatch is a separate tool, the kitchen, the dispatcher, and the customer are
              always slightly out of sync — and the gap shows up as late deliveries and one-star
              reviews. In Toster, the order flows straight from the kitchen into dispatch: the moment
              it is packed, the closest courier can be assigned, the customer sees an accurate ETA,
              and the rider works from a Telegram bot.
            </p>
            <p className="text-[#525252] leading-relaxed">
              Because everything is one platform, the proof-of-delivery record and courier KPIs sit
              next to the order itself — no reconciling exports between a POS and a separate
              dispatch app.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-[#F5F5F5] py-20">
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

      {/* Related */}
      <section className="bg-white py-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center text-sm text-[#525252]">
            Explore more of the platform:{' '}
            <Link href={`/${locale}/features`} className="underline hover:text-[#0A0A0A]">all features</Link>,{' '}
            <Link href={`/${locale}/kitchen-display-system`} className="underline hover:text-[#0A0A0A]">kitchen display system</Link>, and{' '}
            <Link href={`/${locale}/food-delivery`} className="underline hover:text-[#0A0A0A]">food delivery CRM</Link>.
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">See live dispatch in action</h2>
            <p className="mb-8 text-lg text-white/60">
              Book a 30-minute demo and watch an order go from packed to delivered.
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
