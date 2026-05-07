'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]!) : undefined;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function CookieBanner() {
  const locale = useLocale();
  // Lazily initialise so the banner only shows on the client when consent is missing
  const [visible, setVisible] = useState(() => {
    if (typeof document === 'undefined') return false;
    return getCookie('cookie_consent') === undefined;
  });

  function acceptAll() {
    setCookie('cookie_consent', 'all', 365);
    setVisible(false);
  }

  function rejectNonEssential() {
    setCookie('cookie_consent', 'essential', 365);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E5E5E5] bg-white px-4 py-4 shadow-lg sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#525252]">
          We use cookies to operate the platform, analyse usage, and improve your experience.{' '}
          <Link
            href={`/${locale}/legal/cookies`}
            className="underline transition-colors hover:text-[#0A0A0A]"
          >
            Manage preferences
          </Link>
        </p>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            onClick={rejectNonEssential}
            className="rounded-md border border-[#E5E5E5] px-4 py-2 text-sm text-[#525252] transition-colors hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
          >
            Reject non-essential
          </button>
          <button
            onClick={acceptAll}
            className="rounded-md bg-[#FFD600] px-4 py-2 text-sm font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
