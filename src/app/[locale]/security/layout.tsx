import type { Metadata } from 'next';
import { buildAlternates, buildBreadcrumbSchema } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Security — How Toster Protects Your Data',
  uk: 'Безпека — як Toster захищає ваші дані',
  ru: 'Безопасность — как Toster защищает ваши данные',
  pl: 'Bezpieczeństwo — jak Toster chroni Twoje dane',
  cs: 'Bezpečnost — jak Toster chrání vaše data',
  de: 'Sicherheit — wie Toster Ihre Daten schützt',
  es: 'Seguridad — cómo Toster protege tus datos',
};

const descriptions: Record<string, string> = {
  en: 'Toster security practices: encrypted connections, EU data hosting, GDPR compliance, role-based access, SOC2-ready architecture, and Cloudflare DDoS protection.',
  uk: "Безпека Toster: зашифровані з'єднання, хостинг даних в ЄС, відповідність GDPR, доступ на основі ролей та захист від DDoS через Cloudflare.",
  ru: 'Безопасность Toster: зашифрованные соединения, хостинг данных в ЕС, соответствие GDPR, доступ на основе ролей и защита от DDoS через Cloudflare.',
  pl: 'Bezpieczeństwo Toster: szyfrowane połączenia, hosting danych w UE, zgodność z RODO, dostęp oparty na rolach i ochrona DDoS Cloudflare.',
  cs: 'Bezpečnost Toster: šifrovaná připojení, hosting dat v EU, soulad s GDPR, přístup založený na rolích a ochrana DDoS přes Cloudflare.',
  de: 'Toster-Sicherheit: verschlüsselte Verbindungen, EU-Datenhosting, DSGVO-Konformität, rollenbasierter Zugriff und Cloudflare DDoS-Schutz.',
  es: 'Seguridad de Toster: conexiones cifradas, alojamiento en UE, cumplimiento RGPD, acceso basado en roles y protección DDoS de Cloudflare.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['Toster security', 'food delivery data security', 'GDPR food delivery', 'food delivery software security'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/security`,
    },
    alternates: buildAlternates(locale, '/security'),
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(locale, [{ name: 'Security', path: '/security' }])),
        }}
      />
      {children}
    </>
  );
}
