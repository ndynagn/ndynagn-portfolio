import type { JSX } from 'react';
import { ArrowUpRight } from 'lucide-react';

import {
    ContributionList,
    EducationEntry,
    ExperienceEntry,
    ProjectFacts,
    SectionHeading,
} from '@/features/portfolio/content-elements';
import type { Locale } from '@/shared/i18n/locales';
import { StatusLabel } from '@/shared/ui/status-label';
import { TextLink } from '@/shared/ui/text-link';

import { getContentElementFixtures } from './content-element-fixtures';

interface ContentElementSamplesProps {
    readonly locale: Locale;
}

export function ContentElementSamples({ locale }: ContentElementSamplesProps): JSX.Element {
    const ru = locale === 'ru';
    const copy = getContentElementFixtures(locale);

    return (
        <section
            aria-labelledby="content-elements"
            className="grid min-w-0 gap-10"
            data-content-element-samples
        >
            <h2 id="content-elements" className="text-2xl">
                {ru ? 'Контентные элементы' : 'Content elements'}
            </h2>
            <p className="max-w-[75ch] text-sm text-muted-foreground">
                {ru
                    ? 'Технические fixtures из архива. Опыт, образование, контакты и факты воспроизводят исходник и не публикуются в профиле или каталоге.'
                    : 'Technical archive fixtures. Experience, education, contacts and facts reproduce the source without publishing profile or catalogue records.'}
            </p>
            <div className="grid min-w-0 gap-6" data-content-headings>
                <h3 className="text-base">{ru ? 'Строки секций' : 'Section labels'}</h3>
                <SectionHeading
                    indexLabel="01 /"
                    label={ru ? 'ИЗБРАННЫЕ РАБОТЫ' : 'SELECTED WORK'}
                    aside={ru ? '2023 — НАСТОЯЩЕЕ ВРЕМЯ' : '2023 — PRESENT'}
                />
                <SectionHeading
                    indexLabel="03 /"
                    label={ru ? 'ОПЫТ И РАЗВИТИЕ' : 'EXPERIENCE & GROWTH'}
                />
                <SectionHeading
                    indexLabel="04 /"
                    label={ru ? 'НА СВЯЗИ' : 'LET’S CONNECT'}
                    className="items-start md:items-center"
                    aside={
                        <StatusLabel variant="contact">
                            {ru ? 'Рассматриваю удалённую работу' : 'Open to remote work'}
                        </StatusLabel>
                    }
                />
            </div>
            <div className="grid min-w-0 gap-6 md:grid-cols-2 md:gap-[55px]">
                <h3 className="text-base">{ru ? 'Опыт' : 'Experience'}</h3>
                <div className="grid min-w-0 gap-[35px]" data-content-experience-fixtures>
                    {copy.experience.map((fixture) => (
                        <ExperienceEntry
                            key={fixture.id}
                            {...fixture.entry}
                            headingLevel={4}
                            action={
                                fixture.actionLabel ? (
                                    <TextLink
                                        variant="inline"
                                        href="#content-element-target"
                                        className="mt-5"
                                        data-cursor="page"
                                        data-cursor-label={ru ? 'Смотреть' : 'Explore'}
                                        icon={<ArrowUpRight />}
                                    >
                                        {fixture.actionLabel}
                                    </TextLink>
                                ) : undefined
                            }
                        />
                    ))}
                </div>
            </div>
            <div className="grid min-w-0 gap-6 md:grid-cols-2 md:gap-[55px]">
                <h3 className="text-base">{ru ? 'Образование' : 'Education'}</h3>
                <div className="min-w-0" data-content-education-fixtures>
                    {copy.education.map((fixture, index) => (
                        <EducationEntry
                            key={fixture.id}
                            {...fixture.entry}
                            headingLevel={4}
                            className={
                                index > 0
                                    ? 'border-t pt-[25px] forced-colors:border-[CanvasText]'
                                    : undefined
                            }
                        />
                    ))}
                </div>
            </div>
            <div className="grid min-w-0 gap-6 md:grid-cols-2 md:gap-[55px]">
                <h3 className="text-base">
                    {ru ? 'Курсы и сертификаты' : 'Courses & certificates'}
                </h3>
                <div className="min-w-0" data-content-course-fixtures>
                    {copy.courses.map((fixture) => (
                        <EducationEntry key={fixture.id} {...fixture.entry} headingLevel={4} />
                    ))}
                </div>
            </div>
            <div className="grid min-w-0 gap-6">
                <h3 className="text-base">{ru ? 'Контактные ссылки' : 'Contact links'}</h3>
                <div
                    className="grid min-w-0 gap-[22px] subpixel-antialiased md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
                    data-content-contact-fixtures
                >
                    {copy.contacts.map((contact) => (
                        <TextLink
                            key={contact.id}
                            variant="contact"
                            href={contact.href}
                            target={contact.target}
                            rel={contact.rel}
                            description={contact.description}
                            icon={<ArrowUpRight />}
                        >
                            {contact.label}
                        </TextLink>
                    ))}
                </div>
            </div>
            {copy.projectCases.map((project) => (
                <div
                    key={project.id}
                    className="grid min-w-0 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] md:gap-[60px]"
                    data-content-project={project.id}
                >
                    <h3 className="text-base">
                        {project.title} · {ru ? 'факты и вклад' : 'facts and contribution'}
                    </h3>
                    <div className="grid min-w-0 gap-8">
                        <ProjectFacts items={project.facts} />
                        <ContributionList items={project.contributions} />
                    </div>
                </div>
            ))}
            <div className="grid min-w-0 gap-6" data-content-technical>
                <h3 className="text-base">
                    {ru ? 'Длинные технические подписи' : 'Long technical labels'}
                </h3>
                <SectionHeading
                    indexLabel="101 /"
                    label={
                        ru
                            ? 'ТЕХНИЧЕСКИЙ ОБРАЗЕЦ С ДЛИННОЙ ПОДПИСЬЮ СЕКЦИИ'
                            : 'TECHNICAL FIXTURE WITH A LONG SECTION LABEL'
                    }
                    aside={
                        ru
                            ? 'ДОПОЛНИТЕЛЬНОЕ ПОЯСНЕНИЕ ДЛЯ ПРОВЕРКИ ПЕРЕНОСА'
                            : 'AN EXTENDED NOTE TO CHECK TEXT WRAPPING'
                    }
                />
                <div className="grid min-w-0 gap-8 md:grid-cols-2">
                    <ExperienceEntry
                        periodLabel={
                            ru
                                ? 'ТЕХНИЧЕСКИЙ ПЕРИОД: ДЛИТЕЛЬНЫЙ ЭТАП РАЗРАБОТКИ И СОПРОВОЖДЕНИЯ'
                                : 'TECHNICAL PERIOD: EXTENDED DEVELOPMENT AND MAINTENANCE'
                        }
                        organization={
                            ru
                                ? 'Технический образец организации с длинным названием'
                                : 'Technical organization fixture with an extended name'
                        }
                        role="Flutter / TypeScript / Native development"
                        description={
                            ru
                                ? 'Технический образец для проверки переносов и увеличения текста. НеразрывноеСловоБезОбрезанияСодержимого.'
                                : 'Technical fixture to check wrapping and enlarged text. AnUnbrokenWordWithoutClippingTheContent.'
                        }
                        currentLabel={
                            ru ? 'Техническая длинная отметка' : 'An extended technical badge'
                        }
                        headingLevel={4}
                    />
                    <EducationEntry
                        yearLabel="2028"
                        yearNote={ru ? 'техническое пояснение' : 'technical note'}
                        title={
                            ru
                                ? 'Техническое учебное заведение с длинным названием для проверки переносов'
                                : 'Technical educational institution with a long name to check wrapping'
                        }
                        description={
                            ru
                                ? 'Техническая образовательная программа и длинное пояснение направления подготовки.'
                                : 'Technical educational programme and an extended description of the field of study.'
                        }
                        headingLevel={4}
                    />
                </div>
                <ProjectFacts
                    items={[
                        {
                            id: 'long-role',
                            label: ru
                                ? 'ТЕХНИЧЕСКАЯ РОЛЬ И ЗОНА ОТВЕТСТВЕННОСТИ'
                                : 'TECHNICAL ROLE AND RESPONSIBILITIES',
                            value: ru
                                ? 'Длинное значение для проверки переноса метаданных без обрезания.'
                                : 'An extended value to check metadata wrapping without clipping.',
                        },
                        {
                            id: 'long-platform',
                            label: ru ? 'ПОДДЕРЖИВАЕМЫЕ ПЛАТФОРМЫ' : 'SUPPORTED PLATFORMS',
                            value: 'iOS / Android / Web / Desktop',
                        },
                    ]}
                />
                <ContributionList
                    items={[
                        {
                            id: 'long-contribution',
                            numberLabel: '101',
                            text: ru
                                ? 'Технический нумерованный вклад: длинный текст для проверки переноса, масштабирования и отсутствия наложений. НеразрывноеСловоДляПроверкиПереноса.'
                                : 'Technical numbered contribution: a long text to check wrapping, scaling and block separation. AnUnbrokenWordToCheckWrapping.',
                        },
                    ]}
                />
            </div>
            <p
                id="content-element-target"
                tabIndex={-1}
                className="scroll-mt-6 text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
                {ru ? 'Локальная техническая цель ссылки' : 'Local technical link destination'}
            </p>
        </section>
    );
}
