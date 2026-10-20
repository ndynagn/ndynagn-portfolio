import type { JSX } from 'react';

import { ProjectCard } from '@/features/portfolio/cards';
import type { Locale } from '@/shared/i18n/locales';

import { getLongProjectCardFixture, getProjectCardFixtures } from './project-card-fixtures';

interface ProjectCardSamplesProps {
    readonly locale: Locale;
}

const labels = {
    ru: {
        title: 'Карточки проектов',
        hint: 'Технические fixtures из архива: восемь обычных и три избранных проекта. Данные не публикуются в каталоге. Наведение и клавиатурный фокус показывают одинаковые состояния; ссылки ведут к локальным целям стенда.',
        standard: 'Обычные карточки',
        featured: 'Избранные карточки',
        long: 'Длинные подписи и растущий каталог',
        targets: 'Локальные цели карточек',
        cursor: 'Смотреть',
        destination: 'Техническая цель ссылки',
        fallback: 'Пустой массив строк: используется название',
    },
    en: {
        title: 'Project cards',
        hint: 'Technical archive fixtures: eight standard and three featured projects. These do not publish catalogue records. Hover and keyboard focus share feedback; links lead to local workbench targets.',
        standard: 'Standard cards',
        featured: 'Featured cards',
        long: 'Long labels and a growing catalogue',
        targets: 'Local card targets',
        cursor: 'Explore',
        destination: 'Technical link destination',
        fallback: 'Empty title lines: the title is used',
    },
};

export function ProjectCardSamples({ locale }: ProjectCardSamplesProps): JSX.Element {
    const copy = labels[locale];
    const cards = getProjectCardFixtures(locale);
    const long = getLongProjectCardFixture(locale);

    return (
        <section
            aria-labelledby="project-cards"
            className="grid min-w-0 gap-8"
            data-project-card-samples
        >
            <h2 id="project-cards" className="text-2xl">
                {copy.title}
            </h2>
            <p className="max-w-[75ch] text-sm text-muted-foreground">{copy.hint}</p>
            <div className="grid min-w-0 gap-6">
                <h3 className="text-base">{copy.standard}</h3>
                <ul
                    className="grid min-w-0 grid-cols-1 gap-x-7 gap-y-[30px] md:grid-cols-2 md:gap-y-[43px]"
                    data-card-grid="standard"
                >
                    {cards.map((data) => (
                        <li key={data.href} className="min-w-0">
                            <ProjectCard data={data} headingLevel={4} cursorLabel={copy.cursor} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid min-w-0 gap-6">
                <h3 className="text-base">{copy.featured}</h3>
                <ul
                    className="grid min-w-0 grid-cols-1 gap-[30px] md:grid-cols-3 md:gap-6"
                    data-card-grid="featured"
                >
                    {cards.slice(0, 3).map((data) => (
                        <li key={data.href} className="min-w-0">
                            <ProjectCard
                                data={data}
                                variant="featured"
                                headingLevel={4}
                                cursorLabel={copy.cursor}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid min-w-0 gap-6">
                <h3 className="text-base">{copy.long}</h3>
                <div className="grid min-w-0 gap-7 md:grid-cols-2" data-card-grid="technical">
                    <ProjectCard data={long} headingLevel={4} cursorLabel={copy.cursor} />
                    <ProjectCard
                        data={{ ...long, title: copy.fallback, titleLines: [] }}
                        variant="featured"
                        headingLevel={4}
                        cursorLabel={copy.cursor}
                    />
                </div>
            </div>
            <div className="grid gap-3 border-t pt-6">
                <h3 className="text-base">{copy.targets}</h3>
                {[...cards, long].map((data) => (
                    <p
                        key={data.href}
                        id={data.href.slice(1)}
                        tabIndex={-1}
                        className="scroll-mt-6 text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                    >
                        {copy.destination} · {data.title}
                    </p>
                ))}
            </div>
        </section>
    );
}
