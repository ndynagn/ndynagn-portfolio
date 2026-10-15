import 'server-only';

import type { Metadata } from 'next';

import type { Locale } from '@/shared/i18n/locales';

import { getSiteUrl } from './site';

interface PageMetadataInput {
    readonly title: string;
    readonly description: string;
    readonly locale: Locale;
    readonly path: string;
    readonly alternatives: Readonly<Partial<Record<Locale, string>>>;
    readonly published: boolean;
}

/** Unpublished pages and missing public origins stay noindex without canonical/OG URLs. */
export function createPageMetadata(input: PageMetadataInput): Metadata {
    const origin = getSiteUrl();
    const indexable = Boolean(origin && input.published);

    return {
        title: input.title,
        description: input.description,
        robots: { index: indexable, follow: indexable },
        ...(origin && input.published
            ? {
                  metadataBase: origin,
                  alternates: {
                      canonical: new URL(input.path, origin).href,
                      languages: Object.fromEntries(
                          Object.entries(input.alternatives).map(([locale, path]) => [
                              locale,
                              new URL(path, origin).href,
                          ]),
                      ),
                  },
                  openGraph: {
                      type: 'website',
                      title: input.title,
                      description: input.description,
                      url: new URL(input.path, origin).href,
                      locale: input.locale === 'ru' ? 'ru_RU' : 'en_US',
                      alternateLocale: Object.keys(input.alternatives)
                          .filter((locale) => locale !== input.locale)
                          .map((locale) => (locale === 'ru' ? 'ru_RU' : 'en_US')),
                  },
              }
            : {}),
    };
}
