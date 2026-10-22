import type { MetadataRoute } from 'next';

import { getProfile, getProjectAlternatives, getProjects } from '@/features/content/server';
import { cataloguePath, homePath, locales, projectPath } from '@/shared/i18n/locales';
import { getSiteUrl } from '@/shared/seo/site';

export default function sitemap(): MetadataRoute.Sitemap {
    const origin = getSiteUrl();

    if (!origin) {
        return [];
    }

    const homes: MetadataRoute.Sitemap = locales
        .filter((locale) => getProfile(locale))
        .map((locale) => ({
            url: new URL(homePath(locale), origin).href,
            alternates: {
                languages: Object.fromEntries(
                    locales
                        .filter((target) => getProfile(target))
                        .map((target) => [target, new URL(homePath(target), origin).href]),
                ),
            },
        }));
    const projects: MetadataRoute.Sitemap = locales.flatMap((locale) =>
        getProjects(locale).map(({ project }) => ({
            url: new URL(projectPath(locale, project.slug), origin).href,
            alternates: {
                languages: Object.fromEntries(
                    Object.entries(getProjectAlternatives(project.slug)).map(([target, path]) => [
                        target,
                        new URL(path, origin).href,
                    ]),
                ),
            },
        })),
    );

    const catalogues: MetadataRoute.Sitemap = locales
        .filter((locale) => getProjects(locale).length > 0)
        .map((locale) => ({
            url: new URL(cataloguePath(locale), origin).href,
            alternates: {
                languages: Object.fromEntries(
                    locales
                        .filter((target) => getProjects(target).length > 0)
                        .map((target) => [target, new URL(cataloguePath(target), origin).href]),
                ),
            },
        }));

    return [...homes, ...catalogues, ...projects];
}
