import type { JSX } from 'react';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';

import { getProfile, socialLinks } from '@/features/content/server';
import type { Locale } from '@/shared/i18n/locales';
import { getPortfolioDictionary } from '@/shared/i18n/portfolio';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/ui/cn';
import { StatusLabel } from '@/shared/ui/status-label';
import { TextLink } from '@/shared/ui/text-link';

import { SectionHeading } from './content-elements';
import { pageContainer, sectionTarget } from './page-shell';

interface ContactSectionProps {
    readonly locale: Locale;
}

export function ContactSection({ locale }: ContactSectionProps): JSX.Element {
    const copy = getPortfolioDictionary(locale);
    const profile = getProfile(locale);
    const email = socialLinks.find((link) => link.id === 'email');
    const hh = socialLinks.find((link) => link.id === 'hh');

    return (
        <section
            id="contact"
            tabIndex={-1}
            aria-labelledby="contact-title"
            className={cn(sectionTarget, 'bg-card pt-10 md:pt-15')}
        >
            <div className={pageContainer}>
                <SectionHeading
                    indexLabel="04 /"
                    label={copy.contactEyebrow}
                    aside={
                        profile && (
                            <StatusLabel variant="contact">{profile.availability}</StatusLabel>
                        )
                    }
                    className="mb-8.25 md:mb-11.25"
                />
                <div className="flex items-center justify-between gap-4">
                    <h2
                        id="contact-title"
                        className="min-w-0 text-[2.4375rem] leading-[1.22] font-medium tracking-[-0.065em] md:text-[clamp(2.8125rem,6.3vw,6.25rem)]"
                    >
                        {copy.contactOne}
                        <br />
                        <span className="text-muted-foreground">{copy.contactTwo}</span>
                    </h2>
                    {email && (
                        <Button asChild variant="round" size="orb" className="md:mr-[5%]">
                            <a
                                href={email.href}
                                aria-label={copy.emailAction}
                                data-analytics="contact_click"
                                data-link-id="email"
                            >
                                <ArrowUpRight aria-hidden="true" />
                            </a>
                        </Button>
                    )}
                </div>
                <p className="mt-6.25 max-w-80 text-[0.6875rem] leading-[1.95] whitespace-pre-line text-muted-foreground md:mt-7 md:max-w-none md:text-xs">
                    {copy.contactDescription}
                </p>
                <div className="mt-8.25 grid grid-cols-1 gap-5.5 pb-8.75 md:mt-13 md:grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,1fr))] md:gap-10 md:pb-15">
                    {socialLinks
                        .filter((link) => link.id !== 'hh')
                        .map((link) => (
                            <TextLink
                                key={link.id}
                                variant="contact"
                                href={link.href}
                                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                                rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                                description={
                                    link.id === 'email'
                                        ? link.href.slice(7)
                                        : link.id === 'telegram'
                                          ? '@gen_aa'
                                          : profile?.name
                                }
                                data-analytics="contact_click"
                                data-link-id={link.id}
                                icon={<ArrowUpRight />}
                            >
                                {link.labels[locale]}
                            </TextLink>
                        ))}
                </div>
                <div className="flex flex-wrap gap-x-6.25 gap-y-3.75 pb-7.5 md:gap-x-10 md:pb-10">
                    {profile?.cvPath && (
                        <TextLink
                            variant="underlined"
                            href={profile.cvPath}
                            download
                            data-analytics="cv_download"
                            icon={<Download />}
                        >
                            {copy.pdf}
                        </TextLink>
                    )}
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
                            {copy.currentCv}
                        </TextLink>
                    )}
                </div>
                <footer className="flex flex-wrap items-center justify-between gap-3.75 border-t py-4.75 text-[0.5rem] text-muted-foreground md:py-5.75 md:text-[0.5625rem]">
                    <span>
                        © {new Date().getFullYear()} {profile?.name}
                    </span>
                    <span className="hidden md:block">{copy.detail}</span>
                    <a href="#main" className="inline-flex items-center gap-2 py-2 md:gap-3.5">
                        {copy.top}
                        <ArrowDown
                            aria-hidden="true"
                            className="size-3.25 rotate-180 stroke-[1.5]"
                        />
                    </a>
                </footer>
            </div>
        </section>
    );
}
