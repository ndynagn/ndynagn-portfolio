import type { JSX, ReactNode } from 'react';

import { CursorBoundary } from '@/shared/animation/cursor-boundary';
import { getPortfolioDictionary } from '@/shared/i18n/portfolio';
import { cataloguePath, homePath, type Locale } from '@/shared/i18n/locales';
import { ThemeToggle } from '@/shared/theme/theme-toggle';
import { LanguageLinks } from '@/shared/ui/language-links';

import { PageHeader } from './page-header';
import type { NavigationLink } from './navigation';

export const pageContainer = 'mx-auto w-full max-w-450 px-[6%] md:px-[5%]';
export const sectionTarget = 'scroll-mt-32 outline-none';
export const sectionTitle =
    'min-w-0 text-design-title leading-[1.22] font-medium tracking-[-0.055em] wrap-anywhere';

interface PageShellProps {
    readonly locale: Locale;
    readonly catalogue?: boolean;
    readonly category?: string;
    readonly homeLinks?: readonly NavigationLink[];
    readonly children: ReactNode;
}

export function PageShell({
    locale,
    catalogue = false,
    category = 'all',
    homeLinks = [],
    children,
}: PageShellProps): JSX.Element {
    const copy = getPortfolioDictionary(locale);
    const links = catalogue
        ? [
              { key: 'projects', label: copy.projects, href: '#projects' },
              { key: 'contact', label: copy.contact, href: '#contact' },
          ]
        : homeLinks;
    const localeHref = (target: Locale) =>
        catalogue
            ? `${cataloguePath(target)}${category === 'all' ? '' : `?category=${category}`}`
            : homePath(target);

    return (
        <CursorBoundary>
            <div className="min-h-dvh font-design leading-normal text-foreground subpixel-antialiased">
                <PageHeader
                    links={links}
                    label={copy.navigation}
                    menuLabel={copy.menu}
                    homeHref={homePath(locale)}
                    backLabel={catalogue ? copy.back : undefined}
                    controls={
                        <>
                            <LanguageLinks
                                locale={locale}
                                hrefs={{ ru: localeHref('ru'), en: localeHref('en') }}
                                label={copy.language}
                            />
                            <ThemeToggle lightLabel={copy.light} darkLabel={copy.dark} />
                        </>
                    }
                />
                {children}
            </div>
        </CursorBoundary>
    );
}
