import type { ComponentProps, JSX, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './cn';

const linkVariants = cva(
    'group inline-flex min-w-0 max-w-full items-center font-design wrap-anywhere outline-offset-[7px] focus-visible:outline-2 focus-visible:outline-foreground forced-colors:focus-visible:[outline-color:Highlight]',
    {
        variants: {
            variant: {
                underlined:
                    'gap-[9px] border-b py-[14px] text-[0.6875rem] md:text-[0.625rem] lg:gap-[14px] lg:text-xs',
                inline: 'gap-[15px] text-[0.6875rem]',
                scroll: 'gap-2 text-[0.5625rem] md:gap-[13px] md:text-[0.625rem]',
                index: 'flex w-full justify-between gap-4 border-b py-[23px] text-lg tracking-[-0.03em] md:py-[27px] md:text-xl',
                contact:
                    'flex w-full justify-between gap-4 border-t pt-[17px] text-sm font-medium md:pt-5 md:text-[0.9375rem]',
                next: 'flex w-full justify-between gap-4 border-t pt-7 text-[2rem] tracking-[-0.05em] md:pt-[35px] md:text-[clamp(1.875rem,5vw,4.375rem)]',
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
        underlined: 'size-[15px]',
        inline: 'size-[14px]',
        scroll: 'size-4',
        index: 'size-4',
        contact: 'size-[17px]',
        next: 'size-[30px] md:size-[45px]',
    };

    return (
        <a
            {...props}
            data-text-link={variant}
            className={cn(linkVariants({ variant }), 'leading-[1.5]', className)}
        >
            <span className="min-w-0">
                {eyebrow && (
                    <span className="mb-[14px] block text-[0.5rem] leading-[1.6] font-semibold tracking-[0.125em] text-muted-foreground md:mb-[18px] md:text-[0.625rem] md:tracking-[0.1em]">
                        {eyebrow}
                    </span>
                )}
                {children}
                {count !== undefined && (
                    <>
                        {' '}
                        <sup className="ms-[5px] align-top text-[0.625rem] font-normal tracking-normal text-muted-foreground">
                            ({String(count).padStart(2, '0')})
                        </sup>
                    </>
                )}
                {description && (
                    <span className="mt-[6px] block text-[0.625rem] font-normal tracking-normal text-muted-foreground md:mt-2">
                        {description}
                    </span>
                )}
            </span>
            <span
                aria-hidden="true"
                className={cn(
                    'inline-flex shrink-0 items-center justify-center transition-[transform,rotate,translate,background-color,color] duration-300 ease-[ease]',
                    circle &&
                        'size-[38px] rounded-full border group-hover:bg-foreground group-hover:text-background group-focus-visible:bg-foreground group-focus-visible:text-background motion-safe:group-hover:-rotate-10 motion-safe:group-focus-visible:-rotate-10',
                    variant === 'scroll' && 'size-[30px] md:size-[38px]',
                    variant === 'contact' &&
                        'motion-safe:group-hover:translate-x-[3px] motion-safe:group-hover:-translate-y-[3px] motion-safe:group-focus-visible:translate-x-[3px] motion-safe:group-focus-visible:-translate-y-[3px]',
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
