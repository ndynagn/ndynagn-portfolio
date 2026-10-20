import type { JSX } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Workbench } from '@/features/design-system/server';
import { isLocale } from '@/shared/i18n/locales';

export const metadata: Metadata = {
    title: 'Visual foundation · development',
    robots: { index: false, follow: false },
};

export default async function DesignSystemPage({
    params,
    searchParams,
}: PageProps<'/[locale]/design-system'>): Promise<JSX.Element> {
    if (process.env.NODE_ENV !== 'development') {
        notFound();
    }

    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const query = await searchParams;
    const category = query.kitCategory;

    return (
        <Workbench
            locale={locale}
            filterCategory={Array.isArray(category) ? category[0] : category}
        />
    );
}
