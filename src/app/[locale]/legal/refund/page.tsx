import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/config/site';

const BASE = siteConfig.url;
const locales = ['en', 'uk', 'ru', 'pl', 'cs', 'de', 'es'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Refund Policy | Toster',
    description: 'Refund and cancellation policy for Toster subscriptions.',
    alternates: { canonical: `${BASE}/${locale}/legal/refund` },
    robots: { index: true, follow: true },
  };
}

export default async function RefundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Toster', item: `${BASE}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Refund Policy', item: `${BASE}/${locale}/legal/refund` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A3A3A3]">Legal</p>
            <h1 className="mb-8 text-4xl font-bold text-[#0A0A0A]">Refund Policy</h1>

            <div className="prose prose-neutral max-w-none text-[#525252]">
              <p className="text-sm text-[#A3A3A3]">Last updated: May 2026</p>

              <p>
                This Refund Policy describes when Toster (ADS L.L.C-FZ) will and will not issue
                refunds for subscription fees. Please read this policy carefully before subscribing.
              </p>

              <h2 className="text-[#0A0A0A]">1. General rule — subscriptions are non-refundable</h2>
              <p>
                All Toster subscription fees (monthly or annual) are generally non-refundable once
                a billing period has commenced. Partial-month refunds are not issued if you cancel
                mid-cycle; your access continues until the end of the paid period. This applies to:
              </p>
              <ul>
                <li>Starter plan (fixed monthly fee)</li>
                <li>Growth / Revenue plan (percentage of monthly turnover)</li>
                <li>Any add-ons or one-time setup fees</li>
              </ul>

              <h2 className="text-[#0A0A0A]">2. EU and UK statutory withdrawal right (14 days)</h2>
              <p>
                If you are a consumer located in the European Union or United Kingdom, you have the
                right to withdraw from the contract within <strong>14 calendar days</strong> of your
                initial subscription purchase without giving any reason, provided that you have
                <strong> not yet used the platform</strong> (i.e., have not logged in, processed
                orders, or accessed any platform features beyond registration).
              </p>
              <p>
                Once you begin using the Service, you expressly acknowledge that the supply of the
                digital service has commenced and you waive your right of withdrawal in accordance
                with Article 16(m) of the Consumer Rights Directive 2011/83/EU.
              </p>
              <p>
                To exercise the withdrawal right, contact{' '}
                <a href="mailto:hello@toster.co" className="text-[#0A0A0A] underline">hello@toster.co</a>{' '}
                with the subject line &ldquo;Withdrawal&rdquo; before the 14-day period expires.
                Refunds will be issued within 14 days of receiving your withdrawal request via the
                original payment method.
              </p>

              <h2 className="text-[#0A0A0A]">3. Annual plans</h2>
              <p>
                Annual subscriptions are billed upfront and are non-refundable after the 14-day
                withdrawal window (or immediately upon first use, as described above). If you
                cancel an annual subscription, you retain access until the end of the annual period
                and will not be charged for the following year.
              </p>
              <p>
                In exceptional circumstances (for example, a material platform failure confirmed by
                Toster), we may at our sole discretion offer a pro-rated credit for the unused
                portion of an annual plan. Such credits will be applied to a future invoice or
                returned via the original payment method.
              </p>

              <h2 className="text-[#0A0A0A]">4. SLA service credits</h2>
              <p>
                Service credits issued under our{' '}
                <a href={`/${locale}/legal/sla`} className="text-[#0A0A0A] underline">
                  Service Level Agreement
                </a>{' '}
                are applied as credits against future invoices and are not paid out as cash refunds,
                unless required by applicable law.
              </p>

              <h2 className="text-[#0A0A0A]">5. Cancellation</h2>
              <p>
                You may cancel your subscription at any time by contacting your account manager or
                emailing{' '}
                <a href="mailto:hello@toster.co" className="text-[#0A0A0A] underline">hello@toster.co</a>.
                Cancellation takes effect at the end of the current billing period. We do not charge
                cancellation fees.
              </p>

              <h2 className="text-[#0A0A0A]">6. Data after cancellation</h2>
              <p>
                Following cancellation, your data is retained for 90 days, during which you may
                request a full data export. After 90 days, data is permanently deleted in accordance
                with our{' '}
                <a href={`/${locale}/legal/privacy`} className="text-[#0A0A0A] underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href={`/${locale}/legal/dpa`} className="text-[#0A0A0A] underline">DPA</a>.
              </p>

              <h2 className="text-[#0A0A0A]">7. Contact</h2>
              <p>
                For refund requests or billing questions, contact{' '}
                <a href="mailto:hello@toster.co" className="text-[#0A0A0A] underline">hello@toster.co</a>.
                We aim to respond within 2 business days.
              </p>

              <p className="mt-8 text-xs text-[#A3A3A3]">
                Nothing in this policy limits any statutory rights you may have under applicable consumer
                protection law. If you are unsure of your rights, please consult a local consumer
                advisory service.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
