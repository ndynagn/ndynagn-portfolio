import 'server-only';

import { locales, projectPath, type Locale } from '@/shared/i18n/locales';

import type { LocalizedProject, ProfileTranslation } from './models';
import {
    experience,
    profile,
    projects,
    socialLinks,
    education,
    courses,
    skills,
    featuredSlugs,
} from './records';

export { experience, socialLinks, education, courses, skills };

export function getFeaturedProjects(locale: Locale): readonly LocalizedProject[] {
    const published = getProjects(locale);
    return featuredSlugs.flatMap((slug) =>
        published.filter(({ project }) => project.slug === slug),
    );
}

export function getProfile(locale: Locale): ProfileTranslation | undefined {
    const translation = profile?.translations[locale];

    return translation?.published ? translation : undefined;
}

export function getProjects(locale: Locale): readonly LocalizedProject[] {
    return projects.flatMap((project) => {
        const translation = project.translations[locale];

        return translation?.published ? [{ project, translation }] : [];
    });
}

export function getProject(locale: Locale, slug: string): LocalizedProject | undefined {
    return getProjects(locale).find(({ project }) => project.slug === slug);
}

/** Cycle through published translations in catalogue order, never linking a case to itself. */
export function getNextProject(locale: Locale, slug: string): LocalizedProject | undefined {
    const available = getProjects(locale);
    const index = available.findIndex(({ project }) => project.slug === slug);

    return index < 0 || available.length < 2
        ? undefined
        : available[(index + 1) % available.length];
}

export function getProjectAlternatives(slug: string): Readonly<Partial<Record<Locale, string>>> {
    return Object.fromEntries(
        locales
            .filter((locale) => getProject(locale, slug))
            .map((locale) => [locale, projectPath(locale, slug)]),
    );
}
