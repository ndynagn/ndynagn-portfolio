'use client';

import { useEffect, useRef, useState, type JSX, type RefObject } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/shared/ui/dialog';
import { cn } from '@/shared/ui/cn';

import type { GalleryImage, GalleryLabels } from './model';
import styles from './gallery.module.css';

interface GalleryLightboxProps {
    readonly images: readonly GalleryImage[];
    readonly initialId: string;
    readonly name: string;
    readonly labels: GalleryLabels;
    readonly opener: RefObject<HTMLAnchorElement | null>;
    readonly fallback: RefObject<HTMLDivElement | null>;
    readonly onClose: () => void;
}

interface ViewerImageProps {
    readonly image: GalleryImage;
    readonly zoomed: boolean;
    readonly labels: GalleryLabels;
    readonly onZoom: () => void;
}

function ViewerImage({ image, zoomed, labels, onZoom }: ViewerImageProps): JSX.Element {
    const active = useRef(true);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [attempt, setAttempt] = useState(0);
    const request = useRef(0);

    useEffect(() => {
        active.current = true;
        return () => {
            active.current = false;
        };
    }, []);

    if (status === 'error') {
        return (
            <div className="text-center text-[0.8125rem] leading-[1.8]" role="status">
                <p>{labels.error}</p>
                <button
                    type="button"
                    className="mt-2.5 border-b p-2.5 focus-visible:outline-2 focus-visible:outline-offset-4"
                    onClick={() => {
                        request.current += 1;
                        setAttempt(request.current);
                        setStatus('loading');
                    }}
                >
                    {labels.retry}
                </button>
            </div>
        );
    }

    return (
        <>
            {status === 'loading' && (
                <p role="status" className="absolute text-[0.8125rem]">
                    {labels.loading}
                </p>
            )}
            <Image
                key={attempt}
                unoptimized
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                draggable={false}
                onLoad={() => {
                    if (active.current && request.current === attempt) {
                        setStatus('ready');
                    }
                }}
                onError={() => {
                    if (active.current && request.current === attempt) {
                        setStatus('error');
                    }
                }}
                onDoubleClick={onZoom}
                className={cn(
                    'relative h-auto w-auto max-w-full object-contain shadow-[0_12px_60px_#0004]',
                    zoomed
                        ? 'block max-h-none max-w-none cursor-zoom-out'
                        : 'max-h-full cursor-zoom-in',
                )}
                data-gallery-image
            />
        </>
    );
}

export function GalleryLightbox({
    images,
    initialId,
    name,
    labels,
    opener,
    fallback,
    onClose,
}: GalleryLightboxProps): JSX.Element {
    const [selection, setSelection] = useState({ id: initialId, zoomed: false });
    const swipe = useRef<{
        readonly x: number;
        readonly y: number;
        readonly pointerId: number;
    } | null>(null);
    const stage = useRef<HTMLDivElement>(null);
    const index = images.findIndex((image) => image.id === selection.id);
    const image = images[index];
    const move = (offset: number) => {
        swipe.current = null;
        setSelection((current) => {
            const currentIndex = images.findIndex((item) => item.id === current.id);
            const next = images[(currentIndex + offset + images.length) % images.length];
            return { id: next.id, zoomed: false };
        });
        stage.current?.scrollTo({ left: 0, top: 0, behavior: 'instant' });
    };
    const toggleZoom = () => {
        swipe.current = null;
        setSelection((current) => ({ ...current, zoomed: !current.zoomed }));
        stage.current?.scrollTo({ left: 0, top: 0, behavior: 'instant' });
    };

    return (
        <Dialog
            open={!!image}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <DialogContent
                showCloseButton={false}
                overlayClassName="bg-[#131512] data-[state=open]:animate-none data-[state=closed]:animate-none"
                className={cn(
                    styles.lightbox,
                    'inset-0 grid h-dvh w-full max-w-none translate-x-0 translate-y-0 grid-rows-[minmax(0,auto)_minmax(min(8rem,25dvh),1fr)_minmax(0,auto)] gap-0 rounded-none border-0 p-0 font-design leading-normal shadow-none subpixel-antialiased sm:max-w-none data-[state=open]:animate-none data-[state=closed]:animate-none',
                )}
                data-cursor="native"
                onCloseAutoFocus={(event) => {
                    event.preventDefault();
                    const target = opener.current?.isConnected ? opener.current : fallback.current;
                    target?.focus({ preventScroll: true });
                }}
                onKeyDown={(event) => {
                    if (
                        images.length > 1 &&
                        (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
                    ) {
                        event.preventDefault();
                        move(event.key === 'ArrowLeft' ? -1 : 1);
                    }
                }}
            >
                <div className="min-h-0 overflow-auto" data-gallery-toolbar>
                    <div className="flex min-w-0 flex-wrap items-center justify-end gap-3 px-[5%] py-4 md:px-[4%] md:py-5">
                        <div className="min-w-0 flex-1 basis-40">
                            <DialogTitle className="text-sm leading-normal font-normal tracking-[-0.0214285714em] wrap-anywhere">
                                {name}
                            </DialogTitle>
                            <DialogDescription className="mt-1 text-[0.5625rem] tracking-[0.0222222222em] text-inherit">
                                {labels.description}
                            </DialogDescription>
                        </div>
                        <Button
                            type="button"
                            variant="round"
                            size="gallery"
                            onClick={toggleZoom}
                            aria-label={selection.zoomed ? labels.zoomOut : labels.zoomIn}
                            aria-pressed={selection.zoomed}
                        >
                            <ZoomIn aria-hidden="true" />
                        </Button>
                        <Button
                            type="button"
                            variant="round"
                            size="gallery"
                            onClick={onClose}
                            aria-label={labels.close}
                        >
                            <X aria-hidden="true" />
                        </Button>
                    </div>
                </div>
                <div
                    ref={stage}
                    data-gallery-stage
                    className={cn(
                        'relative min-h-0 overflow-auto px-[5%] py-2 md:px-[8%]',
                        selection.zoomed
                            ? 'block touch-auto'
                            : 'flex touch-pan-y items-center justify-center',
                    )}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            onClose();
                        }
                    }}
                    onPointerDown={(event) => {
                        if (event.pointerType !== 'mouse' && !selection.zoomed && event.isPrimary) {
                            swipe.current = {
                                x: event.clientX,
                                y: event.clientY,
                                pointerId: event.pointerId,
                            };
                        }
                    }}
                    onPointerCancel={() => {
                        swipe.current = null;
                    }}
                    onPointerUp={(event) => {
                        const start = swipe.current;
                        swipe.current = null;
                        if (
                            !start ||
                            start.pointerId !== event.pointerId ||
                            selection.zoomed ||
                            images.length < 2
                        ) {
                            return;
                        }
                        const dx = event.clientX - start.x;
                        const dy = event.clientY - start.y;
                        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                            move(dx > 0 ? -1 : 1);
                        }
                    }}
                >
                    {image && (
                        <ViewerImage
                            key={image.id + ':' + image.src}
                            image={image}
                            zoomed={selection.zoomed}
                            labels={labels}
                            onZoom={toggleZoom}
                        />
                    )}
                </div>
                <div className="min-h-0 overflow-auto" data-gallery-footer>
                    <div className="flex min-w-0 items-center justify-center gap-3.5 px-[5%] pt-4.5 pb-[max(18px,env(safe-area-inset-bottom))] md:gap-8.75 md:px-[4%] md:py-5">
                        {images.length > 1 && (
                            <Button
                                type="button"
                                variant="round"
                                size="gallery"
                                onClick={() => move(-1)}
                                aria-label={labels.previous}
                            >
                                <ChevronLeft aria-hidden="true" />
                            </Button>
                        )}
                        <div
                            aria-live="polite"
                            aria-atomic="true"
                            className={cn(
                                'min-w-0 text-center wrap-anywhere',
                                images.length > 1 ? 'w-[min(400px,60%)]' : 'w-[min(400px,100%)]',
                            )}
                        >
                            <p className="text-xs leading-[1.6]" data-gallery-caption>
                                {image?.lightboxCaption}
                            </p>
                            <span
                                className="mt-1.75 block text-[0.5625rem] tracking-[0.1111111111em]"
                                data-gallery-counter
                            >
                                {String(index + 1).padStart(2, '0')} /{' '}
                                {String(images.length).padStart(2, '0')}
                            </span>
                        </div>
                        {images.length > 1 && (
                            <Button
                                type="button"
                                variant="round"
                                size="gallery"
                                onClick={() => move(1)}
                                aria-label={labels.next}
                            >
                                <ChevronRight aria-hidden="true" />
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
