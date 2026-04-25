'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import * as Tabs from '@radix-ui/react-tabs';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { DemoButton } from '@/components/ui/demo-button';
import { fadeInUp, staggerChildren } from '@/lib/motion';

interface Integration {
  name: string;
  description: string;
  abbr: string;
  color: string;
  logo?: string;
  badge?: string;
  flag?: string;
}

interface Category {
  id: string;
  label: string;
  count?: number;
  tagline?: string;
  integrations: Integration[];
}

// Simple Icons CDN — reliable SVG logos for major brands
const SI = (slug: string) => `https://cdn.simpleicons.org/${slug}`;
// Google Favicon API — reliable PNG favicons for any domain
const GF = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const categories: Category[] = [
  {
    id: 'aggregators',
    label: 'Aggregators',
    count: 11,
    tagline: 'Orders from every platform land in one queue, in real time.',
    integrations: [
      { name: 'Bolt Food', abbr: 'BT', color: '#34D186', logo: GF('bolt.eu'), description: 'Native sync — orders, status updates, menus' },
      { name: 'Glovo', abbr: 'GL', color: '#FFC244', logo: SI('glovo'), description: 'Two-way sync with automatic menu publish' },
      { name: 'Wolt', abbr: 'WO', color: '#009DE0', logo: SI('wolt'), description: 'Real-time order ingestion via courier API' },
      { name: 'DoorDash', abbr: 'DD', color: '#FF3008', logo: SI('doordash'), description: 'Drive API integration with live status push' },
      { name: 'Uber Eats', abbr: 'UE', color: '#06C167', logo: SI('ubereats'), description: 'Full menu management + order flow' },
      { name: 'Grubhub', abbr: 'GH', color: '#F63440', logo: SI('grubhub'), description: 'Direct API connection, no middleware' },
      { name: 'Just Eat', abbr: 'JE', color: '#FF8000', logo: SI('justeat'), description: 'Live order sync across EU markets' },
      { name: 'Pyszne.pl', abbr: 'PY', color: '#FF6900', logo: GF('pyszne.pl'), description: 'Polish market specialist integration' },
      { name: 'Dáme Jídlo', abbr: 'DJ', color: '#E30613', logo: GF('damejidlo.cz'), description: 'Czech Republic native aggregator' },
      { name: 'Lieferando', abbr: 'LI', color: '#FF8000', logo: SI('lieferando'), description: 'DACH region coverage' },
      { name: 'More soon', abbr: '+', color: '#A3A3A3', description: 'New aggregators added every quarter' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    count: 6,
    tagline: 'Your customer pays the way they want.',
    integrations: [
      { name: 'LiqPay', abbr: 'LQ', color: '#00AFF0', logo: GF('liqpay.ua'), description: 'Ukrainian card payments + installments', badge: 'UA' },
      { name: 'Stripe', abbr: 'ST', color: '#635BFF', logo: SI('stripe'), description: 'Worldwide cards, Link, SEPA, and Stripe Tax' },
      { name: 'Viva Wallet', abbr: 'VW', color: '#0B4FBF', logo: GF('vivawallet.com'), description: 'EU-native acquiring, 24 countries', badge: 'EU' },
      { name: 'Apple Pay', abbr: 'AP', color: '#1C1C1E', logo: SI('applepay'), description: 'One-tap checkout on iOS and Safari' },
      { name: 'Google Pay', abbr: 'GP', color: '#4285F4', logo: SI('googlepay'), description: 'One-tap checkout on Android and Chrome' },
      { name: 'Cash', abbr: '₴€', color: '#22C55E', description: 'Cash on delivery with cashier reconciliation' },
    ],
  },
  {
    id: 'fiscalization',
    label: 'Fiscalization',
    count: 6,
    tagline: 'Receipts generated automatically. Stay compliant everywhere you operate.',
    integrations: [
      { name: 'Checkbox', abbr: 'CB', color: '#1E3A8A', logo: GF('checkbox.ua'), description: 'Ukrainian fiscalization (PPO), online cashier', flag: '🇺🇦' },
      { name: 'KSeF', abbr: 'KS', color: '#DC143C', description: 'Polish National e-Invoice System (KSEF)', flag: '🇵🇱' },
      { name: 'EET', abbr: 'EE', color: '#003DA5', description: 'Czech Electronic Records of Sales', flag: '🇨🇿' },
      { name: 'Fiskaly', abbr: 'FK', color: '#000000', logo: GF('fiskaly.com'), description: 'German TSE fiscalization (GoBD/GDPDU)', flag: '🇩🇪' },
      { name: 'VeriFacTu', abbr: 'VF', color: '#AA151B', description: 'Spanish electronic invoicing (VERI*FACTU)', flag: '🇪🇸' },
      { name: 'Stripe Tax', abbr: 'TX', color: '#635BFF', logo: SI('stripe'), description: 'US sales tax, VAT, and GST automation', flag: '🇺🇸' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    tagline: 'Run campaigns across every channel from one place.',
    integrations: [
      { name: 'SendPulse', abbr: 'SP', color: '#6B4EFF', logo: GF('sendpulse.com'), description: 'Email, SMS, Push, Viber, Automation 360' },
      { name: 'Meta Ads', abbr: 'FB', color: '#1877F2', logo: SI('meta'), description: 'Audience sync, conversion events, CAPI' },
      { name: 'Google Ads', abbr: 'GA', color: '#4285F4', logo: SI('googleads'), description: 'Offline conversion import, audience lists' },
      { name: 'Telegram Ads', abbr: 'TG', color: '#229ED9', logo: SI('telegram'), description: 'Sponsored messages, channel targeting' },
      { name: 'ElevenLabs', abbr: 'EL', color: '#000000', logo: SI('elevenlabs'), description: 'AI voice calls for reactivation campaigns' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    tagline: 'The intelligence layer that makes Toster more than a CRM.',
    integrations: [
      { name: 'Anthropic Claude', abbr: 'AI', color: '#D97706', logo: SI('anthropic'), description: 'Powers every AI feature — Sonnet + Haiku + Vision' },
      { name: 'Qdrant', abbr: 'QD', color: '#DC143C', logo: SI('qdrant'), description: 'Vector search for semantic customer profiling' },
      { name: 'ElevenLabs', abbr: 'EL', color: '#000000', logo: SI('elevenlabs'), description: 'Conversational AI voice operator (24/7 inbound)' },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    tagline: 'Enterprise-grade infrastructure, zero setup required.',
    integrations: [
      { name: 'Cloudflare R2', abbr: 'CF', color: '#F6821F', logo: SI('cloudflare'), description: 'S3-compatible object storage, photos & invoices' },
      { name: 'DistanceMatrix.ai', abbr: 'DM', color: '#2563EB', logo: GF('distancematrix.ai'), description: 'Geocoding + routing for delivery zones' },
      { name: 'OSRM', abbr: 'OS', color: '#059669', description: 'Fallback open-source routing engine' },
      { name: 'Redis', abbr: 'RD', color: '#DC2626', logo: SI('redis'), description: 'BullMQ queues, Socket.IO adapter, caching' },
      { name: 'PostgreSQL', abbr: 'PG', color: '#336791', logo: SI('postgresql'), description: 'Primary database, 100+ models' },
    ],
  },
  {
    id: 'telephony',
    label: 'Telephony',
    tagline: 'Every call handled, logged, and converted.',
    integrations: [
      { name: 'Asterisk AMI', abbr: 'AS', color: '#F59E0B', logo: GF('asterisk.org'), description: 'On-premise PBX integration, call events' },
      { name: 'ElevenLabs AI', abbr: 'EL', color: '#000000', logo: SI('elevenlabs'), description: 'Fully autonomous voice operator, 24/7' },
      { name: 'Twilio', abbr: 'TW', color: '#F22F46', logo: SI('twilio'), description: 'Cloud telephony fallback, SMS, WhatsApp' },
      { name: 'Telegram', abbr: 'TG', color: '#229ED9', logo: SI('telegram'), description: '13 bots — operators, kitchen, couriers, clients' },
    ],
  },
  {
    id: 'data',
    label: 'Imports & Exports',
    tagline: 'Your data, your way — in and out.',
    integrations: [
      { name: '1C ERP', abbr: '1C', color: '#FFCC00', logo: GF('1c.ru'), description: 'Import products, inventory, and staff data' },
      { name: 'BigQuery', abbr: 'BQ', color: '#4285F4', logo: SI('googlebigquery'), description: 'Custom SQL reports on raw CRM data' },
      { name: 'CSV / Excel', abbr: 'XL', color: '#217346', logo: SI('microsoftexcel'), description: 'Export any list or report, one click' },
      { name: 'Webhooks', abbr: 'WH', color: '#6366F1', description: 'HMAC-signed events, retry logic, delivery log' },
      { name: 'REST API', abbr: 'API', color: '#0A0A0A', description: 'Full API with scoped API keys, OpenAPI 3.1 spec' },
    ],
  },
];

function IntegrationCard({ integration }: { integration: Integration }) {
  const [logoError, setLogoError] = React.useState(false);
  const showLogo = integration.logo && !logoError;

  return (
    <motion.div
      variants={fadeInUp}
      className="group flex flex-col items-start gap-3 rounded-2xl border border-[#E5E5E5] bg-white p-5 transition-all hover:border-[#FFD600]/60 hover:shadow-sm"
    >
      {/* Logo */}
      <div className="relative">
        {showLogo ? (
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E5E5] bg-white overflow-hidden">
            <Image
              src={integration.logo!}
              alt={integration.name}
              width={32}
              height={32}
              className="object-contain"
              onError={() => setLogoError(true)}
              unoptimized
            />
          </div>
        ) : (
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white text-sm font-bold"
            style={{ backgroundColor: integration.color }}
          >
            {integration.abbr}
          </div>
        )}
        {integration.flag && (
          <span className="absolute -top-1 -right-1 text-base leading-none">{integration.flag}</span>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-[#0A0A0A] text-sm">{integration.name}</p>
          {integration.badge && (
            <span className="rounded-full bg-[#F5F5F5] px-2 py-0.5 text-xs font-medium text-[#525252]">
              {integration.badge}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-[#525252] leading-relaxed">{integration.description}</p>
      </div>
    </motion.div>
  );
}

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = React.useState('aggregators');

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="yellow" className="mb-4">Integrations</Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mb-4 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ lineHeight: 1.08 }}
            >
              Works with everything you already use
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#525252] leading-relaxed">
              Native integrations with aggregators, payment gateways, fiscalization, and marketing tools.
              All synced. All real-time.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap justify-center gap-8"
            >
              {[
                { value: '11', label: 'Aggregators' },
                { value: '6', label: 'Payment methods' },
                { value: '6', label: 'Fiscalization countries' },
                { value: '30+', label: 'Total integrations' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-semibold text-[#0A0A0A]">{stat.value}</p>
                  <p className="text-sm text-[#525252]">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Tabbed integrations */}
      <section className="bg-white pb-24 sm:pb-32">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          {/* Tab list */}
          <div className="sticky top-16 z-30 border-b border-[#E5E5E5] bg-white/95 backdrop-blur-md">
            <Container>
              <Tabs.List
                className="flex gap-1 overflow-x-auto py-2 scrollbar-none"
                aria-label="Integration categories"
              >
                {categories.map((cat) => (
                  <Tabs.Trigger
                    key={cat.id}
                    value={cat.id}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-[#525252] transition-colors hover:bg-[#F5F5F5] hover:text-[#0A0A0A] data-[state=active]:bg-[#FFD600] data-[state=active]:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
                  >
                    {cat.label}
                    {cat.count !== undefined && (
                      <span className="rounded-full bg-black/10 px-1.5 py-0.5 text-xs font-semibold">
                        {cat.count}
                      </span>
                    )}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Container>
          </div>

          {/* Tab panels */}
          <Container>
            {categories.map((cat) => (
              <Tabs.Content key={cat.id} value={cat.id} className="outline-none">
                <motion.div
                  variants={staggerChildren}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Category tagline */}
                  {cat.tagline && (
                    <motion.p
                      variants={fadeInUp}
                      className="mt-10 mb-8 text-center text-[#525252] text-base"
                    >
                      {cat.tagline}
                    </motion.p>
                  )}

                  {/* Integration grid */}
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {cat.integrations.map((integration) => (
                      <IntegrationCard key={integration.name} integration={integration} />
                    ))}
                  </div>
                </motion.div>
              </Tabs.Content>
            ))}
          </Container>
        </Tabs.Root>
      </section>

      {/* Missing integration CTA */}
      <section className="border-t border-[#E5E5E5] bg-[#F5F5F5] py-16">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[#E5E5E5] text-2xl">
                🔌
              </div>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="mb-3 text-2xl font-semibold text-[#0A0A0A] sm:text-3xl"
            >
              Don&apos;t see yours?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mb-8 text-[#525252] leading-relaxed"
            >
              We have a public REST API and HMAC-signed webhooks. Connect anything.
              Or request a native integration — we ship them fast.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3"
            >
              <Button variant="primary" size="lg" asChild>
                <Link href="/request-demo">
                  Request an integration <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="https://api.toster.co/docs" target="_blank" rel="noopener noreferrer">
                  API docs <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0A0A0A] py-20">
        <Container>
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
              All integrations. One platform.
            </h2>
            <p className="mb-8 text-white/60">
              See them in action with real demo data.
            </p>
            <Button variant="primary" size="lg" asChild>
              <DemoButton>
                Explore demo <ArrowRight className="ml-1 h-4 w-4" />
              </DemoButton>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
