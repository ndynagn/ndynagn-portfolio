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
                'flex min-w-0 flex-wrap items-center justify-between gap-[15px] font-design subpixel-antialiased',
                className,
            )}
            data-content-section-heading
        >
            <span className="min-w-0 text-[0.5rem] leading-[1.6] font-semibold tracking-[0.0625rem] wrap-anywhere md:text-[0.625rem] md:tracking-[0.08125rem]">
                {indexLabel && (
                    <>
                        <span
                            aria-hidden="true"
                            className="mr-[9px] text-(--decorative-muted) md:mr-4"
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
                            'text-right text-[0.4375rem] leading-[1.6] font-semibold tracking-[0.0625rem] wrap-anywhere text-muted-foreground md:text-[0.625rem] md:tracking-[0.08125rem]',
                    )}
                >
                    {aside}
                </span>
            )}
        </div>
    );
}
