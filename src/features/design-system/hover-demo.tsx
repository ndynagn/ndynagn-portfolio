import type { JSX } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import styles from './hover-demo.module.css';

interface HoverDemoProps {
    readonly label: string;
    readonly sample: string;
}

export function HoverDemo({ label, sample }: HoverDemoProps): JSX.Element {
    return (
        <div className={`${styles.sample} grid min-w-0 gap-6 border p-6`}>
            <p className={`${styles.title} text-xl`}>{sample}</p>
            <div className="flex flex-wrap items-center gap-6">
                <Button className="[--demo-lift:3px] max-w-full whitespace-normal transition-transform duration-300 hover:-translate-y-(--demo-lift) motion-reduce:hover:translate-y-0">
                    {label}
                    <ArrowUpRight className={styles.arrow} />
                </Button>
                <ArrowDown className={styles.orb} aria-hidden="true" />
                <ArrowDown className={styles.round} aria-hidden="true" />
                <ArrowUpRight className={styles.contact} aria-hidden="true" />
                <span className={`${styles.thumbnail} grid size-16 place-items-center bg-muted`}>
                    1.025
                </span>
                <span className={styles.enlarge} aria-hidden="true">
                    ↗
                </span>
            </div>
        </div>
    );
}
