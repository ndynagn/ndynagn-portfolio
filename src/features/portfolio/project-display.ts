import type { LocalizedProject } from '@/features/content/models';
import { projectPath, type Locale } from '@/shared/i18n/locales';

import type { ProjectCardData } from './cards';

export function projectCardData(
    { project, translation }: LocalizedProject,
    locale: Locale,
    index: number,
    total: number,
): ProjectCardData {
    return {
        href: projectPath(locale, project.slug),
        title: translation.title,
        titleLines: project.titleLines[locale],
        eyebrow: project.eyebrow,
        categoryLabel: project.labels[locale],
        platformLabel: `FLUTTER · ${project.platforms}`,
        counterLabel: `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
        palette: project.palette,
    };
}
