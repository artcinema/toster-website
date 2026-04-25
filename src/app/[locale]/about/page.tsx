'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerChildren } from '@/lib/motion';

const values = [
  {
    emoji: '🍽️',
    title: 'We eat our own dogfood',
    body: '966 Network runs on Toster every day — 4 countries, 25+ locations, real orders. Every feature we ship, we use ourselves. When something breaks at 2am, we feel it too.',
  },
  {
    emoji: '🤖',
    title: 'AI-first, human-accountable',
    body: 'We believe AI should handle the repetitive — routing, reactivation, reporting — while humans make the judgment calls. Claude handles the noise. Your team handles the signal.',
  },
  {
    emoji: '🌍',
    title: 'Multi-country native',
    body: 'We didn\'t design for one market and then patch for others. Fiscalization, currencies, languages, and compliance are first-class citizens — not afterthoughts.',
  },
];

const milestones = [
  { year: '2022', label: 'Started 966 Network delivery in Kyiv' },
  { year: '2023', label: 'Expanded to Poland and Czech Republic' },
  { year: '2024', label: 'Built Toster to replace 5+ fragmented tools' },
  { year: '2025', label: 'Added Germany · AI features · Opened to external clients' },
];

const team = [
  {
    initials: 'AT',
    name: 'Artem Teslenko',
    role: 'Founder & CEO',
    note: 'Built 966 Network from one kitchen. Now building the platform for everyone else.',
    photo: '/team/artem.jpg',
  },
  {
    initials: 'DK',
    name: 'Dmitry Khvostik',
    role: 'CTO',
    photo: '/team/dmitry.jpg',
    note: 'Full-stack, TypeScript, distributed systems, and too many Telegram bots.',
  },
  {
    initials: 'AS',
    name: 'Alexander Smiyan',
    role: 'Head of Operations',
    photo: '/team/alexander.jpg',
    note: 'Runs the 966 Network. Every workflow in Toster started as their spreadsheet.',
  },
];

export default function AboutPage() {
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
              <Badge variant="yellow" className="mb-4">About</Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mb-5 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ lineHeight: 1.08 }}
            >
              We built Toster for ourselves first
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#525252] leading-relaxed">
              Toster didn&apos;t start as a SaaS idea. It started as the only way
              to keep 966 Network from collapsing under its own growth.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-white pb-20 sm:pb-24">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="prose prose-lg text-[#525252] max-w-none">
              <p>
                In 2022, Artem Teslenko launched 966 Network — a food delivery operation
                starting with one kitchen in Kyiv. Orders came in via phone and Telegram.
                Couriers were tracked in a spreadsheet. Marketing was a group chat broadcast.
              </p>
              <p className="mt-4">
                By 2023, they were operating in three countries. The spreadsheet became a disaster.
                Five different tools — for orders, kitchen, delivery, CRM, and marketing — refused
                to talk to each other. Managers spent half their day copy-pasting data.
              </p>
              <p className="mt-4">
                Every existing platform was either built for restaurants (not delivery chains),
                too expensive per-location to scale, or missing critical features like fiscal
                integration for Eastern Europe.
              </p>
              <p className="mt-4">
                So we built Toster. Not as a startup idea — as the only way to
                survive our own growth. The platform that runs 966 Network today is
                the same one we&apos;re opening to other operators.
              </p>
            </motion.div>

            {/* Milestones */}
            <motion.div variants={fadeInUp} className="mt-12">
              <div className="relative border-l-2 border-[#FFD600] pl-6 space-y-6">
                {milestones.map((m, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[1.65rem] top-1 h-4 w-4 rounded-full border-2 border-[#FFD600] bg-white" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#A3A3A3]">{m.year}</p>
                    <p className="mt-0.5 font-medium text-[#0A0A0A]">{m.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-[#0A0A0A] py-16">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {[
              { value: '4', label: 'Countries', sub: 'UA · PL · CZ · DE' },
              { value: '25+', label: 'Active locations', sub: 'and growing' },
              { value: '100+', label: 'Data models', sub: 'in the schema' },
              { value: '13', label: 'Telegram bots', sub: 'built and running' },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeInUp} className="text-center">
                <p className="text-4xl font-semibold text-[#FFD600]">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-white">{s.label}</p>
                <p className="text-xs text-white/40">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeInUp} className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">The team</h2>
              <p className="mt-3 text-[#525252]">Small. Focused. Running a real delivery operation.</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="rounded-2xl border border-[#E5E5E5] p-6"
                >
                  {/* Avatar */}
                  {'photo' in member && member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={56}
                      height={56}
                      className="mb-4 rounded-2xl object-cover object-top"
                    />
                  ) : (
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD600] text-sm font-bold text-[#0A0A0A]">
                      {member.initials}
                    </div>
                  )}
                  <p className="font-semibold text-[#0A0A0A]">{member.name}</p>
                  <p className="text-sm text-[#525252]">{member.role}</p>
                  <p className="mt-3 text-sm text-[#525252] leading-relaxed">{member.note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-[#F5F5F5] py-20 sm:py-24">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeInUp} className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">What we believe</h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="rounded-2xl bg-white border border-[#E5E5E5] p-7"
                >
                  <p className="mb-3 text-3xl">{v.emoji}</p>
                  <h3 className="mb-2 font-semibold text-[#0A0A0A]">{v.title}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed">{v.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Location */}
      <section className="border-t border-[#E5E5E5] bg-white py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#525252]"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Kyiv · Warsaw · Prague · Berlin
            </span>
            <span>·</span>
            <span>🇺🇦 🇵🇱 🇨🇿 🇩🇪</span>
            <span>·</span>
            <a href="mailto:hello@toster.co" className="underline underline-offset-2 hover:text-[#0A0A0A]">
              hello@toster.co
            </a>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-20">
        <Container>
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
              Join us
            </h2>
            <p className="mb-8 text-white/60">
              We&apos;re building something we&apos;re proud of. If that sounds interesting — let&apos;s talk.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href="/request-demo">
                  Book a demo <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary-dark" size="lg" asChild>
                <a href="mailto:careers@toster.co">careers@toster.co</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
