'use client';

import { useState, type JSX } from 'react';
import Image from 'next/image';

import { GlassSurface } from '@/shared/styles/glass-surface';
import { Button } from '@/shared/ui/button';

interface PhotoDemoProps {
    readonly failureLabel: string;
    readonly errorAction: string;
    readonly restoreAction: string;
}

/** Real image onError path can be exercised with an intentionally invalid local image. */
export function PhotoDemo({
    failureLabel,
    errorAction,
    restoreAction,
}: PhotoDemoProps): JSX.Element {
    const [broken, setBroken] = useState(false);
    const [failed, setFailed] = useState(false);

    return (
        <div className="grid min-w-0 gap-4">
            <div className="relative min-w-0">
                <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    {failed ? (
                        <div
                            role="img"
                            aria-label={failureLabel}
                            className="absolute inset-0 grid place-items-center p-6 text-muted-foreground"
                        >
                            {failureLabel}
                        </div>
                    ) : (
                        <Image
                            src={
                                broken
                                    ? '/images/missing-foundation-fixture.jpg'
                                    : '/images/architecture.jpg'
                            }
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 45vw, 90vw"
                            loading="eager"
                            className="object-cover brightness-[.77] grayscale"
                            onError={() => setFailed(true)}
                        />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--image-dim) to-transparent to-40%" />
                </div>
                {/* Deliberate source overlap tests the same glass across photo and page. */}
                {!failed && (
                    <GlassSurface
                        material="badge"
                        className="absolute top-1/3 -left-4 grid size-24 place-items-center rounded-full p-3 text-center text-sm text-(--on-image) sm:size-32"
                        data-glass-proof
                    >
                        <span className="[text-shadow:0_0_1px_var(--image-dim),0_1px_2px_var(--image-dim)] forced-colors:text-shadow-none">
                            Glass
                            <br />
                            24 px
                        </span>
                    </GlassSurface>
                )}
                {!failed && (
                    <a
                        href="https://unsplash.com/@justcallmechristophe"
                        target="_blank"
                        rel="noreferrer"
                        className="absolute right-4 bottom-4 max-w-[60%] text-right text-sm text-(--on-image)"
                    >
                        Christophe Laurenceau / Unsplash ↗
                    </a>
                )}
            </div>
            <Button
                className="w-fit max-w-full whitespace-normal"
                variant="outline"
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
