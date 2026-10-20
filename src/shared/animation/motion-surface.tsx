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
                '[--motion-surface-lift:2px] transition-transform duration-200 motion-safe:hover:-translate-y-(--motion-surface-lift)',
                className,
            )}
        >
            {children}
        </div>
    );
}
