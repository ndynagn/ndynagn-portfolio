import type { JSX } from 'react';
import { ArrowUpRight } from 'lucide-react';

import type { Education, Experience, LocalizedProject } from '@/features/content/models';
import { projectPath, type Locale } from '@/shared/i18n/locales';
import { getPortfolioDictionary } from '@/shared/i18n/portfolio';
import { cn } from '@/shared/ui/cn';
import { TextLink } from '@/shared/ui/text-link';

import { EducationEntry, ExperienceEntry, SectionHeading } from './content-elements';
import { pageContainer, sectionTarget } from './page-shell';

interface HomeExperienceProps {
    readonly locale: Locale;
    readonly work: readonly {
        readonly record: Experience;
        readonly translation: NonNullable<Experience['translations'][Locale]>;
    }[];
    readonly education: readonly LocalizedEducation[];
    readonly courses: readonly LocalizedEducation[];
    readonly projects: readonly LocalizedProject[];
}

interface LocalizedEducation {
    readonly record: Education;
    readonly translation: NonNullable<Education['translations'][Locale]>;
}

export function HomeExperience({
    locale,
    work,
    education,
    courses,
    projects,
}: HomeExperienceProps): JSX.Element {
    const copy = getPortfolioDictionary(locale);
    const educationGroups = [
        {
            label: copy.education,
            records: education,
            padding: 'pt-8.75 md:pt-15',
            labelPadding: 'md:pt-1',
        },
        {
            label: copy.courses,
            records: courses,
            padding: 'pt-3.75 md:pt-5.75',
            labelPadding: 'pt-1',
        },
    ];

    return (
        <>
            {(work.length > 0 || education.length > 0 || courses.length > 0) && (
                <section
                    id="experience"
                    tabIndex={-1}
                    aria-labelledby="experience-title"
                    className={cn(
                        pageContainer,
                        sectionTarget,
                        'border-t pt-10 pb-13.75 md:pt-16 md:pb-22.5',
                    )}
                >
                    <SectionHeading
                        label={copy.growth}
                        indexLabel="03 /"
                        className="mb-6.5 md:mb-9.5"
                    />
                    <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 md:gap-8.75 md:pt-3.75 lg:gap-13.75">
                        <h2
                            id="experience-title"
                            className="min-w-0 text-[clamp(2rem,3.3vw,3.4375rem)] leading-[1.22] font-medium tracking-[-0.055em] wrap-anywhere"
                        >
                            {copy.journey}
                            <span aria-hidden="true" className="text-(--decorative-muted)">
                                .
                            </span>
                        </h2>
                        <div className="grid gap-8.75">
                            {work.map(({ record, translation }) => (
                                <ExperienceEntry
                                    key={record.id}
                                    periodLabel={translation.periodLabel}
                                    organization={translation.organizationLabel}
                                    role={translation.role}
                                    description={translation.description}
                                    projectLines={translation.projectLines}
                                    action={
                                        record.projectSlug &&
                                        translation.actionLabel &&
                                        projects.some(
                                            ({ project }) => project.slug === record.projectSlug,
                                        ) ? (
                                            <TextLink
                                                href={projectPath(locale, record.projectSlug)}
                                                data-portfolio-route
                                                data-cursor="page"
                                                data-cursor-label={copy.view}
                                                icon={<ArrowUpRight />}
                                                className="mt-5"
                                            >
                                                {translation.actionLabel}
                                            </TextLink>
                                        ) : undefined
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    {educationGroups.map((group) => {
                        const entries = group.records;
                        return (
                            entries.length > 0 && (
                                <div
                                    key={group.label}
                                    className={cn(
                                        'grid grid-cols-1 gap-5.75 md:grid-cols-2 md:gap-8.75 lg:gap-13.75',
                                        group.padding,
                                    )}
                                >
                                    <h3
                                        className={cn(
                                            'text-[0.5rem] leading-[1.6] font-semibold tracking-[0.13em] md:text-[0.625rem]',
                                            group.labelPadding,
                                        )}
                                    >
                                        {group.label}
                                    </h3>
                                    <div>
                                        {entries.map(({ record, translation }, index) => (
                                            <EducationEntry
                                                key={record.id}
                                                yearLabel={record.year}
                                                {...translation}
                                                headingLevel={4}
                                                className={
                                                    index > 0 ? 'border-t pt-6.25' : undefined
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        );
                    })}
                </section>
            )}
        </>
    );
}
