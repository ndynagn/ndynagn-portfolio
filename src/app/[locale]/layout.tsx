import { Suspense, type JSX } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Register the global layer order before any component CSS Module is evaluated.
import '../globals.css';

import { YandexMetrica } from '@/shared/analytics/yandex-metrica';
import { PageRuntime, PortfolioCursor } from '@/features/portfolio/client';
import { getDictionary } from '@/shared/i18n/dictionaries';
import { isLocale, locales, type Locale } from '@/shared/i18n/locales';
import { themeBootstrap } from '@/shared/theme/preference';
import { ThemeObserver } from '@/shared/theme/theme-observer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
    icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
};

export const dynamicParams = false;

export function generateStaticParams(): { readonly locale: Locale }[] {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: LayoutProps<'/[locale]'>): Promise<JSX.Element> {
    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const dictionary = getDictionary(locale);

    return (
        <html
            lang={locale}
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            suppressHydrationWarning
        >
            <head>
                <script
                    id="theme-preference"
                    dangerouslySetInnerHTML={{ __html: themeBootstrap }}
                />
            </head>
            <body className="min-h-dvh bg-background font-sans text-foreground">
                <ThemeObserver />
                <PortfolioCursor>
                    <a
                        href="#main"
                        className="sr-only rounded-md bg-background p-3 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:outline-2 focus:outline-ring"
                    >
                        {dictionary.skipToContent}
                    </a>
                    {children}
                    <Suspense fallback={null}>
                        <PageRuntime />
                    </Suspense>
                </PortfolioCursor>
                <Suspense fallback={null}>
                    <YandexMetrica />
                </Suspense>
            </body>
        </html>
    );
}
