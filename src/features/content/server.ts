import 'server-only';

import { locales, projectPath, type Locale } from '@/shared/i18n/locales';

import type { LocalizedProject, ProfileTranslation } from './models';
import { experience, profile, projects, socialLinks } from './records';

export { experience, socialLinks };

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

export function getProjectAlternatives(slug: string): Readonly<Partial<Record<Locale, string>>> {
    return Object.fromEntries(
        locales
            .filter((locale) => getProject(locale, slug))
            .map((locale) => [locale, projectPath(locale, slug)]),
    );
}
