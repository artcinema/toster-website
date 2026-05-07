import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'API & Developer Docs — Toster Open API',
  uk: 'API та документація для розробників — Toster Open API',
  ru: 'API и документация для разработчиков — Toster Open API',
  pl: 'API i dokumentacja dla deweloperów — Toster Open API',
  cs: 'API a dokumentace pro vývojáře — Toster Open API',
  de: 'API & Entwicklerdokumentation — Toster Open API',
  es: 'API y documentación para desarrolladores — Toster Open API',
};

const descriptions: Record<string, string> = {
  en: 'Toster REST API for custom integrations: orders, menu, couriers, customers, webhooks. OpenAPI spec, SDKs, and developer guides. Build on top of the food delivery platform.',
  uk: "REST API Toster для власних інтеграцій: замовлення, меню, кур'єри, клієнти, вебхуки. Специфікація OpenAPI, SDK та документація розробника.",
  ru: 'REST API Toster для пользовательских интеграций: заказы, меню, курьеры, клиенты, вебхуки. Спецификация OpenAPI, SDK и руководства разработчика.',
  pl: 'Toster REST API do niestandardowych integracji: zamówienia, menu, kurierzy, klienci, webhooks. Specyfikacja OpenAPI, SDK i przewodniki dla deweloperów.',
  cs: 'Toster REST API pro vlastní integrace: objednávky, menu, kurýři, zákazníci, webhooky. Specifikace OpenAPI, SDK a průvodce pro vývojáře.',
  de: 'Toster REST API für benutzerdefinierte Integrationen: Bestellungen, Menü, Kuriere, Kunden, Webhooks. OpenAPI-Spezifikation, SDKs und Entwickleranleitungen.',
  es: 'Toster REST API para integraciones personalizadas: pedidos, menú, repartidores, clientes, webhooks. Especificación OpenAPI, SDKs y guías para desarrolladores.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['food delivery API', 'restaurant CRM API', 'order management API', 'Toster developer docs', 'food delivery webhook'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/api`,
    },
    alternates: buildAlternates(locale, '/api'),
  };
}

export default function ApiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
