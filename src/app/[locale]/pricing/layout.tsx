import type { Metadata } from 'next';
import { buildAlternates, buildBreadcrumbSchema } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Pricing — From €250/mo or 3–9% of Turnover',
  uk: 'Ціни — від €250/міс або 3–9% обороту',
  ru: 'Цены — от €250/мес или 3–9% оборота',
  pl: 'Cennik — od €250/mies. lub 3–9% obrotu',
  cs: 'Ceník — od €250/měs. nebo 3–9% obratu',
  de: 'Preise — ab €250/Monat oder 3–9% des Umsatzes',
  es: 'Precios — desde €250/mes o 3–9% de facturación',
};

const descriptions: Record<string, string> = {
  en: 'Toster pricing scales with your revenue: fixed €250/month Start plan, or 3–9% of turnover for Starter/Growth/Enterprise. Includes CRM, website, iOS & Android apps, and managed marketing.',
  uk: 'Тарифи Toster масштабуються разом з вашим бізнесом: фіксований €250/місяць або 3–9% обороту. Включає CRM, сайт, мобільні застосунки та маркетинг.',
  ru: 'Тарифы Toster масштабируются вместе с вашим бизнесом: фиксированный €250/месяц или 3–9% оборота. Включает CRM, сайт, мобильные приложения и маркетинг.',
  pl: 'Cennik Toster skaluje się z Twoim przychodem: stały plan €250/miesiąc lub 3–9% obrotu. Zawiera CRM, stronę, aplikacje iOS i Android oraz marketing.',
  cs: 'Ceník Toster se škáluje s vaším příjmem: fixní plán €250/měs. nebo 3–9% obratu. Zahrnuje CRM, web, iOS a Android aplikace a řízený marketing.',
  de: 'Toster-Preise skalieren mit Ihrem Umsatz: fester €250/Monat-Plan oder 3–9% des Umsatzes. Enthält CRM, Website, iOS- & Android-Apps und verwaltetes Marketing.',
  es: 'Los precios de Toster escalan con tus ingresos: plan fijo de €250/mes o 3–9% de facturación. Incluye CRM, sitio web, apps iOS y Android y marketing gestionado.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['food delivery software pricing', 'CRM pricing food delivery', 'restaurant management platform cost', 'food delivery SaaS pricing'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/pricing`,
    },
    alternates: buildAlternates(locale, '/pricing'),
  };
}

export default async function PricingLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(locale, [{ name: 'Pricing', path: '/pricing' }])),
        }}
      />
      {children}
    </>
  );
}
