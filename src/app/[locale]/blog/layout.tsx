import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Blog — Food Delivery Operations & Growth',
  uk: 'Блог — операції та зростання доставки їжі',
  ru: 'Блог — операции и рост доставки еды',
  pl: 'Blog — operacje i wzrost dostaw jedzenia',
  cs: 'Blog — provoz a růst rozvozu jídla',
  de: 'Blog — Betrieb und Wachstum im Lieferservice',
  es: 'Blog — operaciones y crecimiento del delivery',
};

const descriptions: Record<string, string> = {
  en: 'Insights on food delivery CRM, kitchen management, courier routing, AI automation, and scaling multi-location delivery chains. Practical guides from operators who run 25+ locations.',
  uk: "Поради щодо CRM для доставки їжі, управління кухнею, маршрутизації кур'єрів, AI-автоматизації та масштабування мережі. Практичні гіди від операторів 25+ локацій.",
  ru: 'Советы по CRM для доставки еды, управлению кухней, маршрутизации курьеров, AI-автоматизации и масштабированию сети. Практические руководства от операторов 25+ локаций.',
  pl: 'Porady na temat CRM dla dostaw, zarządzania kuchnią, routingu kurierów, automatyzacji AI i skalowania sieci. Praktyczne przewodniki od operatorów 25+ lokalizacji.',
  cs: 'Tipy k CRM pro rozvoz, správě kuchyně, routování kurýrů, automatizaci AI a škálování sítě. Praktické průvodce od operátorů 25+ poboček.',
  de: 'Einblicke in Food-Delivery-CRM, Küchenmanagement, Kurierrouting, KI-Automatisierung und die Skalierung von Liefernetzwerken. Praxisanleitungen von Betreibern mit 25+ Standorten.',
  es: 'Conocimientos sobre CRM de delivery, gestión de cocina, rutas de repartidores, automatización IA y escalado de redes. Guías prácticas de operadores con 25+ ubicaciones.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['food delivery blog', 'restaurant operations blog', 'food delivery management tips', 'delivery chain insights'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      type: 'website',
      url: `https://toster.co/${locale}/blog`,
    },
    alternates: {
      ...buildAlternates(locale, '/blog'),
      types: { 'application/rss+xml': `https://toster.co/${locale}/blog/feed.xml` },
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
