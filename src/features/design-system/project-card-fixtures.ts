import 'server-only';

import type { ProjectCardData } from '@/features/portfolio/cards';
import type { PaletteName } from '@/features/portfolio/visual';
import type { Locale } from '@/shared/i18n/locales';

interface CardFixture {
    readonly id: string;
    readonly filterCategory: 'commerce' | 'service';
    readonly palette: PaletteName;
    readonly title: Readonly<Record<Locale, string>>;
    readonly titleLines?: Readonly<Record<Locale, readonly string[]>>;
    readonly category: Readonly<Record<Locale, string>>;
    readonly eyebrow: string;
    readonly platform: string;
}

// Archive display samples only. These do not publish records in the content catalogue.
const fixtures: readonly CardFixture[] = [
    {
        id: 'onetouch',
        filterCategory: 'service',
        palette: 'onetouch',
        title: { ru: 'OneTouch', en: 'OneTouch' },
        category: { ru: 'Сервисное приложение', en: 'Service application' },
        eyebrow: 'GO / PRO',
        platform: 'FLUTTER · iOS & Android',
    },
    {
        id: 'potlucky',
        filterCategory: 'commerce',
        palette: 'potlucky',
        title: { ru: 'Potlucky / OOMI', en: 'Potlucky / OOMI' },
        titleLines: { ru: ['Potlucky', 'OOMI'], en: ['Potlucky', 'OOMI'] },
        category: { ru: 'Модульная платформа', en: 'Modular platform' },
        eyebrow: 'MOBILE APPLICATION',
        platform: 'FLUTTER · iOS & Android',
    },
    {
        id: 'immergas',
        filterCategory: 'service',
        palette: 'immergas',
        title: { ru: 'Immergas', en: 'Immergas' },
        category: { ru: 'Сервисная экосистема', en: 'Service ecosystem' },
        eyebrow: 'MOBILE APPLICATION',
        platform: 'FLUTTER · iOS & Android',
    },
    {
        id: 'klimatprof',
        filterCategory: 'commerce',
        palette: 'klimatprof',
        title: { ru: 'KlimatProf', en: 'KlimatProf' },
        category: { ru: 'E-commerce', en: 'E-commerce' },
        eyebrow: 'MOBILE APPLICATION',
        platform: 'FLUTTER · iOS & Android',
    },
    {
        id: 'checkai',
        filterCategory: 'commerce',
        palette: 'checkai',
        title: { ru: 'Чекай', en: 'Chekai' },
        category: { ru: 'Кешбэк-сервис', en: 'Cashback service' },
        eyebrow: 'MOBILE APPLICATION',
        platform: 'FLUTTER · iOS & Android',
    },
    {
        id: 'galleria-minsk',
        filterCategory: 'service',
        palette: 'galleria-minsk',
        title: { ru: 'Galleria Minsk', en: 'Galleria Minsk' },
        titleLines: { ru: ['Galleria', 'Minsk'], en: ['Galleria', 'Minsk'] },
        category: { ru: 'Программа лояльности', en: 'Loyalty programme' },
        eyebrow: 'MOBILE APPLICATION',
        platform: 'FLUTTER · iOS & Android',
    },
    {
        id: 'golden-plate',
        filterCategory: 'commerce',
        palette: 'golden-plate',
        title: { ru: 'Золотая Плата', en: 'Golden Plate' },
        titleLines: { ru: ['Золотая', 'Плата'], en: ['Golden', 'Plate'] },
        category: { ru: 'Инвестиционные монеты', en: 'Investment coins' },
        eyebrow: 'MOBILE APPLICATION',
        platform: 'FLUTTER · iOS',
    },
    {
        id: 'aventin',
        filterCategory: 'service',
        palette: 'aventin',
        title: { ru: 'Авентин', en: 'Aventin' },
        category: { ru: 'Безопасный дом', en: 'Home security' },
        eyebrow: 'MOBILE APPLICATION',
        platform: 'FLUTTER · iOS & Android',
    },
];

export function getProjectCardFixtures(locale: Locale): readonly ProjectCardData[] {
    return fixtures.map((fixture, index) => ({
        href: `#project-card-target-${fixture.id}`,
        title: fixture.title[locale],
        titleLines: fixture.titleLines?.[locale],
        eyebrow: fixture.eyebrow,
        categoryLabel: fixture.category[locale],
        platformLabel: fixture.platform,
        counterLabel: `${String(index + 1).padStart(2, '0')} / ${String(fixtures.length).padStart(2, '0')}`,
        palette: fixture.palette,
    }));
}

interface ProjectFilterFixture {
    readonly id: string;
    readonly category: 'commerce' | 'service';
    readonly data: ProjectCardData;
}

export function getProjectFilterFixtures(locale: Locale): readonly ProjectFilterFixture[] {
    const cards = getProjectCardFixtures(locale);

    return fixtures.map((fixture, index) => ({
        id: fixture.id,
        category: fixture.filterCategory,
        data: cards[index],
    }));
}

export function getLongProjectCardFixture(locale: Locale): ProjectCardData {
    const title =
        locale === 'ru'
            ? 'Технический образец: длинное название нового проекта'
            : 'Technical sample: a long title for another project';

    return {
        href: '#project-card-target-technical',
        title,
        titleLines:
            locale === 'ru'
                ? ['Новый проект', 'Многострочное название', 'Проверка переноса текста']
                : ['Another project', 'A multiline title', 'Text wrapping sample'],
        eyebrow: 'TECHNICAL FIXTURE',
        categoryLabel:
            locale === 'ru'
                ? 'Длинная подпись для проверки масштабирования и доступности карточки'
                : 'A long category label to check card scaling and accessibility',
        platformLabel:
            locale === 'ru'
                ? 'ТЕХНИЧЕСКИЙ ОБРАЗЕЦ · несколько поддерживаемых платформ'
                : 'TECHNICAL SAMPLE · multiple supported platforms',
        counterLabel: '101 / 128',
        palette: 'onetouch',
    };
}
