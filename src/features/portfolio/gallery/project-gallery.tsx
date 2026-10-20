'use client';

import { useRef, useState, type JSX } from 'react';

import { cn } from '@/shared/ui/cn';

import { GalleryRail } from './gallery-rail';
import { GalleryLightbox } from './gallery-lightbox';
import type { GalleryGroup, GalleryLabels } from './model';

export interface ProjectGalleryProps {
    readonly groups: readonly GalleryGroup[];
    readonly name: string;
    readonly labels: GalleryLabels;
    readonly headingLevel?: 2 | 3 | 4 | 5 | 6;
    readonly className?: string;
}

export function ProjectGallery({
    groups,
    name,
    labels,
    headingLevel = 3,
    className,
}: ProjectGalleryProps): JSX.Element | null {
    const [selected, setSelected] = useState<string | null>(null);
    const opener = useRef<HTMLAnchorElement>(null);
    const root = useRef<HTMLDivElement>(null);
    const visibleGroups = groups.filter((group) => group.images.length > 0);
    const images = visibleGroups.flatMap((group) => group.images);

    if (!images.length) {
        return null;
    }

    return (
        <div
            ref={root}
            tabIndex={-1}
            className={cn(
                'grid min-w-0 gap-10 font-design leading-[1.5] text-foreground subpixel-antialiased focus-visible:outline-2 focus-visible:outline-offset-4',
                className,
            )}
            data-project-gallery
        >
            {visibleGroups.map((group) => (
                <GalleryRail
                    key={group.id}
                    group={group}
                    labels={labels}
                    headingLevel={headingLevel}
                    onOpen={(image, anchor) => {
                        opener.current = anchor;
                        setSelected(image.id);
                    }}
                />
            ))}
            {selected !== null && (
                <GalleryLightbox
                    key={selected}
                    images={images}
                    initialId={selected}
                    name={name}
                    labels={labels}
                    opener={opener}
                    fallback={root}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
}
