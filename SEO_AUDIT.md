# SEO Audit — toster.co
**Date:** 2026-05-07  
**Auditor:** Claude Code  
**SEO Maturity Score: 72 / 100**

Strong foundation with correct canonical/hreflang setup on root pages, complete JSON-LD schemas, and good technical hygiene. Key gaps: robots.txt conflict, 307 redirect leaking PageRank, missing hreflang propagation to sub-page layouts, and two pages absent from sitemap.

---

## Executive Summary

### Top 5 Critical Problems
1. **Cloudflare overrides robots.txt** — injected `Disallow: /` for ClaudeBot, GPTBot, Google-Extended before our app's Allow rules. App intent (allow LLM crawlers) is being silently reversed.
2. **Root / redirects 307 (temporary)** — Google will not pass PageRank and re-crawls on every visit. Must be 308.
3. **Sub-page layouts have no hreflang** — `/en/pricing`, `/en/features`, etc. have `alternates: { canonical }` only. Child layout `alternates` replaces parent in Next.js App Router, so all language variants are invisible to Google.
4. **Two pages missing from sitemap** — `/en/for-single-location` and `/en/api` exist in the filesystem but are not indexed.
5. **Homepage is 100% `use client`** — 500+ line component ships full React tree to the browser; blocks Core Web Vitals and prevents server-rendered structured data placement.

### Top 5 Quick Wins (< 1h each)
1. Add `localeDetection: false` to `src/i18n/routing.ts` — fixes 307 → 308 in 5 minutes.
2. Add `cyrillic` + `cyrillic-ext` to Geist font subsets — prevents system font fallback on uk/ru pages.
3. Remove locale-less URLs from `sitemap.ts` (the trailing `entries.push({ url: BASE + ... })` blocks).
4. Add `for-single-location` and `api` to the `routes` array in `sitemap.ts`.
5. Delete the bogus `SearchAction` target from `[locale]/layout.tsx` WebSite JSON-LD.

---

## Issues

### CRITICAL

---

#### Issue 1 — robots.txt conflict (Cloudflare injection)
**Severity:** CRITICAL | **Effort:** 1h

**What's happening:** `https://toster.co/robots.txt` is NOT served from `src/app/robots.ts`. Cloudflare's Managed Content prepends its own rules:

```
User-agent: ClaudeBot
Disallow: /          ← Cloudflare

User-agent: GPTBot
Disallow: /          ← Cloudflare

User-agent: Google-Extended
Disallow: /          ← Cloudflare

# ... then our app's output follows:
User-agent: GPTBot
Allow: /             ← app (comes too late)
```

Per RFC, the first matching rule wins. Cloudflare's `Disallow: /` for GPTBot, ClaudeBot, Google-Extended takes precedence over our `Allow: /`.

**Fix:** Cloudflare Dashboard → Security → Bots → Managed Rules → disable "Managed robots.txt content injection". Verify with `curl -sI https://toster.co/robots.txt` after saving.

---

#### Issue 2 — Root URL returns 307 Temporary redirect
**Severity:** CRITICAL | **Effort:** 30 min  
**File:** `src/i18n/routing.ts`

`curl -sI https://toster.co/` → `HTTP/2 307 location: /en`

A 307 is explicitly temporary — Google does not transfer PageRank and re-checks the redirect on every crawl cycle. Caused by next-intl locale detection issuing a content-negotiated redirect.

**Fix:** Add `localeDetection: false` to `defineRouting`:

```ts
// src/i18n/routing.ts
export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: false,   // <-- add this
});
```

With detection disabled, the redirect to `/en` is deterministic and Next.js will issue a 308.

---

### HIGH

---

#### Issue 3 — Sitemap contains locale-less URLs that redirect
**Severity:** HIGH | **Effort:** 30 min  
**File:** `src/app/sitemap.ts`

`sitemap.ts` pushes entries for `https://toster.co/`, `https://toster.co/features`, etc. (without locale prefix). These URLs 307-redirect to `/en/...`. Google's sitemap parser sees a redirect and wastes crawl budget; the entries provide no indexing value.

**Fix:** Delete the `entries.push({ url: BASE + route.path })` block at the end of the routes loop, and the equivalent block for blog posts. Only locale-prefixed URLs (already generated correctly for all 7 locales) should remain.

---

#### Issue 4 — Two pages missing from sitemap
**Severity:** HIGH | **Effort:** 30 min  
**File:** `src/app/sitemap.ts`

Pages present in the codebase but absent from the `routes` array:
- `src/app/[locale]/for-single-location/page.tsx`
- `src/app/[locale]/api/page.tsx`

**Fix:** Add to the `routes` const in `sitemap.ts`:

```ts
{ path: '/for-single-location', priority: 0.7 },
{ path: '/api', priority: 0.6 },
```

---

#### Issue 5 — Sub-page layouts missing hreflang alternates
**Severity:** HIGH | **Effort:** 2h  
**Files:** `src/app/[locale]/pricing/layout.tsx`, `src/app/[locale]/features/layout.tsx`, and other sub-layouts

Sub-page layouts only set:
```ts
alternates: { canonical: url }
```

In Next.js App Router, a child layout's `generateMetadata` output **replaces** (not merges with) the parent's `alternates`. So `/en/pricing` renders no `<link rel="alternate" hreflang="...">` tags at all.

**Fix:** Create a shared helper and apply it to every sub-layout:

```ts
// src/lib/seo.ts
const LOCALES = ['en', 'ru', 'uk', 'pl', 'cs', 'de', 'es'] as const;

export function buildAlternates(path: string) {
  const languages = Object.fromEntries(
    LOCALES.map(l => [l, `https://toster.co/${l}${path}`])
  ) as Record<string, string>;
  languages['x-default'] = `https://toster.co/en${path}`;
  return { canonical: `https://toster.co/en${path}`, languages };
}

// Usage in pricing/layout.tsx:
alternates: buildAlternates('/pricing')
```

Apply to all sub-layouts: pricing, features, about, ai, blog, integrations, for-single-location, api.

---

#### Issue 6 — Sub-page metadata hardcoded in English for all 7 locales
**Severity:** HIGH | **Effort:** 3h  
**Files:** `src/app/[locale]/pricing/layout.tsx`, `src/app/[locale]/features/layout.tsx`

Current (same string for all locales):
- Pricing: `'Pricing — Start at €250/mo or 3–9% of Turnover'`
- Features: `'Features — Orders, Kitchen, Delivery, CRM, AI & More'`

**Fix:** Follow the same pattern as `[locale]/layout.tsx` — define a `Record<Locale, string>` map for titles and descriptions, then index by the `locale` param from `generateMetadata`:

```ts
const titles: Record<Locale, string> = {
  en: 'Pricing — Start at €250/mo or 3–9% of Turnover',
  uk: 'Ціни — від €250/міс або 3–9% обороту',
  ru: 'Тарифы — от €250/мес или 3–9% оборота',
  pl: 'Cennik — od €250/mies. lub 3–9% obrotu',
  // ...
};
```

---

#### Issue 7 — Homepage is entirely `use client`
**Severity:** HIGH | **Effort:** 4h  
**File:** `src/app/[locale]/page.tsx`

`'use client'` at line 1 forces the entire 500+ line component (Kanban mockup, FAQ, comparison table, all sections) to hydrate client-side. This inflates JS bundle size, hurts LCP, and prevents server-rendered JSON-LD placement.

Only two sections actually require client JavaScript:
- `KanbanMockup` — framer-motion animations
- FAQ Accordion — Radix UI, needs open/close state

**Fix:** Remove `'use client'` from `page.tsx`. Extract the two interactive pieces:

```
src/components/home/KanbanMockup.client.tsx  ← 'use client'
src/components/home/FaqAccordion.client.tsx  ← 'use client'
```

Import them in the now-server `page.tsx`. All other sections (problem/solution, features, how-it-works, comparison table, testimonials) render as Server Components.

---

#### Issue 8 — FAQPage JSON-LD missing
**Severity:** HIGH | **Effort:** 1h  
**File:** `src/app/[locale]/page.tsx`

The homepage FAQ section (5+ Q&A items via Radix Accordion) has no `FAQPage` schema.org JSON-LD. This is a direct missed opportunity for FAQ rich snippets in Google Search.

**Fix:** Add a server component `<FaqSchema />` that renders the JSON-LD. Because FAQ content is in i18n messages, read it server-side via `getTranslations`:

```tsx
// src/components/home/FaqSchema.tsx  (server component, no 'use client')
export async function FaqSchema({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'FAQ' });
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_KEYS.map(k => ({
      '@type': 'Question',
      name: t(`${k}.question`),
      acceptedAnswer: { '@type': 'Answer', text: t(`${k}.answer`) },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

Include `<FaqSchema locale={locale} />` in `page.tsx` before the closing `</main>`.

---

### MEDIUM

---

#### Issue 9 — `lastModified: new Date()` on static routes
**Severity:** MEDIUM | **Effort:** 1h  
**File:** `src/app/sitemap.ts`

Every static route gets `lastModified: new Date()`, which changes on every build. Google uses this signal for recrawl scheduling; a constantly-changing date makes it meaningless and wastes crawl budget.

**Fix:** Use fixed ISO strings per route (actual last content-edit date). Blog posts using `new Date(post.date)` is already correct — apply the same logic to static routes:

```ts
{ path: '/pricing', lastModified: '2026-03-15', priority: 0.9 },
```

---

#### Issue 10 — WebSite JSON-LD SearchAction points to wrong URL
**Severity:** MEDIUM | **Effort:** 30 min  
**File:** `src/app/[locale]/layout.tsx`

Current:
```ts
target: { '@type': 'EntryPoint', urlTemplate: 'https://toster.co/en/features' }
```

A `SearchAction` requires a `{search_term_string}` URL template (e.g., `https://toster.co/en/search?q={search_term_string}`). Pointing to `/en/features` is semantically invalid and will generate Google Search Console warnings.

**Fix:** Either implement real sitewide search and update the template, or remove the `SearchAction` block entirely from the WebSite schema. Do not leave a fake target.

---

#### Issue 11 — Cyrillic font subsets missing
**Severity:** MEDIUM | **Effort:** 15 min  
**File:** `src/app/[locale]/layout.tsx`

```ts
const geist = Geist({ subsets: ['latin', 'latin-ext'] })
```

Ukrainian (`uk`) and Russian (`ru`) pages contain Cyrillic text that has no matching subset. The browser falls back to a system font, causing potential CLS and visual inconsistency.

**Fix:**
```ts
const geist = Geist({ subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'] })
```

---

#### Issue 12 — Geist Mono loaded on every page
**Severity:** MEDIUM | **Effort:** 30 min  
**File:** `src/app/[locale]/layout.tsx`

`Geist_Mono` is initialized globally, adding font download overhead to pages that have no monospace content.

**Fix:** Remove `Geist_Mono` from the locale layout. Import and apply it only in layouts or pages that render code blocks (e.g., the `/api` docs page).

---

#### Issue 13 — CSP allows `unsafe-eval`
**Severity:** MEDIUM | **Effort:** 2h  
**File:** `next.config.ts`

```
script-src 'self' 'unsafe-inline' 'unsafe-eval' ...
```

`unsafe-eval` enables `eval()` and `new Function()`, deducted by Lighthouse security scoring and flagged by browser security tools.

**Fix:** Audit which dependency requires `unsafe-eval` (likely Framer Motion dev mode or a bundled polyfill). Options:
- Upgrade Framer Motion (v11+ supports CSP nonces natively).
- Replace `unsafe-eval` with a per-request nonce via Next.js middleware.

---

### LOW

---

#### Issue 14 — Non-EN title tags are shorter than optimal
**Severity:** LOW | **Effort:** 1h  
**File:** `src/app/[locale]/layout.tsx`

| Locale | Title | Length |
|--------|-------|--------|
| en | Toster — Food Delivery Chain Management Platform | 48 |
| uk | Toster — CRM для мережі доставки їжі | 36 (too short) |
| de | Toster — CRM für Lebensmittel-Lieferketten | 42 (could improve) |

Optimal range is 50–60 characters. Non-EN titles lose keyword density by omitting the value proposition.

**Fix:** Extend uk/de/pl/cs/es titles to include the main value prop, e.g.:  
`uk: "Toster — CRM для мережі доставки їжі | Автоматизація"`

---

#### Issue 15 — Testimonials section hardcoded in English
**Severity:** LOW | **Effort:** 1h  
**File:** `src/app/[locale]/page.tsx`

"Priority onboarding", "Direct founder access", "Founding price" cards and their descriptions are hardcoded English strings, never passed through `useTranslations`. Visible on all 7 locale pages in English.

**Fix:** Move these strings to the i18n message files under a `Testimonials` namespace and replace hardcoded JSX with `t('Testimonials.priorityOnboarding')` etc.

---

#### Issue 16 — Social proof logos are styled divs, no alt text
**Severity:** LOW | **Effort:** 1h

Bolt Food, Glovo, Wolt, DoorDash, Uber Eats, Just Eat are rendered as colored dots + text in `<div>` elements. Not critical for SEO but affects perceived quality and misses image-alt link equity if replaced with real SVG logos.

**Fix:** Replace with `<Image>` components (SVG or WebP) with descriptive `alt` attributes.

---

## What's Already Excellent

- 3 JSON-LD schemas on every page: Organization, SoftwareApplication, WebSite
- `metadataBase` set correctly in locale layout
- 8 hreflang tags on root/locale pages including `x-default → en`
- Canonical URLs correct per locale
- Full OG + Twitter Card metadata
- HSTS, X-Frame-Options, X-Content-Type-Options headers
- `images.formats: ['image/avif', 'image/webp']`
- `next/font` with `display: 'swap'`
- Single H1 per page, properly translated
- `<html lang={locale}>` correct
- `<main id="main-content">` for accessibility
- LLM crawlers explicitly allowed in `robots.ts` (ClaudeBot, GPTBot, etc.)
- `www → toster.co` redirect in `next.config.ts`
- `compress: true` in `next.config.ts`
- `optimizePackageImports` for framer-motion, lucide-react
- Sitemap covers all 7 locales x all routes with alternates
- Blog posts and integrations pages in sitemap with proper dates

---

## Action Plan

### Phase 1 — Critical (Week 1, ~8h)

- [ ] **1. Fix Cloudflare robots.txt injection** (1h) — Dashboard → Security → Bots → Managed Rules → disable managed robots.txt. Verify with `curl -s https://toster.co/robots.txt`.
- [ ] **2. Fix 307 → 308 redirect** (30 min) — Add `localeDetection: false` to `src/i18n/routing.ts`. Confirm with `curl -sI https://toster.co/`.
- [ ] **3. Remove locale-less sitemap entries** (30 min) — Delete trailing `entries.push({ url: BASE + route.path })` blocks in `src/app/sitemap.ts`.
- [ ] **4. Add missing pages to sitemap** (30 min) — Add `for-single-location` and `api` to the `routes` array in `src/app/sitemap.ts`.
- [ ] **5. Add hreflang to all sub-page layouts** (2h) — Create `src/lib/seo.ts` with `buildAlternates(path)` helper; apply to pricing, features, about, ai, blog, integrations, for-single-location, api layouts.
- [ ] **6. Add Cyrillic font subsets** (15 min) — `subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext']` in `src/app/[locale]/layout.tsx`.

### Phase 2 — High Impact (Week 2–3, ~12h)

- [ ] **7. Localize sub-page metadata** (3h) — Add `Record<Locale, string>` title/description maps to pricing, features, and other sub-layouts.
- [ ] **8. Split homepage into server/client components** (4h) — Remove `'use client'` from `src/app/[locale]/page.tsx`; extract `KanbanMockup.client.tsx` and `FaqAccordion.client.tsx`.
- [ ] **9. Add FAQPage JSON-LD** (1h) — Create `src/components/home/FaqSchema.tsx` (server component); include in homepage `page.tsx`.
- [ ] **10. Fix WebSite SearchAction** (30 min) — Remove invalid `/en/features` target from WebSite JSON-LD in `src/app/[locale]/layout.tsx`, or implement real search.
- [ ] **11. Fix sitemap lastModified** (1h) — Replace `new Date()` with fixed ISO date strings per static route in `src/app/sitemap.ts`.
- [ ] **12. Remove Geist Mono from global layout** (30 min) — Delete `Geist_Mono` initialization from `src/app/[locale]/layout.tsx`; move to pages that need it.

### Phase 3 — Polish (Week 4+, ~6h)

- [ ] **13. Fix CSP `unsafe-eval`** (2h) — Audit dependency requiring it in `next.config.ts`; replace with nonce-based CSP via Next.js middleware.
- [ ] **14. Extend non-EN title lengths** (1h) — Improve uk, de, pl, cs, es titles to 50–60 chars in `src/app/[locale]/layout.tsx`.
- [ ] **15. Translate Testimonials section** (1h) — Move hardcoded strings to i18n messages in `src/app/[locale]/page.tsx`.
- [ ] **16. Add BreadcrumbList JSON-LD** — For `/en/features`, `/en/pricing`, `/en/blog/*` and other sub-pages.
- [ ] **17. Set up Lighthouse CI** — GitHub Action: Performance ≥ 85, SEO ≥ 95 on every PR.

---

*Generated by Claude Code — toster-website audit — 2026-05-07*
