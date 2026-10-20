import type { JSX } from 'react';

import { ProjectCard } from '@/features/portfolio/cards';
import type { ProjectFilterOption } from '@/features/portfolio/filters';
import type { Locale } from '@/shared/i18n/locales';

import { getProjectFilterFixtures } from './project-card-fixtures';
import { parseProjectFilterCategory } from './project-filter-category';
import { ProjectFilterDemo } from './project-filter-demo';

interface ProjectFilterSamplesProps {
    readonly locale: Locale;
    readonly initialCategory?: string;
}

export function ProjectFilterSamples({
    locale,
    initialCategory,
}: ProjectFilterSamplesProps): JSX.Element {
    const ru = locale === 'ru';
    const fixtures = getProjectFilterFixtures(locale);
    const options: readonly ProjectFilterOption[] = [
        {
            value: 'all',
            label: ru ? 'Все проекты' : 'All projects',
            countLabel: String(fixtures.length).padStart(2, '0'),
        },
        {
            value: 'commerce',
            label: ru ? 'Коммерция' : 'Commerce',
            countLabel: String(
                fixtures.filter((item) => item.category === 'commerce').length,
            ).padStart(2, '0'),
        },
        {
            value: 'service',
            label: ru ? 'Сервисы' : 'Services',
            countLabel: String(
                fixtures.filter((item) => item.category === 'service').length,
            ).padStart(2, '0'),
        },
    ];

    return (
        <section
            aria-labelledby="project-filters"
            className="grid min-w-0 gap-8"
            data-project-filter-samples
        >
            <h2 id="project-filters" className="text-2xl">
                {ru ? 'Фильтры проектов' : 'Project filters'}
            </h2>
            <p className="max-w-[75ch] text-sm text-muted-foreground">
                {ru
                    ? 'Технические fixtures исходника: 8 проектов, по 4 в каждой категории. Выбор хранится в kitCategory; без JavaScript работает GET-форма. Публичный каталог не изменяется.'
                    : 'Technical archive fixtures: 8 projects, 4 per category. Selection lives in kitCategory; a GET form works without JavaScript. The public catalogue is unchanged.'}
            </p>
            <ProjectFilterDemo
                initialCategory={parseProjectFilterCategory(initialCategory)}
                options={options}
                label={ru ? 'Фильтр проектов' : 'Filter projects'}
                action={`/${locale}/design-system#project-filters`}
                items={fixtures.map((fixture) => ({
                    id: fixture.id,
                    category: fixture.category,
                    content: (
                        <ProjectCard
                            data={fixture.data}
                            headingLevel={3}
                            cursorLabel={ru ? 'Смотреть' : 'Explore'}
                        />
                    ),
                }))}
            />
        </section>
    );
}
