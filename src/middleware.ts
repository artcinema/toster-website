import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except static files, _next internals, and public assets
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|woff2?|ttf|eot)$).*)',
  ],
};
