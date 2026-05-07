/** @type {import('@lhci/cli').LighthouseConfig} */
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/features',
        'http://localhost:3000/en/pricing',
        'http://localhost:3000/en/food-delivery',
        'http://localhost:3000/en/ai',
        'http://localhost:3000/en/for-chains',
        'http://localhost:3000/en/blog',
        'http://localhost:3000/en/integrations',
        'http://localhost:3000/en/request-demo',
      ],
      settings: {
        preset: 'desktop',
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      assertions: {
        // Categories — tightened after Phase 1 SEO fixes
        'categories:performance':    ['warn',  { minScore: 0.88 }],
        'categories:accessibility':  ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo':            ['error', { minScore: 0.98 }],

        // Core Web Vitals (desktop thresholds)
        'first-contentful-paint':    ['warn',  { maxNumericValue: 1800 }],
        'largest-contentful-paint':  ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift':   ['error', { maxNumericValue: 0.1  }],
        'total-blocking-time':       ['warn',  { maxNumericValue: 300  }],
        'interactive':               ['warn',  { maxNumericValue: 3500 }],
        'speed-index':               ['warn',  { maxNumericValue: 3000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
