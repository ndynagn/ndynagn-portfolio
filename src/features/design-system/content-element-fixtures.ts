import 'server-only';

import type {
    ContributionItem,
    EducationEntryProps,
    ExperienceEntryProps,
    ProjectFact,
} from '@/features/portfolio/content-elements';
import type { Locale } from '@/shared/i18n/locales';

interface ExperienceFixture {
    readonly id: string;
    readonly entry: Omit<ExperienceEntryProps, 'className' | 'headingLevel' | 'action'>;
    readonly actionLabel?: string;
}

interface EducationFixture {
    readonly id: string;
    readonly entry: Omit<EducationEntryProps, 'className' | 'headingLevel'>;
}

interface ProjectCaseFixture {
    readonly id: string;
    readonly title: string;
    readonly facts: readonly ProjectFact[];
    readonly contributions: readonly ContributionItem[];
}

interface ContactFixture {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly href: string;
    readonly target?: '_blank';
    readonly rel?: string;
}

interface ContentElementFixtures {
    readonly experience: readonly ExperienceFixture[];
    readonly education: readonly EducationFixture[];
    readonly courses: readonly EducationFixture[];
    readonly projectCases: readonly ProjectCaseFixture[];
    readonly contacts: readonly ContactFixture[];
}

// Archive-only technical fixtures. These are not published profile or project records.
const experience: Readonly<Record<Locale, readonly ExperienceFixture[]>> = {
    ru: [
        {
            id: 'experience-0',
            entry: {
                periodLabel: 'НОЯБРЬ 2024 — СЕЙЧАС',
                organization: 'СМД-Агентство',
                role: 'Flutter Developer',
                description:
                    'Разрабатываю приложения для Android и iOS: архитектура, интерфейсы, бизнес-логика, API, тесты и релизы. Работаю самостоятельно и в команде. Дополнительно — нативная Android-разработка на Android View и Jetpack Compose.',
                currentLabel: 'Сейчас',
                projectLines: [
                    'OneTouch / Potlucky / OOMI / Immergas / KlimatProf',
                    'Galleria Minsk / Золотая Плата / Авентин',
                ],
            },
        },
        {
            id: 'experience-1',
            entry: {
                periodLabel: 'МАЙ 2023 — НОЯБРЬ 2024',
                organization: 'Xenous',
                role: 'Flutter Developer',
                description:
                    'Разрабатывал «Чекай» — сервис кешбэка за покупки — в команде из трёх человек. Отвечал за интерфейсы, бизнес-логику, интеграцию API, навигацию и внедрение зависимостей.',
            },
            actionLabel: 'О проекте «Чекай»',
        },
    ],
    en: [
        {
            id: 'experience-0',
            entry: {
                periodLabel: 'NOV 2024 — PRESENT',
                organization: 'SMD Agency',
                role: 'Flutter Developer',
                description:
                    'Building Android and iOS apps: architecture, UI, business logic, APIs, testing and releases, both independently and in a team. Additional native Android development using Android View and Jetpack Compose.',
                currentLabel: 'Current',
                projectLines: [
                    'OneTouch / Potlucky / OOMI / Immergas / KlimatProf',
                    'Galleria Minsk / Golden Plate / Aventin',
                ],
            },
        },
        {
            id: 'experience-1',
            entry: {
                periodLabel: 'MAY 2023 — NOV 2024',
                organization: 'Xenous',
                role: 'Flutter Developer',
                description:
                    'Developed Chekai, a cashback service, in a team of three. Responsible for UI, business logic, API integration, navigation and dependency injection.',
            },
            actionLabel: 'Explore Chekai',
        },
    ],
};
const education: Readonly<Record<Locale, readonly EducationFixture[]>> = {
    ru: [
        {
            id: 'education-0',
            entry: {
                yearLabel: '2028',
                yearNote: 'ожидается',
                title: 'Омский государственный технический университет',
                description: 'Информатика и вычислительная техника',
            },
        },
        {
            id: 'education-1',
            entry: {
                yearLabel: '2025',
                title: 'Омский авиационный колледж им. Н. Е. Жуковского',
                description: 'Информационные системы и программирование',
            },
        },
    ],
    en: [
        {
            id: 'education-0',
            entry: {
                yearLabel: '2028',
                yearNote: 'expected',
                title: 'Omsk State Technical University',
                description: 'Computer Science and Engineering',
            },
        },
        {
            id: 'education-1',
            entry: {
                yearLabel: '2025',
                title: 'Omsk Aviation College named after N. E. Zhukovsky',
                description: 'Information Systems and Programming',
            },
        },
    ],
};
const courses: Readonly<Record<Locale, readonly EducationFixture[]>> = {
    ru: [
        {
            id: 'education-2',
            entry: {
                yearLabel: '2024',
                title: 'Effective // ЦК ОмГТУ',
                description: 'Курс повышения квалификации · Effective',
            },
        },
    ],
    en: [
        {
            id: 'education-2',
            entry: {
                yearLabel: '2024',
                title: 'Effective // Digital Department, OmSTU',
                description: 'Professional development course · Effective',
            },
        },
    ],
};
const projectCases: Readonly<Record<Locale, readonly ProjectCaseFixture[]>> = {
    ru: [
        {
            id: 'onetouch',
            title: 'OneTouch',
            facts: [
                {
                    id: 'role',
                    label: 'МОЯ РОЛЬ',
                    value: 'Самостоятельная Flutter-разработка',
                },
                {
                    id: 'platforms',
                    label: 'ПЛАТФОРМЫ',
                    value: 'iOS & Android',
                },
            ],
            contributions: [
                {
                    id: 'onetouch-0',
                    numberLabel: '01',
                    text: 'Создал приложение с нуля: реализовал интерфейсы и бизнес-логику.',
                },
                {
                    id: 'onetouch-1',
                    numberLabel: '02',
                    text: 'Разработал переиспользуемый UI kit для единообразных интерфейсов.',
                },
                {
                    id: 'onetouch-2',
                    numberLabel: '03',
                    text: 'Реализовал модуль чатов и управление состояниями заказа.',
                },
            ],
        },
        {
            id: 'immergas',
            title: 'Immergas',
            facts: [
                {
                    id: 'role',
                    label: 'МОЯ РОЛЬ',
                    value: 'Flutter-разработчик',
                },
                {
                    id: 'platforms',
                    label: 'ПЛАТФОРМЫ',
                    value: 'iOS & Android',
                },
            ],
            contributions: [
                {
                    id: 'immergas-0',
                    numberLabel: '01',
                    text: 'Развивал обработку ошибок авторизации и сети, проверку QR-кодов и серийных номеров.',
                },
                {
                    id: 'immergas-1',
                    numberLabel: '02',
                    text: 'Рефакторил работу с фотографиями установок.',
                },
                {
                    id: 'immergas-2',
                    numberLabel: '03',
                    text: 'Выделял типизированные ошибки, BLoC-состояния и общие UI-компоненты.',
                },
                {
                    id: 'immergas-3',
                    numberLabel: '04',
                    text: 'Добавлял unit- и widget-тесты для критичных сценариев.',
                },
            ],
        },
    ],
    en: [
        {
            id: 'onetouch',
            title: 'OneTouch',
            facts: [
                {
                    id: 'role',
                    label: 'MY ROLE',
                    value: 'Solo Flutter development',
                },
                {
                    id: 'platforms',
                    label: 'PLATFORMS',
                    value: 'iOS & Android',
                },
            ],
            contributions: [
                {
                    id: 'onetouch-0',
                    numberLabel: '01',
                    text: 'Built the application from scratch, including UI and business logic.',
                },
                {
                    id: 'onetouch-1',
                    numberLabel: '02',
                    text: 'Developed a reusable UI kit for a consistent interface.',
                },
                {
                    id: 'onetouch-2',
                    numberLabel: '03',
                    text: 'Implemented messaging and order state management.',
                },
            ],
        },
        {
            id: 'immergas',
            title: 'Immergas',
            facts: [
                {
                    id: 'role',
                    label: 'MY ROLE',
                    value: 'Flutter developer',
                },
                {
                    id: 'platforms',
                    label: 'PLATFORMS',
                    value: 'iOS & Android',
                },
            ],
            contributions: [
                {
                    id: 'immergas-0',
                    numberLabel: '01',
                    text: 'Improved authentication and network error handling, QR and serial number verification.',
                },
                {
                    id: 'immergas-1',
                    numberLabel: '02',
                    text: 'Refactored installation photo workflows.',
                },
                {
                    id: 'immergas-2',
                    numberLabel: '03',
                    text: 'Introduced typed errors, BLoC states and shared UI components.',
                },
                {
                    id: 'immergas-3',
                    numberLabel: '04',
                    text: 'Added unit and widget tests for critical flows.',
                },
            ],
        },
    ],
};
const contacts: readonly ContactFixture[] = [
    {
        id: 'email',
        label: 'Email',
        description: 'ndynagn05@gmail.com',
        href: 'mailto:ndynagn05@gmail.com',
    },
    {
        id: 'telegram',
        label: 'Telegram',
        description: '@gen_aa',
        href: 'https://t.me/gen_aa',
        target: '_blank',
        rel: 'noreferrer',
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        description: 'Gennady Nagibin',
        href: 'https://www.linkedin.com/in/ndynagn',
        target: '_blank',
        rel: 'noreferrer',
    },
];

export function getContentElementFixtures(locale: Locale): ContentElementFixtures {
    return {
        experience: experience[locale],
        education: education[locale],
        courses: courses[locale],
        projectCases: projectCases[locale],
        contacts,
    };
}
