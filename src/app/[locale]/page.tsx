import type { JSX } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PortfolioHome } from '@/features/portfolio/server';
import { getProfile } from '@/features/content/server';
import { getDictionary } from '@/shared/i18n/dictionaries';
import { homePath, isLocale, locales } from '@/shared/i18n/locales';
import { createPageMetadata } from '@/shared/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const dictionary = getDictionary(locale);
    const profile = getProfile(locale);

    return createPageMetadata({
        title: profile ? `${profile.name} — ${profile.headline}` : dictionary.siteTitle,
        description: profile?.summary ?? dictionary.description,
        locale,
        path: homePath(locale),
        alternatives: Object.fromEntries(
            locales
                .filter((target) => getProfile(target))
                .map((target) => [target, homePath(target)]),
        ),
        published: Boolean(profile),
    });
}

export default async function HomePage({ params }: PageProps<'/[locale]'>): Promise<JSX.Element> {
    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    return <PortfolioHome locale={locale} />;
}
