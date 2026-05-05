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
    title: 'Data Processing Agreement (DPA) | Toster',
    description: 'Data Processing Agreement for Toster platform. Available to EU/EEA customers on request.',
    alternates: { canonical: `${BASE}/${locale}/legal/dpa` },
    robots: { index: true, follow: true },
  };
}

export default async function DpaPage({
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
      { '@type': 'ListItem', position: 2, name: 'DPA', item: `${BASE}/${locale}/legal/dpa` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A3A3A3]">Legal</p>
            <h1 className="mb-8 text-4xl font-bold text-[#0A0A0A]">Data Processing Agreement</h1>

            <div className="prose prose-neutral max-w-none text-[#525252]">
              <p className="text-lg">
                Toster provides a Data Processing Agreement (DPA) to customers subject to GDPR
                (EU/EEA operations, including Poland, Czech Republic, and Germany).
              </p>

              <h2>What the DPA covers</h2>
              <ul>
                <li>Nature and purpose of data processing</li>
                <li>Types of personal data processed (customer order data, employee data)</li>
                <li>Data subject categories (end customers, courier staff)</li>
                <li>Duration of processing</li>
                <li>Sub-processor list and commitments</li>
                <li>Technical and organisational measures (TOMs)</li>
                <li>Standard Contractual Clauses (SCCs) for international transfers</li>
              </ul>

              <h2>How to get the DPA</h2>
              <p>
                Email{' '}
                <a href="mailto:privacy@toster.co" className="text-[#0A0A0A] underline">privacy@toster.co</a>{' '}
                with the subject line &ldquo;DPA Request&rdquo;. Include your company name and
                country of registration. We will send the DPA within 5 business days.
              </p>

              <h2>Sub-processors</h2>
              <p>We use the following sub-processors to deliver the Toster platform:</p>
              <ul>
                <li><strong>Railway.app</strong> — PostgreSQL database hosting (EU region available)</li>
                <li><strong>Vercel</strong> — Web hosting and edge functions (EU regions available)</li>
                <li><strong>Cloudflare R2</strong> — File/media storage (EU regions available)</li>
                <li><strong>SendPulse</strong> — Email, SMS, and push marketing (EU-hosted option)</li>
                <li><strong>Stripe</strong> — EU payment processing (EU-domiciled entity)</li>
                <li><strong>LiqPay / PrivatBank</strong> — UA payment processing</li>
                <li><strong>Anthropic</strong> — AI processing via Claude API (US, data processing agreement available)</li>
                <li><strong>ElevenLabs</strong> — Voice AI processing (US)</li>
              </ul>

              <h2>Contact</h2>
              <p>
                <a href="mailto:privacy@toster.co" className="text-[#0A0A0A] underline">privacy@toster.co</a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
