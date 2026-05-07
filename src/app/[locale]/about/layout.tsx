import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'About Toster — Built by Operators, for Operators',
  uk: 'Про Toster — збудовано операторами для операторів',
  ru: 'О Toster — создано операторами для операторов',
  pl: 'O Toster — zbudowane przez operatorów dla operatorów',
  cs: 'O Toster — vytvořeno operátory pro operátory',
  de: 'Über Toster — von Betreibern für Betreiber gebaut',
  es: 'Acerca de Toster — creado por operadores para operadores',
};

const descriptions: Record<string, string> = {
  en: 'Toster was built to run 966 Network — a food delivery chain in 4 countries. The same platform is now open to other operators. Meet the team: Artem Teslenko (CEO), Dmitry Khvostik (CTO).',
  uk: 'Toster створено для управління мережею 966 — доставкою їжі у 4 країнах. Та сама платформа тепер відкрита для інших операторів. Команда: Артем Тесленко (CEO), Дмитро Хвостик (CTO).',
  ru: 'Toster создан для управления сетью 966 — доставки еды в 4 странах. Та же платформа теперь открыта для других операторов. Команда: Артем Тесленко (CEO), Дмитрий Хвостик (CTO).',
  pl: 'Toster powstał do zarządzania siecią 966 — dostawą jedzenia w 4 krajach. Ta sama platforma jest teraz dostępna dla innych operatorów. Zespół: Artem Teslenko (CEO), Dmitry Khvostik (CTO).',
  cs: 'Toster byl vytvořen pro provoz sítě 966 — rozvoz jídla ve 4 zemích. Stejná platforma je nyní dostupná ostatním operátorům. Tým: Artem Teslenko (CEO), Dmitry Khvostik (CTO).',
  de: 'Toster wurde entwickelt, um das 966 Network zu betreiben — ein Lieferservice in 4 Ländern. Dieselbe Plattform ist nun für andere Betreiber verfügbar. Team: Artem Teslenko (CEO), Dmitry Khvostik (CTO).',
  es: 'Toster fue creado para gestionar 966 Network — una cadena de delivery en 4 países. La misma plataforma está ahora disponible para otros operadores. Equipo: Artem Teslenko (CEO), Dmitry Khvostik (CTO).',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['Toster food delivery company', 'food delivery CRM company', 'ADS LLC FZ Dubai', '966 Network'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/about`,
    },
    alternates: buildAlternates(locale, '/about'),
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
