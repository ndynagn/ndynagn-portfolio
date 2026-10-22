import type { JSX } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProject, getProjectAlternatives, getProjects } from '@/features/content/server';
import { ProjectDetail } from '@/features/portfolio/server';
import { isLocale, locales, projectPath, type Locale } from '@/shared/i18n/locales';
import { createPageMetadata } from '@/shared/seo/metadata';

export const dynamicParams = false;

export function generateStaticParams(): { readonly locale: Locale; readonly slug: string }[] {
    // Enumerate complete pairs: an empty sibling locale must not erase published cases.
    return locales.flatMap((locale) =>
        getProjects(locale).map(({ project }) => ({ locale, slug: project.slug })),
    );
}

export async function generateMetadata({
    params,
}: PageProps<'/[locale]/projects/[slug]'>): Promise<Metadata> {
    const { locale, slug } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const record = getProject(locale, slug);

    if (!record) {
        notFound();
    }

    return createPageMetadata({
        title: record.translation.title,
        description: record.translation.summary,
        locale,
        path: projectPath(locale, slug),
        alternatives: getProjectAlternatives(slug),
        published: true,
    });
}

export default async function ProjectPage({
    params,
}: PageProps<'/[locale]/projects/[slug]'>): Promise<JSX.Element> {
    const { locale, slug } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const record = getProject(locale, slug);

    if (!record) {
        notFound();
    }

    return <ProjectDetail locale={locale} record={record} />;
}
