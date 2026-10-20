import type { JSX, ReactNode } from 'react';

import { cn } from '@/shared/ui/cn';
import { CurrentLabel } from '@/shared/ui/current-label';

export interface ExperienceEntryProps {
    readonly periodLabel: string;
    readonly organization: string;
    readonly role: string;
    readonly description: string;
    readonly currentLabel?: string;
    readonly projectLines?: readonly string[];
    readonly action?: ReactNode;
    readonly headingLevel?: 2 | 3 | 4 | 5 | 6;
    readonly className?: string;
}

export function ExperienceEntry({
    periodLabel,
    organization,
    role,
    description,
    currentLabel,
    projectLines,
    action,
    headingLevel = 3,
    className,
}: ExperienceEntryProps): JSX.Element {
    const headings = { 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const;
    const Heading = headings[headingLevel];

    return (
        <article
            className={cn(
                'min-w-0 border-b pb-[35px] font-design leading-[1.5] wrap-anywhere text-foreground subpixel-antialiased forced-colors:border-[CanvasText] forced-colors:text-[CanvasText]',
                className,
            )}
            data-content-experience
        >
            <span
                data-experience-period
                className="mb-4 block text-[0.5rem] leading-[1.6] font-semibold tracking-[0.08125rem] text-muted-foreground md:text-[0.5625rem]"
            >
                {periodLabel}
            </span>
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <Heading className="min-w-0 text-[1.4375rem] leading-[1.5] font-medium tracking-[-0.04375rem] md:text-[1.5625rem]">
                    {organization}
                </Heading>
                {currentLabel && <CurrentLabel className="shrink-0">{currentLabel}</CurrentLabel>}
            </div>
            <span data-experience-role className="mt-[7px] block text-[0.6875rem]">
                {role}
            </span>
            <p
                data-experience-description
                className="mt-5 text-xs leading-[1.95] text-muted-foreground"
            >
                {description}
            </p>
            {!!projectLines?.length && (
                <div
                    data-experience-projects
                    className="mt-[17px] text-[0.5625rem] leading-[1.9] text-muted-foreground"
                >
                    {projectLines.map((line, index) => (
                        <span key={index} className="block">
                            {index > 0 ? ' ' : ''}
                            {line}
                        </span>
                    ))}
                </div>
            )}
            {action}
        </article>
    );
}
