'use client';

import { useEffect, type JSX } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

import { counterId, disableBrowserAnalytics, getBrowserAnalytics } from './browser';

function EnabledMetrica(): JSX.Element {
    const pathname = usePathname();

    useEffect(() => {
        getBrowserAnalytics()?.tracker.visit(pathname, document.title);
    }, [pathname]);

    return (
        <Script
            id="yandex-metrica-tag"
            src="https://mc.yandex.ru/metrika/tag.js"
            strategy="afterInteractive"
            onError={disableBrowserAnalytics}
        />
    );
}

export function YandexMetrica(): JSX.Element | null {
    return counterId ? <EnabledMetrica /> : null;
}
