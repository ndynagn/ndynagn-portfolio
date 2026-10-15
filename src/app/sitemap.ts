import type { MetadataRoute } from 'next';

import { getProfile, getProjectAlternatives, getProjects } from '@/features/content/server';
import { homePath, locales, projectPath } from '@/shared/i18n/locales';
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

    return [...homes, ...projects];
}
