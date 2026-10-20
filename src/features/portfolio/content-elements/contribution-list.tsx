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
                    className="grid min-w-0 grid-cols-[minmax(1.375rem,max-content)_minmax(0,1fr)] gap-[15px] border-t py-[18px] md:grid-cols-[minmax(1.875rem,max-content)_minmax(0,1fr)] md:gap-[22px] md:py-[22px] forced-colors:border-[CanvasText]"
                >
                    <span
                        aria-hidden="true"
                        className="pt-[5px] text-[0.625rem] leading-[1.5] text-(--decorative-muted)"
                    >
                        {item.numberLabel}
                    </span>
                    <p className="min-w-0 text-sm leading-[1.75] tracking-[-0.01875rem] wrap-anywhere md:text-base">
                        {item.text}
                    </p>
                </li>
            ))}
        </ol>
    );
}
