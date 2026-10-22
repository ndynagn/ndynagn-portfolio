import type { NextConfig } from 'next';

import { defaultLocale, homePath } from './src/shared/i18n/locales';

const nextConfig: NextConfig = {
    // A closed static catalogue needs dynamicParams=false for real HTTP 404s.
    // Next.js 16.4 does not support that option with Cache Components.
    cacheComponents: false,
    partialPrefetching: false,
    reactCompiler: true,
    // A top-level locale layout cannot provide the document for unmatched routes.
    experimental: { globalNotFound: true },
    async redirects() {
        return [{ source: '/', destination: homePath(defaultLocale), permanent: true }];
    },
    async rewrites() {
        return {
            // Reject the development-only route before its locale layout renders.
            // A page-level notFound() otherwise prerenders an error shell without lang.
            beforeFiles:
                process.env.NODE_ENV === 'development'
                    ? []
                    : [
                          {
                              source: '/:locale(ru|en)/design-system',
                              destination: '/_not-found',
                          },
                      ],
        };
    },
    turbopack: {
        rules: {
            '*.css': {
                // Keep native CSS Module exports; these files contain plain CSS.
                condition: { not: { path: '*.module.css' } },
                loaders: ['@tailwindcss/turbopack'],
                as: '*.css',
            },
        },
    },
};

export default nextConfig;
