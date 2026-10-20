'use client';

import { useLayoutEffect, useRef, type JSX, type ReactNode } from 'react';

import { cn } from '@/shared/ui/cn';

import styles from './measured-track.module.css';

interface MeasuredTrackProps {
    readonly children: ReactNode;
    readonly activeKey: string;
    readonly className?: string;
    readonly indicatorTone?: 'muted' | 'foreground';
}

/** Marks geometry only; the owner supplies direct children with data-track-key. */
export function MeasuredTrack({
    children,
    activeKey,
    className,
    indicatorTone = 'muted',
}: MeasuredTrackProps): JSX.Element {
    const rootRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const previousGeometry = useRef<string | null>(null);
    const previousKey = useRef(activeKey);
    const currentKey = useRef(activeKey);
    const measure = useRef<((animate?: boolean, settle?: boolean) => void) | null>(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        const indicator = indicatorRef.current;

        if (!root || !indicator) {
            return;
        }

        let frame: number | undefined;
        const update = (animate = false, settle = false) => {
            if (document.hidden) {
                return;
            }

            const child = Array.from(root.children).find(
                (node): node is HTMLElement =>
                    node instanceof HTMLElement && node.dataset.trackKey === currentKey.current,
            );

            if (!child) {
                indicator.removeAttribute('data-ready');
                previousGeometry.current = null;
                return;
            }

            const geometry = [
                child.offsetLeft,
                child.offsetTop,
                child.offsetWidth,
                child.offsetHeight,
            ].join(':');

            // Visibility/viewport restoration must settle a running selection even
            // when the target rectangle has not changed. Only writes are deduplicated.
            if (settle) {
                indicator.removeAttribute('data-animate');
            }
            if (geometry === previousGeometry.current) {
                return;
            }

            indicator.toggleAttribute('data-animate', animate && previousGeometry.current !== null);
            previousGeometry.current = geometry;
            indicator.style.setProperty('--track-x', `${child.offsetLeft}px`);
            indicator.style.setProperty('--track-y', `${child.offsetTop}px`);
            indicator.style.setProperty('--track-width', `${child.offsetWidth}px`);
            indicator.style.setProperty('--track-height', `${child.offsetHeight}px`);
            indicator.setAttribute('data-ready', 'true');
        };
        let settlePending = false;
        const schedule = (settle = false) => {
            settlePending ||= settle;
            if (document.hidden) {
                if (frame !== undefined) {
                    cancelAnimationFrame(frame);
                    frame = undefined;
                }
            } else if (frame === undefined) {
                frame = requestAnimationFrame(() => {
                    frame = undefined;
                    update(false, settlePending);
                    settlePending = false;
                });
            }
        };
        // Keep this observer mounted across selection changes. Its initial delivery
        // must not cancel a new selection transition with an unchanged measurement.
        let initialResize = true;
        const observer = new ResizeObserver(() => {
            schedule(!initialResize);
            initialResize = false;
        });
        const observeChildren = () => {
            Array.from(root.children).forEach((node) => {
                if (node instanceof HTMLElement && node.dataset.trackKey !== undefined) {
                    observer.observe(node);
                }
            });
        };
        const mutations = new MutationObserver(() => {
            observer.disconnect();
            observer.observe(root);
            observeChildren();
            schedule(true);
        });
        const restore = () => schedule(true);
        // Native details can reveal an unchanged border box without a ResizeObserver
        // delivery. Resynchronize the existing track after that visibility change.
        const disclosure = root.closest('details');

        observer.observe(root);
        observeChildren();
        mutations.observe(root, { childList: true, subtree: true, characterData: true });
        document.addEventListener('visibilitychange', restore);
        window.addEventListener('resize', restore);
        document.fonts.addEventListener('loadingdone', restore);
        disclosure?.addEventListener('toggle', restore);
        measure.current = update;
        update();

        return () => {
            measure.current = null;
            observer.disconnect();
            mutations.disconnect();
            document.removeEventListener('visibilitychange', restore);
            window.removeEventListener('resize', restore);
            document.fonts.removeEventListener('loadingdone', restore);
            disclosure?.removeEventListener('toggle', restore);
            if (frame !== undefined) {
                cancelAnimationFrame(frame);
            }
        };
    }, []);

    useLayoutEffect(() => {
        currentKey.current = activeKey;
        measure.current?.(previousKey.current !== activeKey);
        previousKey.current = activeKey;
    }, [activeKey]);

    return (
        <div
            ref={rootRef}
            data-indicator-tone={indicatorTone}
            className={cn(
                styles.track,
                'relative flex w-fit max-w-full flex-wrap gap-1 rounded-3xl border p-1',
                className,
            )}
        >
            <div
                ref={indicatorRef}
                className={styles.indicator}
                data-tone={indicatorTone}
                aria-hidden="true"
            />
            {children}
        </div>
    );
}
