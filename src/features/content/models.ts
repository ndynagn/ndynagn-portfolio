import type { Locale } from '@/shared/i18n/locales';

export interface ProfileTranslation {
    readonly published: boolean;
    readonly name: string;
    readonly headline: string;
    readonly summary: string;
    readonly cvPath?: string;
    readonly nameLines: readonly string[];
    readonly about: readonly string[];
    readonly location: string;
    readonly workFormat: string;
    readonly languages: readonly string[];
    readonly availability: string;
}

export interface Profile {
    readonly translations: Readonly<Partial<Record<Locale, ProfileTranslation>>>;
}

export interface Experience {
    readonly id: string;
    readonly organization: string;
    readonly period: string;
    readonly projectSlug?: string;
    readonly translations: Readonly<
        Partial<
            Record<
                Locale,
                {
                    readonly role: string;
                    readonly organizationLabel: string;
                    readonly actionLabel?: string;
                    readonly description: string;
                    readonly periodLabel: string;
                    readonly projectLines: readonly string[];
                }
            >
        >
    >;
}

export interface SocialLink {
    readonly id: string;
    readonly href: string;
    readonly labels: Readonly<Record<Locale, string>>;
}

export interface ProjectTranslation {
    readonly published: boolean;
    readonly title: string;
    readonly summary: string;
    readonly sections: readonly {
        readonly heading: string;
        readonly paragraphs: readonly string[];
    }[];
}

export interface Project {
    readonly id: string;
    readonly slug: string;
    readonly kind: 'professional' | 'pet';
    readonly technologies: readonly string[];
    readonly category: 'commerce' | 'service';
    readonly palette:
        | 'onetouch'
        | 'potlucky'
        | 'immergas'
        | 'klimatprof'
        | 'checkai'
        | 'galleria-minsk'
        | 'golden-plate'
        | 'aventin';
    readonly titleLines: Readonly<Record<Locale, readonly string[]>>;
    readonly platforms: string;
    readonly eyebrow: string;
    readonly labels: Readonly<Record<Locale, string>>;
    readonly websiteUrl?: string;
    readonly sourceUrl?: string;
    readonly translations: Readonly<Partial<Record<Locale, ProjectTranslation>>>;
}

export interface Education {
    readonly id: string;
    readonly year: string;
    readonly translations: Readonly<
        Partial<
            Record<
                Locale,
                {
                    readonly title: string;
                    readonly description: string;
                    readonly yearNote?: string;
                }
            >
        >
    >;
}

export interface ContentCatalogue {
    readonly profile: Profile | null;
    readonly experience: readonly Experience[];
    readonly education: readonly Education[];
    readonly courses: readonly Education[];
    readonly socialLinks: readonly SocialLink[];
    readonly skills: readonly string[];
    readonly featuredSlugs: readonly string[];
    readonly projects: readonly Project[];
}

export interface LocalizedProject {
    readonly project: Project;
    readonly translation: ProjectTranslation;
}
