import type { JSX } from 'react';
import Link from 'next/link';

import { Button } from '@/shared/ui/button';

import { locales, type Locale } from './locales';

interface LanguageSwitcherProps {
    readonly locale: Locale;
    readonly label: string;
    readonly destinations: Readonly<Partial<Record<Locale, string>>>;
}

export function LanguageSwitcher({
    locale,
    label,
    destinations,
}: LanguageSwitcherProps): JSX.Element {
    return (
        <nav aria-label={label} className="flex gap-1">
            {locales.map((target) => {
                const href = destinations[target];

                return href ? (
                    <Button
                        key={target}
                        asChild
                        variant={locale === target ? 'secondary' : 'ghost'}
                        size="sm"
                    >
                        <Link
                            href={href}
                            hrefLang={target}
                            lang={target}
                            aria-current={locale === target ? 'page' : undefined}
                        >
                            {target === 'ru' ? 'Русский' : 'English'}
                        </Link>
                    </Button>
                ) : null;
            })}
        </nav>
    );
}
