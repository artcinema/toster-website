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
    title: 'Acceptable Use Policy | Toster',
    description: 'Acceptable Use Policy for the Toster food delivery chain management platform.',
    alternates: { canonical: `${BASE}/${locale}/legal/aup` },
    robots: { index: true, follow: true },
  };
}

export default async function AupPage({
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
      { '@type': 'ListItem', position: 2, name: 'Acceptable Use Policy', item: `${BASE}/${locale}/legal/aup` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A3A3A3]">Legal</p>
            <h1 className="mb-8 text-4xl font-bold text-[#0A0A0A]">Acceptable Use Policy</h1>

            <div className="prose prose-neutral max-w-none text-[#525252]">
              <p className="text-sm text-[#A3A3A3]">Last updated: May 2026 · Effective immediately upon account creation</p>

              <p>
                This Acceptable Use Policy (&ldquo;AUP&rdquo;) governs all use of the Toster platform
                (&ldquo;Toster&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By accessing or using the Service, you agree
                to comply with this AUP. Violation may result in immediate suspension or termination
                of your account without refund.
              </p>

              <h2 className="text-[#0A0A0A]">Prohibited Uses</h2>
              <p>You must not use the Toster platform to:</p>

              <ol>
                <li>
                  <strong>Violate any law or regulation.</strong> Use the Service only for lawful
                  purposes and in compliance with all applicable local, national, and international
                  laws, regulations, and third-party rights.
                </li>
                <li>
                  <strong>Send spam or unsolicited communications.</strong> Transmit unsolicited
                  commercial messages, bulk email, or any other communications that violate
                  applicable anti-spam laws including CAN-SPAM, CASL, and the EU ePrivacy Directive.
                </li>
                <li>
                  <strong>Transmit malware or perform unauthorized access.</strong> Upload, transmit,
                  or distribute any virus, Trojan, worm, or other malicious code, or attempt to
                  gain unauthorized access to any system, network, or data.
                </li>
                <li>
                  <strong>Impersonate any person or entity.</strong> Falsely represent your identity
                  or affiliation with any person or organization, or engage in phishing, spoofing,
                  or other deceptive practices.
                </li>
                <li>
                  <strong>Process special categories of personal data without lawful basis.</strong>{' '}
                  Process sensitive personal data (including health data, biometric data, or data
                  revealing racial or ethnic origin) without a valid legal basis under GDPR Article 9
                  and without prior written notice to Toster.
                </li>
                <li>
                  <strong>Process data of children contrary to applicable law.</strong> Collect,
                  store, or process personal data of individuals under the age of 16 (or the
                  applicable age of digital consent in your jurisdiction) without verifiable parental
                  or guardian consent.
                </li>
                <li>
                  <strong>Operate businesses requiring specific licensing Toster has not certified for.</strong>{' '}
                  Use the platform for activities that require regulatory licensing, certification, or
                  approval that Toster has not expressly confirmed is supported (for example,
                  licensed pharmaceutical delivery or alcohol sales to minors).
                </li>
                <li>
                  <strong>Reverse engineer or decompile the Service.</strong> Decompile, disassemble,
                  reverse engineer, or otherwise attempt to derive the source code of the Toster
                  platform, except to the extent permitted by mandatory applicable law.
                </li>
                <li>
                  <strong>Circumvent rate limits or abuse free trials.</strong> Bypass or attempt to
                  bypass rate limits, usage quotas, or technical restrictions. Create multiple
                  accounts to exploit free trial periods or referral programs through automated or
                  deceptive means.
                </li>
                <li>
                  <strong>Use the AI voice agent to deceive consumers.</strong> Deploy the Toster
                  AI voice operator feature without required disclosures where applicable law mandates
                  that consumers be informed they are interacting with an automated system (including
                  under the EU AI Act and applicable US state laws).
                </li>
                <li>
                  <strong>Resell or sublicense the Service without authorization.</strong> Resell,
                  sublicense, or otherwise provide third parties with access to the Toster platform
                  as a service without a separate written reseller or white-label agreement signed
                  with Toster.
                </li>
              </ol>

              <h2 className="text-[#0A0A0A]">Enforcement</h2>
              <p>
                Toster reserves the right to investigate suspected violations of this AUP and may
                suspend or terminate accounts, remove content, and report violations to law
                enforcement authorities where appropriate. We will endeavor to notify you before
                taking action except where immediate action is required to protect the platform or
                third parties.
              </p>

              <h2 className="text-[#0A0A0A]">Reporting violations</h2>
              <p>
                If you become aware of any violation of this AUP, please report it to{' '}
                <a href="mailto:hello@toster.co" className="text-[#0A0A0A] underline">hello@toster.co</a>.
              </p>

              <p className="mt-8 text-xs text-[#A3A3A3]">
                This AUP is incorporated by reference into the Toster Terms of Service. In the event
                of any conflict, the Terms of Service shall prevail.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
