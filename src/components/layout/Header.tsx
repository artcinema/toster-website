import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { HeaderShell } from './HeaderShell';
import { MobileMenu } from './MobileMenu';
import { mainNav } from '@/config/nav';
import { siteConfig } from '@/config/site';

/**
 * Server Component — renders logo, nav links and CTA buttons as static HTML.
 * Client interactivity (scroll shadow, mobile menu) is handled by HeaderShell
 * and MobileMenu, which are extracted minimal client components.
 */
export async function Header() {
  const t = await getTranslations();

  const navItems = mainNav.map((item) => ({
    href: item.href,
    label: t(item.i18nKey),
  }));

  return (
    <>
      {/* Skip-to-content — pure HTML, no JS needed */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#FFD600] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#0A0A0A]"
      >
        Skip to content
      </a>

      <HeaderShell>
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] focus-visible:ring-offset-2 rounded-md"
              aria-label="Toster — home"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFD600]">
                <span className="text-sm font-bold text-[#0A0A0A]">T</span>
              </span>
              <span className="text-lg tracking-tight">Toster</span>
            </Link>

            {/* Desktop Nav — static HTML, zero hydration */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-[#525252] transition-colors hover:bg-[#F5F5F5] hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-2 lg:flex">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm" asChild>
                <a href={siteConfig.appUrl}>{t('Common.signIn')}</a>
              </Button>
              <Button variant="primary" size="sm" asChild>
                <Link href="/request-demo">{t('Common.requestDemo')}</Link>
              </Button>
            </div>

            {/* Mobile Menu — client component (only the interactive bits) */}
            <MobileMenu
              navItems={navItems}
              signInLabel={t('Common.signIn')}
              requestDemoLabel={t('Common.requestDemo')}
            />

          </div>
        </Container>
      </HeaderShell>
    </>
  );
}
