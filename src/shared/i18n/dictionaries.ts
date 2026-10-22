import 'server-only';

import type { Locale } from './locales';

interface Dictionary {
    readonly siteTitle: string;
    readonly description: string;
    readonly setupLabel: string;
    readonly heading: string;
    readonly introduction: string;
    readonly contentNote: string;
    readonly languageNavigation: string;
    readonly skipToContent: string;
    readonly backToHome: string;
    readonly pageNotFound: string;
    readonly experience: string;
    readonly professionalProjects: string;
    readonly petProjects: string;
    readonly links: string;
    readonly downloadCv: string;
    readonly source: string;
    readonly website: string;
}

const dictionaries: Readonly<Record<Locale, Dictionary>> = {
    ru: {
        siteTitle: 'ndynagn — портфолио',
        description: 'Персональное портфолио: CV, опыт и проекты. Сайт в подготовке.',
        setupLabel: 'Сайт в подготовке',
        heading: 'Портфолио',
        introduction: 'Здесь появятся моё CV, опыт работы, проекты и ссылки для связи.',
        contentNote: 'Материалы ещё не опубликованы.',
        languageNavigation: 'Язык сайта',
        skipToContent: 'Перейти к содержимому',
        backToHome: 'На главную',
        pageNotFound: 'Страница не найдена.',
        experience: 'Опыт',
        professionalProjects: 'Проекты',
        petProjects: 'Пет-проекты',
        links: 'Ссылки',
        downloadCv: 'Скачать CV',
        source: 'Исходный код',
        website: 'Сайт проекта',
    },
    en: {
        siteTitle: 'ndynagn — portfolio',
        description: 'Personal portfolio: CV, experience and projects. Site in preparation.',
        setupLabel: 'Site in preparation',
        heading: 'Portfolio',
        introduction: 'My CV, work experience, projects and contact links will appear here.',
        contentNote: 'Content has not been published yet.',
        languageNavigation: 'Site language',
        skipToContent: 'Skip to content',
        backToHome: 'Back to home',
        pageNotFound: 'Page not found.',
        experience: 'Experience',
        professionalProjects: 'Projects',
        petProjects: 'Pet projects',
        links: 'Links',
        downloadCv: 'Download CV',
        source: 'Source code',
        website: 'Project website',
    },
};

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale];
}
