'use client';

import { useEffect, useRef, type JSX, type ReactNode } from 'react';

interface ScrollProgressProps {
    readonly children: ReactNode;
    readonly label: string;
}

/** Owns a local scrolling region; --scroll-progress is optional and defaults to 0 before JS. */
export function ScrollProgress({ children, label }: ScrollProgressProps): JSX.Element {
    const host = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = host.current;

        if (!node) {
            return;
        }

        const media = matchMedia('(prefers-reduced-motion: reduce)');
        let frame: number | undefined;
        const update = () => {
            frame = undefined;
            node.style.setProperty(
                '--scroll-progress',
                String(media.matches ? 0 : Math.min(1, Math.max(0, node.scrollTop / 240))),
            );
        };
        const schedule = () => {
            if (document.hidden) {
                if (frame !== undefined) {
                    cancelAnimationFrame(frame);
                    frame = undefined;
                }
            } else if (frame === undefined) {
                frame = requestAnimationFrame(update);
            }
        };

        update();
        node.addEventListener('scroll', schedule, { passive: true });
        media.addEventListener('change', schedule);
        document.addEventListener('visibilitychange', schedule);

        return () => {
            node.removeEventListener('scroll', schedule);
            media.removeEventListener('change', schedule);
            document.removeEventListener('visibilitychange', schedule);
            if (frame !== undefined) {
                cancelAnimationFrame(frame);
            }
        };
    }, []);

    return (
        <div
            ref={host}
            tabIndex={0}
            aria-label={label}
            className="max-h-64 overflow-y-auto rounded-xl border"
        >
            {children}
        </div>
    );
}
