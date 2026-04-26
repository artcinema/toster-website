'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { LanguageSwitcher } from './LanguageSwitcher';
import { mainNav } from '@/config/nav';
import { siteConfig } from '@/config/site';

export function Header() {
  const t = useTranslations();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#FFD600] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#0A0A0A]"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow duration-200',
          scrolled ? 'border-[#E5E5E5] shadow-sm' : 'border-transparent',
        )}
      >
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

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-[#525252] transition-colors hover:bg-[#F5F5F5] hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
                >
                  {t(item.i18nKey)}
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

            {/* Mobile Hamburger */}
            <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
              <Dialog.Trigger asChild>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-md text-[#525252] transition-colors hover:bg-[#F5F5F5] lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-xl focus:outline-none">
                  <div className="flex items-center justify-between border-b border-[#E5E5E5] px-6 py-4">
                    <Dialog.Title className="flex items-center gap-2 font-semibold text-[#0A0A0A]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFD600]">
                        <span className="text-sm font-bold">T</span>
                      </span>
                      Toster
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-md text-[#525252] hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
                        aria-label="Close menu"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
                    {mainNav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#525252] transition-colors hover:bg-[#F5F5F5] hover:text-[#0A0A0A]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t(item.i18nKey)}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto flex flex-col gap-2 border-t border-[#E5E5E5] p-4">
                    <LanguageSwitcher />
                    <Button variant="ghost" size="md" className="w-full" asChild>
                      <a href={siteConfig.appUrl} onClick={() => setMobileOpen(false)}>
                        {t('Common.signIn')}
                      </a>
                    </Button>
                    <Button variant="primary" size="md" className="w-full" asChild>
                      <Link href="/request-demo" onClick={() => setMobileOpen(false)}>
                        {t('Common.requestDemo')}
                      </Link>
                    </Button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </Container>
      </header>
    </>
  );
}
