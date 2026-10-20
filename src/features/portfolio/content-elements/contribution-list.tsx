import type { JSX } from 'react';

import { cn } from '@/shared/ui/cn';

export interface ContributionItem {
    readonly id: string;
    readonly numberLabel: string;
    readonly text: string;
}

export interface ContributionListProps {
    readonly items: readonly ContributionItem[];
    readonly className?: string;
}

export function ContributionList({ items, className }: ContributionListProps): JSX.Element | null {
    if (!items.length) {
        return null;
    }

    return (
        <ol
            role="list"
            className={cn(
                'min-w-0 list-none p-0 font-design text-foreground subpixel-antialiased forced-colors:text-[CanvasText]',
                className,
            )}
            data-content-contributions
        >
            {items.map((item) => (
                <li
                    key={item.id}
                    className="grid min-w-0 grid-cols-[minmax(1.375rem,max-content)_minmax(0,1fr)] gap-3.75 border-t py-4.5 md:grid-cols-[minmax(1.875rem,max-content)_minmax(0,1fr)] md:gap-5.5 md:py-5.5 forced-colors:border-[CanvasText]"
                >
                    <span
                        aria-hidden="true"
                        className="pt-1.25 text-[0.625rem] leading-normal text-(--decorative-muted)"
                    >
                        {item.numberLabel}
                    </span>
                    <p className="min-w-0 text-sm leading-[1.75] tracking-[-0.0214285714em] wrap-anywhere md:text-base md:tracking-[-0.01875em]">
                        {item.text}
                    </p>
                </li>
            ))}
        </ol>
    );
}
