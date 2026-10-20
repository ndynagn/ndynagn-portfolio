import type { ComponentProps, JSX } from 'react';

import { cn } from './cn';

interface StatusLabelProps extends Omit<Readonly<ComponentProps<'span'>>, 'children'> {
    readonly children: string;
    readonly variant?: 'default' | 'hero' | 'portfolio' | 'contact';
}

const variants = {
    default: '',
    hero: 'gap-1.5 pt-px text-[0.5rem] md:gap-2 md:pt-0 md:text-[0.625rem]',
    portfolio: 'text-[0.5rem] md:text-[0.625rem]',
    contact: 'gap-1.5 text-[0.5rem] md:gap-2 md:text-[0.625rem]',
};

/** Static availability text; its meaning and any live announcements belong to the consumer. */
export function StatusLabel({
    children,
    variant = 'default',
    className,
    ...props
}: StatusLabelProps): JSX.Element {
    return (
        <span
            {...props}
            className={cn(
                'inline-flex min-w-0 max-w-full items-center gap-2 font-design text-[0.625rem] leading-normal font-normal wrap-anywhere text-muted-foreground',
                variants[variant],
                className,
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    'inline-block size-1.25 shrink-0 rounded-full bg-current shadow-[0_0_0_3px_#8b8e7718] forced-colors:bg-[CanvasText]',
                    variant === 'contact' && 'size-1 md:size-1.25',
                )}
            />
            <span className="min-w-0">{children}</span>
        </span>
    );
}
