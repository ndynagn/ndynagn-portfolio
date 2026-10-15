export const locales = ['ru', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

export function isLocale(value: string): value is Locale {
    return locales.some((locale) => locale === value);
}

export function homePath(locale: Locale): string {
    return `/${locale}`;
}

export function projectPath(locale: Locale, slug: string): string {
    return `/${locale}/projects/${encodeURIComponent(slug)}`;
}
