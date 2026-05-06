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
    title: 'Service Level Agreement | Toster',
    description: 'Service Level Agreement for the Toster food delivery chain management platform — uptime commitments, support response times, and service credits.',
    alternates: { canonical: `${BASE}/${locale}/legal/sla` },
    robots: { index: true, follow: true },
  };
}

export default async function SlaPage({
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
      { '@type': 'ListItem', position: 2, name: 'SLA', item: `${BASE}/${locale}/legal/sla` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A3A3A3]">Legal</p>
            <h1 className="mb-8 text-4xl font-bold text-[#0A0A0A]">Service Level Agreement</h1>

            <div className="prose prose-neutral max-w-none text-[#525252]">
              <p className="text-sm text-[#A3A3A3]">Last updated: May 2026</p>

              <p>
                This Service Level Agreement (&ldquo;SLA&rdquo;) forms part of your agreement with
                ADS L.L.C-FZ (&ldquo;Toster&rdquo;) and describes the service commitments we make
                regarding availability, support, and remedies.
              </p>

              <h2 className="text-[#0A0A0A]">1. Uptime commitment</h2>
              <p>
                Monthly uptime is calculated as: <code>(total minutes − downtime minutes) / total minutes × 100</code>.
                Planned maintenance windows (announced ≥ 48 hours in advance) and downtime caused by
                third-party services (Telegram API, LiqPay, Stripe, aggregator APIs) are excluded
                from downtime calculations.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Plan</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Monthly uptime SLA</th>
                      <th className="py-2 text-left font-semibold text-[#0A0A0A]">Max allowed downtime / month</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4">Starter</td>
                      <td className="py-2 pr-4">99.5%</td>
                      <td className="py-2">≈ 3 hours 36 minutes</td>
                    </tr>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4">Growth</td>
                      <td className="py-2 pr-4">99.9%</td>
                      <td className="py-2">≈ 43 minutes</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Enterprise</td>
                      <td className="py-2 pr-4">99.95%</td>
                      <td className="py-2">≈ 22 minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-[#0A0A0A]">2. Support response times</h2>
              <p>
                Support is provided via Telegram and email during business hours (Mon–Fri, 09:00–18:00 UTC+2)
                except on public holidays in the UAE.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Severity</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Description</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Starter</th>
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Growth</th>
                      <th className="py-2 text-left font-semibold text-[#0A0A0A]">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4 font-medium">P1 — Critical</td>
                      <td className="py-2 pr-4">Platform unavailable; orders cannot be accepted</td>
                      <td className="py-2 pr-4">4 h</td>
                      <td className="py-2 pr-4">2 h</td>
                      <td className="py-2">1 h</td>
                    </tr>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4 font-medium">P2 — High</td>
                      <td className="py-2 pr-4">Core feature degraded; workaround available</td>
                      <td className="py-2 pr-4">8 h</td>
                      <td className="py-2 pr-4">4 h</td>
                      <td className="py-2">2 h</td>
                    </tr>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4 font-medium">P3 — Medium</td>
                      <td className="py-2 pr-4">Non-critical feature impacted</td>
                      <td className="py-2 pr-4">2 bd</td>
                      <td className="py-2 pr-4">1 bd</td>
                      <td className="py-2">1 bd</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">P4 — Low</td>
                      <td className="py-2 pr-4">General questions, feature requests</td>
                      <td className="py-2 pr-4">5 bd</td>
                      <td className="py-2 pr-4">3 bd</td>
                      <td className="py-2">2 bd</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[#A3A3A3]">bd = business days</p>

              <h2 className="text-[#0A0A0A]">3. Service credits</h2>
              <p>
                If Toster fails to meet the uptime commitment in any calendar month, eligible
                customers may claim service credits applied to the next invoice. Credits are the
                sole and exclusive remedy for uptime failures.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="py-2 pr-4 text-left font-semibold text-[#0A0A0A]">Monthly uptime achieved</th>
                      <th className="py-2 text-left font-semibold text-[#0A0A0A]">Credit (% of monthly fee)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4">99.0% – below SLA threshold</td>
                      <td className="py-2">10%</td>
                    </tr>
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-2 pr-4">95.0% – 98.99%</td>
                      <td className="py-2">25%</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Below 95.0%</td>
                      <td className="py-2">50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Credits must be claimed within 30 days of the incident by contacting{' '}
                <a href="mailto:hello@toster.co" className="text-[#0A0A0A] underline">hello@toster.co</a>.
                Total credits in any month shall not exceed 50% of the monthly fee for that month.
              </p>

              <h2 className="text-[#0A0A0A]">4. Status page</h2>
              <p>
                Real-time platform status, incident history, and maintenance notices are published at{' '}
                <a
                  href="https://status.toster.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A0A0A] underline"
                >
                  status.toster.co
                </a>.
              </p>

              <h2 className="text-[#0A0A0A]">5. Exclusions</h2>
              <p>This SLA does not apply to:</p>
              <ul>
                <li>Free trial or sandbox accounts</li>
                <li>Downtime caused by customer actions, custom integrations, or third-party APIs</li>
                <li>Force majeure events</li>
                <li>Planned maintenance announced ≥ 48 hours in advance</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
