import type { Metadata } from 'next';
import { buildAlternates, buildBreadcrumbSchema } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Features — Orders, Kitchen, Delivery, CRM & AI',
  uk: 'Функції — замовлення, кухня, доставка, CRM та AI',
  ru: 'Функции — заказы, кухня, доставка, CRM и AI',
  pl: 'Funkcje — zamówienia, kuchnia, dostawy, CRM i AI',
  cs: 'Funkce — objednávky, kuchyně, doručení, CRM a AI',
  de: 'Funktionen — Bestellungen, Küche, Lieferung, CRM & KI',
  es: 'Funciones — pedidos, cocina, delivery, CRM e IA',
};

const descriptions: Record<string, string> = {
  en: 'Everything in one platform: order management with Kanban view, kitchen display system, courier tracking, customer loyalty, AI automation, branded website, and iOS/Android apps. Built for food delivery chains.',
  uk: "Все в одній платформі: управління замовленнями з Kanban-дошкою, кухонний дисплей, трекінг кур'єрів, програма лояльності, AI-автоматизація та брендований сайт.",
  ru: 'Всё в одной платформе: управление заказами с Kanban-доской, кухонный дисплей, трекинг курьеров, программа лояльности, AI-автоматизация и брендированный сайт.',
  pl: 'Wszystko w jednej platformie: zarządzanie zamówieniami Kanban, wyświetlacz kuchenny, śledzenie kurierów, program lojalnościowy, automatyzacja AI i brandowana strona.',
  cs: 'Vše v jedné platformě: správa objednávek Kanban, kuchyňský displej, sledování kurýrů, věrnostní program, automatizace AI a brandovaný web.',
  de: 'Alles in einer Plattform: Bestellmanagement mit Kanban-Ansicht, Küchendisplay, Kuriertracking, Kundenbindungsprogramm, KI-Automatisierung und gebrandete Website.',
  es: 'Todo en una plataforma: gestión de pedidos Kanban, pantalla de cocina, seguimiento de repartidores, programa de fidelización, automatización IA y sitio web de marca.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['food delivery CRM features', 'kitchen display system', 'courier management software', 'food delivery order management', 'restaurant chain platform features'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/features`,
    },
    alternates: buildAlternates(locale, '/features'),
  };
}

export default async function FeaturesLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(locale, [{ name: 'Features', path: '/features' }])),
        }}
      />
      {children}
    </>
  );
}
