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
    title: 'Impressum / Imprint | Toster',
    description: 'Legal imprint for Toster (ADS L.L.C-FZ) as required by German Telemediengesetz (TMG) §5.',
    alternates: { canonical: `${BASE}/${locale}/legal/imprint` },
    robots: { index: true, follow: true },
  };
}

export default async function ImprintPage({
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
      { '@type': 'ListItem', position: 2, name: 'Impressum', item: `${BASE}/${locale}/legal/imprint` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A3A3A3]">Legal</p>
            <h1 className="mb-8 text-4xl font-bold text-[#0A0A0A]">Impressum</h1>

            <div className="prose prose-neutral max-w-none text-[#525252]">
              <p className="text-sm text-[#A3A3A3]">
                Angaben gemäß § 5 Telemediengesetz (TMG) / Information according to § 5 TMG
              </p>

              <h2>Diensteanbieter / Service Provider</h2>
              <address className="not-italic">
                <strong>ADS L.L.C-FZ</strong><br />
                Meydan Grandstand, 6th Floor<br />
                Meydan Road, Nad Al Sheba<br />
                Dubai, United Arab Emirates<br />
                <br />
                E-Mail: <a href="mailto:hello@toster.co" className="text-[#0A0A0A] underline">hello@toster.co</a><br />
                Website: <a href="https://toster.co" className="text-[#0A0A0A] underline">https://toster.co</a>
              </address>

              <h2>Verantwortlich für den Inhalt / Responsible for content</h2>
              <p>ADS L.L.C-FZ, Meydan Grandstand, Dubai, UAE</p>

              <h2>Haftungsausschluss / Disclaimer</h2>
              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
                Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine
                Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich.
              </p>

              <h2>Online Dispute Resolution</h2>
              <p>
                The European Commission provides a platform for online dispute resolution (ODR):{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A0A0A] underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                . We are not obliged to participate in dispute resolution proceedings before a
                consumer arbitration board.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
