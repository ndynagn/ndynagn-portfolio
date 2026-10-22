import type { JSX, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { LocalizedProject } from '@/features/content/models';
import { getNextProject, getProjects } from '@/features/content/server';
import { getDictionary } from '@/shared/i18n/dictionaries';
import { getGalleryLabels } from '@/shared/i18n/gallery';
import { projectPath, type Locale } from '@/shared/i18n/locales';
import { getPortfolioDictionary } from '@/shared/i18n/portfolio';
import { cn } from '@/shared/ui/cn';
import { TechnologyTag } from '@/shared/ui/technology-tag';
import { TextLink } from '@/shared/ui/text-link';

import { ContactSection } from './contact-section';
import { ContributionList, ProjectFacts } from './content-elements';
import { ProjectCover } from './covers';
import { ProjectGallery } from './gallery';
import { PageShell, pageContainer, sectionTarget } from './page-shell';
import { projectCardData, projectGalleryGroups } from './project-display';
import { PaletteSurface } from './visual';

interface ProjectDetailProps {
    readonly locale: Locale;
    readonly record: LocalizedProject;
}

function DetailSection({
    id,
    title,
    children,
}: {
    readonly id?: string;
    readonly title: string;
    readonly children: ReactNode;
}): JSX.Element {
    return (
        <section
            id={id}
            aria-label={title}
            tabIndex={id ? -1 : undefined}
            className={cn(
                sectionTarget,
                'mt-9.5 grid min-w-0 grid-cols-1 gap-5.5 md:mt-16.25 md:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] md:gap-15',
            )}
            data-case-section
        >
            <h2 className="text-[0.5rem] leading-[1.6] font-semibold tracking-[0.125em] uppercase md:pt-1.75 md:text-[0.625rem] md:tracking-[0.13em]">
                {title}
            </h2>
            <div className="min-w-0">{children}</div>
        </section>
    );
}

export function ProjectDetail({ locale, record }: ProjectDetailProps): JSX.Element {
    const dictionary = getDictionary(locale);
    const copy = getPortfolioDictionary(locale);
    const { project, translation } = record;
    const available = getProjects(locale);
    const index = available.findIndex(({ project: item }) => item.slug === project.slug);
    const next = getNextProject(locale, project.slug);
    const gallery = projectGalleryGroups(record, locale);
    const card = projectCardData(record, locale, index, available.length);
    const facts = [
        ...(translation.role
            ? [{ id: 'role', label: copy.role.toUpperCase(), value: translation.role }]
            : []),
        ...(project.platforms
            ? [{ id: 'platforms', label: copy.platforms.toUpperCase(), value: project.platforms }]
            : []),
    ];
    const links = [
        { key: 'project-overview', label: copy.overview, href: '#project-overview' },
        ...(translation.contributions.length
            ? [
                  {
                      key: 'project-contribution',
                      label: copy.contribution,
                      href: '#project-contribution',
                  },
              ]
            : []),
        ...(gallery.length
            ? [{ key: 'project-gallery', label: copy.gallery, href: '#project-gallery' }]
            : []),
        ...(project.technologies.length
            ? [{ key: 'project-technology', label: copy.technology, href: '#project-technology' }]
            : []),
    ];

    return (
        <PageShell locale={locale} projectSlug={project.slug} homeLinks={links}>
            <main id="main" tabIndex={-1} className={sectionTarget}>
                <article
                    className={cn(pageContainer, 'pt-31.75 pb-15 md:pt-42.5 md:pb-25')}
                    data-project-case={project.slug}
                >
                    <ProjectCover
                        data={{
                            ...card,
                            periodLabel: translation.periodLabel ?? '',
                            tagline: translation.tagline ?? translation.summary,
                        }}
                    />
                    <DetailSection id="project-overview" title={copy.projectEyebrow}>
                        <p className="text-[1.3125rem] leading-[1.6] font-[450] tracking-[-0.040625rem] md:text-2xl md:leading-[1.55]">
                            {translation.summary}
                        </p>
                        {facts.length > 0 && (
                            <ProjectFacts items={facts} className="mt-6.25 md:mt-8" />
                        )}
                    </DetailSection>
                    {translation.contributions.length > 0 && (
                        <DetailSection id="project-contribution" title={copy.contributionEyebrow}>
                            <ContributionList
                                items={translation.contributions.map((text, itemIndex) => ({
                                    id: `contribution-${itemIndex}`,
                                    numberLabel: String(itemIndex + 1).padStart(2, '0'),
                                    text,
                                }))}
                            />
                        </DetailSection>
                    )}
                    {translation.engineering && (
                        <DetailSection title={copy.engineering}>
                            <div className="border-t pt-6.25">
                                <h3 className="text-[1.6875rem] leading-[1.3] md:text-[clamp(1.5625rem,2.7vw,2.625rem)]">
                                    {translation.engineering.title}
                                </h3>
                                {(
                                    [
                                        [copy.context, translation.engineering.context],
                                        [copy.approach, translation.engineering.approach],
                                        [copy.outcome, translation.engineering.outcome],
                                    ] as const
                                ).map(([label, text]) => (
                                    <div key={label} className="mt-6.25">
                                        <h4 className="mb-2.25 text-[0.625rem] font-semibold text-muted-foreground">
                                            {label}
                                        </h4>
                                        <p className="text-[0.8125rem] leading-[1.9] text-muted-foreground">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </DetailSection>
                    )}
                    {gallery.length > 0 && (
                        <section
                            id="project-gallery"
                            aria-labelledby="gallery-title"
                            tabIndex={-1}
                            className={cn(
                                sectionTarget,
                                'mt-12.5 border-t pt-7.5 md:mt-22.5 md:pt-11.25',
                            )}
                        >
                            <div className="text-base leading-normal">
                                <span className="text-[0.5rem] leading-[1.6] font-semibold tracking-[0.125em] md:text-[0.625rem] md:tracking-[0.13em]">
                                    {copy.galleryEyebrow}
                                </span>
                            </div>
                            <h2
                                id="gallery-title"
                                className="mt-2.5 mb-6.25 text-[1.875rem] leading-[1.22] font-medium tracking-[-0.055em] md:mt-4 md:mb-8.75 md:text-[clamp(1.875rem,3.5vw,3.25rem)]"
                            >
                                {copy.galleryTitle}
                            </h2>
                            <ProjectGallery
                                key={`${locale}-${project.slug}`}
                                groups={gallery}
                                name={translation.title}
                                labels={getGalleryLabels(locale)}
                            />
                        </section>
                    )}
                    {project.technologies.length > 0 && (
                        <DetailSection id="project-technology" title={copy.technology}>
                            <ul role="list" className="flex list-none flex-wrap gap-2.5">
                                {project.technologies.map((technology) => (
                                    <li key={technology}>
                                        <TechnologyTag>{technology}</TechnologyTag>
                                    </li>
                                ))}
                            </ul>
                        </DetailSection>
                    )}
                    {(project.websiteUrl || project.sourceUrl) && (
                        <div className="mt-8.75 flex flex-wrap items-center gap-x-7.5 gap-y-4">
                            {project.websiteUrl && (
                                <TextLink
                                    href={project.websiteUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    variant="underlined"
                                    icon={<ArrowUpRight />}
                                >
                                    {dictionary.website}
                                </TextLink>
                            )}
                            {project.sourceUrl && (
                                <TextLink
                                    href={project.sourceUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    variant="underlined"
                                    icon={<ArrowUpRight />}
                                >
                                    {dictionary.source}
                                </TextLink>
                            )}
                        </div>
                    )}
                    {next && (
                        <PaletteSurface palette={next.project.palette}>
                            <Link
                                href={projectPath(locale, next.project.slug)}
                                data-next-project
                                data-portfolio-route
                                data-cursor="page"
                                data-cursor-label={copy.next}
                                className="mt-12.5 flex min-w-0 items-center justify-between gap-5 border-t pt-7 text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 md:mt-20 md:pt-8.75"
                            >
                                <span className="min-w-0 text-[2rem] leading-normal tracking-[-0.05em] wrap-anywhere md:text-[clamp(1.875rem,5vw,4.375rem)]">
                                    <span className="mb-3.5 block text-[0.5625rem] leading-normal font-semibold tracking-[0.0625rem] text-muted-foreground uppercase md:mb-4.5">
                                        {copy.nextProject}
                                    </span>
                                    {next.translation.title}
                                </span>
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="size-7.5 shrink-0 md:size-11.25"
                                />
                            </Link>
                        </PaletteSurface>
                    )}
                </article>
                <ContactSection locale={locale} />
            </main>
        </PageShell>
    );
}
