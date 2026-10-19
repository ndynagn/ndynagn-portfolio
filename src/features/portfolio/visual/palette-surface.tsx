import type { JSX, ReactNode } from 'react';

import styles from './palette-surface.module.css';

export const paletteNames = [
    'onetouch',
    'potlucky',
    'immergas',
    'klimatprof',
    'checkai',
    'galleria-minsk',
    'golden-plate',
    'aventin',
] as const;
export type PaletteName = (typeof paletteNames)[number];

interface PaletteSurfaceProps {
    readonly palette: PaletteName;
    readonly children: ReactNode;
}

export function PaletteSurface({ palette, children }: PaletteSurfaceProps): JSX.Element {
    return (
        <div className={styles.palette} data-palette={palette}>
            {children}
        </div>
    );
}
