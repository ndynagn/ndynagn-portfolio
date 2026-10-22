'use client';

import { useEffect, useRef, type JSX, type ReactNode } from 'react';

import styles from './cursor-boundary.module.css';

interface CursorBoundaryProps {
    readonly children: ReactNode;
}

/** Explicit page targets use data-cursor="page" and data-cursor-label.
 * Page palettes mirror the transition target, including its nested artwork palette.
 * data-cursor="native", text controls and disabled controls retain the system cursor.
 */
export function CursorBoundary({ children }: CursorBoundaryProps): JSX.Element {
    const host = useRef<HTMLDivElement>(null);
    const cursor = useRef<HTMLDivElement>(null);
    const label = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const root = host.current;
        const node = cursor.current;
        const labelNode = label.current;

        if (!root || !node || !labelNode) {
            return;
        }

        const media = matchMedia(
            '(pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)',
        );
        let position: { readonly x: number; readonly y: number } | undefined;
        let frame: number | undefined;
        const hide = () => {
            root.removeAttribute('data-cursor-active');
            node.removeAttribute('data-visible');
            node.style.removeProperty('--cursor-page-fill');
            node.style.removeProperty('--cursor-page-ink');
            if (frame !== undefined) {
                cancelAnimationFrame(frame);
                frame = undefined;
            }
        };
        const update = () => {
            frame = undefined;
            if (!position || !media.matches || document.hidden || !document.hasFocus()) {
                hide();
                return;
            }

            const target = document.elementFromPoint(position.x, position.y);

            if (
                !target ||
                !root.contains(target) ||
                target.closest(
                    'input,textarea,select,[contenteditable],iframe,button:disabled,[aria-disabled="true"],[data-cursor="native"]',
                )
            ) {
                hide();
                return;
            }

            const control = target.closest('a[href],button,summary,[data-cursor]');
            const page = control?.getAttribute('data-cursor') === 'page';
            const label = page ? (control?.getAttribute('data-cursor-label') ?? '') : '';
            const palette =
                page && control
                    ? getComputedStyle(control.querySelector('[data-palette]') ?? control)
                    : undefined;
            const accent = palette?.getPropertyValue('--palette-accent').trim();

            if (accent) {
                node.style.setProperty('--cursor-page-fill', accent);
                node.style.setProperty(
                    '--cursor-page-ink',
                    palette?.getPropertyValue('--palette-transition-ink').trim() ||
                        getComputedStyle(document.body).backgroundColor,
                );
            } else {
                node.style.removeProperty('--cursor-page-fill');
                node.style.removeProperty('--cursor-page-ink');
            }

            node.dataset.mode = page ? 'page' : control ? 'link' : 'default';
            if (labelNode.textContent !== label) {
                labelNode.textContent = label;
            }
            node.style.setProperty('--cursor-x', `${position.x}px`);
            node.style.setProperty('--cursor-y', `${position.y}px`);
            node.setAttribute('data-visible', 'true');
            root.setAttribute('data-cursor-active', 'true');
        };
        const schedule = () => {
            if (frame === undefined && position && !document.hidden && media.matches) {
                frame = requestAnimationFrame(update);
            }
        };
        const leave = () => {
            position = undefined;
            hide();
        };
        const move = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse' || !media.matches) {
                leave();
                return;
            }
            position = { x: event.clientX, y: event.clientY };
            schedule();
        };
        const observer = new MutationObserver(schedule);

        observer.observe(root, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['data-cursor', 'data-cursor-label', 'disabled', 'aria-disabled'],
        });
        root.addEventListener('pointermove', move, { passive: true });
        root.addEventListener('pointerleave', leave);
        window.addEventListener('scroll', schedule, { capture: true, passive: true });
        window.addEventListener('resize', schedule);
        window.addEventListener('blur', leave);
        document.addEventListener('visibilitychange', leave);
        media.addEventListener('change', leave);

        return () => {
            observer.disconnect();
            root.removeEventListener('pointermove', move);
            root.removeEventListener('pointerleave', leave);
            window.removeEventListener('scroll', schedule, true);
            window.removeEventListener('resize', schedule);
            window.removeEventListener('blur', leave);
            document.removeEventListener('visibilitychange', leave);
            media.removeEventListener('change', leave);
            leave();
        };
    }, []);

    return (
        <div ref={host} className={`${styles.boundary} [&_button:disabled]:pointer-events-auto`}>
            {children}
            <div ref={cursor} className={styles.cursor} aria-hidden="true">
                <div className={styles['label-clip']}>
                    <span ref={label} className={styles.label} />
                </div>
            </div>
        </div>
    );
}
