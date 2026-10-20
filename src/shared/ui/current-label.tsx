import type { ComponentProps, JSX } from 'react';

import { cn } from './cn';

interface CurrentLabelProps extends Omit<Readonly<ComponentProps<'span'>>, 'children'> {
    readonly children: string;
}

export function CurrentLabel({ children, className, ...props }: CurrentLabelProps): JSX.Element {
    return (
        <span
            {...props}
            className={cn(
                'inline-block min-w-0 max-w-full rounded-[20px] border px-3 py-[5px] font-design text-[0.5rem] leading-[1.5] font-normal wrap-anywhere text-foreground',
                className,
            )}
        >
            {children}
        </span>
    );
}
