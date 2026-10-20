'use client';

import { useEffect, useId, useRef, useState, type JSX, type MouseEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/ui/cn';

import type { GalleryGroup, GalleryImage, GalleryLabels } from './model';
import styles from './gallery.module.css';

interface GalleryRailProps {
    readonly group: GalleryGroup;
    readonly labels: GalleryLabels;
    readonly headingLevel: 2 | 3 | 4 | 5 | 6;
    readonly onOpen: (image: GalleryImage, opener: HTMLAnchorElement) => void;
}

interface ThumbnailProps {
    readonly image: GalleryImage;
    readonly labels: GalleryLabels;
    readonly onOpen: GalleryRailProps['onOpen'];
}

function Thumbnail({ image, labels, onOpen }: ThumbnailProps): JSX.Element {
    const [failed, setFailed] = useState(false);
    const open = (event: MouseEvent<HTMLAnchorElement>) => {
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }
        event.preventDefault();
        onOpen(image, event.currentTarget);
    };

    return (
        <a
            href={image.src}
            onClick={open}
            aria-label={`${labels.enlarge}: ${image.caption}`}
            aria-haspopup="dialog"
            className="group/thumbnail relative grid aspect-[.58] w-full place-items-center overflow-hidden rounded-[6px] border bg-card p-4.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground md:p-5 forced-colors:border-[CanvasText]"
            data-gallery-thumbnail
        >
            <span
                aria-hidden="true"
                className="absolute inset-[20%] grid place-items-center overflow-hidden text-center text-[0.6875rem] text-muted-foreground"
            >
                {image.caption}
            </span>
            <Image
                unoptimized
                src={image.thumbnail}
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading="lazy"
                onError={() => setFailed(true)}
                className={cn(
                    'relative z-1 block h-full min-h-0 w-full object-contain transition-transform duration-400 ease-[ease] motion-safe:group-hover/thumbnail:scale-[1.025] motion-safe:group-focus-visible/thumbnail:scale-[1.025]',
                    failed && 'invisible',
                )}
            />
            <span
                aria-hidden="true"
                className={`${styles.enlarge} [--enlarge-offset:5px] absolute right-2.5 bottom-2.5 z-2 grid size-7.5 translate-y-0 place-items-center rounded-full border opacity-100 transition-[opacity,translate] duration-200 ease-[ease] md:translate-y-(--enlarge-offset) md:opacity-0 group-hover/thumbnail:translate-y-0 group-hover/thumbnail:opacity-100 group-focus-visible/thumbnail:translate-y-0 group-focus-visible/thumbnail:opacity-100 motion-reduce:translate-y-0`}
            >
                <ZoomIn className="size-3.75" strokeWidth={1.5} />
            </span>
        </a>
    );
}

export function GalleryRail({
    group,
    labels,
    headingLevel,
    onOpen,
}: GalleryRailProps): JSX.Element {
    const rail = useRef<HTMLDivElement>(null);
    const id = useId();
    const [canScroll, setCanScroll] = useState({ previous: false, next: false });
    const headings = { 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const;
    const Heading = headings[headingLevel];

    useEffect(() => {
        const element = rail.current;
        if (!element) {
            return;
        }
        const update = () => {
            const previous = element.scrollLeft > 1;
            const next = element.scrollLeft + element.clientWidth < element.scrollWidth - 1;
            setCanScroll((current) =>
                current.previous === previous && current.next === next
                    ? current
                    : { previous, next },
            );
        };
        update();
        element.addEventListener('scroll', update, { passive: true });
        element.addEventListener('load', update, true);
        const observer = new ResizeObserver(update);
        observer.observe(element);
        for (const child of element.children) {
            observer.observe(child);
        }
        const reduce = matchMedia('(prefers-reduced-motion: reduce)');
        const stop = () => {
            if (reduce.matches) {
                element.scrollTo({ left: element.scrollLeft, behavior: 'instant' });
            }
        };
        reduce.addEventListener('change', stop);
        return () => {
            element.removeEventListener('scroll', update);
            element.removeEventListener('load', update, true);
            observer.disconnect();
            reduce.removeEventListener('change', stop);
        };
    }, [group.images]);

    const scroll = (direction: number) => {
        const element = rail.current;
        if (element) {
            element.scrollBy({
                left: direction * element.clientWidth * 0.85,
                behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'instant'
                    : 'smooth',
            });
        }
    };

    return (
        <div className="min-w-0" data-gallery-group={group.id}>
            <div className="mb-5 flex min-w-0 items-center justify-between gap-5">
                <Heading className="flex min-w-0 flex-wrap items-center gap-5 text-[0.8125rem] leading-normal font-medium wrap-anywhere">
                    {group.title}
                    <span className="text-[0.5625rem] text-muted-foreground">
                        {String(group.images.length).padStart(2, '0')}
                    </span>
                </Heading>
                {group.images.length > 1 && (
                    <div className="flex shrink-0 gap-2">
                        <Button
                            variant="round"
                            size="gallery"
                            type="button"
                            disabled={!canScroll.previous}
                            aria-controls={id}
                            aria-label={`${labels.scrollPrevious}: ${group.title}`}
                            onClick={() => scroll(-1)}
                        >
                            <ChevronLeft aria-hidden="true" />
                        </Button>
                        <Button
                            variant="round"
                            size="gallery"
                            type="button"
                            disabled={!canScroll.next}
                            aria-controls={id}
                            aria-label={`${labels.scrollNext}: ${group.title}`}
                            onClick={() => scroll(1)}
                        >
                            <ChevronRight aria-hidden="true" />
                        </Button>
                    </div>
                )}
            </div>
            <div
                ref={rail}
                id={id}
                data-gallery-rail
                className="-m-2 grid auto-cols-[72%] grid-flow-col gap-4 overflow-x-auto p-2 pb-5 scroll-px-2 [scroll-snap-type:x_proximity] [scrollbar-color:var(--muted-foreground)_transparent] scrollbar-thin md:auto-cols-[calc((100%-60px)/4)] md:gap-5"
            >
                {group.images.map((image, index) => (
                    <figure key={image.id} className="min-w-0 snap-start">
                        <Thumbnail
                            key={image.thumbnail}
                            image={image}
                            labels={labels}
                            onOpen={onOpen}
                        />
                        <figcaption className="mt-3.75 flex gap-3 text-[0.625rem] leading-[1.6] wrap-anywhere text-muted-foreground">
                            <span aria-hidden="true" className="shrink-0 pt-0.5 text-[0.5rem]">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            {image.caption}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </div>
    );
}
