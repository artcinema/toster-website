'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, Kanban, Bot, Star, Megaphone,
  TrendingUp, Globe, Users, Zap, Lock, CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { DemoButton } from '@/components/ui/demo-button';
import { fadeInUp, staggerChildren } from '@/lib/motion';

const entryFeatures = [
  { icon: Kanban, title: 'Kanban order board', description: 'Drag-and-drop orders through every status. Filter by channel, courier, payment type.' },
  { icon: Bot, title: '7 Telegram bots', description: 'Cook, packer, courier, operator, manager — each gets their own bot. No app install needed.' },
  { icon: Star, title: 'Loyalty program', description: '1% cashback on every order. Up to 30% redeemable. Customer retention built in.' },
  { icon: Megaphone, title: 'Basic marketing', description: 'Email, SMS, Push, and Telegram campaigns. Welcome series and birthday offers out of the box.' },
  { icon: Globe, title: 'Multi-channel intake', description: 'Phone, web, Telegram, POS, and 11 aggregators — all in one queue.' },
  { icon: TrendingUp, title: 'Real-time analytics', description: 'Revenue, kitchen throughput, and delivery stats. Live dashboard, no page refresh.' },
];

const scaleFeatures = [
  { icon: Users, title: 'Multi-location management', description: 'Add locations with one click. Each gets its own staff, inventory, and reporting.' },
  { icon: Globe, title: 'Multi-country operations', description: 'Local currencies, fiscalization, and payment gateways per country.' },
  { icon: Zap, title: 'VRP route optimization', description: 'Automated multi-stop routing across your entire courier fleet.' },
  { icon: Lock, title: 'Advanced RBAC', description: '11 roles with granular permissions. Location managers see only their data.' },
];

export default function ForSingleLocationPage() {
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
              <Badge variant="yellow" className="mb-4">For single locations</Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mb-4 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ lineHeight: 1.08 }}
            >
              Starting small? Toster grows with you.
            </motion.h1>
            <motion.p variants={fadeInUp} className="mb-8 text-lg text-[#525252] leading-relaxed">
              Run your single location like a chain. Upgrade when you add more.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <DemoButton>
                  Try the demo <ArrowRight className="ml-1 h-4 w-4" />
                </DemoButton>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/request-demo">Talk to us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Entry-level features */}
      <section className="bg-white pb-20 sm:pb-24">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeInUp} className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#A3A3A3]">What you get on day one</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">
                Everything a growing location needs
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {entryFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="rounded-2xl border border-[#E5E5E5] p-6 hover:border-[#FFD600]/50 transition-colors"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD600]/10">
                      <Icon className="h-5 w-5 text-[#0A0A0A]" />
                    </div>
                    <h3 className="mb-2 font-semibold text-[#0A0A0A]">{f.title}</h3>
                    <p className="text-sm text-[#525252] leading-relaxed">{f.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Scale preview */}
      <section className="bg-[#0A0A0A] py-20 sm:py-24">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeInUp} className="mb-10 text-center">
              <Badge variant="yellow" className="mb-4">When you&apos;re ready to scale...</Badge>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                Multi-location is one step away
              </h2>
              <p className="mt-3 text-white/60">
                No migration. No new system. Just unlock what&apos;s already there.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {scaleFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="mt-0.5 shrink-0">
                      <Icon className="h-5 w-5 text-[#FFD600]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{f.title}</p>
                      <p className="mt-1 text-sm text-white/60 leading-relaxed">{f.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={fadeInUp} className="mt-8 text-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/for-chains">
                  See chain features <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Pricing comparison placeholder */}
      <section className="bg-[#F5F5F5] py-20 sm:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">Simple pricing</h2>
              <p className="mt-3 text-[#525252]">Flat monthly fee. No per-order fees. No surprises.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Single location */}
              <div className="rounded-2xl border-2 border-[#FFD600] bg-white p-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#525252]">Single location</p>
                <p className="mt-4 text-4xl font-semibold text-[#0A0A0A]">
                  Contact us
                </p>
                <p className="mt-1 text-sm text-[#525252]">Custom pricing per market</p>
                <ul className="mt-6 space-y-3">
                  {['All core features', '7 Telegram bots', 'Loyalty program', 'Basic marketing', 'Email support'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#0A0A0A]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="primary" size="lg" className="mt-8 w-full" asChild>
                  <Link href="/request-demo">Get pricing</Link>
                </Button>
              </div>

              {/* Multi-location */}
              <div className="rounded-2xl border border-[#E5E5E5] bg-white p-8 opacity-75">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#525252]">Chain plan</p>
                <p className="mt-4 text-4xl font-semibold text-[#0A0A0A]">
                  Contact us
                </p>
                <p className="mt-1 text-sm text-[#525252]">Per location pricing</p>
                <ul className="mt-6 space-y-3">
                  {['Everything in Single', 'Multi-location dashboard', 'Multi-country operations', 'AI marketing agent', 'Priority support'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#0A0A0A]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#A3A3A3]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" size="lg" className="mt-8 w-full" asChild>
                  <Link href="/for-chains">Learn more</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">
              See it live in 5 minutes
            </h2>
            <p className="mb-8 text-[#525252]">
              Explore every feature with real demo data. No signup needed.
            </p>
            <Button variant="primary" size="xl" asChild>
              <DemoButton>
                Try the demo <ArrowRight className="ml-1 h-4 w-4" />
              </DemoButton>
            </Button>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
