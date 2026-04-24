import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { LanguageSwitcher } from './LanguageSwitcher';
import { footerNav } from '@/config/nav';
import { siteConfig } from '@/config/site';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-[#E5E5E5] bg-white">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 font-semibold text-[#0A0A0A]">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFD600]">
                  <span className="text-sm font-bold">T</span>
                </span>
                <span>Toster</span>
              </Link>
              <p className="mt-3 text-sm text-[#A3A3A3]">{t('Footer.tagline')}</p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
                  aria-label="Telegram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
                  aria-label="YouTube"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#0A0A0A]">
                {t('Footer.columns.product')}
              </h3>
              <ul className="space-y-2">
                {footerNav.product.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
                    >
                      {t(item.i18nKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#0A0A0A]">
                {t('Footer.columns.company')}
              </h3>
              <ul className="space-y-2">
                {footerNav.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
                    >
                      {t(item.i18nKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal + Contact */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#0A0A0A]">
                {t('Footer.columns.legal')}
              </h3>
              <ul className="space-y-2">
                {footerNav.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
                    >
                      {t(item.i18nKey)}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="mb-3 mt-6 text-sm font-semibold text-[#0A0A0A]">
                {t('Footer.columns.contact')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${t('Footer.contact.email')}`}
                    className="text-sm text-[#A3A3A3] transition-colors hover:text-[#0A0A0A]"
                  >
                    {t('Footer.contact.email')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E5E5E5] py-6 sm:flex-row">
          <p className="text-sm text-[#A3A3A3]">{t('Footer.copyright')}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#A3A3A3]">{t('Footer.madeWith')} ♥</span>
            <LanguageSwitcher />
          </div>
        </div>
      </Container>
    </footer>
  );
}
