import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, UtensilsCrossed, Bot, Globe } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { FlagIcon } from '@/components/ui/FlagIcon';
import { PodcastPlayer } from '@/components/ui/PodcastPlayer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const PODCAST_URL = 'https://github.com/artcinema/toster-website/releases/download/media-v1/The_AI_Brain_Running_Dark_Kitchens.m4a';

const values = [
  {
    icon: UtensilsCrossed,
    title: 'We eat our own dogfood',
    body: '966 Network runs on Toster every day — 4 countries, 25+ locations, real orders. Every feature we ship, we use ourselves. When something breaks at 2am, we feel it too.',
  },
  {
    icon: Bot,
    title: 'AI-first, human-accountable',
    body: 'We believe AI should handle the repetitive — routing, reactivation, reporting — while humans make the judgment calls. Claude handles the noise. Your team handles the signal.',
  },
  {
    icon: Globe,
    title: 'Multi-country native',
    body: 'We didn\'t design for one market and then patch for others. Fiscalization, currencies, languages, and compliance are first-class citizens — not afterthoughts.',
  },
];

const milestones = [
  { year: '2014', label: 'First CRM system launched for food delivery operators in Ukraine' },
  { year: '2018', label: 'Scaled to 50+ delivery businesses — kitchen, couriers, and orders in one platform' },
  { year: '2022', label: 'Built 966 Network on Toster — 4 countries, real orders, real pressure' },
  { year: '2025', label: 'AI features, mobile apps, managed marketing · Opened to global operators' },
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
          <div className="mx-auto max-w-3xl text-center">
            <div>
              <Badge variant="yellow" className="mb-4">About</Badge>
            </div>
            <h1
              className="mb-5 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ lineHeight: 1.08 }}
            >
              10 years building CRM for food delivery — in the market that demands it most
            </h1>
            <p className="text-lg text-[#525252] leading-relaxed">
              Toster started in Ukraine in 2014. Not as a SaaS experiment —
              as the operational backbone for delivery businesses that couldn&apos;t afford to fail.
            </p>
          </div>
        </Container>
      </section>

      {/* Podcast player */}
      <section className="bg-white pb-10">
        <Container>
          <div className="mx-auto max-w-2xl">
            <PodcastPlayer
              src={PODCAST_URL}
              title="The AI Brain Running Dark Kitchens"
              subtitle="Podcast · How Toster automates food delivery operations with AI"
              autoPlay
            />
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-white pb-20 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="prose prose-lg text-[#525252] max-w-none">
              <p>
                Toster has its roots in Ukraine, where the team began building CRM software
                for food delivery operators back in 2014 — long before {'"'}dark kitchen{'"'} became
                a buzzword. Orders, couriers, kitchens, and customer data: all in one place,
                from day one.
              </p>
              <p className="mt-4">
                Over a decade, the platform evolved alongside the operators who ran it.
                By 2018, 50+ delivery businesses across Ukraine relied on Toster
                to manage their daily operations. Every edge case, every fiscal rule,
                every shift pattern — baked in from real experience, not guesswork.
              </p>
              <p className="mt-4">
                In 2022, the team put the platform to its hardest test: running 966 Network —
                a multi-brand food delivery chain across 4 countries. That pressure
                pushed Toster to add AI automation, multi-country fiscalization,
                and the managed marketing layer it has today.
              </p>
              <p className="mt-4">
                The platform that has been running Ukrainian delivery operations since 2014
                is now open to operators worldwide.
              </p>
            </div>

            {/* Milestones */}
            <div className="mt-14">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    {/* yellow accent bar top */}
                    <div className="mb-4 h-0.5 w-8 rounded-full bg-[#FFD600]" />
                    <p className="text-2xl font-bold text-[#0A0A0A]">{m.year}</p>
                    <p className="mt-2 text-sm leading-snug text-[#525252]">{m.label}</p>
                    {/* subtle number watermark */}
                    <span className="pointer-events-none absolute -right-1 -bottom-3 text-6xl font-black text-[#F5F5F5] select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-[#0A0A0A] py-16">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: '4', label: 'Countries', sub: 'UA · PL · CZ · DE' },
              { value: '25+', label: 'Active locations', sub: 'and growing' },
              { value: '100+', label: 'Data models', sub: 'in the schema' },
              { value: '13', label: 'Telegram bots', sub: 'built and running' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-semibold text-[#FFD600]">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-white">{s.label}</p>
                <p className="text-xs text-white/40">{s.sub}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-white py-14 sm:py-18">
        <Container>
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">The team</h2>
              <p className="mt-3 text-[#525252]">Small. Focused. Running a real delivery operation.</p>
            </div>

            <div className="mx-auto max-w-2xl flex flex-col gap-4">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 rounded-2xl border border-[#E5E5E5] p-5"
                >
                  {/* Photo */}
                  {'photo' in member && member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={96}
                      height={112}
                      className="flex-shrink-0 rounded-xl object-cover object-top"
                      style={{ width: 96, height: 112 }}
                    />
                  ) : (
                    <div className="flex-shrink-0 flex h-28 w-24 items-center justify-center rounded-xl bg-[#FFD600] text-sm font-bold text-[#0A0A0A]">
                      {member.initials}
                    </div>
                  )}
                  {/* Text */}
                  <div className="min-w-0 pt-1">
                    <p className="text-lg font-semibold text-[#0A0A0A]">{member.name}</p>
                    <p className="mt-0.5 text-sm text-[#525252]">{member.role}</p>
                    <p className="mt-2 text-sm text-[#525252] leading-relaxed">{member.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-[#F5F5F5] py-20 sm:py-24">
        <Container>
          <div>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">What we believe</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-[#E5E5E5] p-7"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD600]/15">
                    <v.icon className="h-5 w-5 text-[#0A0A0A]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-[#0A0A0A]">{v.title}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Location */}
      <section className="border-t border-[#E5E5E5] bg-white py-12">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#525252]">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Kyiv · Warsaw · Prague · Berlin
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <FlagIcon code="ua" className="h-4 w-5 rounded-sm" />
              <FlagIcon code="pl" className="h-4 w-5 rounded-sm" />
              <FlagIcon code="cz" className="h-4 w-5 rounded-sm" />
              <FlagIcon code="de" className="h-4 w-5 rounded-sm" />
            </span>
            <span>·</span>
            <a href="mailto:hello@toster.co" className="underline underline-offset-2 hover:text-[#0A0A0A]">
              hello@toster.co
            </a>
          </div>
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
