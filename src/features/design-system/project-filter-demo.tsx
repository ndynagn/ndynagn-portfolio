'use client';

import { useSyncExternalStore, type JSX, type ReactNode } from 'react';

import { ProjectFilters, type ProjectFilterOption } from '@/features/portfolio/filters';
import { AnimatedItems } from '@/shared/animation/animated-items';

import { parseProjectFilterCategory, type ProjectFilterCategory } from './project-filter-category';

interface ProjectFilterItem {
    readonly id: string;
    readonly category: Exclude<ProjectFilterCategory, 'all'>;
    readonly content: ReactNode;
}

interface ProjectFilterDemoProps {
    readonly initialCategory: ProjectFilterCategory;
    readonly items: readonly ProjectFilterItem[];
    readonly options: readonly ProjectFilterOption[];
    readonly label: string;
    readonly action: string;
}

const changeEvent = 'workbench-project-filter-change';

function subscribe(callback: () => void): () => void {
    window.addEventListener('popstate', callback);
    window.addEventListener(changeEvent, callback);

    return () => {
        window.removeEventListener('popstate', callback);
        window.removeEventListener(changeEvent, callback);
    };
}

function readCategory(): ProjectFilterCategory {
    return parseProjectFilterCategory(
        new URLSearchParams(window.location.search).get('kitCategory'),
    );
}

/** URL is authoritative; native GET submission remains available before hydration. */
export function ProjectFilterDemo({
    initialCategory,
    items,
    options,
    label,
    action,
}: ProjectFilterDemoProps): JSX.Element {
    const category = useSyncExternalStore(subscribe, readCategory, () => initialCategory);

    function select(value: string): void {
        const next = parseProjectFilterCategory(value);
        if (next === category) {
            return;
        }

        const url = new URL(window.location.href);
        url.searchParams.set('kitCategory', next);
        // Native history keeps the grid mounted, enabling exit/reorder and preserving focus.
        window.history.pushState(null, '', url);
        window.dispatchEvent(new Event(changeEvent));
    }

    return (
        <div className="grid min-w-0 gap-[25px] md:gap-[30px]" data-project-filter-demo>
            <form action={action} method="get">
                <ProjectFilters
                    options={options}
                    value={category}
                    label={label}
                    name="kitCategory"
                    onValueChange={select}
                />
            </form>
            <AnimatedItems
                className="grid-cols-1 gap-x-7 gap-y-[30px] md:grid-cols-2 md:gap-y-[43px]"
                items={items.filter((item) => category === 'all' || item.category === category)}
            />
        </div>
    );
}
