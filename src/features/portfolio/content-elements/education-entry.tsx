import type { JSX } from 'react';

import { cn } from '@/shared/ui/cn';

export interface EducationEntryProps {
    readonly yearLabel: string;
    readonly yearNote?: string;
    readonly title: string;
    readonly description: string;
    readonly headingLevel?: 2 | 3 | 4 | 5 | 6;
    readonly className?: string;
}

export function EducationEntry({
    yearLabel,
    yearNote,
    title,
    description,
    headingLevel = 3,
    className,
}: EducationEntryProps): JSX.Element {
    const headings = { 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const;
    const Heading = headings[headingLevel];

    return (
        <article
            className={cn(
                'grid min-w-0 grid-cols-[62px_minmax(0,1fr)] gap-4.25 pb-6 font-design leading-normal wrap-anywhere text-foreground subpixel-antialiased md:grid-cols-[68px_minmax(0,1fr)] md:gap-5 forced-colors:text-[CanvasText]',
                className,
            )}
            data-content-education
        >
            <span className="min-w-0 pt-0.5 text-xs leading-normal" data-education-year>
                {yearLabel}
                {yearNote && (
                    <small className="mt-1.25 block text-[0.5rem] text-muted-foreground">
                        {yearNote}
                    </small>
                )}
            </span>
            <div className="min-w-0">
                <Heading className="text-[0.8125rem] leading-[1.6] font-medium md:text-sm">
                    {title}
                </Heading>
                <p className="mt-1.5 text-[0.625rem] leading-[1.8] text-muted-foreground md:text-[0.6875rem]">
                    {description}
                </p>
            </div>
        </article>
    );
}
