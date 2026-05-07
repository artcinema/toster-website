'use client';

import * as React from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { siteConfig } from '@/config/site';

interface MobileNavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navItems: MobileNavItem[];
  signInLabel: string;
  requestDemoLabel: string;
}

export function MobileMenu({ navItems, signInLabel, requestDemoLabel }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#525252] transition-colors hover:bg-[#F5F5F5] hover:text-[#0A0A0A]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-2 border-t border-[#E5E5E5] p-4">
            <LanguageSwitcher />
            <Button variant="ghost" size="md" className="w-full" asChild>
              <a href={siteConfig.appUrl} onClick={() => setOpen(false)}>
                {signInLabel}
              </a>
            </Button>
            <Button variant="primary" size="md" className="w-full" asChild>
              <Link href="/request-demo" onClick={() => setOpen(false)}>
                {requestDemoLabel}
              </Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
