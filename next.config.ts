import type { NextConfig } from 'next';

import { defaultLocale, homePath } from './src/shared/i18n/locales';

const nextConfig: NextConfig = {
    // A closed static catalogue needs dynamicParams=false for real HTTP 404s.
    // Next.js 16.4 does not support that option with Cache Components.
    cacheComponents: false,
    partialPrefetching: false,
    reactCompiler: true,
    async redirects() {
        return [{ source: '/', destination: homePath(defaultLocale), permanent: true }];
    },
    turbopack: {
        rules: {
            '*.css': {
                loaders: ['@tailwindcss/turbopack'],
                as: '*.css',
            },
        },
    },
};

export default nextConfig;
