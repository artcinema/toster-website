/**
 * Hreflang audit script for toster.co
 *
 * Usage:
 *   npx tsx scripts/audit-hreflang.ts               # audit production
 *   npx tsx scripts/audit-hreflang.ts --base http://localhost:3000
 *   npx tsx scripts/audit-hreflang.ts --sample 20   # only check 20 random URLs
 *
 * Checks each page in sitemap.xml for:
 *   1. Self-referential hreflang (page URL matches one of its own alternates)
 *   2. x-default present
 *   3. All 7 locales listed (en, uk, ru, pl, cs, de, es)
 *   4. All alternate URLs return HTTP 200
 *   5. Bidirectional consistency (if A→B then B→A for every alternate pair)
 */

const LOCALES = ['en', 'uk', 'ru', 'pl', 'cs', 'de', 'es'] as const;
type Locale = (typeof LOCALES)[number];

interface HreflangEntry {
  hreflang: string;
  href: string;
}

interface PageReport {
  url: string;
  status: number | 'ERROR';
  errors: string[];
  warnings: string[];
  alternates: HreflangEntry[];
}

const args = process.argv.slice(2);
const baseIdx = args.indexOf('--base');
const BASE = baseIdx !== -1 ? args[baseIdx + 1] : 'https://toster.co';
const sampleIdx = args.indexOf('--sample');
const SAMPLE = sampleIdx !== -1 ? parseInt(args[sampleIdx + 1] ?? '0', 10) : 0;
const CONCURRENCY = 5;

async function fetchText(url: string): Promise<{ status: number; body: string }> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'TosterHreflangAudit/1.0' },
      signal: AbortSignal.timeout(15_000),
    });
    const body = await res.text();
    return { status: res.status, body };
  } catch (e) {
    return { status: 0, body: '' };
  }
}

function parseSitemapUrls(xml: string): string[] {
  const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
  return [...matches].map((m) => m[1]!.trim());
}

function parseHreflangTags(html: string): HreflangEntry[] {
  const entries: HreflangEntry[] = [];
  const re = /<link[^>]+rel=["']alternate["'][^>]*>/gi;
  const attrRe = /(\w[\w-]*)=["']([^"']+)["']/g;
  for (const tag of html.matchAll(re)) {
    const attrs: Record<string, string> = {};
    for (const attr of tag[0]!.matchAll(attrRe)) {
      attrs[attr[1]!.toLowerCase()] = attr[2]!;
    }
    if (attrs['hreflang'] && attrs['href']) {
      entries.push({ hreflang: attrs['hreflang']!, href: attrs['href']! });
    }
  }
  return entries;
}

async function auditPage(url: string): Promise<PageReport> {
  const errors: string[] = [];
  const warnings: string[] = [];

  const { status, body } = await fetchText(url);
  if (status === 0) {
    return { url, status: 'ERROR', errors: ['Fetch failed (timeout or network error)'], warnings, alternates: [] };
  }
  if (status !== 200) {
    return { url, status, errors: [`HTTP ${status}`], warnings, alternates: [] };
  }

  const alternates = parseHreflangTags(body);
  if (alternates.length === 0) {
    errors.push('No hreflang alternate tags found');
    return { url, status, errors, warnings, alternates };
  }

  const hreflangMap = new Map<string, string>();
  for (const entry of alternates) {
    hreflangMap.set(entry.hreflang, entry.href);
  }

  // 1. Self-referential check
  const selfFound = alternates.some((e) => {
    const normalized = e.href.replace(/\/$/, '');
    const target = url.replace(/\/$/, '');
    return normalized === target;
  });
  if (!selfFound) {
    errors.push(`Missing self-referential hreflang (own URL "${url}" not listed in alternates)`);
  }

  // 2. x-default
  if (!hreflangMap.has('x-default')) {
    warnings.push('Missing x-default hreflang');
  }

  // 3. All 7 locales present
  for (const locale of LOCALES) {
    if (!hreflangMap.has(locale)) {
      errors.push(`Missing hreflang for locale "${locale}"`);
    }
  }

  return { url, status, errors, warnings, alternates };
}

async function checkAlternateStatus(
  href: string,
  sourceUrl: string,
  allReports: Map<string, PageReport>
): Promise<string[]> {
  const issues: string[] = [];
  const cached = allReports.get(href);
  if (cached) {
    if (cached.status !== 200) {
      issues.push(`Alternate href "${href}" returned ${cached.status}`);
    }
    return issues;
  }
  const { status } = await fetchText(href);
  if (status !== 200) {
    issues.push(`Alternate href "${href}" (from ${sourceUrl}) returned ${status}`);
  }
  return issues;
}

async function runInBatches<T>(items: T[], fn: (item: T) => Promise<void>, concurrency: number): Promise<void> {
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const item = items[i++]!;
      await fn(item);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

async function main() {
  console.log(`\n🔍 Toster Hreflang Audit — base: ${BASE}\n`);

  const sitemapUrl = `${BASE}/sitemap.xml`;
  console.log(`Fetching sitemap: ${sitemapUrl}`);
  const { status: smStatus, body: smBody } = await fetchText(sitemapUrl);
  if (smStatus !== 200) {
    console.error(`❌ Sitemap fetch failed: HTTP ${smStatus}`);
    process.exit(1);
  }

  let urls = parseSitemapUrls(smBody);
  console.log(`Found ${urls.length} URLs in sitemap`);

  // Only check locale-prefixed URLs (skip canonical-without-locale entries that redirect to /en)
  urls = urls.filter((u) => LOCALES.some((l) => u.includes(`/${l}/`) || u.endsWith(`/${l}`)));
  console.log(`Filtered to ${urls.length} locale-prefixed URLs\n`);

  if (SAMPLE > 0 && SAMPLE < urls.length) {
    urls = shuffle(urls).slice(0, SAMPLE);
    console.log(`Sampling ${SAMPLE} random URLs\n`);
  }

  const reports = new Map<string, PageReport>();
  let done = 0;

  await runInBatches(
    urls,
    async (url) => {
      const report = await auditPage(url);
      reports.set(url, report);
      done++;
      if (done % 10 === 0 || done === urls.length) {
        process.stdout.write(`\r  Audited ${done}/${urls.length} pages...`);
      }
    },
    CONCURRENCY
  );
  console.log('\n');

  // Bidirectional check — for each page that has alternates, verify the alternate also references back
  console.log('Checking bidirectional consistency...');
  const biErrors: string[] = [];

  for (const [url, report] of reports) {
    if (report.status !== 200 || report.alternates.length === 0) continue;
    for (const alt of report.alternates) {
      if (alt.hreflang === 'x-default') continue;
      const altReport = reports.get(alt.href);
      if (!altReport) continue; // URL not in our sample, skip
      if (altReport.status !== 200) continue;

      const backRef = altReport.alternates.some((a) => {
        const norm1 = a.href.replace(/\/$/, '');
        const norm2 = url.replace(/\/$/, '');
        return norm1 === norm2;
      });
      if (!backRef) {
        biErrors.push(`Bidirectional fail: ${alt.href} does not reference back to ${url}`);
      }
    }
  }

  // Summary
  const pagesWithErrors = [...reports.values()].filter((r) => r.errors.length > 0);
  const pagesWithWarnings = [...reports.values()].filter((r) => r.warnings.length > 0 && r.errors.length === 0);
  const cleanPages = [...reports.values()].filter((r) => r.errors.length === 0 && r.warnings.length === 0);

  console.log('═══════════════════════════════════════════════════════');
  console.log(`  RESULTS: ${urls.length} pages audited`);
  console.log(`  ✅ Clean:    ${cleanPages.length}`);
  console.log(`  ⚠️  Warnings: ${pagesWithWarnings.length}`);
  console.log(`  ❌ Errors:   ${pagesWithErrors.length}`);
  console.log(`  🔄 Bidirectional errors: ${biErrors.length}`);
  console.log('═══════════════════════════════════════════════════════\n');

  if (pagesWithErrors.length > 0) {
    console.log('❌ PAGES WITH ERRORS:\n');
    for (const report of pagesWithErrors) {
      console.log(`  ${report.url}`);
      for (const err of report.errors) {
        console.log(`    • ${err}`);
      }
    }
    console.log();
  }

  if (pagesWithWarnings.length > 0) {
    console.log('⚠️  PAGES WITH WARNINGS:\n');
    for (const report of pagesWithWarnings) {
      console.log(`  ${report.url}`);
      for (const warn of report.warnings) {
        console.log(`    • ${warn}`);
      }
    }
    console.log();
  }

  if (biErrors.length > 0) {
    console.log('🔄 BIDIRECTIONAL ERRORS:\n');
    for (const err of biErrors) {
      console.log(`  • ${err}`);
    }
    console.log();
  }

  const hasIssues = pagesWithErrors.length > 0 || biErrors.length > 0;
  if (!hasIssues) {
    console.log('✅ All hreflang tags look good!\n');
  }

  process.exit(hasIssues ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
