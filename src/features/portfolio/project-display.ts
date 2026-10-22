import type { LocalizedProject } from '@/features/content/models';
import { projectPath, type Locale } from '@/shared/i18n/locales';

import type { ProjectCardData } from './cards';
import type { GalleryGroup } from './gallery';

/** Omit unavailable localized media; common paths/dimensions never enter UI dictionaries. */
export function projectGalleryGroups(
    { project }: LocalizedProject,
    locale: Locale,
): readonly GalleryGroup[] {
    return project.gallery.flatMap((group) => {
        const translation = group.translations[locale];
        if (!translation) {
            return [];
        }
        const images = group.images.flatMap((image) => {
            const copy = image.translations[locale];
            return copy
                ? [
                      {
                          id: image.id,
                          src: image.src,
                          thumbnail: image.thumbnail,
                          width: image.width,
                          height: image.height,
                          ...copy,
                          lightboxCaption: `${translation.title} · ${copy.caption}`,
                      },
                  ]
                : [];
        });
        return images.length ? [{ id: group.id, title: translation.title, images }] : [];
    });
}

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
