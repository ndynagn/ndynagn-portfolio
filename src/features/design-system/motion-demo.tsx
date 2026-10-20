'use client';

import { useState, type JSX } from 'react';

import { PaletteSurface, paletteNames } from '@/features/portfolio/visual';
import { AnimatedItems } from '@/shared/animation/animated-items';
import { MeasuredTrack } from '@/shared/animation/measured-track';
import { SceneTransition } from '@/shared/animation/scene-transition';
import { ScrollProgress } from '@/shared/animation/scroll-progress';
import { Button } from '@/shared/ui/button';

interface MotionDemoProps {
    readonly sample: string;
    readonly changeLabel: string;
    readonly sceneLabel: string;
    readonly filterLabel: string;
    readonly scrollLabel: string;
    readonly selections: readonly [string, string, string];
}

export function MotionDemo({
    sample,
    changeLabel,
    sceneLabel,
    filterLabel,
    scrollLabel,
    selections,
}: MotionDemoProps): JSX.Element {
    const [palette, setPalette] = useState(0);
    // The transition palette is a visual snapshot, held across scene replacement.
    const [transitionPalette, setTransitionPalette] = useState(1);
    const [filtered, setFiltered] = useState(false);
    const [selected, setSelected] = useState(0);
    const items = ['A', 'B', 'C', 'D'].filter((id) => !filtered || id === 'A' || id === 'C');

    return (
        <div className="grid min-w-0 gap-8">
            <ScrollProgress label={scrollLabel}>
                <div className="sticky top-0 z-10 flex min-h-[calc(7.125rem-1.875rem*var(--scroll-progress,0))] items-center bg-background px-3">
                    <MeasuredTrack activeKey={String(selected)}>
                        {selections.map((label, index) => (
                            <button
                                key={label}
                                type="button"
                                data-track-key={index}
                                aria-pressed={selected === index}
                                onClick={() => setSelected(index)}
                                className="relative min-w-0 rounded-3xl px-[calc(1.25rem-0.25rem*var(--scroll-progress,0))] py-3 text-sm focus-visible:outline-2 focus-visible:outline-ring"
                            >
                                {label}
                            </button>
                        ))}
                    </MeasuredTrack>
                </div>
                <p className="min-h-120 p-6 text-sm leading-8">
                    {scrollLabel}
                    <br />
                    {sample}
                </p>
            </ScrollProgress>
            <div className="grid gap-4">
                <Button
                    className="w-fit"
                    onClick={() => setFiltered(!filtered)}
                    aria-pressed={filtered}
                >
                    {filterLabel}
                </Button>
                <AnimatedItems
                    items={items.map((id) => ({
                        id,
                        content: (
                            <div className="grid min-h-24 place-items-center border p-4">{id}</div>
                        ),
                    }))}
                />
            </div>
            {/* The overlay inherits the destination palette before cover; visible scene
            content retains its current palette until replacement. */}
            <PaletteSurface palette={paletteNames[transitionPalette]}>
                <SceneTransition
                    label={sceneLabel}
                    actionLabel={changeLabel}
                    onPrepare={() => setTransitionPalette((palette + 1) % paletteNames.length)}
                    onReplace={() => setPalette((value) => (value + 1) % paletteNames.length)}
                >
                    <PaletteSurface palette={paletteNames[palette]}>
                        <div
                            className="grid min-h-40 place-items-center gap-3 bg-(--palette-surface) p-6 text-(--palette-foreground)"
                            aria-live="polite"
                        >
                            <span>{paletteNames[palette]}</span>
                            <p>{sample}</p>
                        </div>
                    </PaletteSurface>
                </SceneTransition>
            </PaletteSurface>
        </div>
    );
}
