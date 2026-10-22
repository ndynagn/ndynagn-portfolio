import 'server-only';

import type { Locale } from './locales';

const ru = {
    enlarge: 'Увеличить',
    scrollPrevious: 'Прокрутить галерею влево',
    scrollNext: 'Прокрутить галерею вправо',
    previous: 'Предыдущее изображение',
    next: 'Следующее изображение',
    close: 'Закрыть галерею',
    zoomIn: 'Увеличить',
    zoomOut: 'Уменьшить',
    description: 'Галерея проекта',
    loading: 'Загрузка изображения…',
    error: 'Не удалось загрузить изображение.',
    retry: 'Повторить',
};

const en: Readonly<Record<keyof typeof ru, string>> = {
    enlarge: 'Enlarge',
    scrollPrevious: 'Scroll gallery left',
    scrollNext: 'Scroll gallery right',
    previous: 'Previous image',
    next: 'Next image',
    close: 'Close gallery',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    description: 'Project gallery',
    loading: 'Loading image…',
    error: 'The image could not be loaded.',
    retry: 'Try again',
};

export function getGalleryLabels(locale: Locale): Readonly<Record<keyof typeof ru, string>> {
    return locale === 'ru' ? ru : en;
}
