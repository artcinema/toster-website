import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

const BASE = siteConfig.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE}/${locale}/blog`;
  return {
    title: 'Blog — Food Delivery Operations & Growth',
    description: 'Insights on food delivery CRM, kitchen management, courier routing, AI automation, and scaling multi-location delivery chains. Practical guides from operators who run 25+ locations.',
    alternates: {
      canonical: url,
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
