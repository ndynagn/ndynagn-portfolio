'use client';

import { useTransition, type JSX } from 'react';
import { useRouter } from 'next/navigation';

import { ProjectFilters, type ProjectFilterOption } from './filters';

interface CatalogueFiltersProps {
    readonly action: string;
    readonly value: string;
    readonly label: string;
    readonly options: readonly ProjectFilterOption[];
}

/** Native GET submission is the baseline; Next owns URL history and server rendering. */
export function CatalogueFilters({
    action,
    value,
    label,
    options,
}: CatalogueFiltersProps): JSX.Element {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    return (
        <form
            action={action}
            method="get"
            aria-busy={pending}
            className="mt-7.5 mb-6.25 md:mt-12.5 md:mb-7.5"
        >
            <ProjectFilters
                options={options}
                value={value}
                label={label}
                onValueChange={(category) => {
                    startTransition(() =>
                        router.push(
                            category === 'all'
                                ? action
                                : `${action}?category=${encodeURIComponent(category)}`,
                            { scroll: false },
                        ),
                    );
                }}
            />
        </form>
    );
}
