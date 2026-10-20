import type { JSX } from 'react';

import { cn } from '@/shared/ui/cn';

export interface ProjectFact {
    readonly id: string;
    readonly label: string;
    readonly value: string;
}

export interface ProjectFactsProps {
    readonly items: readonly ProjectFact[];
    readonly className?: string;
}

export function ProjectFacts({ items, className }: ProjectFactsProps): JSX.Element | null {
    if (!items.length) {
        return null;
    }

    return (
        <dl
            className={cn(
                'grid min-w-0 grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-5 border-t pt-6.25 font-design wrap-anywhere text-foreground subpixel-antialiased md:gap-7.5 forced-colors:border-[CanvasText] forced-colors:text-[CanvasText]',
                className,
            )}
            data-content-facts
        >
            {items.map((item) => (
                <div key={item.id} className="min-w-0">
                    <dt className="text-base leading-normal">
                        {/* Preserve the source inline label's surrounding line box. */}
                        <span className="text-[0.5625rem] leading-[1.6] font-semibold tracking-[0.1111111111em] text-muted-foreground md:tracking-[0.1444444444em]">
                            {item.label}
                        </span>
                    </dt>
                    <dd className="mt-3 text-[0.6875rem] leading-[1.8] md:text-xs">{item.value}</dd>
                </div>
            ))}
        </dl>
    );
}
