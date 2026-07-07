<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Team workflow (3 developers)

## Git rules — MANDATORY
- NEVER commit or push directly to `main`. All work goes through Pull Requests.
- Branch naming: `feature/<short-name>`, `fix/<short-name>`, `seo/<short-name>`.
- One task = one branch = one PR. Keep PRs small and reviewable.
- Before starting any task: `git checkout main && git pull origin main && git checkout -b feature/<name>`.
- Rebase on fresh main before opening a PR: `git fetch origin && git rebase origin/main`.
- Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `seo:`, `docs:`).

## Quality gates — run before every PR
- `npm run lint` — must pass with zero errors.
- `npm run build` — must complete successfully.
- If routes or locales were touched: `npm run audit:hreflang:local` against the dev server.

## Code conventions
- TypeScript strict. No `any` unless justified with a comment.
- Shared types live in `src/types` — change them via a dedicated PR and notify the team (contract-first).
- i18n: all user-facing strings go through `src/messages` / next-intl. Never hardcode text in components.
- New UI: reuse `src/components` and Radix primitives before adding dependencies. New dependencies require agreement in the PR description.
- SEO-critical files (`sitemap.ts`, `robots.ts`, metadata, hreflang logic in `src/i18n`) — changes here require review by the repo owner before merge.

## Zones of responsibility
- Do not modify files outside the scope of the current task.
- If a task requires touching another person's active area, coordinate first (comment in the PR or in chat).

## Environment
- Node LTS, `npm install`, `npm run dev` → http://localhost:3000.
- Secrets live in `.env.local` (never committed). Ask the team for current dev values.
