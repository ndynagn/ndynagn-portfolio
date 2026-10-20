import type { JSX } from 'react';

import { locales, type Locale } from '@/shared/i18n/locales';

interface LanguageLinksProps {
    readonly locale: Locale;
    readonly hrefs: Readonly<Record<Locale, string>>;
    readonly label: string;
}

/** Destinations, including translation availability, are supplied by the consumer. */
export function LanguageLinks({ locale, hrefs, label }: LanguageLinksProps): JSX.Element {
    const destination = locale === 'ru' ? 'en' : 'ru';

    return (
        <a
            href={hrefs[destination]}
            hrefLang={destination}
            aria-label={`${label}: ${destination === 'ru' ? 'Русский' : 'English'}`}
            className="flex items-center gap-1.5 py-2 font-design text-[0.625rem] leading-normal font-semibold outline-offset-[7px] focus-visible:outline-2 focus-visible:outline-foreground md:gap-2 forced-colors:focus-visible:outline-[Highlight]"
        >
            {locales.map((target, index) => (
                <span key={target} className="contents">
                    {index > 0 && (
                        <span aria-hidden="true" className="text-muted-foreground opacity-45">
                            /
                        </span>
                    )}
                    <span
                        lang={target}
                        data-current={target === locale || undefined}
                        className="text-muted-foreground data-current:text-foreground"
                    >
                        {target.toUpperCase()}
                    </span>
                </span>
            ))}
        </a>
    );
}
