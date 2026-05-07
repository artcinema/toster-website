import type { Metadata } from 'next';
import { buildAlternates, buildBreadcrumbSchema } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Food Delivery Software — Full Platform for Delivery Businesses',
  uk: 'Програма для доставки їжі — повна платформа для delivery-бізнесу',
  ru: 'Программа для доставки еды — полная платформа для delivery-бизнеса',
  pl: 'Oprogramowanie do dostaw jedzenia — kompletna platforma',
  cs: 'Software pro rozvoz jídla — kompletní platforma',
  de: 'Food-Delivery-Software — komplette Plattform für Lieferdienste',
  es: 'Software de delivery — plataforma completa para negocios de entrega',
};

const descriptions: Record<string, string> = {
  en: 'Purpose-built food delivery software: order management, kitchen display, courier routing, customer app, loyalty program, and managed marketing. From 3% of monthly turnover.',
  uk: "Платформа для доставки їжі: управління замовленнями, кухонний дисплей, маршрутизація кур'єрів, клієнтський застосунок, програма лояльності та маркетинг. Від 3% обороту.",
  ru: 'Платформа для доставки еды: управление заказами, кухонный дисплей, маршрутизация курьеров, клиентское приложение, программа лояльности и маркетинг. От 3% оборота.',
  pl: 'Platforma do dostaw jedzenia: zarządzanie zamówieniami, wyświetlacz kuchenny, routing kurierów, aplikacja klienta, program lojalnościowy i marketing. Od 3% obrotu.',
  cs: 'Platforma pro rozvoz jídla: správa objednávek, kuchyňský displej, routing kurýrů, zákaznická aplikace, věrnostní program a marketing. Od 3 % obratu.',
  de: 'Spezielle Food-Delivery-Plattform: Bestellmanagement, Küchendisplay, Kurierrouting, Kunden-App, Treueprogramm und Marketing. Ab 3% des Monatsumsatzes.',
  es: 'Plataforma de delivery: gestión de pedidos, pantalla de cocina, enrutamiento de repartidores, app de cliente, programa de fidelización y marketing. Desde el 3% de facturación.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['food delivery software', 'food delivery platform', 'delivery management software', 'food delivery CRM', 'restaurant delivery system'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/food-delivery`,
    },
    alternates: buildAlternates(locale, '/food-delivery'),
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(locale, [{ name: 'Food Delivery', path: '/food-delivery' }])),
        }}
      />
      {children}
    </>
  );
}
