import 'server-only';

import type { JSX } from 'react';

import { CursorBoundary } from '@/shared/animation/cursor-boundary';
import { locales, type Locale } from '@/shared/i18n/locales';
import { GlassSurface } from '@/shared/styles/glass-surface';

import { getWorkbenchCopy } from './copy';
import { ButtonLinkSamples } from './button-link-samples';
import { HoverDemo } from './hover-demo';
import { LabelSamples } from './label-samples';
import { MaterialSamples } from './material-samples';
import { MotionDemo } from './motion-demo';
import { PhotoDemo } from './photo-demo';
import { ThemeDemo } from './theme-demo';

interface WorkbenchProps {
    readonly locale: Locale;
}

export function Workbench({ locale }: WorkbenchProps): JSX.Element {
    const copy = getWorkbenchCopy(locale);

    return (
        <CursorBoundary>
            <main
                id="main"
                className="mx-auto grid max-w-[112.5rem] min-w-0 grid-cols-1 gap-12 px-[6%] py-10 font-design wrap-anywhere md:px-[5%]"
            >
                <header className="flex flex-wrap items-center justify-between gap-6 border-b pb-6">
                    <div className="min-w-0">
                        <h1
                            data-type-sample="title"
                            className="text-design-title font-medium leading-[1.22] tracking-[-0.055em]"
                        >
                            {copy.title}
                        </h1>
                        <p className="mt-4 text-muted-foreground">{copy.note}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        {locales.map((target) => (
                            <a
                                key={target}
                                href={`/${target}/design-system`}
                                lang={target}
                                aria-label={target === 'ru' ? 'Русский' : 'English'}
                            >
                                {target.toUpperCase()}
                            </a>
                        ))}
                    </div>
                </header>
                <section className="grid min-w-0 grid-cols-1 gap-6" aria-label={copy.typography}>
                    <p
                        data-type-sample="display"
                        className="text-design-display leading-(--design-leading) font-[550] tracking-(--design-tracking)"
                    >
                        Aa Бб
                    </p>
                    <p
                        data-type-sample="page"
                        className="text-design-page font-medium leading-[1.1] tracking-[-0.07em]"
                    >
                        {copy.sample}
                    </p>
                    <p
                        data-type-sample="lead"
                        className="max-w-[55ch] text-design-lead font-[450] leading-[1.65] tracking-[-0.03em]"
                    >
                        {copy.sample}
                    </p>
                    <p
                        data-type-sample="body"
                        className="text-design-body leading-(--design-body-leading) text-muted-foreground"
                    >
                        {copy.sample}
                    </p>
                    <p
                        data-type-sample="caption"
                        className="text-design-caption leading-[1.9] text-muted-foreground"
                    >
                        {copy.sample}
                    </p>
                    <p
                        data-type-sample="eyebrow"
                        className="text-design-eyebrow font-semibold leading-[1.6] tracking-(--design-label-tracking)"
                    >
                        Manrope
                    </p>
                    <p className="font-normal">Manrope · 400</p>
                    <p className="font-[550]">Manrope · 550</p>
                    <p className="font-extrabold">Manrope · 800</p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                            'bg-background',
                            'bg-card',
                            'bg-primary text-primary-foreground',
                            'bg-muted text-muted-foreground',
                        ].map((classes) => (
                            <div
                                key={classes}
                                className={`min-w-0 border p-4 text-sm wrap-anywhere ${classes}`}
                            >
                                {classes}
                            </div>
                        ))}
                    </div>
                </section>
                <section className="grid min-w-0 gap-6" aria-labelledby="materials">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 id="materials" className="text-2xl">
                            {copy.material}
                        </h2>
                        <ThemeDemo label={copy.theme} />
                    </div>
                    <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
                        <PhotoDemo
                            failureLabel={copy.failed}
                            errorAction={copy.photoError}
                            restoreAction={copy.restore}
                        />
                        <div className="grid min-w-0 content-start gap-4">
                            <GlassSurface className="rounded-xl p-6">{copy.sample}</GlassSurface>
                            <GlassSurface material="control" className="rounded-full p-6">
                                15 px
                            </GlassSurface>
                            <GlassSurface opaque className="rounded-xl p-6">
                                {copy.opaque}
                            </GlassSurface>
                        </div>
                    </div>
                </section>
                <section className="grid min-w-0 gap-6" aria-label={copy.materialGuide}>
                    <p className="max-w-[75ch] text-sm text-muted-foreground">
                        {copy.materialGuide}
                    </p>
                    <MaterialSamples labels={copy.materialBackdrops} />
                </section>
                <section className="grid min-w-0 gap-6" aria-labelledby="motion">
                    <h2 id="motion" className="text-2xl">
                        {copy.motion}
                    </h2>
                    <MotionDemo
                        sample={copy.sample}
                        changeLabel={copy.changeScene}
                        sceneLabel={copy.scene}
                        filterLabel={copy.filter}
                        scrollLabel={copy.scroller}
                        selections={copy.selections}
                    />
                </section>
                <section className="grid min-w-0 gap-6" aria-label={copy.hover}>
                    <h2 className="text-2xl">{copy.hover}</h2>
                    <HoverDemo label={copy.hover} sample={copy.sample} />
                    <label className="grid max-w-md gap-3">
                        {copy.field}
                        <input className="min-w-0 rounded-md border bg-background p-3" />
                    </label>
                </section>
                <section className="grid gap-4" aria-label={copy.snap}>
                    <h2 className="text-xl">{copy.snap}</h2>
                    <div
                        tabIndex={0}
                        aria-label={copy.snap}
                        className="max-h-48 overflow-y-auto scroll-smooth rounded-xl border md:snap-y md:snap-proximity motion-reduce:snap-none motion-reduce:scroll-auto"
                    >
                        {['01', '02', '03'].map((value) => (
                            <div
                                key={value}
                                className="grid min-h-48 snap-start place-items-center border-b p-6"
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </section>
                <ButtonLinkSamples locale={locale} />
                <LabelSamples locale={locale} />
            </main>
        </CursorBoundary>
    );
}
