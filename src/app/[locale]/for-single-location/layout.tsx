import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'For Single Locations — Launch Your Delivery in One Day',
  uk: 'Для одного закладу — запустіть доставку за один день',
  ru: 'Для одного заведения — запустите доставку за один день',
  pl: 'Dla jednej lokalizacji — uruchom dostawę w jeden dzień',
  cs: 'Pro jednu pobočku — spusťte rozvoz za jeden den',
  de: 'Für einzelne Standorte — Lieferservice in einem Tag starten',
  es: 'Para una sola ubicación — lanza tu delivery en un día',
};

const descriptions: Record<string, string> = {
  en: 'Perfect for independent restaurants and ghost kitchens launching delivery. Get a branded website, order management, courier tracking, and customer loyalty from 3% of turnover.',
  uk: "Ідеально для незалежних ресторанів та dark kitchen. Отримайте брендований сайт, управління замовленнями, трекінг кур'єрів та лояльність від 3% обороту.",
  ru: 'Идеально для независимых ресторанов и dark kitchen. Получите брендированный сайт, управление заказами, трекинг курьеров и лояльность от 3% оборота.',
  pl: 'Idealne dla niezależnych restauracji i dark kitchen. Uzyskaj brandowaną stronę, zarządzanie zamówieniami, śledzenie kurierów i lojalność od 3% obrotu.',
  cs: 'Ideální pro nezávislé restaurace a dark kitchen. Získejte brandovaný web, správu objednávek, sledování kurýrů a věrnostní program od 3 % obratu.',
  de: 'Perfekt für unabhängige Restaurants und Dark Kitchens. Erhalten Sie gebrandete Website, Bestellmanagement, Kuriertracking und Kundenbindung ab 3% des Umsatzes.',
  es: 'Perfecto para restaurantes independientes y dark kitchens. Obtén sitio web de marca, gestión de pedidos, seguimiento de repartidores y fidelización desde el 3% de facturación.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['single location food delivery software', 'restaurant delivery system', 'ghost kitchen software', 'food delivery startup platform'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/for-single-location`,
    },
    alternates: buildAlternates(locale, '/for-single-location'),
  };
}

export default function ForSingleLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
