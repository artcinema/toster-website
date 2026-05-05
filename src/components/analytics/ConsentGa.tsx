'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

// Only loads GA4 after the user has accepted analytics cookies.
// Consent is stored by the cookie banner in localStorage key 'toster_analytics_consent'.
export function ConsentGa({ gaId }: { gaId: string }) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => setConsented(localStorage.getItem('toster_analytics_consent') === 'true');
    check();
    window.addEventListener('toster:consent', check);
    return () => window.removeEventListener('toster:consent', check);
  }, []);

  if (!consented) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
