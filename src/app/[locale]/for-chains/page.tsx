'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, Globe, TrendingUp, Brain, AlertCircle,
  CheckCircle2, MapPin, DollarSign, Shield, Layers,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerChildren } from '@/lib/motion';

/* ── Europe map SVG with location pins ─────────────────────────── */
function EuropeMap() {
  const pins = [
    { cx: 310, cy: 148, label: 'Kyiv', country: 'UA', active: true },
    { cx: 222, cy: 102, label: 'Warsaw', country: 'PL', active: true },
    { cx: 226, cy: 130, label: 'Krakow', country: 'PL', active: true },
    { cx: 230, cy: 142, label: 'Prague', country: 'CZ', active: true },
    { cx: 197, cy: 108, label: 'Berlin', country: 'DE', active: true },
    { cx: 178, cy: 130, label: 'Munich', country: 'DE', active: false },
    { cx: 268, cy: 162, label: 'Lviv', country: 'UA', active: true },
    { cx: 290, cy: 155, label: 'Kharkiv', country: 'UA', active: true },
  ];

  return (
    <div className="relative mx-auto w-full max-w-lg select-none">
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        {/* Simplified Europe outline */}
        <path
          d="M60,80 L90,60 L130,55 L160,50 L200,45 L240,42 L270,48 L310,52 L350,60 L390,70 L420,90 L430,120 L420,150 L400,180 L380,210 L360,230 L330,250 L300,265 L270,270 L240,268 L210,262 L180,250 L160,235 L140,215 L120,200 L100,185 L80,165 L65,145 L55,120 L60,80Z"
          fill="#F5F5F5"
          stroke="#E5E5E5"
          strokeWidth="1.5"
        />
        {/* Country blobs */}
        <path d="M240,42 L280,48 L320,58 L350,80 L360,110 L340,130 L310,148 L280,155 L260,165 L240,160 L220,150 L215,130 L220,108 L230,88 L240,68 L240,42Z"
          fill="#FFF9C4" stroke="#FFD600" strokeWidth="1" opacity="0.8" /> {/* UA/PL/CZ region */}

        {/* Grid lines subtle */}
        {[80, 110, 140, 170, 200, 230].map((y) => (
          <line key={y} x1="50" y1={y} x2="430" y2={y} stroke="#E5E5E5" strokeWidth="0.5" strokeDasharray="4 4" />
        ))}
        {[120, 180, 240, 300, 360].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="280" stroke="#E5E5E5" strokeWidth="0.5" strokeDasharray="4 4" />
        ))}

        {/* Pulse rings for active pins */}
        {pins.filter(p => p.active).map((pin, i) => (
          <g key={`pulse-${i}`}>
            <circle cx={pin.cx} cy={pin.cy} r="12" fill="#FFD600" opacity="0.15">
              <animate attributeName="r" values="8;16;8" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Pins */}
        {pins.map((pin, i) => (
          <g key={i}>
            <circle
              cx={pin.cx}
              cy={pin.cy}
              r="5"
              fill={pin.active ? '#FFD600' : '#E5E5E5'}
              stroke={pin.active ? '#0A0A0A' : '#A3A3A3'}
              strokeWidth="1.5"
            />
            {/* Tooltip */}
            <g>
              <rect
                x={pin.cx + 8}
                y={pin.cy - 10}
                width={pin.label.length * 6.5 + 8}
                height="18"
                rx="4"
                fill="white"
                stroke="#E5E5E5"
                strokeWidth="1"
                opacity="0.9"
              />
              <text
                x={pin.cx + 12}
                y={pin.cy + 3}
                fontSize="9"
                fill="#0A0A0A"
                fontFamily="system-ui"
                fontWeight="600"
              >
                {pin.label}
              </text>
            </g>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-6 text-xs text-[#525252]">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFD600] ring-1 ring-[#0A0A0A]/20" />
          Active location
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] ring-1 ring-[#A3A3A3]/20" />
          Expanding
        </span>
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
                { value: '8+', label: 'Active locations', sub: 'and growing' },
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
