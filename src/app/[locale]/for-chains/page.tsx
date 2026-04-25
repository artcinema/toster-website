'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, Globe, TrendingUp, Brain, AlertCircle,
  CheckCircle2, MapPin, DollarSign, Shield, Layers,
} from 'lucide-react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerChildren } from '@/lib/motion';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO 3166-1 numeric — UA=804, PL=616, CZ=203, DE=276
const HIGHLIGHTED = new Set([804, 616, 203, 276]);

interface Pin {
  name: string;
  coordinates: [number, number];
  active: boolean;
  stat: string;
}

const PINS: Pin[] = [
  { name: 'Kyiv',    coordinates: [30.52, 50.45], active: true,  stat: '200+ orders/day' },
  { name: 'Kharkiv', coordinates: [36.23, 49.99], active: true,  stat: '50+ orders/day' },
  { name: 'Lviv',    coordinates: [24.03, 49.84], active: true,  stat: '90+ orders/day' },
  { name: 'Warsaw',  coordinates: [21.01, 52.23], active: true,  stat: '80+ orders/day' },
  { name: 'Krakow',  coordinates: [19.94, 50.06], active: true,  stat: '60+ orders/day' },
  { name: 'Prague',  coordinates: [14.42, 50.08], active: true,  stat: '40+ orders/day' },
  { name: 'Berlin',  coordinates: [13.40, 52.52], active: true,  stat: '30+ orders/day' },
  { name: 'Dnipro',  coordinates: [35.04, 48.46], active: true,  stat: '70+ orders/day' },
  { name: 'Munich',  coordinates: [11.58, 48.14], active: false, stat: 'Expanding soon' },
];

/* ── Interactive Europe map ─────────────────────────────────────── */
function EuropeMap() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState<Pin | null>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full select-none"
      onMouseMove={handleMouseMove}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [22, 51], scale: 900 }}
        height={320}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={6} center={[22, 51]}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const hi = HIGHLIGHTED.has(Number(geo.id));
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={hi ? '#FFF9C4' : '#F0F0F0'}
                    stroke={hi ? '#FFD600' : '#D4D4D4'}
                    strokeWidth={hi ? 1 : 0.4}
                    style={{
                      default: { outline: 'none' },
                      hover:   { fill: hi ? '#FFE566' : '#E8E8E8', outline: 'none', cursor: 'grab' },
                      pressed: { outline: 'none', cursor: 'grabbing' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {PINS.map((pin, i) => (
            <Marker
              key={pin.name}
              coordinates={pin.coordinates}
              onMouseEnter={() => setHovered(pin)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pulse ring */}
              {pin.active && (
                <circle r={10} fill="#FFD600" opacity={0.2}>
                  <animate
                    attributeName="r"
                    values="5;14;5"
                    dur="2.5s"
                    begin={`${i * 0.35}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.35;0;0.35"
                    dur="2.5s"
                    begin={`${i * 0.35}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              {/* Pin dot */}
              <circle
                r={hovered?.name === pin.name ? 7 : 5}
                fill={pin.active ? '#FFD600' : '#D4D4D4'}
                stroke={pin.active ? '#0A0A0A' : '#888'}
                strokeWidth={1.5}
                style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {hovered && (
        <div
          className="pointer-events-none absolute z-50 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2 shadow-lg"
          style={{
            left: mousePos.x + 14,
            top:  mousePos.y - 48,
            whiteSpace: 'nowrap',
          }}
        >
          <p className="text-sm font-semibold text-[#0A0A0A]">{hovered.name}</p>
          <p className="text-xs text-[#525252]">{hovered.stat}</p>
        </div>
      )}

      {/* Legend + hint */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-[#525252]">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFD600] ring-1 ring-[#0A0A0A]/20" />
          Active location
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D4D4D4] ring-1 ring-[#888]/20" />
          Expanding
        </span>
        <span className="text-[#A3A3A3]">Scroll to zoom · drag to pan</span>
      </div>
    </div>
  );
}

/* ── Pain / Solution pairs ─────────────────────────────────────── */
const painPoints = [
  {
    icon: AlertCircle,
    title: 'Data silos between locations',
    body: 'Every location runs its own spreadsheet. No unified view of revenue, inventory, or customers across the network.',
  },
  {
    icon: AlertCircle,
    title: 'Inconsistent ops across countries',
    body: 'Different staff, different workflows, different tools. Scaling a second location means starting from scratch.',
  },
  {
    icon: AlertCircle,
    title: "Marketing doesn't scale",
    body: 'Manually sending promos to each location\'s customer list. No RFM. No attribution. No AI. Just copy-paste.',
  },
];

const solutions = [
  {
    icon: CheckCircle2,
    title: 'Unified data across all locations',
    body: 'One dashboard — all orders, kitchen throughput, courier efficiency, and P&L across every division. Real-time.',
  },
  {
    icon: CheckCircle2,
    title: 'One playbook, adapted per country',
    body: 'Same workflows everywhere. Local currencies, fiscalization, and payment gateways configured per country automatically.',
  },
  {
    icon: CheckCircle2,
    title: 'AI marketing agent scales with you',
    body: 'Autonomous campaigns per segment per location. Reactivation, churn prevention, and ROAS optimization — all hands-free.',
  },
];

/* ── Multi-country feature list ───────────────────────────────── */
const multiCountryFeatures = [
  { icon: DollarSign, title: 'Currency per location', body: 'UAH, EUR, PLN, CZK — each location in its own currency with live FX rates.' },
  { icon: Shield, title: 'Fiscalization per country', body: 'Checkbox (UA), KSeF (PL), EET (CZ), Fiskaly (DE) — receipts auto-generated.' },
  { icon: Globe, title: 'Language per customer', body: 'Customer-facing interfaces in 7 languages. Staff interface in their language.' },
  { icon: Layers, title: 'Tax calendar per jurisdiction', body: 'Deadline tracking per country. Never miss a filing date in any market.' },
  { icon: TrendingUp, title: 'Local payment gateways', body: 'LiqPay for UA, Stripe + Viva Wallet for EU, local cash reconciliation everywhere.' },
  { icon: Brain, title: 'Cross-location AI analytics', body: 'AI daily report per owner with cross-location benchmarks, anomalies, and actions.' },
];

export default function ForChainsPage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left: text */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="yellow" className="mb-4">For chains</Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="mb-5 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
                style={{ lineHeight: 1.08 }}
              >
                Scale from 3 to 300 locations without hiring more managers
              </motion.h1>
              <motion.p variants={fadeInUp} className="mb-8 text-lg text-[#525252] leading-relaxed">
                Toster is built for multi-location chains. Multi-country.
                Multi-currency. One platform.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/request-demo">
                    Book a chain demo <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/features">See all features</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="rounded-3xl border border-[#E5E5E5] bg-[#FAFAFA] p-8"
            >
              <EuropeMap />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Pain → Solution */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeInUp} className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#A3A3A3]">The problem</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">
                Running a chain is hard. It doesn&apos;t have to be.
              </h2>
            </motion.div>

            {/* Pain + Solution side by side */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Pain column */}
              <div className="space-y-4">
                {painPoints.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      className="flex gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-5"
                    >
                      <div className="mt-0.5 shrink-0">
                        <Icon className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0A0A0A]">{p.title}</p>
                        <p className="mt-1 text-sm text-[#525252] leading-relaxed">{p.body}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Solution column */}
              <div className="space-y-4">
                {solutions.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      className="flex gap-4 rounded-2xl border border-green-100 bg-green-50/50 p-5"
                    >
                      <div className="mt-0.5 shrink-0">
                        <Icon className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0A0A0A]">{s.title}</p>
                        <p className="mt-1 text-sm text-[#525252] leading-relaxed">{s.body}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Case study: 966 Network */}
      <section className="bg-[#0A0A0A] py-20 sm:py-24">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-10 text-center">
              <Badge variant="yellow" className="mb-4">Case study</Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                966 Network — built on Toster
              </h2>
              <p className="mt-3 text-white/60">
                A real food delivery chain operating across 4 countries, running on this platform since day one.
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {[
                { value: '4', label: 'Countries', sub: 'UA · PL · CZ · DE' },
                { value: '25+', label: 'Active locations', sub: 'and growing' },
                { value: '500+', label: 'Orders / day', sub: 'peak season' },
                { value: '70%', label: 'Automated', sub: 'no manual routing' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
                >
                  <p className="text-4xl font-semibold text-[#FFD600]">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-white">{stat.label}</p>
                  <p className="text-xs text-white/40">{stat.sub}</p>
                </div>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              variants={fadeInUp}
              className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
            >
              <p className="text-lg text-white/80 italic leading-relaxed">
                &ldquo;We were running 4 countries from one Telegram thread. Now every manager
                sees only their city, I see everything — and the AI agent handles
                reactivations while I sleep.&rdquo;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-semibold text-[#FFD600]">966 Network — Founder</p>
                <p className="text-xs text-white/40">Ukraine · Poland · Czech Republic · Germany</p>
              </footer>
            </motion.blockquote>
          </motion.div>
        </Container>
      </section>

      {/* Multi-country features */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeInUp} className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">
                Multi-country, out of the box
              </h2>
              <p className="mt-3 text-[#525252]">
                Every compliance and operational requirement handled per jurisdiction.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {multiCountryFeatures.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="rounded-2xl border border-[#E5E5E5] p-6 hover:border-[#FFD600]/50 transition-colors"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD600]/10">
                      <Icon className="h-5 w-5 text-[#0A0A0A]" />
                    </div>
                    <h3 className="mb-2 font-semibold text-[#0A0A0A]">{feature.title}</h3>
                    <p className="text-sm text-[#525252] leading-relaxed">{feature.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Country flags strip */}
      <section className="border-y border-[#E5E5E5] bg-[#F5F5F5] py-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <p className="text-sm font-medium text-[#525252]">Operating in:</p>
            {[
              { flag: '🇺🇦', name: 'Ukraine' },
              { flag: '🇵🇱', name: 'Poland' },
              { flag: '🇨🇿', name: 'Czech Republic' },
              { flag: '🇩🇪', name: 'Germany' },
              { flag: '🇪🇸', name: 'Spain' },
              { flag: '🇺🇸', name: 'United States' },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-sm text-[#0A0A0A]">
                <span className="text-2xl">{c.flag}</span>
                <span className="font-medium">{c.name}</span>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <MapPin className="mx-auto mb-4 h-10 w-10 text-[#FFD600]" />
            <h2 className="mb-4 text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">
              See how Toster scales your chain
            </h2>
            <p className="mb-8 text-[#525252] leading-relaxed">
              30-minute demo with your locations, your currencies, and your workflows.
              No generic slides — we show you exactly what it looks like for your chain.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href="/request-demo">
                  Request a chain demo <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/integrations">View integrations</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
