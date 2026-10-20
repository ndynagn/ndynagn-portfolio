import type { JSX, ReactNode } from 'react';

import { cn } from '@/shared/ui/cn';

export interface SectionHeadingProps {
    readonly label: string;
    readonly indexLabel?: string;
    readonly aside?: ReactNode;
    readonly className?: string;
}

/** Source eyebrow row; the composition owns the section's actual heading and spacing. */
export function SectionHeading({
    label,
    indexLabel,
    aside,
    className,
}: SectionHeadingProps): JSX.Element {
    return (
        <div
            className={cn(
                'flex min-w-0 flex-wrap items-center justify-between gap-3.75 font-design subpixel-antialiased',
                className,
            )}
            data-content-section-heading
        >
            <span className="min-w-0 text-[0.5rem] leading-[1.6] font-semibold tracking-[0.125em] wrap-anywhere md:text-[0.625rem] md:tracking-[0.13em]">
                {indexLabel && (
                    <>
                        <span
                            aria-hidden="true"
                            className="mr-2.25 text-(--decorative-muted) md:mr-4"
                        >
                            {indexLabel}
                        </span>{' '}
                    </>
                )}
                {label}
            </span>
            {aside !== undefined && aside !== null && (
                <span
                    className={cn(
                        'flex min-w-0',
                        (typeof aside === 'string' || typeof aside === 'number') &&
                            'text-right text-[0.4375rem] leading-[1.6] font-semibold tracking-[0.1428571429em] wrap-anywhere text-muted-foreground md:text-[0.625rem] md:tracking-[0.13em]',
                    )}
                >
                    {aside}
                </span>
            )}
        </div>
    );
}
