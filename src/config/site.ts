export const siteConfig = {
  name: 'Toster',
  description: 'The all-in-one platform for food delivery chains. Orders, kitchen, couriers, marketing, and AI — in one platform.',
  url: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://toster.co',
  appUrl: process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://crm.966.ua',
  demoUrl: process.env['NEXT_PUBLIC_DEMO_URL'] ?? 'https://crm.966.ua',
  apiUrl: process.env['NEXT_PUBLIC_API_URL'] ?? 'https://crm.966.ua/api',
  links: {
    linkedin: 'https://linkedin.com/company/toster-co',
    youtube: 'https://youtube.com/@toster-co',
    telegram: 'https://t.me/toster_crm',
  },
};

export type SiteConfig = typeof siteConfig;
