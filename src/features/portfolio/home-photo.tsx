'use client';

import { useState, type JSX } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/shared/ui/cn';

import { FlutterBadge } from './visual';

interface HomePhotoProps {
    readonly alt: string;
    readonly failure: string;
    readonly credit: string;
    readonly caption: readonly string[];
    readonly badge: string;
}

/** The intentional badge overlap stays outside the independently filtered image. */
export function HomePhoto({ alt, failure, credit, caption, badge }: HomePhotoProps): JSX.Element {
    const [failed, setFailed] = useState(false);

    return (
        <figure className="relative ml-5.75 h-85 min-w-0 md:ml-0 md:h-95 lg:h-[clamp(22.5rem,35.2vw,35.625rem)]">
            <div className="absolute inset-0 bg-(--badge-solid)">
                {failed ? (
                    <div
                        role="img"
                        aria-label={failure}
                        className="grid h-full place-items-center px-8 text-center text-sm text-(--on-image)"
                    >
                        {failure}
                    </div>
                ) : (
                    <Image
                        src="/images/architecture.jpg"
                        alt={alt}
                        fill
                        sizes="(min-width: 1800px) 600px, (min-width: 768px) 35vw, 82vw"
                        loading="eager"
                        fetchPriority="high"
                        className="object-cover object-[50%_55%] brightness-[.77] grayscale md:object-center"
                        onError={() => setFailed(true)}
                    />
                )}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--image-dim) to-transparent to-40%" />
            <a
                href="https://unsplash.com/@justcallmechristophe"
                target="_blank"
                rel="noreferrer"
                aria-label={credit}
                className="absolute top-5.5 right-5.75 left-5.75 w-fit text-[0.4375rem] leading-[1.6] tracking-[0.15em] text-(--on-image) [text-shadow:0_1px_2px_var(--image-dim)] md:text-[0.5rem]"
            >
                CHRISTOPHE LAURENCEAU / UNSPLASH ↗
            </a>
            <figcaption
                className={cn(
                    'absolute right-5.75 bottom-5.75 left-5.75 flex items-end justify-between gap-4 text-[0.6875rem] leading-[1.7] text-(--on-image) [text-shadow:0_1px_2px_var(--image-dim)] md:right-6.5 md:bottom-6.5 md:left-6.5 md:text-xs',
                    failed && 'sr-only',
                )}
            >
                <span>
                    {caption.map((line) => (
                        <span className="block" key={line}>
                            {line}
                        </span>
                    ))}
                </span>
                <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 stroke-[1.5]" />
            </figcaption>
            <FlutterBadge
                caption={badge}
                opaque={failed}
                className="absolute top-[29%] -left-5.75 [text-shadow:0_1px_2px_var(--image-dim)] md:top-[37%] md:-left-7 lg:-left-10"
            />
        </figure>
    );
}
