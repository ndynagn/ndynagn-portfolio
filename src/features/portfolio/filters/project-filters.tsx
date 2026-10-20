'use client';

import type { JSX } from 'react';

import { cn } from '@/shared/ui/cn';

export interface ProjectFilterOption {
    readonly value: string;
    readonly label: string;
    readonly countLabel: string;
}

export interface ProjectFiltersProps {
    readonly options: readonly ProjectFilterOption[];
    readonly value: string;
    readonly label: string;
    readonly name?: string;
    readonly onValueChange?: (value: string) => void;
}

/** Controlled presentation. Without a callback, buttons submit their consumer's GET form. */
export function ProjectFilters({
    options,
    value,
    label,
    name = 'category',
    onValueChange,
}: ProjectFiltersProps): JSX.Element {
    return (
        <div
            role="group"
            aria-label={label}
            className="flex min-w-0 flex-wrap gap-1.75 font-design subpixel-antialiased md:gap-2.5"
        >
            {options.map((option) => (
                <button
                    key={option.value}
                    type="submit"
                    name={name}
                    value={option.value}
                    aria-pressed={value === option.value}
                    onClick={
                        onValueChange
                            ? (event) => {
                                  event.preventDefault();
                                  onValueChange(option.value);
                              }
                            : undefined
                    }
                    className={cn(
                        'min-w-0 max-w-full rounded-[50px] border px-3.5 py-2.75 text-[0.5625rem] leading-normal wrap-anywhere outline-offset-[7px] transition-[background-color,color] duration-200 ease-[ease] focus-visible:outline-2 focus-visible:outline-foreground md:px-5.25 md:py-3 md:text-[0.6875rem] forced-colors:focus-visible:outline-[Highlight]',
                        value === option.value
                            ? 'border-foreground bg-foreground text-background forced-colors:border-[Highlight] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]'
                            : 'border-border bg-transparent text-foreground forced-colors:border-[ButtonText] forced-colors:text-[ButtonText]',
                    )}
                >
                    {option.label}
                    <sup className="ml-1.75 text-[0.4375rem] md:ml-2.5 md:text-[0.5rem]">
                        {option.countLabel}
                    </sup>
                </button>
            ))}
        </div>
    );
}
