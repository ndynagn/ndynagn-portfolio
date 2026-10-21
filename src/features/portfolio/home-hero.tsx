import type { JSX } from 'react';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';

import type { ProfileTranslation } from '@/features/content/models';
import { socialLinks } from '@/features/content/server';
import type { Locale } from '@/shared/i18n/locales';
import { getPortfolioDictionary } from '@/shared/i18n/portfolio';
import { Button } from '@/shared/ui/button';
import { StatusLabel } from '@/shared/ui/status-label';
import { TextLink } from '@/shared/ui/text-link';
import { cn } from '@/shared/ui/cn';

import { HomePhoto } from './home-photo';
import { pageContainer, sectionTarget } from './page-shell';

interface HomeHeroProps {
    readonly locale: Locale;
    readonly profile: ProfileTranslation;
}

export function HomeHero({ locale, profile }: HomeHeroProps): JSX.Element {
    const copy = getPortfolioDictionary(locale);
    const hh = socialLinks.find((link) => link.id === 'hh');

    return (
        <section
            id="home"
            tabIndex={-1}
            aria-labelledby="home-title"
            className={cn(
                pageContainer,
                sectionTarget,
                'flex flex-col pt-30.5 md:pt-36.25 md:pb-7 lg:min-h-[min(56.25rem,100svh)] lg:pt-41.5 2xl:pt-47.5',
            )}
        >
            <div className="mb-7.5 flex flex-wrap items-start justify-between gap-3.75 md:mb-8.75 md:items-center 2xl:mb-11.25">
                <span className="max-w-45 text-[0.5rem] leading-[1.6] font-semibold tracking-[0.13em] md:max-w-none md:text-[0.625rem]">
                    {profile.headline.toUpperCase()}
                </span>
                <StatusLabel variant="hero">{profile.availability}</StatusLabel>
            </div>
            <div className="grid flex-1 grid-cols-1 items-start gap-9.5 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:gap-[4%] lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-[5%]">
                <div className="min-w-0 pt-1">
                    <h1
                        id="home-title"
                        className="-ml-1 text-design-display leading-[1.03] font-[550] tracking-[-0.075em] md:-ml-1.75"
                    >
                        {profile.nameLines.map((line, index) => (
                            <span key={line} className="block">
                                {line}
                                {index === profile.nameLines.length - 1 && (
                                    <span aria-hidden="true" className="text-(--decorative-muted)">
                                        .
                                    </span>
                                )}
                            </span>
                        ))}
                    </h1>
                    <div className="mt-6.75 flex items-start gap-4.5 md:mt-6.25 md:gap-4 lg:mt-8.75 lg:gap-5.75 2xl:mt-11.25">
                        <span
                            aria-hidden="true"
                            className="mt-3.25 h-px w-8.75 shrink-0 bg-foreground"
                        />
                        <p className="max-w-110 text-design-lead leading-[1.65] font-[450] tracking-[-0.03em]">
                            {profile.summary}
                        </p>
                    </div>
                    <div className="mt-6.25 flex flex-wrap items-center gap-7 md:mt-6.75 md:gap-5 lg:mt-8.25 lg:gap-7 2xl:mt-10">
                        <Button variant="pill" size="action" asChild>
                            <a href="#work">
                                {copy.explore}
                                <ArrowDown aria-hidden="true" />
                            </a>
                        </Button>
                        {hh && (
                            <TextLink
                                variant="underlined"
                                href={hh.href}
                                target="_blank"
                                rel="noreferrer"
                                data-analytics="contact_click"
                                data-link-id={hh.id}
                                icon={<ArrowUpRight />}
                            >
                                {copy.hh}
                            </TextLink>
                        )}
                        {profile.cvPath && (
                            <TextLink
                                variant="underlined"
                                href={profile.cvPath}
                                download
                                data-analytics="cv_download"
                                icon={<Download />}
                            >
                                {copy.cv}
                            </TextLink>
                        )}
                    </div>
                </div>
                <HomePhoto alt={copy.photoAlt} failure={copy.photoFailure} badge={copy.badge} />
            </div>
            <div className="mt-7 flex items-start justify-between gap-3.75 border-t pt-5 md:mt-8.75 md:items-center md:pt-6.75 lg:mt-10.5">
                <TextLink variant="scroll" href="#about" iconPosition="start" icon={<ArrowDown />}>
                    {copy.meet}
                </TextLink>
                <div className="flex flex-col items-end gap-1.25 pt-0.5 text-right text-[0.5rem] text-muted-foreground md:flex-row md:items-center md:gap-3.75 lg:gap-6.75 lg:text-[0.5625rem]">
                    <span>{copy.since}</span>
                    <span
                        aria-hidden="true"
                        className="hidden text-base text-(--decorative-muted) md:block"
                    >
                        +
                    </span>
                    <span>iOS &amp; Android</span>
                    <span
                        aria-hidden="true"
                        className="hidden text-base text-(--decorative-muted) md:block"
                    >
                        +
                    </span>
                    <span className="hidden md:block">{copy.remote}</span>
                </div>
            </div>
        </section>
    );
}
