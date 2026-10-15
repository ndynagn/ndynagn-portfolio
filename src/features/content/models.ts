import type { Locale } from '@/shared/i18n/locales';

export interface ProfileTranslation {
    readonly published: boolean;
    readonly name: string;
    readonly headline: string;
    readonly summary: string;
    readonly cvPath?: string;
}

export interface Profile {
    readonly translations: Readonly<Partial<Record<Locale, ProfileTranslation>>>;
}

export interface Experience {
    readonly id: string;
    readonly organization: string;
    readonly period: string;
    readonly translations: Readonly<
        Partial<
            Record<
                Locale,
                {
                    readonly role: string;
                    readonly description: string;
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
    readonly websiteUrl?: string;
    readonly sourceUrl?: string;
    readonly translations: Readonly<Partial<Record<Locale, ProjectTranslation>>>;
}

export interface LocalizedProject {
    readonly project: Project;
    readonly translation: ProjectTranslation;
}
