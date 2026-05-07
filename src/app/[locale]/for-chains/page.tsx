import Link from 'next/link';
import {
  ArrowRight, Globe, TrendingUp, Brain,
  CheckCircle2, MapPin, DollarSign, Shield, Layers, AlertCircle,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EuropeMapClient } from './_EuropeMapClient';

const mcIcons = [DollarSign, Shield, Globe, Layers, TrendingUp, Brain];

const countries = [
  { flag: '🇺🇦', name: 'Ukraine' },
  { flag: '🇵🇱', name: 'Poland' },
  { flag: '🇨🇿', name: 'Czech Republic' },
  { flag: '🇩🇪', name: 'Germany' },
  { flag: '🇪🇸', name: 'Spain' },
  { flag: '🇺🇸', name: 'United States' },
];

export default async function ForChainsPage() {
  const t = await getTranslations('ForChains');

  const pain      = t.raw('pain')      as Array<{ title: string; body: string }>;
  const solutions = t.raw('solutions') as Array<{ title: string; body: string }>;
  const stats     = t.raw('stats')     as Array<{ value: string; label: string; sub: string }>;
  const mcFeatures = t.raw('mcFeatures') as Array<{ title: string; body: string }>;

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <div>
                <Badge variant="yellow" className="mb-4">{t('badge')}</Badge>
              </div>
              <h1
                className="mb-5 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
                style={{ lineHeight: 1.08 }}
              >
                {t('heroTitle')}
              </h1>
              <p className="mb-8 text-lg text-[#525252] leading-relaxed">
                {t('heroDesc')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/request-demo">
                    {t('btnDemo')} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/features">{t('btnFeatures')}</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-[#E5E5E5] bg-[#FAFAFA] p-8">
              <EuropeMapClient
                active={t('mapActive')}
                expanding={t('mapExpanding')}
                hint={t('mapHint')}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Pain → Solution */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#A3A3A3]">{t('problemEyebrow')}</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">
                {t('problemTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                {pain.map((p, i) => (
                  <div
                    key={i}
                    className="flex gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-5"
                  >
                    <div className="mt-0.5 shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0A0A0A]">{p.title}</p>
                      <p className="mt-1 text-sm text-[#525252] leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {solutions.map((s, i) => (
                  <div
                    key={i}
                    className="flex gap-4 rounded-2xl border border-green-100 bg-green-50/50 p-5"
                  >
                    <div className="mt-0.5 shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0A0A0A]">{s.title}</p>
                      <p className="mt-1 text-sm text-[#525252] leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Case study */}
      <section className="bg-[#0A0A0A] py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <Badge variant="yellow" className="mb-4">{t('caseBadge')}</Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t('caseTitle')}</h2>
              <p className="mt-3 text-white/60">{t('caseDesc')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                  <p className="text-4xl font-semibold text-[#FFD600]">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-white">{stat.label}</p>
                  <p className="text-xs text-white/40">{stat.sub}</p>
                </div>
              ))}
            </div>

            <blockquote className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-lg text-white/80 italic leading-relaxed">
                &ldquo;{t('quote')}&rdquo;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-semibold text-[#FFD600]">{t('caseAuthor')}</p>
                <p className="text-xs text-white/40">{t('caseCountries')}</p>
              </footer>
            </blockquote>
          </div>
        </Container>
      </section>

      {/* Multi-country features */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">{t('multicountryTitle')}</h2>
              <p className="mt-3 text-[#525252]">{t('multicountryDesc')}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mcFeatures.map((feature, i) => {
                const Icon = mcIcons[i] ?? Globe;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#E5E5E5] p-6 hover:border-[#FFD600]/50 transition-colors"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD600]/10">
                      <Icon className="h-5 w-5 text-[#0A0A0A]" />
                    </div>
                    <h3 className="mb-2 font-semibold text-[#0A0A0A]">{feature.title}</h3>
                    <p className="text-sm text-[#525252] leading-relaxed">{feature.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Country flags strip */}
      <section className="border-y border-[#E5E5E5] bg-[#F5F5F5] py-10">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <p className="text-sm font-medium text-[#525252]">{t('operatingIn')}</p>
            {countries.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-sm text-[#0A0A0A]">
                <span className="text-2xl">{c.flag}</span>
                <span className="font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <MapPin className="mx-auto mb-4 h-10 w-10 text-[#FFD600]" />
            <h2 className="mb-4 text-3xl font-semibold text-[#0A0A0A] sm:text-4xl">{t('ctaTitle')}</h2>
            <p className="mb-8 text-[#525252] leading-relaxed">{t('ctaDesc')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href="/request-demo">
                  {t('ctaBtnDemo')} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/integrations">{t('ctaBtnIntegrations')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
