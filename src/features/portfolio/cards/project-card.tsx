import type { JSX } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cva } from 'class-variance-authority';

import { cn } from '@/shared/ui/cn';

import { PaletteSurface, type PaletteName } from '../visual';

export interface ProjectCardData {
    readonly href: string;
    readonly title: string;
    readonly titleLines?: readonly string[];
    readonly eyebrow: string;
    readonly categoryLabel: string;
    readonly platformLabel: string;
    readonly counterLabel: string;
    readonly palette: PaletteName;
}

export interface ProjectCardProps {
    readonly data: ProjectCardData;
    readonly variant?: 'standard' | 'featured';
    readonly headingLevel?: 2 | 3 | 4 | 5 | 6;
    readonly cursorLabel: string;
    readonly prefetch?: boolean;
    readonly className?: string;
}

const artworkVariants = cva(
    '@container relative col-start-1 row-start-1 flex min-h-min min-w-0 flex-col justify-between p-5',
    {
        variants: {
            variant: {
                standard: 'md:p-6',
                featured: 'md:p-[22px]',
            },
        },
        defaultVariants: { variant: 'standard' },
    },
);

const proportionVariants = cva(
    'pointer-events-none col-start-1 row-start-1 aspect-[1.25] min-w-0',
    {
        variants: {
            variant: { standard: 'md:aspect-[1.37]', featured: 'md:aspect-[1.1]' },
        },
        defaultVariants: { variant: 'standard' },
    },
);

const captionVariants = cva('flex min-w-0 items-center justify-between pt-[13px] md:pt-[17px]', {
    variants: {
        variant: {
            standard: 'gap-[15px]',
            featured: 'gap-[5px] md:flex-col md:items-start',
        },
    },
    defaultVariants: { variant: 'standard' },
});

function ProjectCardArtwork({
    data,
    variant,
}: Pick<ProjectCardProps, 'data' | 'variant'>): JSX.Element {
    const lines = data.titleLines?.length ? data.titleLines : [data.title];

    return (
        <PaletteSurface palette={data.palette}>
            <div
                className="relative grid min-w-0 overflow-hidden rounded-none bg-(--palette-surface) text-(--palette-foreground) transition-[border-radius] duration-500 ease-[ease] motion-safe:group-hover/card:rounded-[10px] motion-safe:group-focus-visible/card:rounded-[10px] motion-reduce:transition-none forced-colors:border forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:text-[CanvasText]"
                data-project-artwork
            >
                {/* A shared grid cell keeps the source ratio while allowing content to grow. */}
                <span aria-hidden="true" className={proportionVariants({ variant })} />
                <div className={artworkVariants({ variant })} data-project-artwork-content>
                    <div
                        className={cn(
                            'relative z-1 flex shrink-0 flex-wrap items-start justify-between gap-x-3 gap-y-1 text-[0.4375rem] leading-[1.5]',
                            variant === 'featured'
                                ? 'tracking-[0.03125rem]'
                                : 'tracking-[0.0625rem] md:text-[0.5rem]',
                        )}
                        data-project-meta
                    >
                        <span aria-hidden="true" className="opacity-60">
                            {data.counterLabel}
                        </span>
                        <span className="min-w-0 wrap-anywhere">{data.platformLabel}</span>
                    </div>
                    <div
                        aria-hidden="true"
                        className="min-w-0 shrink-0 py-[8%] transition-[translate] duration-500 ease-[cubic-bezier(.2,.65,.3,1)] motion-safe:group-hover/card:translate-x-[2%] motion-safe:group-focus-visible/card:translate-x-[2%] motion-reduce:transition-none"
                        data-project-type
                    >
                        <span className="mb-[18px] block text-[0.5rem] leading-[1.5] tracking-[0.125rem] opacity-65">
                            {data.eyebrow}
                        </span>
                        <div
                            className="text-[clamp(1.75rem,9cqw,6.25rem)] leading-[1.02] font-[550] tracking-[-0.065em] wrap-anywhere"
                            data-project-title
                        >
                            {lines.map((line, index) => (
                                <span key={index} className="block">
                                    {line}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="relative z-1 flex shrink-0 items-center justify-between gap-3 text-[0.5rem] leading-[1.5] tracking-[0.0125rem] md:text-[0.5625rem]">
                        <span aria-hidden="true" className="min-w-0 wrap-anywhere">
                            {data.categoryLabel}
                        </span>
                        <span
                            aria-hidden="true"
                            data-project-arrow
                            className="grid size-[33px] shrink-0 place-items-center rounded-full border border-current opacity-60 transition-[rotate] duration-350 ease-[ease] motion-safe:group-hover/card:rotate-45 motion-safe:group-focus-visible/card:rotate-45 motion-reduce:transition-none"
                        >
                            <ArrowUpRight className="size-[14px] stroke-[1.5]" />
                        </span>
                    </div>
                </div>
            </div>
        </PaletteSurface>
    );
}

interface ProjectCardCaptionProps extends Pick<ProjectCardProps, 'data' | 'variant'> {
    readonly headingLevel: NonNullable<ProjectCardProps['headingLevel']>;
}

function ProjectCardCaption({ data, variant, headingLevel }: ProjectCardCaptionProps): JSX.Element {
    const headings = { 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const;
    const Heading = headings[headingLevel];

    return (
        <div className={captionVariants({ variant })} data-project-caption>
            <Heading className="min-w-0 text-[0.875rem] leading-[1.5] font-[550] tracking-[-0.025rem] wrap-anywhere md:text-[0.9375rem]">
                {data.title}
            </Heading>
            <span className="min-w-0 text-[0.5625rem] leading-[1.5] text-muted-foreground wrap-anywhere md:text-[0.625rem]">
                {data.categoryLabel}
            </span>
        </div>
    );
}

/** Presentation only. Consumers own localized display data, destinations, order and selection.
 * Artwork may grow beyond its preferred ratio for enlarged or long text. Prefetch defaults
 * to false so a growing catalogue does not eagerly request every case.
 */
export function ProjectCard({
    data,
    variant = 'standard',
    headingLevel = 3,
    cursorLabel,
    prefetch = false,
    className,
}: ProjectCardProps): JSX.Element {
    const linkProps = {
        href: data.href,
        'aria-label': data.title,
        'data-project-card': variant,
        'data-cursor': 'page',
        'data-cursor-label': cursorLabel,
        className: cn(
            'group/card block min-w-0 font-design outline-offset-[7px] focus-visible:outline-2 focus-visible:outline-foreground forced-colors:focus-visible:[outline-color:Highlight]',
            className,
        ),
    };
    const content = (
        <>
            <ProjectCardArtwork data={data} variant={variant} />
            <ProjectCardCaption data={data} variant={variant} headingLevel={headingLevel} />
        </>
    );

    // Native fragment navigation also moves focus to the consumer's focusable target.
    return data.href.startsWith('#') ? (
        <a {...linkProps}>{content}</a>
    ) : (
        <Link {...linkProps} prefetch={prefetch}>
            {content}
        </Link>
    );
}
