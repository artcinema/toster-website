import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Monitor, Timer, Route, Camera, RefreshCw, ShieldCheck } from 'lucide-react';
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
  const url = `${BASE}/${locale}/kitchen-display-system`;
  return {
    title: 'Kitchen Display System (KDS) for Food Delivery',
    description:
      'Toster’s Kitchen Display System replaces paper tickets with real-time screens: per-station routing, item timers, a clear NEW→COOKING→PACKING flow, and a photo check before dispatch. Built for delivery chains.',
    keywords: [
      'kitchen display system',
      'KDS software',
      'kitchen display system for food delivery',
      'restaurant KDS',
      'kitchen order screen',
    ],
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}/kitchen-display-system`])),
    },
    openGraph: {
      url,
      title: 'Kitchen Display System (KDS) — Toster',
      description:
        'Real-time kitchen screens with station routing, timers, and a photo check before dispatch.',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent('Kitchen Display System')}&sub=${encodeURIComponent('Real-time screens built for delivery kitchens')}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const capabilities = [
  {
    icon: Route,
    title: 'Per-station routing',
    body: 'Each order is split and routed to the right station automatically, so the grill, cold line, and bar only see what they need to make.',
  },
  {
    icon: Timer,
    title: 'Item timers',
    body: 'Every item carries a timer so cooks can see what is running late at a glance and keep prep times honest across the shift.',
  },
  {
    icon: RefreshCw,
    title: 'Clear status flow',
    body: 'Orders move through a single flow — NEW → CONFIRMED → COOKING → PACKING → AWAITING DISPATCH — synced in real time across every screen.',
  },
  {
    icon: Camera,
    title: 'Photo check before dispatch',
    body: 'The packing stage adds a photo-verification step: the packed order is photographed before it moves to dispatch, cutting wrong-order complaints.',
  },
  {
    icon: Monitor,
    title: 'Works on any screen',
    body: 'Run the KDS on a tablet, a monitor, or through the kitchen Telegram bot — no proprietary hardware required.',
  },
  {
    icon: ShieldCheck,
    title: 'Built for delivery chains',
    body: 'Multi-location aware: each kitchen sees only its own queue, and managers see the whole network from one board.',
  },
];

const faqItems = [
  {
    q: 'What is a kitchen display system (KDS)?',
    a: 'A kitchen display system (KDS) is software that replaces printed paper tickets with real-time digital screens in the kitchen. Incoming orders appear instantly, are routed to the correct preparation station, and update their status as cooks work — so the whole team sees the same live picture of what to make and in what order.',
  },
  {
    q: 'How is a KDS better than paper tickets?',
    a: 'Paper tickets get lost, smudged, or printed out of order, and they give no visibility into how long an item has been waiting. A KDS shows every order in real time, routes items to the right station automatically, tracks prep timers, and updates instantly when an order changes — which reduces missed and late items, especially under delivery rush.',
  },
  {
    q: 'Does Toster’s KDS route orders to different stations?',
    a: 'Yes. Each order is split by station so the grill, cold line, and bar only see the items they are responsible for. This keeps each station focused and makes it obvious where a bottleneck is forming.',
  },
  {
    q: 'What is the photo check at the packing stage?',
    a: 'Before an order leaves for dispatch, Toster’s packing flow adds a photo-verification step: the packed order is photographed (via the packer Telegram bot) and only then moves to "awaiting dispatch". This creates a visual record that cuts wrong-order and missing-item complaints.',
  },
  {
    q: 'What hardware do I need to run the KDS?',
    a: 'Any modern screen works — a tablet or a monitor with a browser. The kitchen can also operate through the cook Telegram bot. There is no proprietary KDS hardware to buy.',
  },
  {
    q: 'Does the KDS work across multiple locations?',
    a: 'Yes. Toster is multi-location aware: each kitchen sees only its own order queue, while managers can monitor the whole network. Status changes sync in real time across every screen.',
  },
];

export default async function KdsLandingPage({
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
      { '@type': 'ListItem', position: 2, name: 'Kitchen Display System', item: `${BASE}/${locale}/kitchen-display-system` },
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
            <Badge variant="yellow" className="mb-4">Kitchen Display System</Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[#0A0A0A] sm:text-5xl">
              A Kitchen Display System built for delivery
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-[#525252]">
              A <strong>kitchen display system (KDS)</strong> replaces paper tickets with real-time
              screens that route each order to the right station, track prep timers, and keep the
              whole kitchen on the same live picture. Toster’s KDS is built for delivery-first
              chains — including a photo check before every order is dispatched.
            </p>
            <Link
              href={`/${locale}/request-demo`}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD600] px-8 py-4 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#FFE566]"
            >
              See the KDS in a demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20">
        <Container>
          <h2 className="mb-10 text-center text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
            What Toster’s KDS does
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

      {/* KDS vs paper */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-[#0A0A0A] sm:text-3xl">
              Why a KDS beats paper tickets
            </h2>
            <p className="mb-4 text-[#525252] leading-relaxed">
              Paper tickets are invisible the moment they leave the printer: you can’t see how long
              an order has been waiting, you can’t reroute it, and a single lost ticket becomes a
              missed delivery. A digital KDS keeps every order live on screen, routes items to the
              right station, and updates instantly when an order is changed or cancelled.
            </p>
            <p className="text-[#525252] leading-relaxed">
              For delivery chains the difference compounds at volume. At 100+ orders a day, real-time
              timers and station routing are what keep prep times predictable — and the packing photo
              check is what keeps the wrong order from going out the door.
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
            <Link href={`/${locale}/courier-management`} className="underline hover:text-[#0A0A0A]">courier management</Link>, and{' '}
            <Link href={`/${locale}/food-delivery`} className="underline hover:text-[#0A0A0A]">food delivery CRM</Link>.
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">See the kitchen display live</h2>
            <p className="mb-8 text-lg text-white/60">
              Book a 30-minute demo and watch an order flow from new to dispatched.
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
