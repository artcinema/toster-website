import type { Metadata } from 'next';
import { buildAlternates, buildBreadcrumbSchema } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'AI Features — Voice Operator, Marketing Agent & Forecasting',
  uk: 'AI-функції — голосовий оператор, маркетинговий агент і прогнозування',
  ru: 'AI-функции — голосовой оператор, маркетинговый агент и прогнозирование',
  pl: 'Funkcje AI — operator głosowy, agent marketingowy i prognozowanie',
  cs: 'Funkce AI — hlasový operátor, marketingový agent a prognózy',
  de: 'KI-Funktionen — Sprachoperator, Marketing-Agent & Prognosen',
  es: 'Funciones IA — operador de voz, agente de marketing y pronósticos',
};

const descriptions: Record<string, string> = {
  en: 'Claude-powered AI built into every layer of Toster: AI voice operator for phone orders, autonomous marketing agent, demand forecasting, reactivation flows, and Claude Vision for packing verification.',
  uk: 'AI на базі Claude вбудований у кожен шар Toster: голосовий оператор для телефонних замовлень, автономний маркетинговий агент, прогнозування попиту та перевірка пакування.',
  ru: 'AI на базе Claude встроен в каждый слой Toster: голосовой оператор для телефонных заказов, автономный маркетинговый агент, прогнозирование спроса и проверка упаковки.',
  pl: 'AI oparty na Claude wbudowany w każdą warstwę Toster: operator głosowy dla zamówień telefonicznych, autonomiczny agent marketingowy i prognozowanie popytu.',
  cs: 'AI na bázi Claude zabudovaný do každé vrstvy Toster: hlasový operátor pro telefonní objednávky, autonomní marketingový agent a prognózování poptávky.',
  de: 'Claude-basierte KI in jede Schicht von Toster integriert: KI-Sprachoperator für Telefonbestellungen, autonomer Marketing-Agent und Nachfrageprognose.',
  es: 'IA basada en Claude integrada en cada capa de Toster: operador de voz IA para pedidos telefónicos, agente de marketing autónomo y pronóstico de demanda.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['AI food delivery software', 'food delivery automation', 'AI restaurant management', 'food delivery voice operator AI', 'AI marketing food delivery'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/ai`,
    },
    alternates: buildAlternates(locale, '/ai'),
  };
}

export default async function AiLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(locale, [{ name: 'AI', path: '/ai' }])),
        }}
      />
      {children}
    </>
  );
}
