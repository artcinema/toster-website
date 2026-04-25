'use client';

import * as React from 'react';
import { siteConfig } from '@/config/site';

async function startDemo() {
  const res = await fetch(`${siteConfig.apiUrl}/auth/demo`, { method: 'POST' });
  if (!res.ok) throw new Error('demo_unavailable');
  const { accessToken } = await res.json();
  window.location.href = `${siteConfig.appUrl}?token=${encodeURIComponent(accessToken)}`;
}

interface DemoButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: React.ReactNode;
}

export function DemoButton({ children, disabled, className, ...rest }: DemoButtonProps) {
  const [loading, setLoading] = React.useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await startDemo();
    } catch {
      window.location.href = siteConfig.appUrl;
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      {...rest}
      onClick={handleClick}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? '…' : children}
    </button>
  );
}
