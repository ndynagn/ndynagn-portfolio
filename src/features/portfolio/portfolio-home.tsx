import type { JSX } from 'react';
import { ArrowUpRight } from 'lucide-react';

import {
    courses,
    education,
    experience,
    getFeaturedProjects,
    getProfile,
    getProjects,
} from '@/features/content/server';
import { cataloguePath, type Locale } from '@/shared/i18n/locales';
import { getPortfolioDictionary } from '@/shared/i18n/portfolio';
import { cn } from '@/shared/ui/cn';
import { TextLink } from '@/shared/ui/text-link';

import { ProjectCard } from './cards';
import { ContactSection } from './contact-section';
import { SectionHeading } from './content-elements';
import { HomeHero } from './home-hero';
import { HomeAbout } from './home-about';
import { HomeExperience } from './home-experience';
import { PageShell, pageContainer, sectionTarget, sectionTitle } from './page-shell';
import { projectCardData } from './project-display';
import type { NavigationLink } from './navigation';

interface PortfolioHomeProps {
    readonly locale: Locale;
}

export function PortfolioHome({ locale }: PortfolioHomeProps): JSX.Element {
    const copy = getPortfolioDictionary(locale);
    const profile = getProfile(locale);
    const featured = getFeaturedProjects(locale);
    const projects = getProjects(locale);
    if (!profile) {
        return (
            <main id="main" tabIndex={-1} className={cn(pageContainer, 'py-40')}>
                <h1>{copy.unavailable}</h1>
            </main>
        );
    }

    // Localize once so section rendering and navigation share the same availability.
    const work = experience.flatMap((record) => {
        const translation = record.translations[locale];
        return translation ? [{ record, translation }] : [];
    });
    const localizedEducation = education.flatMap((record) => {
        const translation = record.translations[locale];
        return translation ? [{ record, translation }] : [];
    });
    const localizedCourses = courses.flatMap((record) => {
        const translation = record.translations[locale];
        return translation ? [{ record, translation }] : [];
    });
    const hasExperience = work.length + localizedEducation.length + localizedCourses.length > 0;
    const projectsAction =
        featured.length > 0
            ? { href: '#work', label: copy.explore, animateRoute: false }
            : projects.length > 0
              ? { href: cataloguePath(locale), label: copy.all, animateRoute: true }
              : undefined;
    const homeLinks: readonly NavigationLink[] = [
        { key: 'home', label: copy.home, href: '#home' },
        ...(projectsAction
            ? [
                  {
                      key: 'work',
                      label: copy.projects,
                      href: projectsAction.href,
                      animateRoute: projectsAction.animateRoute,
                  },
              ]
            : []),
        { key: 'about', label: copy.about, href: '#about' },
        ...(hasExperience
            ? [{ key: 'experience', label: copy.experience, href: '#experience' }]
            : []),
        { key: 'contact', label: copy.contact, href: '#contact' },
    ];

    return (
        <PageShell locale={locale} homeLinks={homeLinks}>
            <main id="main" tabIndex={-1} className={sectionTarget}>
                <HomeHero locale={locale} profile={profile} projectsAction={projectsAction} />
                {featured.length > 0 && (
                    <section
                        id="work"
                        tabIndex={-1}
                        aria-labelledby="work-title"
                        className={cn(
                            pageContainer,
                            sectionTarget,
                            'pt-18.25 pb-15 md:pt-26.25 md:pb-24.5',
                        )}
                    >
                        <SectionHeading
                            label={copy.selected}
                            indexLabel="01 /"
                            aside={copy.period}
                            className="mb-6.5 md:mb-9.5"
                        />
                        <div className="mb-7 grid grid-cols-1 gap-5 md:mb-11.75 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-7.5">
                            <h2 id="work-title" className={sectionTitle}>
                                {copy.workTitleOne}
                                <br />
                                <span className="text-muted-foreground">{copy.workTitleTwo}</span>
                            </h2>
                            <p className="text-[0.6875rem] leading-[1.9] whitespace-pre-line text-muted-foreground md:max-w-75 md:pb-1.75">
                                {copy.workIntro}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-3 md:gap-6">
                            {featured.map((record, index) => (
                                <ProjectCard
                                    key={record.project.id}
                                    data={projectCardData(record, locale, index, projects.length)}
                                    variant="featured"
                                    cursorLabel={copy.view}
                                />
                            ))}
                        </div>
                        <TextLink
                            variant="index"
                            href={cataloguePath(locale)}
                            count={projects.length}
                            data-portfolio-route
                            data-cursor="page"
                            data-cursor-label={copy.projects}
                            icon={<ArrowUpRight />}
                            className="mt-4.5 md:mt-7"
                        >
                            {copy.all}
                        </TextLink>
                    </section>
                )}
                <HomeAbout locale={locale} profile={profile} />
                <HomeExperience
                    locale={locale}
                    work={work}
                    education={localizedEducation}
                    courses={localizedCourses}
                    projects={projects}
                />
                <ContactSection locale={locale} />
            </main>
        </PageShell>
    );
}
