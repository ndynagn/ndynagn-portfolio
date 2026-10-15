import { Suspense, type JSX } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';

import { YandexMetrica } from '@/shared/analytics/yandex-metrica';
import { getDictionary } from '@/shared/i18n/dictionaries';
import { isLocale, locales, type Locale } from '@/shared/i18n/locales';

import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

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
        <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <body className="min-h-dvh bg-background font-sans text-foreground">
                <a
                    href="#main"
                    className="sr-only rounded-md bg-background p-3 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:outline-2 focus:outline-ring"
                >
                    {dictionary.skipToContent}
                </a>
                {children}
                <Suspense fallback={null}>
                    <YandexMetrica />
                </Suspense>
            </body>
        </html>
    );
}
