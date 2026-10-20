import type { HTMLAttributes, JSX } from 'react';

import { cn } from '@/shared/ui/cn';

import styles from './glass-surface.module.css';

interface GlassSurfaceProps extends Readonly<HTMLAttributes<HTMLDivElement>> {
    readonly material?: 'surface' | 'badge' | 'control';
    readonly opaque?: boolean;
}

/** Material only: consumers own text contrast, image/dimming layers and placement. */
export function GlassSurface({
    material = 'surface',
    opaque = false,
    className,
    ...props
}: GlassSurfaceProps): JSX.Element {
    return (
        <div
            {...props}
            className={cn(styles.glass, className)}
            data-glass={material}
            data-opaque={opaque || undefined}
        />
    );
}
