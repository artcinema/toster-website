'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Percent, Megaphone, LayoutDashboard, Zap, Globe, Smartphone } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerChildren } from '@/lib/motion';
import { siteConfig } from '@/config/site';

const inputClass =
  'w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] outline-none transition-colors focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20';
const errorClass = 'mt-1.5 text-xs text-red-500';
const labelClass = 'mb-1.5 block text-sm font-medium text-[#0A0A0A]';

const whatsIncluded = [
  {
    icon: LayoutDashboard,
    title: 'Full CRM platform',
    body: 'Orders, kitchen display, courier tracking, analytics, POS terminal, and loyalty — all configured for your chain.',
  },
  {
    icon: Globe,
    title: 'Customer website',
    body: 'A branded ordering website for your chain — menu, cart, checkout, loyalty, and order tracking. Ready to go live on your domain.',
  },
  {
    icon: Smartphone,
    title: 'iOS & Android apps',
    body: 'Native mobile apps for your customers published under your brand on the App Store and Google Play — included in the package.',
  },
  {
    icon: Megaphone,
    title: 'Marketing — fully managed',
    body: 'We run your email, SMS, push, and Viber campaigns end-to-end. You set the goals, we handle the execution.',
  },
  {
    icon: Zap,
    title: 'AI automation',
    body: 'Route optimisation, reactivation flows, smart upsells, and an AI voice operator — included, not an add-on.',
  },
  {
    icon: Percent,
    title: 'Revenue-aligned pricing',
    body: "No flat monthly fee that hurts when you're slow. You pay more only when you earn more.",
  },
];

interface FormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  revenue: string;
  locations: string;
  message: string;
  consent: boolean;
  website: string; // honeypot
}

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(values: Partial<FormData>): FormErrors {
  const errs: FormErrors = {};
  if (!values.fullName || values.fullName.length < 2) errs.fullName = 'Please enter your full name';
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = 'Please enter a valid email';
  if (!values.company) errs.company = 'Please enter your company name';
  if (!values.phone || values.phone.length < 7) errs.phone = 'Please enter a valid phone number';
  if (!values.consent) errs.consent = 'You must agree to be contacted';
  return errs;
}

function Field({
  label,
  error,
  required,
  dark,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={`${labelClass} ${dark ? 'text-white/80' : ''}`}>
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className={`${errorClass} ${dark ? 'text-red-400' : ''}`}>{error}</p>}
    </div>
  );
}

export default function PricingPage() {
  const [values, setValues] = React.useState<Partial<FormData>>({});
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = React.useState('');

  const handleBlur = (field: keyof FormData) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const set =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const val =
        field === 'consent' ? (e.target as HTMLInputElement).checked : e.target.value;
      const next = { ...values, [field]: val };
      setValues(next);
      if (touched[field]) setErrors(validate(next));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = ['fullName', 'email', 'company', 'phone', 'consent'].reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Record<keyof FormData, boolean>
    );
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (values.website) return; // honeypot

    setStatus('loading');
    setServerError('');

    try {
      const res = await fetch(`${siteConfig.apiUrl}/public/pricing-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          company: values.company,
          phone: values.phone,
          revenue: values.revenue,
          locations: values.locations,
          message: values.message,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? 'Request failed');
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setServerError('Something went wrong. Please email us at hello@toster.co');
    }
  };

  if (status === 'success') {
    return (
      <section className="flex min-h-[70vh] items-center bg-white py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-md text-center"
          >
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="mb-3 text-2xl font-semibold text-[#0A0A0A]">
              We&apos;ll get back to you within 24 hours.
            </h1>
            <p className="text-[#525252]">
              Your inquiry has been received. We&apos;ll prepare a personalised proposal and reach
              out to <strong>{values.email}</strong>.
            </p>
          </motion.div>
        </Container>
      </section>
    );
  }

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
              <Badge variant="yellow" className="mb-4">Pricing</Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mb-5 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ lineHeight: 1.08 }}
            >
              Priced on your revenue,{' '}
              <span className="text-[#FFD600]">not a flat fee</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#525252] leading-relaxed">
              Start with a{' '}
              <strong className="text-[#0A0A0A]">fixed €250/month</strong> plan — website, apps,
              and CRM. Scale to revenue-based pricing as you grow:{' '}
              <strong className="text-[#0A0A0A]">3% to 9% of monthly turnover</strong>, covering
              the full platform and all marketing campaigns managed on your behalf.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Range card */}
      <section className="bg-[#F5F5F5] py-16">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-5xl"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  range: '€250',
                  rangeUnit: 'per month, fixed',
                  label: 'Start',
                  desc: 'SEO-optimized website in your language, iOS & Android apps, and a smart AI-powered CRM — ready in one day.',
                  highlight: false,
                  tag: null,
                },
                {
                  range: '3%',
                  rangeUnit: 'of monthly turnover',
                  label: 'Starter',
                  desc: 'Single location. Core CRM only — orders, kitchen, couriers.',
                  highlight: false,
                  tag: null,
                },
                {
                  range: '5–7%',
                  rangeUnit: 'of monthly turnover',
                  label: 'Growth',
                  desc: 'Multi-location chain with managed marketing campaigns, AI automation, and loyalty.',
                  highlight: true,
                  tag: 'Most popular',
                },
                {
                  range: 'up to 9%',
                  rangeUnit: 'of monthly turnover',
                  label: 'Enterprise',
                  desc: 'Full white-glove setup for large chains: custom integrations, fiscalization, dedicated support.',
                  highlight: false,
                  tag: null,
                },
              ].map((tier) => (
                <motion.div
                  key={tier.label}
                  variants={fadeInUp}
                  className={`flex flex-col rounded-2xl border p-6 ${
                    tier.highlight
                      ? 'border-[#FFD600] bg-[#FFFBE6] ring-2 ring-[#FFD600]/40'
                      : 'border-[#E5E5E5] bg-white'
                  }`}
                >
                  <p className="text-3xl font-bold text-[#0A0A0A]">{tier.range}</p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-[#A3A3A3]">
                    {tier.rangeUnit}
                  </p>
                  <p
                    className={`mt-3 text-sm font-semibold ${
                      tier.highlight ? 'text-[#0A0A0A]' : 'text-[#525252]'
                    }`}
                  >
                    {tier.label}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#525252]">{tier.desc}</p>
                  {tier.tag && (
                    <span className="mt-4 inline-block self-start rounded-full bg-[#FFD600] px-3 py-0.5 text-xs font-semibold text-[#0A0A0A]">
                      {tier.tag}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-center text-sm text-[#A3A3A3]"
            >
              Final rate is agreed individually and fixed in contract.
              No hidden fees, no per-seat charges, no surprise overages.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* What's included */}
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
                Everything is included
              </h2>
              <p className="mt-3 text-[#525252]">
                One contract. One team. No patchwork of third-party tools.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whatsIncluded.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="flex gap-5 rounded-2xl border border-[#E5E5E5] p-7"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFD600]/15">
                    <item.icon className="h-5 w-5 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A]">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#525252]">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Contact form */}
      <section className="bg-[#0A0A0A] py-20 sm:py-28" id="contact">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:pt-4"
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="yellow" className="mb-4">Get a quote</Badge>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="mb-4 text-3xl font-semibold text-white sm:text-4xl"
                style={{ lineHeight: 1.1 }}
              >
                Tell us about your operation
              </motion.h2>
              <motion.p variants={fadeInUp} className="mb-8 text-lg text-white/60 leading-relaxed">
                Share a few details and we&apos;ll come back with a personalised rate and a
                30-minute walkthrough — no commitment required.
              </motion.p>

              <motion.ul variants={fadeInUp} className="space-y-4">
                {[
                  'Rate proposal within 24 hours',
                  'Live demo tailored to your country and chain size',
                  'Transparent contract — no lock-in past year one',
                  'Onboarding & data migration included',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FFD600]" />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  onChange={set('website')}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Full name" dark
                    error={touched.fullName ? errors.fullName : undefined}
                    required
                  >
                    <input
                      type="text"
                      className={`${inputClass} bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD600]`}
                      placeholder="John Smith"
                      value={values.fullName ?? ''}
                      onChange={set('fullName')}
                      onBlur={() => handleBlur('fullName')}
                    />
                  </Field>

                  <Field
                    label="Email" dark
                    error={touched.email ? errors.email : undefined}
                    required
                  >
                    <input
                      type="email"
                      className={`${inputClass} bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD600]`}
                      placeholder="john@company.com"
                      value={values.email ?? ''}
                      onChange={set('email')}
                      onBlur={() => handleBlur('email')}
                    />
                  </Field>

                  <Field
                    label="Company" dark
                    error={touched.company ? errors.company : undefined}
                    required
                  >
                    <input
                      type="text"
                      className={`${inputClass} bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD600]`}
                      placeholder="Your Delivery Brand"
                      value={values.company ?? ''}
                      onChange={set('company')}
                      onBlur={() => handleBlur('company')}
                    />
                  </Field>

                  <Field
                    label="Phone" dark
                    error={touched.phone ? errors.phone : undefined}
                    required
                  >
                    <input
                      type="tel"
                      className={`${inputClass} bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD600]`}
                      placeholder="+1 234 567 8900"
                      value={values.phone ?? ''}
                      onChange={set('phone')}
                      onBlur={() => handleBlur('phone')}
                    />
                  </Field>

                  <Field
                    label="Monthly turnover (approx.)" dark
                    error={undefined}
                  >
                    <select
                      className={`${inputClass} bg-white/10 border-white/10 text-white focus:border-[#FFD600] [&>option]:text-[#0A0A0A]`}
                      value={values.revenue ?? ''}
                      onChange={set('revenue')}
                    >
                      <option value="">Select range</option>
                      <option value="under-50k">Under $50 000</option>
                      <option value="50k-200k">$50 000 – $200 000</option>
                      <option value="200k-1m">$200 000 – $1 000 000</option>
                      <option value="1m+">Over $1 000 000</option>
                    </select>
                  </Field>

                  <Field
                    label="Number of locations" dark
                    error={undefined}
                  >
                    <select
                      className={`${inputClass} bg-white/10 border-white/10 text-white focus:border-[#FFD600] [&>option]:text-[#0A0A0A]`}
                      value={values.locations ?? ''}
                      onChange={set('locations')}
                    >
                      <option value="">Select</option>
                      <option value="1">1 location</option>
                      <option value="2-5">2–5 locations</option>
                      <option value="6-20">6–20 locations</option>
                      <option value="20+">20+ locations</option>
                    </select>
                  </Field>

                  <div className="sm:col-span-2">
                    <Field
                      label="Tell us about your request (optional)" dark
                      error={undefined}
                    >
                      <textarea
                        className={`${inputClass} bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD600] resize-none`}
                        rows={3}
                        placeholder="Countries you operate in, current tools, specific needs..."
                        value={values.message ?? ''}
                        onChange={set('message')}
                      />
                    </Field>
                  </div>

                  {/* Consent */}
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#FFD600]"
                        checked={values.consent === true}
                        onChange={set('consent')}
                        onBlur={() => handleBlur('consent')}
                      />
                      <span className="text-sm text-white/50">
                        I agree to be contacted by the Toster team regarding this inquiry.
                        Your data is processed in accordance with our{' '}
                        <Link
                          href="/privacy-policy"
                          className="underline underline-offset-2 hover:text-white"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    {touched.consent && errors.consent && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.consent}</p>
                    )}
                  </div>
                </div>

                {serverError && (
                  <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {serverError}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="mt-6 w-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Get my personalised quote'
                  )}
                </Button>

                <p className="mt-3 text-center text-xs text-white/30">
                  No spam. Response within 24 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
