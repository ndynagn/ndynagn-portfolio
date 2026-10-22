import type { JSX } from 'react';

import type { ProfileTranslation } from '@/features/content/models';
import { skills } from '@/features/content/server';
import type { Locale } from '@/shared/i18n/locales';
import { getPortfolioDictionary } from '@/shared/i18n/portfolio';
import { cn } from '@/shared/ui/cn';
import { TechnologyTag } from '@/shared/ui/technology-tag';

import { SectionHeading } from './content-elements';
import { pageContainer, sectionTarget } from './page-shell';

interface HomeAboutProps {
    readonly locale: Locale;
    readonly profile: ProfileTranslation;
}

export function HomeAbout({ locale, profile }: HomeAboutProps): JSX.Element {
    const copy = getPortfolioDictionary(locale);
    return (
        <section
            id="about"
            tabIndex={-1}
            aria-labelledby="about-title"
            className={cn(
                pageContainer,
                sectionTarget,
                'border-t pt-10 pb-13.75 md:pt-16 md:pb-21.25',
            )}
        >
            <SectionHeading
                label={copy.aboutEyebrow}
                indexLabel="02 /"
                aside={copy.human}
                className="mb-6.5 md:mb-9.5"
            />
            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 md:gap-8.75 md:pt-3.25 lg:gap-13.75">
                <h2
                    id="about-title"
                    className="text-[2.125rem] leading-[1.22] font-medium tracking-[-0.055em] md:text-[clamp(1.875rem,3.4vw,3.5rem)]"
                >
                    {copy.aboutOne}
                    <br />
                    <span className="text-muted-foreground">{copy.aboutTwo}</span>
                </h2>
                <div className="min-w-0">
                    {profile.about.map((paragraph, index) => (
                        <p
                            key={paragraph}
                            className={cn(
                                index === 0
                                    ? 'text-[1.3125rem] leading-[1.6] font-[450] tracking-[-0.027em] lg:text-2xl lg:leading-[1.55]'
                                    : 'mt-4.25 text-xs leading-[1.95] text-muted-foreground md:mt-5.5 md:text-[0.8125rem]',
                            )}
                        >
                            {paragraph}
                        </p>
                    ))}
                    <div className="mt-6.25 grid grid-cols-2 gap-5 border-t pt-6 text-[0.6875rem] leading-[1.9] md:mt-7.5">
                        <p>
                            {profile.location}
                            <span className="block text-[0.625rem] text-muted-foreground">
                                {profile.workFormat}
                            </span>
                        </p>
                        <p>
                            {profile.languages.map((language) => (
                                <span key={language} className="block">
                                    {language}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
            {skills.length > 0 && (
                <div className="mt-8.75 grid gap-4.5 md:mt-15.5 md:grid-cols-[1fr_2fr] md:gap-7.5">
                    <h3 className="text-[0.5rem] leading-[1.6] font-semibold tracking-[0.13em] md:pt-3.25 md:text-[0.625rem]">
                        {copy.toolkit}
                    </h3>
                    <ul className="flex flex-wrap gap-1.75 md:gap-2.25">
                        {skills.map((skill) => (
                            <li key={skill}>
                                <TechnologyTag>{skill}</TechnologyTag>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
