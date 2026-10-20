import type { ComponentProps, JSX } from 'react';

import { cn } from './cn';

interface TechnologyTagProps extends Omit<Readonly<ComponentProps<'span'>>, 'children'> {
    readonly children: string;
}

export function TechnologyTag({ children, className, ...props }: TechnologyTagProps): JSX.Element {
    return (
        <span
            {...props}
            className={cn(
                'inline-block min-w-0 max-w-full rounded-[30px] border px-[14px] py-[9px] font-design text-[0.625rem] leading-[1.5] font-[450] wrap-anywhere text-foreground md:px-[17px] md:py-[10px] md:text-[0.6875rem]',
                className,
            )}
        >
            {children}
        </span>
    );
}
