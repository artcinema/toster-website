import type { Metadata } from 'next';
import { buildAlternates, buildBreadcrumbSchema } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Integrations — Bolt Food, Glovo, Wolt, Stripe & 40+ More',
  uk: 'Інтеграції — Bolt Food, Glovo, Wolt, Stripe та 40+ сервісів',
  ru: 'Интеграции — Bolt Food, Glovo, Wolt, Stripe и 40+ сервисов',
  pl: 'Integracje — Bolt Food, Glovo, Wolt, Stripe i 40+ więcej',
  cs: 'Integrace — Bolt Food, Glovo, Wolt, Stripe a 40+ dalších',
  de: 'Integrationen — Bolt Food, Glovo, Wolt, Stripe & 40+ weitere',
  es: 'Integraciones — Bolt Food, Glovo, Wolt, Stripe y 40+ más',
};

const descriptions: Record<string, string> = {
  en: 'Toster integrates with all major food delivery aggregators (Bolt Food, Glovo, Wolt, Uber Eats), payment providers (LiqPay, Stripe), fiscal systems (Checkbox, KSeF, EET, Fiskaly), marketing tools, and more.',
  uk: 'Toster інтегрується з усіма основними агрегаторами доставки (Bolt Food, Glovo, Wolt, Uber Eats), платіжними провайдерами (LiqPay, Stripe), фіскальними системами та маркетинговими інструментами.',
  ru: 'Toster интегрируется со всеми основными агрегаторами доставки (Bolt Food, Glovo, Wolt, Uber Eats), платёжными провайдерами (LiqPay, Stripe), фискальными системами и маркетинговыми инструментами.',
  pl: 'Toster integruje się ze wszystkimi głównymi agregatorami dostaw (Bolt Food, Glovo, Wolt, Uber Eats), dostawcami płatności (LiqPay, Stripe), systemami fiskalnymi i narzędziami marketingowymi.',
  cs: 'Toster se integruje se všemi hlavními agregátory rozvozu (Bolt Food, Glovo, Wolt, Uber Eats), platebními poskytovateli (LiqPay, Stripe), fiskálními systémy a marketingovými nástroji.',
  de: 'Toster integriert in alle großen Lieferaggregatoren (Bolt Food, Glovo, Wolt, Uber Eats), Zahlungsdienstleister (LiqPay, Stripe), Kassensysteme und Marketing-Tools.',
  es: 'Toster se integra con todos los principales agregadores de delivery (Bolt Food, Glovo, Wolt, Uber Eats), proveedores de pago (LiqPay, Stripe), sistemas fiscales y herramientas de marketing.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale in titles ? locale : 'en';
  return {
    title: titles[loc],
    description: descriptions[loc],
    keywords: ['food delivery integrations', 'Bolt Food integration', 'Glovo integration', 'Wolt integration', 'food delivery aggregator API', 'food delivery CRM integrations'],
    openGraph: {
      title: titles[loc],
      description: descriptions[loc],
      url: `https://toster.co/${locale}/integrations`,
    },
    alternates: buildAlternates(locale, '/integrations'),
  };
}

export default async function IntegrationsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(locale, [{ name: 'Integrations', path: '/integrations' }])),
        }}
      />
      {children}
    </>
  );
}
