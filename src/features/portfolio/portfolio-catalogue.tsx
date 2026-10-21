import type { JSX } from 'react';

import { getProjects } from '@/features/content/server';
import { AnimatedItems } from '@/shared/animation/animated-items';
import { cataloguePath, type Locale } from '@/shared/i18n/locales';
import { getPortfolioDictionary } from '@/shared/i18n/portfolio';
import { cn } from '@/shared/ui/cn';
import { StatusLabel } from '@/shared/ui/status-label';

import { ProjectCard } from './cards';
import { CatalogueFilters } from './catalogue-filters';
import { ContactSection } from './contact-section';
import { SectionHeading } from './content-elements';
import { PageShell, pageContainer, sectionTarget } from './page-shell';
import { type ProjectCategory } from './project-category';
import { projectCardData } from './project-display';

interface PortfolioCatalogueProps {
    readonly locale: Locale;
    readonly category: ProjectCategory;
}

export function PortfolioCatalogue({ locale, category }: PortfolioCatalogueProps): JSX.Element {
    const copy = getPortfolioDictionary(locale);
    const projects = getProjects(locale);
    const categories = [
        { value: 'all', label: copy.all },
        { value: 'commerce', label: copy.commerce },
        { value: 'service', label: copy.service },
    ];
    const options = categories.map((option) => ({
        ...option,
        countLabel: String(
            projects.filter(
                ({ project }) => option.value === 'all' || project.category === option.value,
            ).length,
        ).padStart(2, '0'),
    }));
    const items = projects.flatMap((record, index) =>
        category === 'all' || record.project.category === category
            ? [
                  {
                      id: record.project.id,
                      content: (
                          <ProjectCard
                              data={projectCardData(record, locale, index, projects.length)}
                              cursorLabel={copy.view}
                              headingLevel={2}
                          />
                      ),
                  },
              ]
            : [],
    );

    return (
        <PageShell locale={locale} catalogue category={category}>
            <main id="main" tabIndex={-1} className={sectionTarget}>
                <section
                    id="projects"
                    tabIndex={-1}
                    aria-labelledby="catalogue-title"
                    className={cn(
                        pageContainer,
                        sectionTarget,
                        'min-h-[70vh] pt-31.75 pb-15 md:pt-42.5 md:pb-25',
                    )}
                >
                    <SectionHeading
                        label={copy.catalogueEyebrow}
                        aside={<StatusLabel variant="portfolio">{copy.evolving}</StatusLabel>}
                        className="mb-6.5 md:mb-9.5"
                    />
                    <h1
                        id="catalogue-title"
                        className="text-design-page leading-[1.1] font-medium tracking-[-0.07em]"
                    >
                        {copy.catalogueOne}
                        <br />
                        <span className="text-muted-foreground">{copy.catalogueTwo}</span>
                        <sup className="mt-2.5 ml-2.5 inline-block align-top text-[0.8125rem]/0 tracking-tighter md:mt-5 md:ml-5 md:text-xl/0">
                            ({String(projects.length).padStart(2, '0')})
                        </sup>
                    </h1>
                    <div className="mt-6 flex items-end justify-between gap-5 md:mt-7.5">
                        <p className="max-w-70 text-[0.6875rem] leading-[1.9] whitespace-normal text-muted-foreground md:max-w-none md:text-[0.8125rem] md:whitespace-pre-line">
                            {copy.catalogueIntro}
                        </p>
                        <span className="hidden text-[0.625rem] font-semibold tracking-[0.13em] text-muted-foreground md:block">
                            FLUTTER · iOS &amp; ANDROID
                        </span>
                    </div>
                    <CatalogueFilters
                        action={cataloguePath(locale)}
                        value={category}
                        label={copy.filter}
                        options={options}
                    />
                    <div aria-live="polite" aria-atomic="true" className="sr-only">
                        {copy.results}: {items.length}
                    </div>
                    {items.length > 0 ? (
                        <AnimatedItems
                            items={items}
                            className="grid-cols-1 gap-x-7 gap-y-7.5 md:grid-cols-2 md:gap-y-10.75"
                        />
                    ) : (
                        <p className="py-10 text-sm text-muted-foreground">{copy.empty}</p>
                    )}
                </section>
                <ContactSection locale={locale} />
            </main>
        </PageShell>
    );
}
