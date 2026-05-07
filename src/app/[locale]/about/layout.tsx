import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'About — Built by Operators, for Operators',
    description: 'Toster was built to run 966 Network — a food delivery chain in 4 countries. The same platform is now open to other operators. Meet the team: Artem Teslenko (CEO), Dmitry Khvostik (CTO), Alexander Smiyan (Head of Operations).',
    keywords: ['Toster food delivery company', 'food delivery CRM company', 'ADS LLC FZ Dubai', '966 Network'],
    openGraph: {
      title: 'About Toster — We Built This to Run Our Own Chain',
      description: 'Started in Kyiv in 2022. Now 25+ locations across 4 countries. The platform that runs 966 Network is open to everyone.',
      url: `https://toster.co/${locale}/about`,
    },
    alternates: buildAlternates(locale, '/about'),
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
