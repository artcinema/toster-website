import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Request Demo — See Toster in Action',
  uk: 'Запросити демо — побачте Toster у дії',
  ru: 'Запросить демо — посмотрите Toster в действии',
  pl: 'Zamów demo — Zobacz Toster w akcji',
  cs: 'Žádost o demo — uvidíte Toster v akci',
  de: 'Demo anfordern — Toster in Aktion erleben',
  es: 'Solicitar demo — vea Toster en acción',
};

const descriptions: Record<string, string> = {
  en: 'Schedule a 30-minute demo with the Toster team. See order management, kitchen display, courier tracking, and AI automation live. No sales pressure — just a working product.',
  uk: "Замовте 30-хвилинне демо з командою Toster. Побачте управління замовленнями, кухонний дисплей, трекінг кур'єрів та AI-автоматизацію наживо. Без тиску продажів — просто робочий продукт.",
  ru: 'Запишитесь на 30-минутное демо с командой Toster. Посмотрите управление заказами, кухонный дисплей, трекинг курьеров и AI-автоматизацию вживую. Без давления продаж — просто рабочий продукт.',
  pl: 'Zaplanuj 30-minutowe demo z zespołem Toster. Zobacz zarządzanie zamówieniami, wyświetlacz kuchenny, śledzenie kurierów i automatyzację AI na żywo. Bez presji sprzedaży.',
  cs: 'Naplánujte 30minutové demo s týmem Toster. Uvidíte správu objednávek, kuchyňský displej, sledování kurýrů a automatizaci AI naživo. Bez prodejního tlaku.',
  de: 'Vereinbaren Sie eine 30-minütige Demo mit dem Toster-Team. Erleben Sie Bestellmanagement, Küchendisplay, Kuriertracking und KI-Automatisierung live. Kein Verkaufsdruck.',
  es: 'Programe una demo de 30 minutos con el equipo de Toster. Vea la gestión de pedidos, pantalla de cocina, seguimiento de repartidores y automatización IA en vivo. Sin presión de ventas.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['Toster demo', 'food delivery software demo', 'CRM demo request', 'food delivery platform trial'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/request-demo`,
    },
    alternates: buildAlternates(locale, '/request-demo'),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
