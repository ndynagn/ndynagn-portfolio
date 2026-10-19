import type { JSX, ReactNode } from 'react';

import { cn } from '@/shared/ui/cn';

interface MotionSurfaceProps {
    readonly children: ReactNode;
    readonly className?: string;
}

/** Content is visible in server HTML; only an optional hover treatment is animated. */
export function MotionSurface({ children, className }: MotionSurfaceProps): JSX.Element {
    return (
        <div
            className={cn(
                'transition-transform duration-200 motion-safe:hover:-translate-y-[2px]',
                className,
            )}
        >
            {children}
        </div>
    );
}
