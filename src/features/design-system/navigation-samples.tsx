import type { JSX } from 'react';

import type { Locale } from '@/shared/i18n/locales';
import { ThemeToggle } from '@/shared/theme/theme-toggle';
import { LanguageLinks } from '@/shared/ui/language-links';

import { NavigationDemo } from './navigation-demo';

interface NavigationSamplesProps {
    readonly locale: Locale;
}

const labels = {
    ru: {
        title: 'Навигация',
        hint: 'Технические образцы навигации главной, каталога и кейса. Прокрутите каждую область: панель уплотняется за 240 px, активная плашка следует за разделом. Это не страницы портфолио.',
        home: 'Главная',
        portfolio: 'Каталог',
        project: 'Кейс',
        menu: 'Меню',
        language: 'Язык',
        light: 'Светлая тема',
        dark: 'Тёмная тема',
        backHome: 'На главную',
        backPortfolio: 'Все проекты',
        homeLinks: ['Главная', 'Проекты', 'Обо мне', 'Опыт', 'Контакты'],
        portfolioLinks: ['Проекты', 'Контакты'],
        projectLinks: ['О проекте', 'Мой вклад', 'Галерея', 'Технологии'],
        description:
            'Локальная цель навигации. Ссылки, клавиатура и мобильное меню доступны без JavaScript. Содержание — технический образец для проверки стекла, активного пункта и прокрутки.',
    },
    en: {
        title: 'Navigation',
        hint: 'Technical home, catalogue and case navigation fixtures. Scroll each region: the header compacts over 240 px and the active pill follows the section. These are not portfolio pages.',
        home: 'Home',
        portfolio: 'Catalogue',
        project: 'Case',
        menu: 'Menu',
        language: 'Language',
        light: 'Light theme',
        dark: 'Dark theme',
        backHome: 'Back home',
        backPortfolio: 'All projects',
        homeLinks: ['Home', 'Projects', 'About', 'Experience', 'Contact'],
        portfolioLinks: ['Projects', 'Contact'],
        projectLinks: ['Overview', 'Contribution', 'Gallery', 'Technology'],
        description:
            'Local navigation destination. Links, keyboard access and the mobile menu work without JavaScript. This is a technical fixture for material, active-item and scroll checks.',
    },
};

const keys = {
    home: ['home', 'work', 'about', 'experience', 'contact'],
    portfolio: ['portfolio-projects', 'contact'],
    project: ['project-overview', 'project-contribution', 'project-gallery', 'project-technology'],
} as const;

export function NavigationSamples({ locale }: NavigationSamplesProps): JSX.Element {
    const copy = labels[locale];

    return (
        <section
            aria-labelledby="navigation"
            className="grid min-w-0 gap-8"
            data-navigation-samples
        >
            <h2 id="navigation" className="text-2xl">
                {copy.title}
            </h2>
            <p className="max-w-[75ch] text-sm text-muted-foreground">{copy.hint}</p>
            {(['home', 'portfolio', 'project'] as const).map((kind) => (
                <div key={kind} className="grid min-w-0 gap-4">
                    <h3 className="text-base">{copy[kind]}</h3>
                    <NavigationDemo
                        kind={kind}
                        label={`${copy.title} · ${copy[kind]}`}
                        menuLabel={copy.menu}
                        description={copy.description}
                        links={keys[kind].map((key, index) => ({
                            key,
                            label: copy[`${kind}Links`][index],
                            href: `#navigation-${kind}-${key}`,
                        }))}
                        backLink={
                            kind === 'home'
                                ? undefined
                                : {
                                      label:
                                          kind === 'project' ? copy.backPortfolio : copy.backHome,
                                      href: `#navigation-demo-${kind === 'project' ? 'portfolio' : 'home'}`,
                                      cursorLabel: kind === 'project' ? copy.portfolio : copy.home,
                                  }
                        }
                        controls={
                            <>
                                <LanguageLinks
                                    locale={locale}
                                    label={copy.language}
                                    hrefs={{
                                        ru: '/ru/design-system#navigation',
                                        en: '/en/design-system#navigation',
                                    }}
                                />
                                <ThemeToggle lightLabel={copy.light} darkLabel={copy.dark} />
                            </>
                        }
                    />
                </div>
            ))}
        </section>
    );
}
