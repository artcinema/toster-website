# Toster.co — полный SEO-аудит и ТЗ на вывод в топ Google

Документ для исполнителя (SEO-специалист + разработчик + контент). Цель — системно вывести toster.co в топ Google по целевым запросам в приоритетных рынках (EN/UA/PL/CZ/DE/ES). Аудит сделан по живому коду репозитория `artcinema/toster-website` (Next.js 16 App Router + next-intl, прод на Vercel) и по гайдам Google Search (включая [generative-AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

Дата: 13 июня 2026.

---

## 0. Честная рамка по «топ‑1»

«Топ‑1 по нужным запросам» — это не одна правка, а программа на 3–9 месяцев. Важно разделять запросы по сложности:

- **Реалистично занять топ за 1–3 мес:** низкочастотные и bottom-funnel запросы, сравнения, локализованные запросы, брендовые (`toster`, `toster crm`), и часть длинного хвоста, где у конкурентов слабый контент.
- **Реалистично за 3–6 мес:** среднечастотные тематические («kitchen display system for delivery», «ghost kitchen software EU», «Deliverect alternative»).
- **Сложно и долго (6–12+ мес):** широкие head-термины («food delivery CRM», «restaurant management software») — там сидят домены с огромным авторитетом (Deliverect, Otter, Toast, iiko). Туда идём после набора топикального авторитета и ссылок.

Стратегия: **сначала выигрываем хвост, сравнения и локаль → набираем топикальный авторитет и ссылки → потом давим head-термины.** Ниже — что для этого нужно, по приоритетам.

---

## 1. Карта целевых запросов (keyword map)

Сгруппировано по воронке и привязано к страницам. `[NEW]` — страницы, которых ещё нет и которые нужно создать.

### 1.1. Коммерческие / bottom-funnel (высший приоритет — конверсия + реальный шанс топа)

| Кластер запросов | Целевая страница | Статус |
|---|---|---|
| food delivery CRM / delivery chain CRM | `/` + `/food-delivery` | есть |
| ghost kitchen software / dark kitchen software EU | `/for-chains` или `[NEW] /ghost-kitchen-software` | усилить |
| multi-location food delivery software | `/for-chains` | есть |
| single location delivery software / restaurant | `/for-single-location` | **есть, но вне sitemap и без метаданных — фактически невидима** |
| kitchen display system (KDS) software | `[NEW] /kitchen-display-system` (landing, не только блог) | нет |
| courier management / dispatch software | `[NEW] /courier-management` | нет |
| AI voice operator for restaurants / food delivery | `/ai` | есть |

### 1.2. Сравнения / alternative (очень высокий ROI, низкая конкуренция)

| Запрос | Страница | Статус |
|---|---|---|
| toster vs poster pos | `/vs/poster-pos` | есть |
| Deliverect alternative / toster vs deliverect | `[NEW] /vs/deliverect` | нет (есть только в блоге) |
| iiko alternative / toster vs iiko | `[NEW] /vs/iiko` | нет |
| toster vs grubtech, vs flipdish, vs vita mojo | `[NEW] /vs/*` | нет |
| best CRM for dark kitchens EU | блог (есть) → усилить и перелинковать | частично |

### 1.3. Информационные / topical authority (питают AI Overviews и хвост)

Блог уже силён — **25 статей**, операторский тон. Это главный актив. Расширять кластерами (см. раздел 6).

### 1.4. Локализованные (UA/PL/CZ/DE/ES) — отдельный приоритет

Запросы вида: `система доставки еды CRM` (RU/UA), `oprogramowanie dla dostaw jedzenia` (PL), `software pro rozvoz jídla` (CZ), `Lieferdienst Software` (DE), `software para delivery de comida` (ES). У сайта есть 7 локалей и hreflang — но **тела статей блога не переведены** (см. раздел 5.3), что обнуляет часть локального потенциала.

> ⚠️ Подтвердите у заказчика приоритет рынков и 10–15 «денежных» запросов на каждый — финальный keyword map калибруется под GSC/реальный спрос. Ниже структура работает независимо от калибровки.

---

## 2. Текущее состояние: что уже хорошо (НЕ трогать)

Сайт технически зрелый, многое сделано правильно:

- **Метаданные:** `generateMetadata` с уникальными title/description, OG/Twitter, canonical на большинстве ключевых страниц.
- **hreflang:** 7 локалей + `x-default` в `[locale]/layout.tsx` и в `sitemap.ts`.
- **Structured data:** `Organization`, `SoftwareApplication`, `WebSite` (site-wide), `Article` + `BreadcrumbList` (блог), `FAQPage` (главная — добавлена). См. `src/components/JsonLd.tsx`.
- **robots.ts:** открыт для Googlebot и явно для AI-ботов (GPTBot, ClaudeBot, PerplexityBot, Gemini) — правильно.
- **sitemap.ts:** генерится динамически, включает локали, alternates, блог (25) и интеграции (7).
- **Контент:** 25 статей блога с реальной операторской экспертизой — это сильный сигнал E-E-A-T и топикального авторитета.
- **Перф-инфраструктура:** настроен Lighthouse CI (`.lighthouserc.js`), Vercel Speed Insights.

---

## 3. Аудит: найденные проблемы (приоритизировано)

Каждая проблема — с привязкой к файлу и влиянием на ранжирование.

### P0 — критично для индексации/охвата

| # | Проблема | Где | Влияние |
|---|---|---|---|
| 3.1 | `for-single-location` **отсутствует в `sitemap.ts`** и **без уникальных метаданных** | `src/app/sitemap.ts`, `src/app/[locale]/for-single-location/` | Целая коммерческая landing невидима для Google. |
| 3.2 | Страницы без уникальных метаданных: `security`, `request-demo`, `for-single-location`, `api` | `src/app/[locale]/{security,request-demo,for-single-location,api}/` | Дублирующийся title по шаблону, слабый сниппет, потеря релевантности. |
| 3.3 | Тела статей блога **не локализованы** — один английский `content` под всеми локалями | `src/data/posts.ts` (поле `content`), `blog/[slug]` рендерит его для всех locale | `/pl/blog/...`, `/de/blog/...` отдают английский текст под hreflang-равенством → почти-дубли, слабый локальный рейтинг. |

### P1 — упущенный потенциал ранжирования

| # | Проблема | Где | Влияние |
|---|---|---|---|
| 3.4 | Только **1 страница `/vs/`** (poster-pos) | `src/app/[locale]/vs/` | Высокоинтентные запросы «X alternative / vs» не покрыты отдельными страницами. |
| 3.5 | Нет посадочных под KDS, courier management, ghost kitchen как **продуктовых** (есть только блог) | — | Коммерческий интент уходит в информационную статью вместо конверсионной страницы. |
| 3.6 | У `Post` нет полей `author` и `updated` → нет автора-человека и `dateModified` | `src/data/posts.ts`, `blog/[slug]/page.tsx` | Слабее E-E-A-T и сигнал свежести; `dateModified` сейчас = дате публикации. |
| 3.7 | Почти нет реальных изображений (`next/image` в 2 файлах, 0 `<img>`) | весь `src` | Нет картинок в Google Images и AI Overviews; меньше вовлечённости и rich-результатов. |

### P2 — гигиена и доводка

| # | Проблема | Где | Влияние |
|---|---|---|---|
| 3.8 | `sitemap.ts`: `lastModified: new Date()` для всех статических роутов | `src/app/sitemap.ts` | «Фейковая» свежесть, Google может игнорировать lastmod. |
| 3.9 | В sitemap дублируются не-локализованные URL, которые редиректят на `/en` | `src/app/sitemap.ts` | В sitemap желательны только 200-URL (canonical). |
| 3.10 | Мало интеграционных страниц (4: liqpay, stripe, sendpulse, telegram) | `src/data/integrations.ts` | Аггрегаторы (Glovo, Bolt Food, Wolt, Uber Eats) — частотные запросы «X integration» не покрыты. |
| 3.11 | `meta-keywords` присутствует (Google игнорирует) | `[locale]/layout.tsx` | Безвредно; можно убрать для чистоты. |

---

## 4. ТЗ: технический SEO

### 4.1. Закрыть метаданные на всех индексируемых страницах `[P0 — 3.2]`
Добавить `generateMetadata` (по образцу `features/layout.tsx`) для `security`, `request-demo`, `for-single-location`, `api`. Для каждой: уникальные `title` (≤60 симв., с целевым ключом), `description` (≤155 симв., с выгодой и CTA), `alternates.canonical`, `openGraph`. Для `request-demo` допустимо `robots: { index: true }` но без агрессивной оптимизации; `api` — если это dev-портал, оценить нужность индексации.

**Acceptance:** у каждой страницы уникальный title/description; проверка `curl`-ом или в GSC → нет «Duplicate title».

### 4.2. Вернуть `for-single-location` в индекс `[P0 — 3.1]`
- Добавить роут в массив `routes` в `src/app/sitemap.ts` (`priority: 0.8, changeFreq: 'monthly'`).
- Добавить `generateMetadata` (см. 4.1) с таргетом на «single location food delivery software / для одной точки».
- Добавить внутренние ссылки на неё с `/pricing` (план Starter) и `/for-chains`.

### 4.3. Sitemap: честный lastModified и только canonical-URL `[P2 — 3.8, 3.9]`
- Для статических роутов хранить реальную дату последнего изменения (хотя бы захардкодить дату релиза/обновления страницы, а не `new Date()`).
- Убрать из sitemap не-локализованные редиректящие URL, либо оставить только если они отдают 200.

### 4.4. Канонизация и редиректы
- Проверить, что `https://toster.co/<path>` 301-редиректит на `/en/<path>` (или на язык по гео) единообразно, без цепочек редиректов.
- Убедиться, что только один canonical-вариант (с/без www, http→https, со/без слэша) отдаёт 200.

### 4.5. Core Web Vitals `[P1]`
- Прогнать `npm run audit:lighthouse` и [PageSpeed Insights](https://pagespeed.web.dev) для: `/`, `/food-delivery`, `/features`, `/pricing`, `/blog`, топ-3 статьи.
- Цели (mobile): LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Частые точки роста для этого стека: вес `framer-motion` (грузить анимации только на интеракции/в вьюпорте), `react-simple-maps` на `/for-chains` (ленивый импорт), шрифты Geist (уже `display: swap` — ок), приоритет LCP-изображения hero.

### 4.6. Изображения и Image SEO `[P1 — 3.7]`
- Ввести реальные изображения на ключевых страницах: скриншоты CRM/KDS/курьерской карты, диаграммы. Только `next/image`, с осмысленным `alt` (с ключом, но естественно), правильными размерами, `priority` для LCP.
- Добавить изображения в статьи блога (минимум 1 значимое на статью) — это открывает Google Images и усиливает AI Overviews.

### 4.7. Внутренняя перелинковка
- С денежных страниц — контекстные ссылки на релевантные статьи блога и наоборот (anchor с ключом, естественно).
- Хлебные крошки (`BreadcrumbList`) уже есть в блоге — добавить визуальные крошки и schema на `/vs/*`, `/integrations/*`, продуктовые лендинги.
- Каждая новая статья должна ссылаться на 2–3 коммерческие страницы и 3–5 связанных статей (кластеры).

---

## 5. ТЗ: on-page и интернационализация

### 5.1. Один H1 с целевым ключом на странице
Проверить, что на каждой странице ровно один `<h1>` и он содержит целевой запрос естественно. Сейчас h1 берётся из `t('hero.title')` — выверить формулировки в `src/messages/*.json` под keyword map (раздел 1), но без переспама.

### 5.2. Структура контента под AI Overviews и featured snippets
- На каждой коммерческой странице — короткое определяющее предложение в начале («**Kitchen display system (KDS)** — это…»), затем разделы с H2/H3. Не «чанковать» искусственно (запрещено гайдом), но давать ёмкие дефиниции — их любят AI Overviews.
- Где уместно — блоки FAQ с `FAQPage` schema (как на главной), вопросы из реального поиска (People Also Ask).

### 5.3. Локализация тел статей блога `[P0 — 3.3]`
Сейчас `posts.ts` хранит один английский `content`. Варианты:
- **(а) Полная локализация:** сделать `content` объектом по locale (`Record<Locale, string>`), перевести приоритетные статьи под приоритетные рынки (хотя бы UA/PL для начала). Это даёт реальный локальный рейтинг.
- **(б) Если перевод не планируется сейчас:** не заявлять hreflang-равенство для непереведённых статей — либо отдавать `<link rel="alternate" hreflang>` только для реально существующих переводов, либо `noindex` локальных версий с английским телом, чтобы не плодить почти-дубли.

**Решение по (а)/(б) — за заказчиком.** По умолчанию рекомендую (а) для UA/PL (топ-5 статей) + (б) для остальных, пока нет переводов.

### 5.4. Локализация метаданных и URL-слагов
- Убедиться, что title/description/OG переведены для всех локалей (UI — через messages, ок; статьи — см. 5.3).
- Рассмотреть локализованные слаги для приоритетных рынков (опционально, повышает CTR в локальной выдаче).

---

## 6. ТЗ: контент и топикальный авторитет (главный долгосрочный рычаг)

Гайд Google прямо говорит: уникальный non-commodity контент влияет на видимость (в т.ч. в AI-выдаче) сильнее всего. У вас сильный блог — наращиваем системно.

### 6.1. Достроить тематические кластеры (pillar + supporting)
Под каждый коммерческий кластер — pillar-страница (продуктовая) + 4–8 поддерживающих статей, перелинкованных. Примеры новых статей под существующие пробелы:
- KDS: «KDS hardware setup», «KDS vs paper tickets ROI», «station routing best practices».
- Ghost/dark kitchen: «unit economics of a dark kitchen in PL/CZ», «how to launch a ghost kitchen brand», «multi-brand routing».
- Aggregators: «Glovo commission calculator», «how to reconcile Bolt Food payouts», «Wolt vs Bolt vs Glovo P&L».
- Fiscalization: «KSeF setup for delivery (PL)», «EET for restaurants (CZ)», «Checkbox API (UA)» — у вас уникальная экспертиза.

### 6.2. Страницы сравнения `/vs/*` `[P1 — 3.4]`
Создать по образцу `/vs/poster-pos`: `/vs/deliverect`, `/vs/iiko`, `/vs/grubtech`, `/vs/flipdish`. Каждая — честная таблица, «когда выбрать их / когда нас», FAQ + `FAQPage`. Эти запросы конвертят и слабо защищены конкурентами.

### 6.3. Расширить интеграционные страницы `[P2 — 3.10]`
Добавить в `integrations.ts` страницы под аггрегаторы и популярные сервисы: Glovo, Bolt Food, Wolt, Uber Eats, Just Eat (запросы «X integration / X POS integration»). Каждая — что синхронизируется, как, выгода, CTA.

### 6.4. E-E-A-T `[P1 — 3.6]`
- Добавить в `Post` поля `author` (реальный человек: имя, должность, короткое bio, ссылка) и `updated`.
- Завести страницы авторов (`/about` уже есть — добавить команду/экспертов) и проставлять `{ '@type': 'Person' }` в Article-schema.
- Использовать `dateModified: post.updated ?? post.date` и периодически обновлять старые статьи (свежесть = рейтинг).

---

## 7. ТЗ: off-page и авторитет домена (без этого head-термины не взять)

Технику и контент мы контролируем; топ по конкурентным запросам решают ссылки и сущностный авторитет.

- **Листинги и каталоги ПО:** G2, Capterra, GetApp, Software Advice, SourceForge, Slashdot — карточки Toster с отзывами клиентов (966 Network и др.). Это и ссылки, и брендовый трафик, и попадание в «best food delivery software» подборки.
- **Цифровой PR / гостевые материалы:** операторские кейсы и данные (у вас есть уникальная статистика по 4 странам) — питч в отраслевые медиа (ghost kitchen / food-tech / EU restaurant tech).
- **Партнёрские ссылки:** страницы интеграций партнёров (Stripe, LiqPay, ElevenLabs, аггрегаторы) — взаимные упоминания.
- **Сущность в Knowledge Graph:** консистентные NAP/бренд-данные, заполненный `sameAs` (LinkedIn, Telegram — есть; добавить Crunchbase, G2, GitHub при наличии).
- **Отзывы:** собрать отзывы клиентов (для `AggregateRating` schema, когда наберётся достаточно реальных) — улучшает CTR и доверие.

---

## 8. ТЗ: измерения и контроль

- **Google Search Console:** подтвердить домен (verification уже заложен через `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`), отправить sitemap, отслеживать индексацию, Performance (запросы/страницы/CTR/позиции), Core Web Vitals, Rich Results.
- **Bing Webmaster Tools:** аналогично (`msvalidate.01` уже заложен) — питает и Bing, и часть AI-поиска.
- **GA4:** цели на `request-demo` (заявки), сегмент organic, landing-page отчёты.
- **Rank tracking:** отдельный трекер (Ahrefs/Semrush/Serpwatcher) по keyword map (раздел 1) с разбивкой по странам.
- **Rich Results Test** после каждого релиза schema: главная (`FAQPage`, `SoftwareApplication`), блог (`Article`, `Breadcrumb`).

**KPI (ориентир, калибруется по базовой линии из GSC):**
- 1–2 мес: индексация 100% целевых страниц, рост impressions, топ‑10 по брендовым и части хвоста/сравнений.
- 3–4 мес: топ‑3 по сравнениям и низкочастотным коммерческим; рост organic-заявок.
- 6+ мес: топ‑5→топ‑3 по среднечастотным тематическим; вход в топ‑10 по части head-терминов.

---

## 9. Приоритизированный роадмап

### Спринт 1 (неделя 1–2) — P0, быстрый выигрыш
- [ ] 4.1 Метаданные для `security`, `request-demo`, `for-single-location`, `api`.
- [ ] 4.2 `for-single-location` в sitemap + перелинковка.
- [ ] 5.3 Решение по локализации блога (а/б) + `noindex` или корректный hreflang для непереведённых статей.
- [ ] Подтвердить GSC/Bing, отправить sitemap, снять базовую линию позиций.

### Спринт 2 (неделя 3–4) — P1, рост охвата
- [ ] 6.2 Создать `/vs/deliverect`, `/vs/iiko` (+ schema, FAQ, перелинковка).
- [ ] 4.6 Реальные изображения/скриншоты на `/`, `/features`, `/food-delivery` + alt.
- [ ] 6.4 Поля `author`/`updated` в `Post`, страницы авторов, `Person` в Article-schema.
- [ ] 4.5 Core Web Vitals: ленивые анимации/карта, оптимизация LCP.

### Спринт 3 (месяц 2) — топикальный авторитет
- [ ] 6.1 По 4–8 статей в 2–3 приоритетных кластера + перелинковка в pillar.
- [ ] 6.3 Интеграционные страницы под аггрегаторы (Glovo/Bolt/Wolt/Uber Eats).
- [ ] 5.3(а) Перевод топ-5 статей под UA/PL.

### Постоянно (со 2-го месяца) — off-page
- [ ] 7.x Листинги (G2/Capterra/GetApp), сбор отзывов, цифровой PR, партнёрские ссылки.
- [ ] Обновление старых статей (свежесть), расширение `/vs/*` и кластеров по данным GSC.

---

## 10. Definition of Done (критерии приёмки)

- [ ] Все целевые страницы имеют уникальные title/description и индексируются (GSC Coverage без ошибок).
- [ ] `for-single-location` и новые `/vs/*` в sitemap и в индексе.
- [ ] Нет непреднамеренных почти-дублей из непереведённого блога (решено через перевод или hreflang/noindex).
- [ ] Rich Results Test: `FAQPage`, `SoftwareApplication`, `Article`, `Breadcrumb` — без ошибок.
- [ ] Core Web Vitals «Good» на mobile для топ-6 страниц.
- [ ] Настроены GSC, Bing WMT, GA4-цели, rank tracking по keyword map.
- [ ] Запущена контент-программа (≥8 новых материалов/мес) и off-page активность (листинги + ссылки).

---

## Приложение A. Файлы, которые трогаем

| Задача | Файл(ы) |
|---|---|
| Метаданные страниц | `src/app/[locale]/{security,request-demo,for-single-location,api}/layout.tsx` (создать) |
| Sitemap | `src/app/sitemap.ts` |
| Локализация блога | `src/data/posts.ts`, `src/app/[locale]/blog/[slug]/page.tsx` |
| E-E-A-T (автор/дата) | `src/data/posts.ts`, `src/app/[locale]/blog/[slug]/page.tsx` |
| `/vs/*` страницы | `src/app/[locale]/vs/<slug>/` (создать по образцу `poster-pos`) |
| Интеграции | `src/data/integrations.ts` |
| Изображения | продуктовые `page.tsx` + `public/` |
| schema-компонент | `src/components/JsonLd.tsx` (уже есть, переиспользовать) |

## Приложение B. Что НЕ делать (по гайду Google)
Не создавать `llms.txt`/спец-AI-файлы, не «чанковать» контент, не переписывать тексты «под роботов», не плодить страницы под каждую вариацию запроса (scaled content abuse), не покупать неаутентичные «упоминания». Фокус — на реальной пользе для оператора.

---
*Аудит основан на коде репозитория по состоянию на 13.06.2026. Keyword map требует финальной калибровки по данным Google Search Console и приоритетам рынков заказчика.*
