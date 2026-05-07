import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Check, X, AlertTriangle, ArrowRight, Bot, Brain, Mic, Users, Rocket, Target, BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';

// Lazy-load heavy client components — they're below the fold on first paint
const KanbanMockup = dynamic(
  () => import('@/components/home/KanbanMockup').then((m) => m.KanbanMockup),
  { ssr: false, loading: () => <div className="h-[420px] rounded-2xl bg-[#F5F5F5] animate-pulse" /> },
);
const FaqAccordion = dynamic(
  () => import('@/components/home/FaqAccordion').then((m) => m.FaqAccordion),
  { ssr: false },
);

// ─── Comparison Table ─────────────────────────────────────────────────────────

function ComparisonIcon({ value }: { value: string }) {
  if (value === '✅') return <Check className="mx-auto h-5 w-5 text-emerald-500" />;
  if (value === '❌') return <X className="mx-auto h-5 w-5 text-red-400" />;
  if (value === '⚠️') return <AlertTriangle className="mx-auto h-5 w-5 text-amber-400" />;
  return <span className="text-xs text-[#737373]">{value}</span>;
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  const features = t.raw('features.items') as Array<{ title: string; description: string }>;
  const steps = t.raw('howItWorks.steps') as Array<{ number: string; title: string; description: string }>;
  const aiItems = t.raw('ai.items') as Array<{ title: string; description: string }>;
  const faqItems = t.raw('faq.items') as Array<{ question: string; answer: string }>;
  const problemItems = t.raw('problem.items') as string[];
  const solutionItems = t.raw('solution.items') as string[];
  const compFeatures = t.raw('comparison.features') as string[];
  const compToster = t.raw('comparison.toster') as string[];
  const compIiko = t.raw('comparison.iiko') as string[];
  const compPoster = t.raw('comparison.posterPos') as string[];
  const compExcel = t.raw('comparison.excel') as string[];

  const aiIcons = [Mic, Bot, Users, Brain];

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(to right, #0A0A0A 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="max-w-xl">
              <div>
                <Badge variant="yellow" className="mb-6">
                  {t('hero.eyebrow')}
                </Badge>
              </div>
              <h1
                className="text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl lg:text-6xl"
                style={{ lineHeight: 1.08 }}
              >
                {t('hero.title')}
              </h1>
              <p className="mt-6 text-lg text-[#525252] leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/request-demo">{tCommon('requestDemo')}</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-[#737373]">
                {t('hero.trust')}
              </p>
            </div>

            <div className="hidden lg:block">
              <KanbanMockup />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── SOCIAL PROOF ─────────────────────────────────────────────── */}
      <section className="border-y border-[#E5E5E5] bg-[#F5F5F5] py-10">
        <Container>
          <p className="mb-6 text-center text-sm font-medium text-[#737373] uppercase tracking-widest">
            {t('socialProof.title')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { name: 'Bolt Food', color: '#34D186' },
              { name: 'Glovo', color: '#FFC244' },
              { name: 'Wolt', color: '#009DE0' },
              { name: 'DoorDash', color: '#FF3008' },
              { name: 'Uber Eats', color: '#06C167' },
              { name: 'Just Eat', color: '#FF8000' },
            ].map(({ name, color }) => (
              <div
                key={name}
                className="flex h-9 items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-4 opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <span className="text-sm font-semibold text-[#0A0A0A] whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── PROBLEM → SOLUTION ───────────────────────────────────────── */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Problem */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-[#0A0A0A]">
                {t('problem.title')}
              </h2>
              <ul className="space-y-3">
                {problemItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                    <span className="text-[#525252]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-[#0A0A0A]">
                {t('solution.title')}
              </h2>
              <ul className="space-y-3">
                {solutionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                    <span className="text-[#525252]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── FEATURE HIGHLIGHTS ───────────────────────────────────────── */}
      <section className="bg-[#F5F5F5] py-24 sm:py-32">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-[#0A0A0A] sm:text-4xl">
            {t('features.title')}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#E5E5E5] bg-white p-8"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD600]">
                  <span className="text-lg font-bold text-[#0A0A0A]">{i + 1}</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#0A0A0A]">{feature.title}</h3>
                <p className="text-[#525252] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <h2 className="mb-16 text-center text-3xl font-semibold tracking-tight text-[#0A0A0A] sm:text-4xl">
            {t('howItWorks.title')}
          </h2>
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Connector line */}
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-[#E5E5E5] md:block" />
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD600]">
                  <span className="text-2xl font-bold text-[#0A0A0A]">{step.number}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#0A0A0A]">{step.title}</h3>
                <p className="text-[#525252] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── AI SHOWCASE ──────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-24 sm:py-32">
        <Container>
          <div className="mb-16 text-center">
            <div>
              <Badge variant="dark" className="mb-4">AI</Badge>
            </div>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t('ai.title')}
            </h2>
            <p className="text-lg text-white/60">
              {t('ai.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aiItems.map((item, i) => {
              const Icon = aiIcons[i] ?? Bot;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#FFD600]/30 transition-colors"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD600]/10">
                    <Icon className="h-5 w-5 text-[#FFD600]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  <Link
                    href="/ai"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#FFD600] hover:gap-2 transition-all"
                  >
                    {tCommon('seeInAction')} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── COMPARISON TABLE ─────────────────────────────────────────── */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-[#0A0A0A] sm:text-4xl">
              {t('comparison.title')}
            </h2>
            <p className="text-[#525252]">
              {t('comparison.subtitle')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="py-4 pr-6 text-left text-sm font-medium text-[#737373]">Feature</th>
                  <th className="px-4 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFD600] px-3 py-1 text-sm font-semibold text-[#0A0A0A]">
                      Toster
                    </span>
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-[#525252]">iiko</th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-[#525252]">Poster POS</th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-[#525252]">Excel+WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {compFeatures.map((feature, i) => (
                  <tr key={i} className="border-t border-[#F5F5F5]">
                    <td className="py-4 pr-6 text-sm text-[#525252]">{feature}</td>
                    <td className="px-4 py-4 text-center">
                      <ComparisonIcon value={compToster[i] ?? ''} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <ComparisonIcon value={compIiko[i] ?? ''} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <ComparisonIcon value={compPoster[i] ?? ''} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <ComparisonIcon value={compExcel[i] ?? ''} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ─── FOUNDING CUSTOMERS CTA ───────────────────────────────────── */}
      <section className="bg-[#F5F5F5] py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div>
              <Badge variant="yellow" className="mb-4">{t('testimonials.title')}</Badge>
            </div>
            <p className="mb-10 text-lg text-[#525252]">
              {t('testimonials.subtitle')}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
              {[
                { icon: Rocket,       title: 'Priority onboarding', desc: 'We set everything up for you — menu, zones, bots — in one day.' },
                { icon: Target,       title: 'Direct founder access', desc: 'Shape the product roadmap. Your feedback ships next sprint.' },
                { icon: BadgePercent, title: 'Founding price', desc: 'Lock in early pricing. Never pays more as we scale the platform.' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E5E5E5] bg-white p-6 text-left"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD600]/15">
                    <item.icon className="h-5 w-5 text-[#0A0A0A]" />
                  </div>
                  <h3 className="mb-1 font-semibold text-[#0A0A0A]">{item.title}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href="/request-demo">
                  {tCommon('requestDemo')} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-[#0A0A0A] sm:text-4xl">
            {t('faq.title')}
          </h2>
          <div className="mx-auto max-w-2xl">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: faqItems.map((item) => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: { '@type': 'Answer', text: item.answer },
                  })),
                }),
              }}
            />
            <FaqAccordion items={faqItems} />
          </div>
        </Container>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-24 sm:py-32">
        <Container>
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t('cta.title')}
            </h2>
            <p className="mb-8 text-lg text-white/60">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href="/request-demo">{t('cta.secondary')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
