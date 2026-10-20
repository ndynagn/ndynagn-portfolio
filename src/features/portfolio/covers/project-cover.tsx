import type { JSX } from 'react';

import { cn } from '@/shared/ui/cn';

import { PaletteSurface, type PaletteName } from '../visual';

export interface ProjectCoverData {
    readonly title: string;
    readonly titleLines?: readonly string[];
    readonly categoryLabel: string;
    readonly periodLabel: string;
    readonly eyebrow: string;
    readonly tagline: string;
    readonly counterLabel: string;
    readonly platformLabel: string;
    readonly palette: PaletteName;
}

export interface ProjectCoverProps {
    readonly data: ProjectCoverData;
    readonly headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    readonly className?: string;
}

/** Static case introduction. Consumers own localized copy, title lines and heading hierarchy. */
export function ProjectCover({
    data,
    headingLevel = 1,
    className,
}: ProjectCoverProps): JSX.Element {
    const headings = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const;
    const Heading = headings[headingLevel];
    const lines = data.titleLines?.length ? data.titleLines : [data.title];

    return (
        <PaletteSurface palette={data.palette}>
            <header
                data-project-cover
                className={cn(
                    '@container relative flex min-h-95 min-w-0 flex-col justify-between gap-7 bg-(--palette-surface) p-5 font-design text-(--palette-foreground) subpixel-antialiased md:min-h-[clamp(25rem,43vw,37.5rem)] md:gap-8 md:p-[clamp(1.5rem,3vw,3rem)] forced-colors:border forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:text-[CanvasText]',
                    className,
                )}
            >
                <div
                    data-cover-meta
                    className="flex min-w-0 shrink-0 flex-col flex-wrap items-baseline justify-between gap-x-6 gap-y-2.5 text-[0.625rem] leading-normal tracking-widest uppercase md:flex-row"
                >
                    <span className="min-w-0 wrap-anywhere">{data.categoryLabel}</span>
                    <span className="min-w-0 wrap-anywhere">{data.periodLabel}</span>
                </div>
                <div className="min-w-0 shrink-0 wrap-anywhere" data-cover-copy>
                    <span
                        data-cover-eyebrow
                        className="mb-4.5 block text-[0.625rem] leading-normal tracking-[0.2em]"
                    >
                        {data.eyebrow}
                    </span>
                    <Heading
                        data-cover-title
                        className="min-w-0 text-[clamp(2.1875rem,12cqw,5.3125rem)] leading-[1.02] font-[550] tracking-[-0.065em] wrap-anywhere md:text-[clamp(3.125rem,10cqw,8.75rem)]"
                    >
                        {lines.map((line, index) => (
                            <span key={index} className="block">
                                {index > 0 ? ' ' : ''}
                                {line}
                                {index === lines.length - 1 && (
                                    <span
                                        aria-hidden="true"
                                        className="opacity-70"
                                        data-cover-period
                                    >
                                        .
                                    </span>
                                )}
                            </span>
                        ))}
                    </Heading>
                    <p
                        data-cover-tagline
                        className="mt-4 max-w-[48ch] text-[0.9375rem] leading-[1.6] tracking-tight wrap-anywhere md:mt-5 md:text-[clamp(1rem,1.6vw,1.375rem)] md:leading-normal"
                    >
                        {data.tagline}
                    </p>
                </div>
                <div
                    data-cover-footer
                    className="flex min-w-0 shrink-0 flex-wrap items-baseline justify-between gap-x-5 gap-y-2.5 text-[0.625rem] leading-normal tracking-widest uppercase md:gap-x-6"
                >
                    <span className="min-w-0 wrap-anywhere">{data.counterLabel}</span>
                    <span className="min-w-0 wrap-anywhere">{data.platformLabel}</span>
                </div>
            </header>
        </PaletteSurface>
    );
}
