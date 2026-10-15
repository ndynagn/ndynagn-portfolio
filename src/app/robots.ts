import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/shared/seo/site';

export default function robots(): MetadataRoute.Robots {
    const origin = getSiteUrl();

    // Allow crawling so page-level noindex remains visible to search engines.
    return {
        rules: { userAgent: '*', allow: '/' },
        ...(origin ? { sitemap: new URL('/sitemap.xml', origin).href } : {}),
    };
}
