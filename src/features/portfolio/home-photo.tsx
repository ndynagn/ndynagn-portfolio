'use client';

import { useState, type JSX } from 'react';
import Image from 'next/image';

import { FlutterBadge } from './visual';

interface HomePhotoProps {
    readonly alt: string;
    readonly failure: string;
    readonly badge: string;
}

/** The intentional badge overlap stays outside the independently filtered image. */
export function HomePhoto({ alt, failure, badge }: HomePhotoProps): JSX.Element {
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
                        src="/images/gennady-nagibin.jpeg"
                        alt={alt}
                        fill
                        sizes="(min-width: 1800px) 600px, (min-width: 768px) 35vw, 82vw"
                        loading="eager"
                        fetchPriority="high"
                        className="object-cover object-[58%_45%] brightness-[.77] grayscale"
                        onError={() => setFailed(true)}
                    />
                )}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--image-dim) to-transparent to-40%" />
            <FlutterBadge
                caption={badge}
                opaque={failed}
                className="absolute top-[29%] -left-5.75 [text-shadow:0_1px_2px_var(--image-dim)] md:top-[37%] md:-left-7 lg:-left-10"
            />
        </figure>
    );
}
