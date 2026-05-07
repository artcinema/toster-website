import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Toster vs Poster POS — Detailed Comparison',
  uk: 'Toster проти Poster POS — детальне порівняння',
  ru: 'Toster против Poster POS — детальное сравнение',
  pl: 'Toster vs Poster POS — szczegółowe porównanie',
  cs: 'Toster vs Poster POS — podrobné porovnání',
  de: 'Toster vs. Poster POS — Detaillierter Vergleich',
  es: 'Toster vs Poster POS — comparación detallada',
};

const descriptions: Record<string, string> = {
  en: 'Toster vs Poster POS: feature-by-feature comparison of order management, kitchen display, courier tracking, AI automation, and pricing. Which platform fits food delivery chains better?',
  uk: 'Toster проти Poster POS: порівняння функція за функцією — управління замовленнями, кухонний дисплей, трекінг кур\'єрів, AI-автоматизація та ціноутворення.',
  ru: 'Toster против Poster POS: сравнение функция за функцией — управление заказами, кухонный дисплей, трекинг курьеров, AI-автоматизация и цены.',
  pl: 'Toster vs Poster POS: porównanie funkcji — zarządzanie zamówieniami, wyświetlacz kuchenny, śledzenie kurierów, automatyzacja AI i cennik.',
  cs: 'Toster vs Poster POS: porovnání funkcí — správa objednávek, kuchyňský displej, sledování kurýrů, automatizace AI a ceník.',
  de: 'Toster vs. Poster POS: Funktionsvergleich — Bestellmanagement, Küchendisplay, Kuriertracking, KI-Automatisierung und Preisgestaltung.',
  es: 'Toster vs Poster POS: comparación de funciones — gestión de pedidos, pantalla de cocina, seguimiento de repartidores, automatización IA y precios.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['Toster vs Poster POS', 'Poster POS alternative', 'food delivery software comparison', 'POS comparison food delivery'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/vs/poster-pos`,
    },
    alternates: buildAlternates(locale, '/vs/poster-pos'),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
