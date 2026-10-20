import type { JSX } from 'react';

import { ProjectCover } from '@/features/portfolio/covers';
import type { Locale } from '@/shared/i18n/locales';

import { getProjectCoverFixtures } from './project-card-fixtures';

interface ProjectCoverSamplesProps {
    readonly locale: Locale;
}

export function ProjectCoverSamples({ locale }: ProjectCoverSamplesProps): JSX.Element {
    const ru = locale === 'ru';
    const covers = getProjectCoverFixtures(locale);

    return (
        <section
            aria-labelledby="project-covers"
            className="grid min-w-0 gap-8"
            data-project-cover-samples
        >
            <h2 id="project-covers" className="text-2xl">
                {ru ? 'Обложки кейсов' : 'Case covers'}
            </h2>
            <p className="max-w-[75ch] text-sm text-muted-foreground">
                {ru
                    ? 'Технические fixtures из архива: восемь статичных обложек на полной ширине. Периоды и слоганы воспроизводят исходник и не публикуются в каталоге.'
                    : 'Technical archive fixtures: eight static full-width covers. Periods and taglines reproduce the source without publishing catalogue records.'}
            </p>
            <div className="grid min-w-0 gap-8" data-cover-fixtures>
                {covers.map((data) => (
                    <ProjectCover key={data.palette} data={data} headingLevel={3} />
                ))}
            </div>
            <div className="grid min-w-0 gap-6" data-cover-technical>
                <h3 className="text-base">
                    {ru
                        ? 'Длинные подписи и пустой titleLines'
                        : 'Long labels and empty titleLines'}
                </h3>
                <ProjectCover
                    headingLevel={4}
                    data={{
                        ...covers[0],
                        title: ru
                            ? 'Технический образец обложки с длинным названием и проверкой переноса'
                            : 'Technical cover sample with a long title and text wrapping',
                        titleLines: [],
                        categoryLabel: ru
                            ? 'Длинная категория технического проекта для проверки переноса метаданных'
                            : 'A long technical project category to check metadata wrapping',
                        periodLabel: ru
                            ? 'Технический период: продолжительный этап разработки и сопровождения'
                            : 'Technical period: an extended development and maintenance phase',
                        tagline: ru
                            ? 'Технический образец: длинный слоган и НеразрывноеСловоДляПроверкиПереносаТекстаБезОбрезания. Проверка увеличения текста до 200%.'
                            : 'Technical fixture: a long tagline and AnUnbrokenWordToVerifyTextWrappingWithoutClipping. Checking text enlargement to 200%.',
                        counterLabel: '101 / 128',
                    }}
                />
            </div>
        </section>
    );
}
