import type { ComponentProps, JSX, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './cn';

const linkVariants = cva(
    'group inline-flex min-w-0 max-w-full items-center font-design wrap-anywhere outline-offset-[7px] focus-visible:outline-2 focus-visible:outline-foreground forced-colors:focus-visible:outline-[Highlight]',
    {
        variants: {
            variant: {
                underlined:
                    'gap-2.25 border-b py-3.5 text-[0.6875rem] md:text-[0.625rem] lg:gap-3.5 lg:text-xs',
                inline: 'gap-3.75 text-[0.6875rem]',
                scroll: 'gap-2 text-[0.5625rem] md:gap-3.25 md:text-[0.625rem]',
                index: 'flex w-full justify-between gap-4 border-b py-5.75 text-lg tracking-[-0.03em] md:py-6.75 md:text-xl',
                contact:
                    'flex w-full justify-between gap-4 border-t pt-4.25 text-sm font-medium md:pt-5 md:text-[0.9375rem]',
                next: 'flex w-full justify-between gap-4 border-t pt-7 text-[2rem] tracking-tighter md:pt-8.75 md:text-[clamp(1.875rem,5vw,4.375rem)]',
            },
        },
        defaultVariants: { variant: 'inline' },
    },
);

interface TextLinkProps extends Omit<Readonly<ComponentProps<'a'>>, 'children' | 'href'> {
    readonly href: string;
    readonly variant?: NonNullable<VariantProps<typeof linkVariants>['variant']>;
    readonly children: ReactNode;
    readonly icon: ReactNode;
    readonly count?: number;
    readonly description?: string;
    readonly eyebrow?: string;
}

/** Native anchor: the consumer owns destination, download and external-link policy. */
export function TextLink({
    variant = 'inline',
    children,
    icon,
    count,
    description,
    eyebrow,
    className,
    ...props
}: TextLinkProps): JSX.Element {
    const circle = variant === 'scroll' || variant === 'index';
    const iconSizes = {
        underlined: 'size-3.75',
        inline: 'size-3.5',
        scroll: 'size-4',
        index: 'size-4',
        contact: 'size-4.25',
        next: 'size-7.5 md:size-11.25',
    };

    return (
        <a
            {...props}
            data-text-link={variant}
            className={cn(linkVariants({ variant }), 'leading-normal', className)}
        >
            <span className="min-w-0">
                {eyebrow && (
                    <span className="mb-3.5 block text-[0.5rem] leading-[1.6] font-semibold tracking-[0.125em] text-muted-foreground md:mb-4.5 md:text-[0.625rem] md:tracking-widest">
                        {eyebrow}
                    </span>
                )}
                {children}
                {count !== undefined && (
                    <>
                        {' '}
                        <sup className="ms-1.25 align-top text-[0.625rem] font-normal tracking-normal text-muted-foreground">
                            ({String(count).padStart(2, '0')})
                        </sup>
                    </>
                )}
                {description && (
                    <span className="mt-1.5 block text-[0.625rem] font-normal tracking-normal text-muted-foreground md:mt-2">
                        {description}
                    </span>
                )}
            </span>
            <span
                aria-hidden="true"
                className={cn(
                    'inline-flex shrink-0 items-center justify-center transition-[transform,rotate,translate,background-color,color] duration-300 ease-[ease]',
                    circle &&
                        'size-9.5 rounded-full border group-hover:bg-foreground group-hover:text-background group-focus-visible:bg-foreground group-focus-visible:text-background motion-safe:group-hover:-rotate-10 motion-safe:group-focus-visible:-rotate-10',
                    variant === 'scroll' && 'size-7.5 md:size-9.5',
                    variant === 'contact' &&
                        '[--contact-arrow-offset:3px] motion-safe:group-hover:translate-x-(--contact-arrow-offset) motion-safe:group-hover:-translate-y-(--contact-arrow-offset) motion-safe:group-focus-visible:translate-x-(--contact-arrow-offset) motion-safe:group-focus-visible:-translate-y-(--contact-arrow-offset)',
                    !circle && iconSizes[variant],
                    '[&_svg]:size-full [&_svg]:stroke-[1.5]',
                )}
            >
                {circle ? (
                    <span className={cn('inline-flex [&_svg]:size-full', iconSizes[variant])}>
                        {icon}
                    </span>
                ) : (
                    icon
                )}
            </span>
        </a>
    );
}
