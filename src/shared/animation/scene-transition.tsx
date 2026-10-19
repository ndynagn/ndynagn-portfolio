'use client';

import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type JSX,
    type MouseEvent,
    type ReactNode,
} from 'react';

import { Button } from '@/shared/ui/button';

import { runSceneSequence, type ScenePhase } from './scene-sequence';
import { acquireTransition } from './transition-lock';
import styles from './scene-transition.module.css';

interface SceneTransitionProps {
    readonly children: ReactNode;
    readonly label: string;
    readonly actionLabel: string;
    readonly onPrepare: () => void;
    readonly onReplace: () => void;
}

interface SceneGeometry extends CSSProperties {
    readonly '--scene-x': string;
    readonly '--scene-y': string;
    readonly '--scene-radius': string;
}

/** Visual scene wrapper, with an inherited palette and no navigation/history API. */
export function SceneTransition({
    children,
    label,
    actionLabel,
    onPrepare,
    onReplace,
}: SceneTransitionProps): JSX.Element {
    const [phase, setPhase] = useState<ScenePhase>('idle');
    const [geometry, setGeometry] = useState({ x: 0, y: 0, radius: 0 });
    const position = useRef({ x: 0, y: 0 });
    const overlay = useRef<HTMLDivElement>(null);
    const active = useRef<AbortController | null>(null);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        const media = matchMedia('(prefers-reduced-motion: reduce)');
        const cancel = () => active.current?.abort();
        const visibility = () => {
            if (document.hidden) {
                cancel();
            }
        };

        document.addEventListener('visibilitychange', visibility);
        media.addEventListener('change', cancel);

        return () => {
            mounted.current = false;
            document.removeEventListener('visibilitychange', visibility);
            media.removeEventListener('change', cancel);
            cancel();
        };
    }, []);

    useEffect(() => {
        if (phase === 'idle') {
            return;
        }

        let frame: number | undefined;
        const update = () => {
            frame = undefined;
            position.current = {
                x: Math.min(innerWidth, Math.max(0, position.current.x)),
                y: Math.min(innerHeight, Math.max(0, position.current.y)),
            };
            overlay.current?.style.setProperty('--scene-x', `${position.current.x}px`);
            overlay.current?.style.setProperty('--scene-y', `${position.current.y}px`);
            overlay.current?.style.setProperty(
                '--scene-radius',
                `${Math.ceil(Math.hypot(innerWidth, innerHeight))}px`,
            );
        };
        const schedule = () => {
            if (frame === undefined && !document.hidden) {
                frame = requestAnimationFrame(update);
            }
        };
        const move = (event: PointerEvent) => {
            position.current = { x: event.clientX, y: event.clientY };
            schedule();
        };

        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('resize', schedule);

        return () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('resize', schedule);
            if (frame !== undefined) {
                cancelAnimationFrame(frame);
            }
        };
    }, [phase]);

    const run = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        const release = acquireTransition();

        if (!release) {
            return;
        }

        const controller = new AbortController();
        active.current = controller;
        const box = event.currentTarget.getBoundingClientRect();
        // Pointer waves begin at the click. Keyboard activation uses its focused control.
        const origin =
            event.detail === 0
                ? { x: box.x + box.width / 2, y: box.y + box.height / 2 }
                : { x: event.clientX, y: event.clientY };
        position.current = origin;
        setGeometry({ ...origin, radius: Math.ceil(Math.hypot(innerWidth, innerHeight)) });

        try {
            onPrepare();
            await runSceneSequence(onReplace, {
                signal: controller.signal,
                animated:
                    !document.hidden &&
                    !matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches,
                phase: (value) => {
                    if (mounted.current) {
                        setPhase(value);
                    }
                },
            });
        } catch (error: unknown) {
            if (!controller.signal.aborted) {
                console.error('Technical scene replacement failed', error);
            }
        } finally {
            active.current = null;
            release();
        }
    };
    const style: SceneGeometry = {
        '--scene-x': `${geometry.x}px`,
        '--scene-y': `${geometry.y}px`,
        '--scene-radius': `${geometry.radius}px`,
    };

    return (
        <div className="grid gap-4">
            <Button
                className="w-fit"
                data-cursor="page"
                data-cursor-label={actionLabel}
                onClick={(event) => void run(event)}
            >
                {actionLabel}
            </Button>
            {children}
            {phase !== 'idle' && (
                <div
                    ref={overlay}
                    className={styles.overlay}
                    data-scene-phase={phase}
                    style={style}
                    aria-hidden="true"
                >
                    <span className="px-[5%] text-center text-[clamp(1.875rem,5vw,4.375rem)] tracking-[-0.04em]">
                        {label}
                    </span>
                </div>
            )}
        </div>
    );
}
