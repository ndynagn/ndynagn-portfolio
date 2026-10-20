import type { JSX } from 'react';

import { ProjectGallery } from '@/features/portfolio/gallery';
import type { Locale } from '@/shared/i18n/locales';

import { getGalleryFixtures, getGalleryLabels } from './gallery-fixtures';

interface GallerySamplesProps {
    readonly locale: Locale;
}

export function GallerySamples({ locale }: GallerySamplesProps): JSX.Element {
    const ru = locale === 'ru';
    const fixtures = getGalleryFixtures(locale);
    const labels = getGalleryLabels(locale);
    const first = fixtures[0].groups[0].images[0];
    const long = ru
        ? 'Длинная техническая подпись изображения для проверки увеличения текста, переноса и доступности управления'
        : 'An extended technical image caption to check enlarged text, wrapping and accessible controls';

    return (
        <section aria-labelledby="gallery" className="grid min-w-0 gap-10" data-gallery-samples>
            <h2 id="gallery" className="text-2xl">
                {ru ? 'Галерея проектов' : 'Project gallery'}
            </h2>
            <p className="max-w-[75ch] text-sm text-muted-foreground">
                {ru
                    ? 'Технические fixtures: 40 исходных изображений восьми проектов. Без JavaScript миниатюры ведут на оригиналы. Записи каталога не публикуются.'
                    : 'Technical fixtures: 40 source images across eight projects. Without JavaScript, thumbnails link to originals. No catalogue records are published.'}
            </p>
            {fixtures.map((project) => (
                <div
                    key={project.id}
                    className="grid min-w-0 gap-6"
                    data-gallery-project={project.id}
                >
                    <h3 className="text-base">{project.name}</h3>
                    <ProjectGallery
                        groups={project.groups}
                        name={project.name}
                        labels={labels}
                        headingLevel={4}
                    />
                </div>
            ))}
            <div className="grid min-w-0 gap-6" data-gallery-single>
                <h3 className="text-base">
                    {ru ? 'Один снимок и длинные подписи' : 'Single image and long captions'}
                </h3>
                <ProjectGallery
                    name={long}
                    labels={labels}
                    headingLevel={4}
                    groups={[
                        {
                            id: 'technical-single',
                            title: long,
                            images: [
                                {
                                    ...first,
                                    id: 'technical-single-image',
                                    caption: long,
                                    lightboxCaption: long,
                                },
                            ],
                        },
                    ]}
                />
            </div>
            <div className="grid min-w-0 gap-6" data-gallery-empty>
                <h3 className="text-base">{ru ? 'Пустая галерея' : 'Empty gallery'}</h3>
                <p className="text-sm text-muted-foreground">
                    {ru
                        ? 'Компонент ниже не создаёт разметку или остановки Tab.'
                        : 'The component below renders no markup or Tab stops.'}
                </p>
                <ProjectGallery name="Empty fixture" groups={[]} labels={labels} />
            </div>
            <div className="grid min-w-0 gap-6" data-gallery-error>
                <h3 className="text-base">
                    {ru ? 'Ошибка загрузки и повтор' : 'Load failure and retry'}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {ru
                        ? 'Намеренно отсутствующий ресурс показывает ошибку миниатюры и просмотра. Загрузку проверяем с ограничением скорости сети, восстановление — подменой ответа в браузерной проверке.'
                        : 'An intentionally missing resource demonstrates thumbnail and viewer failure. Loading is checked with network throttling, recovery with a browser-test response override.'}
                </p>
                <ProjectGallery
                    name={ru ? 'Техническая ошибка' : 'Technical failure'}
                    labels={labels}
                    headingLevel={4}
                    groups={[
                        {
                            id: 'technical-error',
                            title: ru ? 'Недоступный снимок' : 'Unavailable image',
                            images: [
                                {
                                    ...first,
                                    id: 'technical-error-image',
                                    src: '/__gallery-test-missing__.webp',
                                    thumbnail: '/__gallery-test-missing-thumb__.webp',
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </section>
    );
}
