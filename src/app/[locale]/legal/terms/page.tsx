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
    title: 'Terms of Service | Toster',
    description: 'Terms of Service for the Toster food delivery chain management platform.',
    alternates: { canonical: `${BASE}/${locale}/legal/terms` },
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage({
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
      { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: `${BASE}/${locale}/legal/terms` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A3A3A3]">Legal</p>
            <h1 className="mb-8 text-4xl font-bold text-[#0A0A0A]">Terms of Service</h1>

            <div className="prose prose-neutral max-w-none text-[#525252]">
              <p className="text-sm text-[#A3A3A3]">Last updated: May 2026 · Governed by: UAE law</p>

              <h2>1. Service provider</h2>
              <p>
                Toster is a software-as-a-service platform operated by ADS L.L.C-FZ, registered
                in the UAE Free Zone. By using the Toster platform, you agree to these terms.
              </p>

              <h2>2. Service description</h2>
              <p>
                Toster provides a food delivery chain management platform including: order management
                (CRM), kitchen display system (KDS), courier management, customer loyalty program,
                AI automation, marketing campaign management, and a branded customer-facing website
                and mobile apps.
              </p>

              <h2>3. Subscription and billing</h2>
              <p>
                Toster is offered under two models: (a) the Start plan at €250/month fixed for 1
                location, and (b) the Revenue plan at 3% of monthly turnover for multi-location
                chains with a minimum monthly commitment. Billing is monthly in arrears. Payment is
                due within 7 days of invoice.
              </p>

              <h2>4. Data ownership</h2>
              <p>
                All customer data, order history, and business data you input into Toster remains
                your property. Toster processes it as a data processor on your behalf. You may
                request a full data export at any time. Upon termination, data is retained for 90
                days before deletion.
              </p>

              <h2>5. Availability SLA</h2>
              <p>
                Toster targets 99.5% uptime monthly. Planned maintenance is announced 48 hours in
                advance. Toster is not liable for downtime caused by third-party services (LiqPay,
                Stripe, Telegram, aggregator APIs).
              </p>

              <h2>6. Acceptable use</h2>
              <p>
                The platform may only be used for legal food delivery business operations. Prohibited
                uses include: reverse engineering the platform, reselling access without written
                permission, and using the AI features to generate misleading content.
              </p>

              <h2>7. Limitation of liability</h2>
              <p>
                Toster&apos;s liability is limited to the fees paid in the 3 months preceding a
                claim. Toster is not liable for lost revenue, lost orders, or consequential damages
                arising from platform issues.
              </p>

              <h2>8. Governing law</h2>
              <p>
                These terms are governed by UAE law. Disputes are subject to the exclusive
                jurisdiction of Dubai courts, with arbitration as an alternative via the DIFC
                Arbitration Centre.
              </p>

              <h2>9. Contact</h2>
              <p>
                Legal queries:{' '}
                <a href="mailto:hello@toster.co" className="text-[#0A0A0A] underline">hello@toster.co</a>
              </p>

              <p className="mt-8 text-xs text-[#A3A3A3]">
                A full Terms of Service document is available on request and will be provided as part
                of onboarding. These terms are a summary only.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
