import type { JSX } from 'react';
import Image from 'next/image';

import { GlassSurface } from '@/shared/styles/glass-surface';

import styles from './material-samples.module.css';

interface MaterialSamplesProps {
    readonly labels: readonly [string, string, string];
}

const materials = [
    { material: 'surface', recipe: '24 px · ×1.3 · var(--glass)' },
    { material: 'control', recipe: '15 px · ×1 · var(--glass)' },
    { material: 'badge', recipe: '24 px · ×1.3 · #a0a19755' },
] as const;

/** Static material comparison; the photograph has a readable solid backing if it fails. */
export function MaterialSamples({ labels }: MaterialSamplesProps): JSX.Element {
    return (
        <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-3" data-material-matrix>
            {(['photo', 'page', 'contrast'] as const).map((backdrop, index) => (
                <figure key={backdrop} className="grid min-w-0 content-start gap-3">
                    <figcaption className="text-sm">{labels[index]}</figcaption>
                    <div className={styles.panel} data-backdrop={backdrop}>
                        {backdrop === 'photo' && (
                            <Image
                                src="/images/architecture.jpg"
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 30vw, 90vw"
                                className="object-cover brightness-[.77] grayscale"
                            />
                        )}
                        {backdrop === 'photo' && (
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--image-dim) to-transparent to-40%" />
                        )}
                        <div className={styles.detail} aria-hidden="true">
                            <span>Aa Бб 0123456789</span>
                            <span>BACKGROUND / ФОН</span>
                            <span>Aa Бб 0123456789</span>
                        </div>
                        <div className="relative grid min-w-0 gap-6 p-6">
                            {materials.map(({ material, recipe }) => (
                                <GlassSurface
                                    key={material}
                                    material={material}
                                    className={`grid min-w-0 gap-2 rounded-2xl p-5 text-sm ${material === 'badge' ? styles['badge-ink'] : 'text-foreground'}`}
                                    data-material-sample
                                >
                                    <strong className="font-semibold">{material}</strong>
                                    <span>{recipe}</span>
                                </GlassSurface>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        surface / control: light #f7f7f2b5 · dark #22231dc7
                    </p>
                </figure>
            ))}
        </div>
    );
}
