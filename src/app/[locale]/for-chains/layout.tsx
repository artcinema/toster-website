import type { Metadata } from 'next';
import { buildAlternates, buildBreadcrumbSchema } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'For Food Delivery Chains — Scale from 3 to 300 Locations',
  uk: 'Для мереж доставки їжі — від 3 до 300 локацій',
  ru: 'Для сетей доставки еды — от 3 до 300 локаций',
  pl: 'Dla sieci dostaw — od 3 do 300 lokalizacji',
  cs: 'Pro sítě rozvozu — od 3 do 300 poboček',
  de: 'Für Lieferketten — von 3 bis 300 Standorten skalieren',
  es: 'Para cadenas de delivery — de 3 a 300 ubicaciones',
};

const descriptions: Record<string, string> = {
  en: 'Toster is built for multi-location food delivery chains. Multi-country, multi-currency, multi-language. Runs 25+ locations across Ukraine, Poland, Czech Republic and Germany. No extra managers needed.',
  uk: 'Toster створено для мережевої доставки їжі. Мультикраїнна, мультивалютна, мультимовна платформа. Працює у 25+ локаціях в Україні, Польщі, Чехії та Німеччині.',
  ru: 'Toster создан для сетевой доставки еды. Мультистрановая, мультивалютная, мультиязычная платформа. Работает в 25+ локациях в Украине, Польше, Чехии и Германии.',
  pl: 'Toster jest stworzony dla sieci dostaw jedzenia. Wielokrajowy, wielowalutowy, wielojęzyczny. Działa w 25+ lokalizacjach na Ukrainie, w Polsce, Czechach i Niemczech.',
  cs: 'Toster je stavěn pro sítě rozvozu jídla. Vícejazyčný, víceměnový, mezinárodní. Provozuje 25+ poboček na Ukrajině, v Polsku, Česku a Německu.',
  de: 'Toster ist für Lebensmittel-Lieferketten konzipiert. Mehrsprachig, mehrwährungs, international. Betrieb in 25+ Standorten in Ukraine, Polen, Tschechien und Deutschland.',
  es: 'Toster está construido para cadenas de delivery. Multipaís, multidivisa, multiidioma. Funciona en 25+ ubicaciones en Ucrania, Polonia, República Checa y Alemania.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['multi-location food delivery software', 'food delivery chain management', 'restaurant chain CRM', 'food delivery franchise software', 'delivery chain platform'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/for-chains`,
    },
    alternates: buildAlternates(locale, '/for-chains'),
  };
}

export default async function ForChainsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(locale, [{ name: 'For Chains', path: '/for-chains' }])),
        }}
      />
      {children}
    </>
  );
}
