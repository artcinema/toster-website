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
    title: 'Privacy Policy | Toster',
    description: 'Privacy Policy for Toster (ADS L.L.C-FZ). How we collect, use, and protect your personal data.',
    alternates: {
      canonical: `${BASE}/${locale}/legal/privacy`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
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
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${BASE}/${locale}/legal/privacy` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A3A3A3]">Legal</p>
            <h1 className="mb-8 text-4xl font-bold text-[#0A0A0A]">Privacy Policy</h1>

            <div className="prose prose-neutral max-w-none text-[#525252]">
              <p className="text-sm text-[#A3A3A3]">Last updated: May 2026</p>

              <h2>Controller</h2>
              <p>
                ADS L.L.C-FZ (trading as <strong>Toster</strong>)<br />
                Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba<br />
                Dubai, United Arab Emirates<br />
                Email: <a href="mailto:privacy@toster.co" className="text-[#0A0A0A] underline">privacy@toster.co</a>
              </p>

              <h2>Data we collect</h2>
              <p>
                Toster collects personal data necessary to provide the food delivery chain management
                platform. This includes: account registration data (name, email, phone), order data
                (delivery address, order history), payment data (processed by LiqPay or Stripe — we
                do not store card numbers), and operational data (GPS coordinates of couriers during
                active shifts).
              </p>

              <h2>Legal basis (GDPR)</h2>
              <p>
                For EU-based users, our legal basis for processing is: (a) contract performance —
                processing required to deliver the service; (b) legitimate interests — analytics and
                fraud prevention; (c) consent — marketing communications (opt-in only).
              </p>

              <h2>Data retention</h2>
              <p>
                Order data is retained for 7 years to comply with fiscal regulations in UA, PL, CZ,
                and DE. Customer account data is retained while the account is active plus 2 years
                after closure. GPS tracking data is retained for 90 days.
              </p>

              <h2>Your rights</h2>
              <p>
                EU/EEA residents have the right to access, rectify, erase, restrict, and port their
                personal data, and to object to processing. Submit requests to{' '}
                <a href="mailto:privacy@toster.co" className="text-[#0A0A0A] underline">privacy@toster.co</a>.
                We respond within 30 days.
              </p>

              <h2>Cookies</h2>
              <p>
                See our <a href="./cookies" className="text-[#0A0A0A] underline">Cookie Policy</a> for
                details on cookies we use.
              </p>

              <h2>Sub-processors</h2>
              <p>
                We use the following third-party processors: Vercel (hosting, EU/US), PostgreSQL via
                Railway (database), Cloudflare R2 (file storage), SendPulse (email/SMS/Viber
                marketing), LiqPay (UA payments), Stripe (EU payments), Anthropic (AI features),
                ElevenLabs (voice AI).
              </p>

              <h2>Contact</h2>
              <p>
                For privacy questions or data requests:{' '}
                <a href="mailto:privacy@toster.co" className="text-[#0A0A0A] underline">privacy@toster.co</a>
              </p>

              <p className="mt-8 text-xs text-[#A3A3A3]">
                A detailed privacy policy in accordance with GDPR Article 13/14 requirements is
                available on request. Contact privacy@toster.co.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
