// Root path is handled by next-intl middleware for non-default locales.
// For the default locale (en) with localePrefix 'as-needed', this page
// serves as the entry point — re-export the [locale] page directly.
export { default } from '@/app/[locale]/page';
