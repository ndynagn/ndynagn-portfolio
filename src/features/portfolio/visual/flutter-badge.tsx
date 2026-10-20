import type { JSX } from 'react';

import { GlassSurface } from '@/shared/styles/glass-surface';
import { cn } from '@/shared/ui/cn';

interface FlutterBadgeProps {
    readonly caption: string;
    readonly className?: string;
    readonly opaque?: boolean;
}

/** Source mark and material only. Placement, photograph and its error state belong to the caller. */
export function FlutterBadge({
    caption,
    className,
    opaque = false,
}: FlutterBadgeProps): JSX.Element {
    return (
        <GlassSurface
            material="badge"
            opaque={opaque}
            className={cn(
                'flex size-[6.125rem] shrink-0 flex-col items-center justify-center gap-2 rounded-full font-design text-(--on-image) md:size-[6.25rem] lg:size-[7.6875rem] forced-colors:text-[CanvasText]',
                className,
            )}
        >
            <svg
                viewBox="0 0 40 40"
                aria-hidden="true"
                className="size-[25px] shrink-0 md:size-[29px]"
            >
                <path
                    d="m24 4-20 20 7 7L38 4Zm0 18L13 33l7 7 11-11Zm-4 18h18L27 29Z"
                    fill="currentColor"
                />
            </svg>
            <span className="text-center text-[0.75rem] leading-[1.2] font-semibold md:text-[0.8125rem]">
                Flutter
                <br />
                <small className="text-[0.5rem] font-normal">{caption}</small>
            </span>
        </GlassSurface>
    );
}
