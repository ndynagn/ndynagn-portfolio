import type { Locale } from '@/shared/i18n/locales';

interface WorkbenchCopy {
    readonly title: string;
    readonly note: string;
    readonly typography: string;
    readonly material: string;
    readonly materialBackdrops: readonly [string, string, string];
    readonly materialGuide: string;
    readonly motion: string;
    readonly hover: string;
    readonly sample: string;
    readonly theme: string;
    readonly scene: string;
    readonly changeScene: string;
    readonly filter: string;
    readonly scroller: string;
    readonly field: string;
    readonly opaque: string;
    readonly failed: string;
    readonly photoError: string;
    readonly restore: string;
    readonly snap: string;
    readonly selections: readonly [string, string, string];
}

const dictionaries: Readonly<Record<Locale, WorkbenchCopy>> = {
    ru: {
        title: 'Визуальная основа',
        note: 'Технический стенд визуальной основы, кнопок и ссылок. Остальные компоненты и страницы — следующие этапы.',
        typography: 'Типографика и токены',
        material: 'Материалы и тема',
        materialBackdrops: ['Фотография', 'Фон страницы', 'Контрастный фон'],
        materialGuide:
            'Три материала на трёх фонах. Текст позади образцов показывает размытие; заливка, рамка и тени сохраняют рецепты исходника.',
        motion: 'Курсор и движение',
        hover: 'Hover и клавиатурный фокус',
        sample: 'Технический образец: длинный текст переносится, содержание остаётся доступным при увеличении масштаба.',
        theme: 'Переключить тему',
        scene: 'Техническая сцена',
        changeScene: 'Сменить сцену',
        filter: 'Изменить набор',
        scroller: 'Прокрутите эту область на 240 пикселей',
        field: 'Поле с системным курсором',
        opaque: 'Непрозрачный fallback',
        failed: 'Изображение недоступно',
        photoError: 'Проверить ошибку фото',
        restore: 'Восстановить фото',
        snap: 'Локальный scroll snap',
        selections: ['Коротко', 'Длинная подпись', 'Ещё'],
    },
    en: {
        title: 'Visual foundation',
        note: 'Technical workbench for the visual foundation, buttons and links. Other components and pages are later stages.',
        typography: 'Typography and tokens',
        material: 'Materials and theme',
        materialBackdrops: ['Photograph', 'Page background', 'Contrasting background'],
        materialGuide:
            'Three materials on three backdrops. Text behind the samples reveals blur; tint, borders and shadows retain the source recipes.',
        motion: 'Cursor and motion',
        hover: 'Hover and keyboard focus',
        sample: 'Technical sample: long text wraps and content remains accessible when text is enlarged.',
        theme: 'Toggle theme',
        scene: 'Technical scene',
        changeScene: 'Change scene',
        filter: 'Change collection',
        scroller: 'Scroll this region through 240 pixels',
        field: 'Input with system cursor',
        opaque: 'Opaque fallback',
        failed: 'Image unavailable',
        photoError: 'Test photo failure',
        restore: 'Restore photo',
        snap: 'Local scroll snap',
        selections: ['Short', 'Longer label', 'More'],
    },
};

export function getWorkbenchCopy(locale: Locale): WorkbenchCopy {
    return dictionaries[locale];
}
