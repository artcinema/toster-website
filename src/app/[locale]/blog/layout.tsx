import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = `https://toster.co/${locale}/blog`;
  return {
    title: 'Blog — Food Delivery Operations & Growth',
    description: 'Insights on food delivery CRM, kitchen management, courier routing, AI automation, and scaling multi-location delivery chains. Practical guides from operators who run 25+ locations.',
    alternates: {
      ...buildAlternates(locale, '/blog'),
      types: {
        'application/rss+xml': `${url}/rss.xml`,
      },
    },
    openGraph: {
      title: 'Toster Blog — Food Delivery Operations & Growth',
      description: 'Practical insights from operators running 25+ food delivery locations across 4 countries.',
      type: 'website',
      url,
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
