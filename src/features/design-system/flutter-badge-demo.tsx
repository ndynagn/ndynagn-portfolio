'use client';

import { useState, type JSX } from 'react';
import Image from 'next/image';

import { FlutterBadge } from '@/features/portfolio/visual';
import { Button } from '@/shared/ui/button';

interface FlutterBadgeDemoProps {
    readonly caption: string;
    readonly failureLabel: string;
    readonly errorAction: string;
    readonly restoreAction: string;
}

/** Only the fixture owns image failure and the badge's source-relative placement. */
export function FlutterBadgeDemo({
    caption,
    failureLabel,
    errorAction,
    restoreAction,
}: FlutterBadgeDemoProps): JSX.Element {
    const [broken, setBroken] = useState(false);
    const [failed, setFailed] = useState(false);

    return (
        <div className="grid min-w-0 gap-6">
            <div className="ml-5.75 md:ml-7 lg:ml-10">
                <div className="relative h-85 bg-(--badge-solid) md:h-107.5" data-flutter-photo>
                    {failed ? (
                        <p className="absolute right-4 bottom-4 left-4 text-right text-sm text-(--on-image)">
                            {failureLabel}
                        </p>
                    ) : (
                        <Image
                            key={String(broken)}
                            src={
                                broken
                                    ? '/images/missing-label-fixture.jpg'
                                    : '/images/architecture.jpg'
                            }
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 45vw, 90vw"
                            className="object-cover object-[50%_55%] brightness-[.77] grayscale"
                            onError={() => setFailed(true)}
                        />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--image-dim) to-transparent to-40%" />
                    <FlutterBadge
                        caption={caption}
                        opaque={failed}
                        className="absolute top-[29%] -left-5.75 [text-shadow:0_0_1px_var(--image-dim),0_1px_2px_var(--image-dim)] md:top-[37%] md:-left-7 lg:-left-10 forced-colors:text-shadow-none"
                    />
                </div>
            </div>
            <Button
                variant="outline"
                className="w-fit max-w-full whitespace-normal"
                onClick={() => {
                    setFailed(false);
                    setBroken(!broken);
                }}
            >
                {broken ? restoreAction : errorAction}
            </Button>
        </div>
    );
}
