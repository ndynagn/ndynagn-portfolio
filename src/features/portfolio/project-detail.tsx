import type { JSX } from 'react';
import Link from 'next/link';

import type { LocalizedProject } from '@/features/content/models';
import { getProjectAlternatives } from '@/features/content/server';
import { getDictionary } from '@/shared/i18n/dictionaries';
import { homePath, locales, type Locale } from '@/shared/i18n/locales';
import { LanguageSwitcher } from '@/shared/i18n/language-switcher';

interface ProjectDetailProps {
    readonly locale: Locale;
    readonly record: LocalizedProject;
}

export function ProjectDetail({ locale, record }: ProjectDetailProps): JSX.Element {
    const dictionary = getDictionary(locale);
    const { project, translation } = record;
    const alternatives = getProjectAlternatives(project.slug);

    return (
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b py-5">
                <Link className="text-sm underline underline-offset-4" href={homePath(locale)}>
                    {dictionary.backToHome}
                </Link>
                <LanguageSwitcher
                    locale={locale}
                    label={dictionary.languageNavigation}
                    destinations={Object.fromEntries(
                        locales.map((target) => [target, alternatives[target] ?? homePath(target)]),
                    )}
                />
            </header>
            <main id="main" tabIndex={-1} className="space-y-10 py-16 outline-none">
                <article className="space-y-10">
                    <header className="space-y-5">
                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                            {translation.title}
                        </h1>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            {translation.summary}
                        </p>
                        {project.technologies.length > 0 && (
                            <ul className="flex flex-wrap gap-2">
                                {project.technologies.map((technology) => (
                                    <li
                                        key={technology}
                                        className="rounded-md bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                                    >
                                        {technology}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </header>
                    {translation.sections.map((section, index) => (
                        <section key={`${index}-${section.heading}`} className="space-y-4">
                            <h2 className="text-2xl font-semibold">{section.heading}</h2>
                            {section.paragraphs.map((paragraph, paragraphIndex) => (
                                <p key={paragraphIndex} className="leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </section>
                    ))}
                    {(project.websiteUrl || project.sourceUrl) && (
                        <footer className="flex flex-wrap gap-5">
                            {project.websiteUrl && (
                                <a
                                    className="underline underline-offset-4"
                                    href={project.websiteUrl}
                                >
                                    {dictionary.website}
                                </a>
                            )}
                            {project.sourceUrl && (
                                <a
                                    className="underline underline-offset-4"
                                    href={project.sourceUrl}
                                >
                                    {dictionary.source}
                                </a>
                            )}
                        </footer>
                    )}
                </article>
            </main>
        </div>
    );
}
