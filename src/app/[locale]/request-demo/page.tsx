'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerChildren } from '@/lib/motion';

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().min(1, 'Please enter your company name'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  country: z.string().min(1, 'Please select a country'),
  locations: z.string().min(1, 'Please select number of locations'),
  currentSystem: z.string().optional(),
  message: z.string().optional(),
  consent: z.literal(true, { error: 'You must agree to be contacted' }),
  website: z.string().max(0).optional(), // honeypot
});

type FormData = z.infer<typeof schema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const countries = [
  { value: 'UA', label: '🇺🇦 Ukraine' },
  { value: 'PL', label: '🇵🇱 Poland' },
  { value: 'CZ', label: '🇨🇿 Czech Republic' },
  { value: 'DE', label: '🇩🇪 Germany' },
  { value: 'ES', label: '🇪🇸 Spain' },
  { value: 'US', label: '🇺🇸 United States' },
  { value: 'other', label: 'Other' },
];

const locationOptions = [
  { value: '1', label: '1 location' },
  { value: '2-5', label: '2–5 locations' },
  { value: '6-20', label: '6–20 locations' },
  { value: '20+', label: '20+ locations' },
];

const inputClass =
  'w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] outline-none transition-colors focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20';
const errorClass = 'mt-1.5 text-xs text-red-500';
const labelClass = 'mb-1.5 block text-sm font-medium text-[#0A0A0A]';

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

export default function RequestDemoPage() {
  const [values, setValues] = React.useState<Partial<FormData>>({ consent: undefined });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = React.useState('');

  const validate = (data: Partial<FormData>): FormErrors => {
    const result = schema.safeParse(data);
    if (result.success) return {};
    const errs: FormErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof FormData;
      if (!errs[key]) errs[key] = issue.message;
    }
    return errs;
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const val = field === 'consent' ? (e.target as HTMLInputElement).checked : e.target.value;
    const next = { ...values, [field]: val };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const allErrors = validate(values);
  const isValid = Object.keys(allErrors).length === 0 && Boolean(values.consent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched
    const allTouched = Object.keys(schema.shape).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Record<keyof FormData, boolean>
    );
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Honeypot check
    if (values.website) return;

    setStatus('loading');
    setServerError('');

    // Track event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'demo_request_submitted');
    }

    try {
      const res = await fetch('/api/request-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? 'Request failed');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong, please try again.');
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
              Thanks! We&apos;ll reach out within 24 hours.
            </h1>
            <p className="text-[#525252]">
              We&apos;ve received your request and will contact you at{' '}
              <strong>{values.email}</strong> shortly.
            </p>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left: context */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
              className="lg:pt-4"
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="yellow" className="mb-4">Request Demo</Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="mb-4 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
                style={{ lineHeight: 1.08 }}
              >
                See Toster in action
              </motion.h1>
              <motion.p variants={fadeInUp} className="mb-8 text-lg text-[#525252] leading-relaxed">
                30-minute live demo with your use case. Real data, real workflows.
                No slides, no sales pitch.
              </motion.p>

              <motion.ul variants={fadeInUp} className="space-y-4">
                {[
                  'Personalised for your country and chain size',
                  'Live kitchen display, courier map, and analytics',
                  'Q&A with a founder — not a sales rep',
                  'Follow-up: 14-day trial with your data',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#525252]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FFD600]" />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={fadeInUp}
                className="mt-10 rounded-2xl border border-[#E5E5E5] p-6"
              >
                <p className="text-sm italic text-[#525252]">
                  &ldquo;We were running 4 countries from one Telegram thread.
                  Now every manager sees only their city, I see everything.&rdquo;
                </p>
                <p className="mt-3 text-sm font-semibold text-[#0A0A0A]">966 Network — Founder</p>
                <p className="text-xs text-[#A3A3A3]">UA · PL · CZ · DE</p>
              </motion.div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-[#E5E5E5] bg-white p-8 shadow-sm"
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
                  <Field label="Full name" error={touched.fullName ? errors.fullName : undefined} required>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="John Smith"
                      value={values.fullName ?? ''}
                      onChange={set('fullName')}
                      onBlur={() => handleBlur('fullName')}
                    />
                  </Field>

                  <Field label="Email" error={touched.email ? errors.email : undefined} required>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="john@yourcompany.com"
                      value={values.email ?? ''}
                      onChange={set('email')}
                      onBlur={() => handleBlur('email')}
                    />
                  </Field>

                  <Field label="Company name" error={touched.company ? errors.company : undefined} required>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Your Delivery Brand"
                      value={values.company ?? ''}
                      onChange={set('company')}
                      onBlur={() => handleBlur('company')}
                    />
                  </Field>

                  <Field label="Phone" error={touched.phone ? errors.phone : undefined} required>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="+380 XX XXX XXXX"
                      value={values.phone ?? ''}
                      onChange={set('phone')}
                      onBlur={() => handleBlur('phone')}
                    />
                  </Field>

                  <Field label="Country" error={touched.country ? errors.country : undefined} required>
                    <select
                      className={inputClass}
                      value={values.country ?? ''}
                      onChange={set('country')}
                      onBlur={() => handleBlur('country')}
                    >
                      <option value="">Select country</option>
                      {countries.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Number of locations" error={touched.locations ? errors.locations : undefined} required>
                    <select
                      className={inputClass}
                      value={values.locations ?? ''}
                      onChange={set('locations')}
                      onBlur={() => handleBlur('locations')}
                    >
                      <option value="">Select</option>
                      {locationOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Current system (optional)" error={undefined}>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="iiko, Poster, Sheets, or none"
                        value={values.currentSystem ?? ''}
                        onChange={set('currentSystem')}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field label="Message (optional)" error={undefined}>
                      <textarea
                        className={`${inputClass} resize-none`}
                        rows={3}
                        placeholder="Anything you'd like us to know before the demo..."
                        value={values.message ?? ''}
                        onChange={set('message')}
                      />
                    </Field>
                  </div>

                  {/* GDPR consent */}
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#FFD600]"
                        checked={values.consent === true}
                        onChange={set('consent')}
                        onBlur={() => handleBlur('consent')}
                      />
                      <span className="text-sm text-[#525252]">
                        I agree to be contacted by the Toster team about this demo request.
                        Your data is processed in accordance with our{' '}
                        <a href="/privacy" className="underline underline-offset-2 hover:text-[#0A0A0A]">
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </label>
                    {touched.consent && errors.consent && (
                      <p className={errorClass}>{errors.consent}</p>
                    )}
                  </div>
                </div>

                {serverError && (
                  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
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
                    'Request my demo'
                  )}
                </Button>

                <p className="mt-3 text-center text-xs text-[#A3A3A3]">
                  No spam. We&apos;ll reach out within 24 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
