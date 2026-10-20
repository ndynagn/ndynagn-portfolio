import type * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from './cn';

const buttonVariants = cva(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                    'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
                outline:
                    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                link: 'text-primary underline-offset-4 hover:underline',
                pill: '[--button-lift:3px] rounded-full bg-foreground font-design text-background transition-transform duration-300 ease-[ease] motion-safe:not-disabled:hover:-translate-y-(--button-lift) motion-safe:focus-visible:-translate-y-(--button-lift) [&_svg]:stroke-[1.5]',
                round: 'rounded-full border border-border bg-transparent font-design transition-[background-color,color,transform,rotate,translate] duration-300 ease-[ease] not-disabled:hover:bg-foreground not-disabled:hover:text-background focus-visible:bg-foreground focus-visible:text-background [&_svg]:stroke-[1.5]',
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
                sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9',
                'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
                'icon-sm': 'size-8',
                'icon-lg': 'size-10',
                action: "h-auto min-w-0 max-w-full shrink justify-between gap-6.75 px-5.5 py-4.5 text-[0.6875rem] whitespace-normal wrap-anywhere md:gap-5.5 md:px-5 md:py-4.25 lg:gap-8 lg:px-6.25 lg:py-4.75 lg:text-xs [&_svg:not([class*='size-'])]:size-4.25",
                control: "size-8.25 p-0 md:size-9.25 [&_svg:not([class*='size-'])]:size-4.25",
                gallery: "size-11 p-0 disabled:opacity-30 [&_svg:not([class*='size-'])]:size-4.75",
                orb: "size-15.75 bg-foreground p-0 text-background duration-400 md:size-25 lg:size-31.25 motion-safe:not-disabled:hover:rotate-45 motion-safe:focus-visible:rotate-45 [&_svg:not([class*='size-'])]:size-6.25 md:[&_svg:not([class*='size-'])]:size-10.75 [&_svg]:stroke-1",
            },
        },
        compoundVariants: [
            {
                variant: 'round',
                size: 'orb',
                className: 'border-0',
            },
            {
                size: 'action',
                className: 'leading-normal',
            },
            {
                variant: 'round',
                size: 'control',
                className:
                    'not-disabled:hover:bg-transparent not-disabled:hover:text-foreground focus-visible:bg-transparent focus-visible:text-foreground',
            },
            {
                variant: 'round',
                size: 'gallery',
                className:
                    'duration-200 not-disabled:hover:bg-border not-disabled:hover:text-foreground focus-visible:bg-border focus-visible:text-foreground',
            },
            {
                variant: ['pill', 'round'],
                className:
                    'focus-visible:border-border focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-foreground focus-visible:outline-offset-[7px] forced-colors:focus-visible:outline-[Highlight] disabled:transition-none disabled:translate-none disabled:rotate-none disabled:transform-none',
            },
        ],
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

type ButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        readonly asChild?: boolean;
    };

function Button({
    className,
    variant = 'default',
    size = 'default',
    asChild = false,
    ...props
}: ButtonProps): React.JSX.Element {
    const Comp = asChild ? Slot.Root : 'button';

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
