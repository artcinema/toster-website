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
    title: 'Cookie Policy | Toster',
    description: 'How Toster uses cookies and similar tracking technologies.',
    alternates: { canonical: `${BASE}/${locale}/legal/cookies` },
    robots: { index: true, follow: true },
  };
}

const cookieTable = [
  { name: '__locale', purpose: 'Stores your selected language preference', duration: 'Session', type: 'Strictly necessary' },
  { name: 'next-auth.session-token', purpose: 'Authentication session (app.toster.co only)', duration: '30 days', type: 'Strictly necessary' },
  { name: '_ga', purpose: 'Google Analytics — distinguishes users', duration: '2 years', type: 'Analytics (consent required)' },
  { name: '_ga_*', purpose: 'Google Analytics — session state', duration: '2 years', type: 'Analytics (consent required)' },
  { name: '_vercel_*', purpose: 'Vercel Speed Insights — performance monitoring', duration: 'Session', type: 'Analytics (consent required)' },
];

export default async function CookiesPage({
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
      { '@type': 'ListItem', position: 2, name: 'Cookie Policy', item: `${BASE}/${locale}/legal/cookies` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A3A3A3]">Legal</p>
            <h1 className="mb-8 text-4xl font-bold text-[#0A0A0A]">Cookie Policy</h1>

            <div className="prose prose-neutral max-w-none text-[#525252]">
              <p className="text-sm text-[#A3A3A3]">Last updated: May 2026</p>

              <h2>What are cookies?</h2>
              <p>
                Cookies are small text files placed on your device when you visit a website. They
                help us provide a working website and understand how you use it.
              </p>

              <h2>How we use cookies</h2>
              <p>We use cookies in two categories:</p>
              <ul>
                <li>
                  <strong>Strictly necessary:</strong> Required for the website to function (language
                  preference, session management). No consent required.
                </li>
                <li>
                  <strong>Analytics:</strong> Help us understand site usage (Google Analytics, Vercel
                  Speed Insights). These are only loaded with your consent in EU/EEA.
                </li>
              </ul>

              <h2>Cookies we use</h2>
            </div>

            <div className="mt-4 overflow-x-auto rounded-xl border border-[#E5E5E5]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5E5E5] bg-[#F5F5F5]">
                    <th className="py-3 pl-4 pr-3 text-left font-semibold text-[#0A0A0A]">Name</th>
                    <th className="px-3 py-3 text-left font-semibold text-[#0A0A0A]">Purpose</th>
                    <th className="px-3 py-3 text-left font-semibold text-[#0A0A0A]">Duration</th>
                    <th className="px-3 py-3 pr-4 text-left font-semibold text-[#0A0A0A]">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTable.map((row, i) => (
                    <tr key={row.name} className={`border-b border-[#F5F5F5] ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                      <td className="py-3 pl-4 pr-3 font-mono text-xs text-[#0A0A0A]">{row.name}</td>
                      <td className="px-3 py-3 text-[#525252]">{row.purpose}</td>
                      <td className="px-3 py-3 text-[#525252]">{row.duration}</td>
                      <td className="px-3 py-3 pr-4 text-[#525252]">{row.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="prose prose-neutral mt-8 max-w-none text-[#525252]">
              <h2>How to manage cookies</h2>
              <p>
                You can control cookies through your browser settings. Disabling strictly necessary
                cookies may affect website functionality. For analytics cookies, you can also use
                browser extensions like uBlock Origin or Google Analytics Opt-out.
              </p>

              <h2>Contact</h2>
              <p>
                Questions about our cookie use:{' '}
                <a href="mailto:privacy@toster.co" className="text-[#0A0A0A] underline">privacy@toster.co</a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
