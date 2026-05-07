'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Minimal client wrapper that adds scroll-shadow to the sticky header.
 * All actual nav content is rendered server-side in Header.tsx.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow duration-200',
        scrolled ? 'border-[#E5E5E5] shadow-sm' : 'border-transparent',
      )}
    >
      {children}
    </header>
  );
}
