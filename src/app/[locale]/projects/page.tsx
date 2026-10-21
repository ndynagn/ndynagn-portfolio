import type { JSX } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProjects } from '@/features/content/server';
import { PortfolioCatalogue, parseProjectCategory } from '@/features/portfolio/server';
import { cataloguePath, isLocale, locales } from '@/shared/i18n/locales';
import { getPortfolioDictionary } from '@/shared/i18n/portfolio';
import { createPageMetadata } from '@/shared/seo/metadata';

export async function generateMetadata({
    params,
}: PageProps<'/[locale]/projects'>): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) {
        notFound();
    }
    const copy = getPortfolioDictionary(locale);
    return createPageMetadata({
        title: copy.all,
        description: copy.catalogueIntro.replace('\n', ' '),
        locale,
        path: cataloguePath(locale),
        published: getProjects(locale).length > 0,
        alternatives: Object.fromEntries(
            locales
                .filter((target) => getProjects(target).length > 0)
                .map((target) => [target, cataloguePath(target)]),
        ),
    });
}

export default async function CataloguePage({
    params,
    searchParams,
}: PageProps<'/[locale]/projects'>): Promise<JSX.Element> {
    const { locale } = await params;
    if (!isLocale(locale)) {
        notFound();
    }
    const query = await searchParams;
    return <PortfolioCatalogue locale={locale} category={parseProjectCategory(query.category)} />;
}
