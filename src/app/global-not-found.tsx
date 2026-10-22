import type { JSX } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

// This document bypasses the locale layout; register styles before its client owner.
import './globals.css';

import { getDictionary } from '@/shared/i18n/dictionaries';
import { themeBootstrap } from '@/shared/theme/preference';
import { ThemeObserver } from '@/shared/theme/theme-observer';

const russian = getDictionary('ru');
const english = getDictionary('en');

export const metadata: Metadata = {
    title: `404 — ${russian.pageNotFound}`,
    robots: { index: false, follow: false },
    icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
};

/** The global fallback has no locale params, so both languages are available before JS. */
export default function GlobalNotFound(): JSX.Element {
    return (
        <html lang="ru" suppressHydrationWarning>
            <head>
                <script
                    id="theme-preference"
                    dangerouslySetInnerHTML={{ __html: themeBootstrap }}
                />
            </head>
            <body className="min-h-dvh bg-background font-design text-foreground">
                <ThemeObserver />
                <main className="grid min-h-dvh place-items-center px-6 py-12">
                    <div className="w-full max-w-lg space-y-8">
                        <h1 className="text-6xl font-semibold tracking-tight">404</h1>
                        <div className="space-y-3">
                            <p className="text-xl">{russian.pageNotFound}</p>
                            <Link
                                href="/ru"
                                prefetch={false}
                                className="inline-block rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                            >
                                {russian.backToHome}
                            </Link>
                        </div>
                        <div lang="en" className="space-y-3 border-t pt-8">
                            <p className="text-xl">{english.pageNotFound}</p>
                            <Link
                                href="/en"
                                prefetch={false}
                                className="inline-block rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                            >
                                {english.backToHome}
                            </Link>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}
