# Task: оптимизация toster.co под генеративный AI-поиск Google

Бриф для Claude Code. Цель — привести маркетинговый сайт в соответствие с официальным гайдом Google [«Optimizing your website for generative AI features on Google Search»](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) (AI Overviews / AI Mode), внести правки в код, проверить и задеплоить.

Репозиторий: `artcinema/toster-website` · Next.js 16 (App Router) + next-intl · прод на Vercel (автодеплой по push).

---

## Контекст: что УЖЕ хорошо (не трогать)

Сайт уже сильно оптимизирован, ничего из этого переделывать не нужно:

- `Organization`, `SoftwareApplication`, `WebSite` JSON-LD — в `src/app/[locale]/layout.tsx`.
- `Article` + `BreadcrumbList` JSON-LD — в `src/app/[locale]/blog/[slug]/page.tsx`.
- hreflang (en/uk/ru/pl/cs/de/es + `x-default`), canonical, OpenGraph/Twitter, robots — в `generateMetadata`.
- `robots.txt` явно разрешает GPTBot, ClaudeBot, PerplexityBot, Gemini, GoogleOther; sitemap есть.

По гайду Google отдельные «AEO/GEO-хаки» не нужны: **не добавлять** llms.txt, не «чанкать» контент, не переписывать текст «под роботов», не плодить страницы под query fan-out.

---

## Что нужно сделать (3 правки в коде)

> Если в репозитории уже есть ветка `feat/seo-ai-search` с коммитом `64a04f1` — эти 3 правки **уже внесены**, переходи сразу к разделу «Проверка» и «Деплой». Иначе примени изменения ниже.

### Правка 1 — FAQPage JSON-LD на главной

Файл: `src/app/[locale]/page.tsx` (клиентский компонент `HomePage`).

На главной есть FAQ-аккордеон, но схемы `FAQPage` нет. Строим её из тех же переведённых `faqItems`, что уже рендерятся, — тогда текст в схеме всегда совпадает с видимым.

1.1. Добавить импорт рядом с остальными импортами компонентов:

```ts
import { JsonLd } from '@/components/JsonLd';
```

1.2. Внутри `HomePage`, после строки `const aiIcons = [Mic, Bot, Users, Brain];` и перед `return (`, добавить:

```ts
// FAQPage structured data — built from the same translated FAQ items rendered
// below, so the answer text Google's AI sees is identical to the visible copy.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};
```

1.3. Сразу после открывающего `<>` в `return` добавить:

```tsx
<JsonLd data={faqSchema} />
```

### Правка 2 — текстовый эквивалент для таблицы сравнения

Файл: `src/app/[locale]/page.tsx`, компонент `ComparisonIcon`.

Сейчас ячейки таблицы «How Toster compares» рисуются только SVG-иконками (`Check`/`X`/`AlertTriangle`) без текста — RAG-движок Google и скринридеры не понимают, у кого какая фича. Добавляем `sr-only` текст и `aria-hidden` на иконки.

Заменить функцию целиком на:

```tsx
function ComparisonIcon({ value }: { value: string }) {
  // Render an icon for the human eye, but always keep a text equivalent in the
  // DOM (sr-only) so screen readers and Google's generative-AI systems can read
  // which product supports which feature from the comparison matrix.
  if (value === '✅')
    return (
      <>
        <Check aria-hidden className="mx-auto h-5 w-5 text-emerald-500" />
        <span className="sr-only">Yes</span>
      </>
    );
  if (value === '❌')
    return (
      <>
        <X aria-hidden className="mx-auto h-5 w-5 text-red-400" />
        <span className="sr-only">No</span>
      </>
    );
  if (value === '⚠️')
    return (
      <>
        <AlertTriangle aria-hidden className="mx-auto h-5 w-5 text-amber-400" />
        <span className="sr-only">Partial</span>
      </>
    );
  return <span className="text-xs text-[#A3A3A3]">{value}</span>;
}
```

### Правка 3 — фикс невалидной схемы цены

Файл: `src/app/[locale]/layout.tsx`, объект `softwareSchema`.

Было `priceCurrency: 'PERCENT'` — это не ISO-код валюты, Rich Results Test выдаёт ошибку. Заменить блок `offers` на корректный массив `Offer`:

```ts
  offers: [
    {
      '@type': 'Offer',
      name: 'Start',
      price: '250',
      priceCurrency: 'EUR',
      url: 'https://toster.co/en/pricing',
      description: 'Fixed €250/month — SEO-optimized website, iOS & Android apps, and AI-powered CRM.',
    },
    {
      '@type': 'Offer',
      name: 'Starter',
      priceCurrency: 'EUR',
      url: 'https://toster.co/en/pricing',
      description: '3% of monthly turnover. Single location. Core CRM — orders, kitchen, couriers.',
    },
    {
      '@type': 'Offer',
      name: 'Growth',
      priceCurrency: 'EUR',
      url: 'https://toster.co/en/pricing',
      description: '5–7% of monthly turnover. Multi-location chain with managed marketing, AI automation, and loyalty.',
    },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      priceCurrency: 'EUR',
      url: 'https://toster.co/en/pricing',
      description: 'Up to 9% of monthly turnover. White-glove setup, custom integrations, fiscalization, dedicated support.',
    },
  ],
```

---

## Опциональные улучшения (по желанию)

Низкий приоритет, можно включить в этот же PR или отдельно:

1. **Автор-человек в Article-схеме блога** (`src/app/[locale]/blog/[slug]/page.tsx` + `src/data/posts.ts`). Сейчас `author` = организация. По гайду Google «first-hand experience» усиливает видимость. Если у постов есть реальные авторы — добавить поле `author` в `posts.ts` и проставить `{ '@type': 'Person', name, url }` в `articleSchema`. **Не выдумывать** имена — только реальные.

2. **`dateModified` из даты обновления поста.** Сейчас `dateModified` = `post.date`. Если в `posts.ts` есть/появится поле `updated`, использовать его: `dateModified: post.updated ?? post.date`.

3. **FAQ-аккордеон: текст в DOM при свёрнутом состоянии.** Radix `Accordion.Content` размонтирует свёрнутый контент. Это НЕ обязательно (Правка 1 уже отдаёт Google текст ответов через JSON-LD), и `forceMount` рискует сломать CSS-анимацию — делать только осознанно, с проверкой визуала.

---

## Проверка

```bash
npm run lint          # должно быть 0 errors (допустим pre-existing warning про siteConfig)
npx tsc --noEmit      # игнорировать устаревшие ошибки в .next/types/* — это кэш, не наши файлы;
                      # при необходимости: rm -rf .next && npx tsc --noEmit
```

После деплоя — прогнать главную и один пост блога через:
- Rich Results Test: https://search.google.com/test/rich-results — на главной должны определиться **FAQPage** и **SoftwareApplication**, без ошибок по `Offer`.
- Schema validator: https://validator.schema.org/

---

## Коммит и деплой

Изменения — ровно 2 файла (`src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`).

```bash
# чистая ветка от main (если ещё не создана)
git checkout -b feat/seo-ai-search origin/main

git add "src/app/[locale]/layout.tsx" "src/app/[locale]/page.tsx"
git commit -m "feat(seo): FAQPage schema, a11y text for comparison table, fix Offer currency

- Add FAQPage JSON-LD on the homepage, built from the same translated
  faq.items rendered in the UI so schema and visible copy stay in sync.
- ComparisonIcon keeps an sr-only Yes/No/Partial text equivalent so screen
  readers and Google's generative-AI systems can read the comparison matrix.
- Fix invalid SoftwareApplication Offer (priceCurrency 'PERCENT' -> EUR list)
  so it passes the Rich Results Test.

Per Google's generative-AI search optimization guide."

git push -u origin feat/seo-ai-search
```

Деплой на Vercel:
- Push ветки → Vercel соберёт **preview-деплой** (публичная ссылка появится в PR/в дашборде Vercel).
- Открыть PR в `main`; после прохождения CI (lint + tsc + build + Lighthouse) — мердж в `main` = **продакшн-деплой**.
- Прямой путь в прод (если есть права и нет branch protection):
  ```bash
  git checkout main && git merge feat/seo-ai-search && git push origin main
  ```

После того как прод обновится — повторить проверку через Rich Results Test на боевом URL.

---

## Definition of Done

- [ ] 3 правки в коде применены, `npm run lint` без ошибок.
- [ ] `FAQPage` и `SoftwareApplication` валидны в Rich Results Test, ошибок по `Offer` нет.
- [ ] Ветка запушена, PR в `main` открыт (или смерджен), Vercel-деплой прошёл.
- [ ] (опц.) Решено по автору-человеку в Article-схеме.
