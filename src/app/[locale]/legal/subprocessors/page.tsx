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
    title: 'Subprocessors | Toster',
    description: 'List of third-party subprocessors used by Toster to deliver the platform.',
    alternates: { canonical: `${BASE}/${locale}/legal/subprocessors` },
    robots: { index: true, follow: true },
  };
}

export default async function SubprocessorsPage({
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
      { '@type': 'ListItem', position: 2, name: 'Subprocessors', item: `${BASE}/${locale}/legal/subprocessors` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A3A3A3]">Legal</p>
            <h1 className="mb-8 text-4xl font-bold text-[#0A0A0A]">Subprocessors</h1>

            <div className="prose prose-neutral max-w-none text-[#525252]">
              <p className="text-sm text-[#A3A3A3]">Last updated: May 2026</p>

              <p>
                Toster (ADS L.L.C-FZ) uses the following third-party subprocessors to deliver the
                platform. We maintain Data Processing Agreements with each subprocessor and update
                this list at least 30 days before adding a new subprocessor. Customers who have
                signed a DPA may object to new subprocessors within that notice period.
              </p>

              <h2 className="text-[#0A0A0A]">Infrastructure &amp; Hosting</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Name</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Role</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Location</th>
                      <th className="py-2 text-left font-semibold text-[#0A0A0A]">Transfer mechanism</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4">Railway Corp.</td>
                      <td className="py-2 pr-4">Application hosting &amp; deployment</td>
                      <td className="py-2 pr-4">United States</td>
                      <td className="py-2">SCC + DPF</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Cloudflare, Inc.</td>
                      <td className="py-2 pr-4">CDN, WAF, object storage (R2)</td>
                      <td className="py-2 pr-4">Global</td>
                      <td className="py-2">SCC + DPF</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-[#0A0A0A]">Communications</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Name</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Role</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Location</th>
                      <th className="py-2 text-left font-semibold text-[#0A0A0A]">Transfer mechanism</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4">SendPulse</td>
                      <td className="py-2 pr-4">Email, SMS, push notification delivery</td>
                      <td className="py-2 pr-4">United States</td>
                      <td className="py-2">SCC</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Telegram FZ-LLC</td>
                      <td className="py-2 pr-4">Bot API for operator, courier, kitchen, and customer bots</td>
                      <td className="py-2 pr-4">UAE</td>
                      <td className="py-2">UAE PDPL (adequate protection)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-[#0A0A0A]">Payments</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Name</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Role</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Location</th>
                      <th className="py-2 text-left font-semibold text-[#0A0A0A]">Transfer mechanism</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4">Stripe Payments Europe Ltd.</td>
                      <td className="py-2 pr-4">Card payment processing (EU/UK)</td>
                      <td className="py-2 pr-4">Ireland</td>
                      <td className="py-2">Within EEA</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">LiqPay / PrivatBank</td>
                      <td className="py-2 pr-4">Payment processing (Ukraine)</td>
                      <td className="py-2 pr-4">Ukraine</td>
                      <td className="py-2">SCC</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-[#0A0A0A]">AI Providers</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Name</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Role</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Location</th>
                      <th className="py-2 text-left font-semibold text-[#0A0A0A]">Transfer mechanism</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4">Anthropic PBC</td>
                      <td className="py-2 pr-4">Large language model API (Claude) for automation &amp; analysis</td>
                      <td className="py-2 pr-4">United States</td>
                      <td className="py-2">SCC + DPF</td>
                    </tr>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4">ElevenLabs, Inc.</td>
                      <td className="py-2 pr-4">AI voice synthesis for conversational operator</td>
                      <td className="py-2 pr-4">United States</td>
                      <td className="py-2">SCC + DPF</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Qdrant GmbH</td>
                      <td className="py-2 pr-4">Vector database for semantic search</td>
                      <td className="py-2 pr-4">Germany</td>
                      <td className="py-2">Within EEA</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-[#0A0A0A]">Analytics &amp; Monitoring</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Name</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Role</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Location</th>
                      <th className="py-2 text-left font-semibold text-[#0A0A0A]">Transfer mechanism</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4">Axiom, Inc.</td>
                      <td className="py-2 pr-4">Log aggregation and monitoring (PII redacted before ingestion)</td>
                      <td className="py-2 pr-4">United States</td>
                      <td className="py-2">SCC + DPF</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">PostHog, Inc.</td>
                      <td className="py-2 pr-4">Product analytics and session recording</td>
                      <td className="py-2 pr-4">United States</td>
                      <td className="py-2">SCC + DPF</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-[#0A0A0A]">Definitions</h2>
              <ul>
                <li><strong>SCC</strong> — EU Standard Contractual Clauses (Commission Decision 2021/914)</li>
                <li><strong>DPF</strong> — EU–US Data Privacy Framework (adequacy decision, July 2023)</li>
                <li><strong>Within EEA</strong> — data does not leave the European Economic Area; no transfer mechanism needed</li>
                <li><strong>UAE PDPL</strong> — UAE Personal Data Protection Law; Telegram&apos;s UAE incorporation provides equivalent protection under our DPA</li>
              </ul>

              <p>
                Questions about subprocessors:{' '}
                <a href="mailto:hello@toster.co" className="text-[#0A0A0A] underline">hello@toster.co</a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
