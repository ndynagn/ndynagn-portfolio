import type { JSX } from 'react';
import Link from 'next/link';

import { experience, getProfile, getProjects, socialLinks } from '@/features/content/server';
import { MotionSurface } from '@/shared/animation/motion-surface';
import { getDictionary } from '@/shared/i18n/dictionaries';
import { homePath, locales, projectPath, type Locale } from '@/shared/i18n/locales';
import { LanguageSwitcher } from '@/shared/i18n/language-switcher';

interface PortfolioHomeProps {
    readonly locale: Locale;
}

export function PortfolioHome({ locale }: PortfolioHomeProps): JSX.Element {
    const dictionary = getDictionary(locale);
    const profile = getProfile(locale);
    const projects = getProjects(locale);
    const localizedExperience = experience.flatMap((record) => {
        const translation = record.translations[locale];

        return translation ? [{ record, translation }] : [];
    });

    return (
        <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col px-5 sm:px-8">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b py-5">
                <span className="font-mono text-sm text-muted-foreground">ndynagn</span>
                <LanguageSwitcher
                    locale={locale}
                    label={dictionary.languageNavigation}
                    destinations={Object.fromEntries(
                        locales.map((target) => [target, homePath(target)]),
                    )}
                />
            </header>
            <main
                id="main"
                tabIndex={-1}
                className="flex flex-1 flex-col justify-center gap-12 py-16 outline-none sm:py-24"
            >
                <MotionSurface className="space-y-6">
                    {!profile && (
                        <p className="text-sm text-muted-foreground">{dictionary.setupLabel}</p>
                    )}
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                        {profile?.name ?? dictionary.heading}
                    </h1>
                    {profile && <p className="text-xl">{profile.headline}</p>}
                    <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                        {profile?.summary ?? dictionary.introduction}
                    </p>
                    {!profile && (
                        <p className="text-sm text-muted-foreground">{dictionary.contentNote}</p>
                    )}
                    {profile?.cvPath && (
                        <a
                            className="inline-block underline underline-offset-4"
                            href={profile.cvPath}
                            download
                        >
                            {dictionary.downloadCv}
                        </a>
                    )}
                </MotionSurface>
                {localizedExperience.length > 0 && (
                    <section aria-labelledby="experience" className="space-y-6">
                        <h2 id="experience" className="text-2xl font-semibold">
                            {dictionary.experience}
                        </h2>
                        {localizedExperience.map(({ record, translation }) => (
                            <article key={record.id} className="space-y-2">
                                <h3 className="font-medium">
                                    {translation.role} · {record.organization}
                                </h3>
                                <p className="text-sm text-muted-foreground">{record.period}</p>
                                <p>{translation.description}</p>
                            </article>
                        ))}
                    </section>
                )}
                {(['professional', 'pet'] as const).map((kind) => {
                    const items = projects.filter(({ project }) => project.kind === kind);

                    return items.length > 0 ? (
                        <section key={kind} aria-labelledby={kind} className="space-y-6">
                            <h2 id={kind} className="text-2xl font-semibold">
                                {kind === 'pet'
                                    ? dictionary.petProjects
                                    : dictionary.professionalProjects}
                            </h2>
                            <ul className="grid gap-6 sm:grid-cols-2">
                                {items.map(({ project, translation }) => (
                                    <li
                                        key={project.id}
                                        className="space-y-3 rounded-lg border p-5"
                                    >
                                        <h3 className="font-semibold">
                                            <Link
                                                className="underline underline-offset-4"
                                                href={projectPath(locale, project.slug)}
                                            >
                                                {translation.title}
                                            </Link>
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {translation.summary}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ) : null;
                })}
                {socialLinks.length > 0 && (
                    <section aria-labelledby="links" className="space-y-4">
                        <h2 id="links" className="text-2xl font-semibold">
                            {dictionary.links}
                        </h2>
                        <ul className="flex flex-wrap gap-5">
                            {socialLinks.map((link) => (
                                <li key={link.id}>
                                    <a className="underline underline-offset-4" href={link.href}>
                                        {link.labels[locale]}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </div>
    );
}
