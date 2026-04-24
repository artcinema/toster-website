'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mic, Bot, Brain, Camera, FileText, Shield, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { fadeInUp, staggerChildren, viewportConfig } from '@/lib/motion';

const useCases = [
  {
    icon: Mic,
    tag: 'ElevenLabs',
    problem: '3 AM. Someone wants to order. Your operator is sleeping.',
    title: 'Voice AI Operator',
    description:
      'AI phone operator powered by ElevenLabs answers calls 24/7. Speaks natural Ukrainian, Russian, and Polish. Takes the order, confirms details, passes it to CRM — no human needed.',
    metric: '24/7 coverage, zero missed calls',
    visual: (
      <div className="flex items-center justify-center gap-6 py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
          <Mic className="h-8 w-8 text-[#FFD600]" />
        </div>
        <div className="flex flex-col gap-1.5">
          {['▓▓▓▓▓░░', '▓▓▓░░░░', '▓▓▓▓▓▓░'].map((bar, i) => (
            <div key={i} className="h-2 w-32 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-[#FFD600]"
                animate={{ width: ['40%', '80%', '60%', '40%'] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </div>
          ))}
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD600]">
          <span className="text-2xl font-bold text-[#0A0A0A]">T</span>
        </div>
      </div>
    ),
  },
  {
    icon: Bot,
    tag: 'Claude',
    problem: 'A marketer costs €2000/month. Excel campaigns = boring and slow.',
    title: 'Marketing AI Agent',
    description:
      'Claude-powered agent that runs autonomously. Launches reactivation cascades for churned customers, recovers abandoned carts, triggers weather-based promotions, and optimizes ad ROAS — without anyone pressing a button.',
    metric: 'Autonomous ROAS optimization',
    visual: (
      <div className="py-8">
        <div className="mx-auto max-w-sm space-y-2">
          {[
            { label: 'Analyzing churned segment', status: 'done' },
            { label: 'Selecting best offer', status: 'done' },
            { label: 'Sending Telegram cascade', status: 'active' },
            { label: 'Measuring conversion', status: 'pending' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3">
              <div
                className={`h-2 w-2 rounded-full ${
                  step.status === 'done'
                    ? 'bg-emerald-400'
                    : step.status === 'active'
                    ? 'bg-[#FFD600]'
                    : 'bg-white/20'
                }`}
              />
              <span className="text-sm text-white/70">{step.label}</span>
              {step.status === 'active' && (
                <motion.div
                  className="ml-auto h-1.5 w-12 overflow-hidden rounded-full bg-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full rounded-full bg-[#FFD600]"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Brain,
    tag: 'Claude',
    problem: 'How many cooks for Friday night? How many couriers for rainy Tuesday?',
    title: 'Digital Brain — Demand Forecasting',
    description:
      'AI predicts order volume per hour based on historical data, weather, holidays, and day of week. Recommends optimal cook and courier counts per shift. Recommendations delivered via HR Bot.',
    metric: 'Staffing accuracy +35% vs manual planning',
    visual: (
      <div className="py-8">
        <div className="mx-auto max-w-xs">
          <div className="mb-2 flex items-end justify-between gap-1 h-20">
            {[40, 60, 35, 80, 95, 70, 55, 90, 75, 45, 30, 20].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-[#FFD600]/60"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-white/40">
            <span>10:00</span><span>14:00</span><span>18:00</span><span>22:00</span>
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-center">
              <div className="text-lg font-semibold text-[#FFD600]">4</div>
              <div className="text-[10px] text-white/50">Cooks needed</div>
            </div>
            <div className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-center">
              <div className="text-lg font-semibold text-[#FFD600]">6</div>
              <div className="text-[10px] text-white/50">Couriers needed</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Bot,
    tag: 'Claude',
    problem: 'An influencer wants €500 for a post. Is it worth it?',
    title: 'Collab AI — Influencer Vetting',
    description:
      'Send a /collab/:token link to any influencer. They enter their price. Claude analyzes their audience, engagement rate, and CPM against your target. Verdict: worth_it, overpriced, or skip — in 30 seconds.',
    metric: 'Saved €15k+ on bad influencer deals',
    visual: (
      <div className="py-8">
        <div className="mx-auto max-w-xs rounded-xl bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/10" />
            <div>
              <div className="h-2 w-24 rounded bg-white/20" />
              <div className="mt-1 h-1.5 w-16 rounded bg-white/10" />
            </div>
          </div>
          <div className="mb-3 space-y-1.5">
            <div className="flex justify-between text-xs text-white/50">
              <span>Followers</span><span className="text-white/80">48,200</span>
            </div>
            <div className="flex justify-between text-xs text-white/50">
              <span>Engagement</span><span className="text-white/80">3.8%</span>
            </div>
            <div className="flex justify-between text-xs text-white/50">
              <span>CPM</span><span className="text-white/80">€4.20</span>
            </div>
            <div className="flex justify-between text-xs text-white/50">
              <span>Asked price</span><span className="text-white/80">€350</span>
            </div>
          </div>
          <div className="rounded-lg bg-emerald-500/20 px-3 py-2 text-center text-sm font-semibold text-emerald-400">
            ✅ Worth it
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: FileText,
    tag: 'Claude Vision',
    problem: 'Supplier delivers with a paper invoice. Stock update takes 30 minutes.',
    title: 'OCR Invoice Scanning',
    description:
      'Packer photos the supplier invoice → Claude Vision extracts all line items, quantities, and prices → inventory updated automatically. No manual data entry.',
    metric: 'Invoice processing: 30min → 30sec',
    visual: (
      <div className="py-8 text-center">
        <div className="mx-auto max-w-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
            <div className="mb-2 text-xs font-medium text-white/50 uppercase tracking-wide">Invoice #2847</div>
            {['Salmon fillet — 12kg', 'Avocado — 40 pcs', 'Nori sheets — 200', 'Rice (sushi) — 25kg'].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 py-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-[#FFD600]" />
                <span className="text-xs text-white/70">{item}</span>
                <span className="ml-auto text-[10px] text-emerald-400">✓ synced</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Camera,
    tag: 'Claude Vision',
    problem: 'Wrong order packed. Customer gets the wrong food. Refund, bad review.',
    title: 'Photo QC at Packing',
    description:
      'Packer uploads a photo of the packed order. Claude Vision checks that all items are present and correctly packed. If OK — order proceeds to dispatch. If not — packer gets a specific correction prompt.',
    metric: 'Packing error rate reduced significantly',
    visual: (
      <div className="py-8 text-center">
        <div className="mx-auto max-w-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex h-28 items-center justify-center rounded-lg bg-white/5">
              <Camera className="h-10 w-10 text-white/20" />
            </div>
            <motion.div
              className="rounded-lg bg-emerald-500/20 px-3 py-2 text-sm font-medium text-emerald-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✅ All 6 items detected — ready for dispatch
            </motion.div>
          </div>
        </div>
      </div>
    ),
  },
];

const aiStack = [
  { name: 'Claude Sonnet', desc: 'Main reasoning & agents', color: '#FFD600' },
  { name: 'Claude Haiku', desc: 'Fast, lightweight tasks', color: '#FFD600' },
  { name: 'Claude Vision', desc: 'OCR & photo verification', color: '#FFD600' },
  { name: 'ElevenLabs', desc: 'Voice AI operator', color: '#A78BFA' },
  { name: 'Qdrant', desc: 'Vector search', color: '#60A5FA' },
];

export default function AiPage() {
  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="dark" className="mb-4">AI</Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ lineHeight: 1.08 }}
            >
              Food delivery, meet Claude.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/60 leading-relaxed">
              Toster integrates Claude and ElevenLabs across the entire delivery lifecycle.
              Not chatbots — real AI agents that do work.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href={siteConfig.demoUrl}>Try Demo</Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Use Cases */}
      {useCases.map((uc, i) => {
        const Icon = uc.icon;
        const isEven = i % 2 === 0;
        return (
          <section key={i} className={`border-t border-white/10 py-24 ${isEven ? '' : 'bg-white/[0.02]'}`}>
            <Container>
              <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                <motion.div
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className={isEven ? '' : 'lg:order-2'}
                >
                  <motion.div variants={fadeInUp} className="mb-4 flex items-center gap-2">
                    <Badge variant="dark">{uc.tag}</Badge>
                  </motion.div>
                  <motion.p variants={fadeInUp} className="mb-2 text-sm italic text-white/40">
                    &ldquo;{uc.problem}&rdquo;
                  </motion.p>
                  <motion.h2 variants={fadeInUp} className="mb-4 text-3xl font-semibold text-white">
                    {uc.title}
                  </motion.h2>
                  <motion.p variants={fadeInUp} className="mb-6 text-white/60 leading-relaxed">
                    {uc.description}
                  </motion.p>
                  <motion.div
                    variants={fadeInUp}
                    className="inline-flex items-center gap-2 rounded-full border border-[#FFD600]/20 bg-[#FFD600]/10 px-4 py-2 text-sm font-medium text-[#FFD600]"
                  >
                    <Icon className="h-4 w-4" /> {uc.metric}
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className={`rounded-2xl border border-white/10 bg-white/5 ${isEven ? '' : 'lg:order-1'}`}
                >
                  {uc.visual}
                </motion.div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* AI Stack */}
      <section className="border-t border-white/10 py-20">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h2 variants={fadeInUp} className="mb-10 text-center text-2xl font-semibold text-white">
              Powered by
            </motion.h2>
            <motion.div
              variants={staggerChildren}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {aiStack.map((item) => (
                <motion.div
                  key={item.name}
                  variants={fadeInUp}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3"
                >
                  <div className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                  <div>
                    <div className="text-sm font-semibold text-white">{item.name}</div>
                    <div className="text-xs text-white/40">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Trust / Safety */}
      <section className="border-t border-white/10 py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <motion.div variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <motion.h2 variants={fadeInUp} className="mb-8 text-2xl font-semibold text-white text-center">
                AI you can trust
              </motion.h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { icon: Shield, title: 'Your data stays yours', desc: 'Never used for model training. Isolated per organization.' },
                  { icon: FileText, title: 'Full audit log', desc: 'Every AI decision is logged with reasoning and timestamp.' },
                  { icon: Brain, title: 'Human-accountable', desc: 'AI suggests or executes — you set the limits.' },
                  { icon: Shield, title: 'GDPR compliant', desc: 'Data export and deletion endpoints. EU-resident storage where applicable.' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={i} variants={fadeInUp} className="rounded-xl border border-white/10 bg-white/5 p-5">
                      <Icon className="mb-2 h-5 w-5 text-[#FFD600]" />
                      <div className="mb-1 font-medium text-white">{item.title}</div>
                      <div className="text-sm text-white/50">{item.desc}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-20">
        <Container>
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-semibold text-white">See AI in action</h2>
            <p className="mb-8 text-white/60">Explore every AI feature with live demo data.</p>
            <Button variant="primary" size="lg" asChild>
              <Link href={siteConfig.demoUrl}>
                Try Demo <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
