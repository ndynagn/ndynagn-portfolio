'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type JSX } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { trackEvent } from '@/shared/analytics/browser';
import { runSceneSequence, type ScenePhase } from '@/shared/animation/scene-sequence';
import { acquireTransition } from '@/shared/animation/transition-lock';
import { isLocale } from '@/shared/i18n/locales';

import { scrollToAnchor } from './anchor-scroll';

import styles from './page-runtime.module.css';

interface RouteEffect {
    readonly controller: AbortController;
    readonly navigate: () => void;
}

interface RouteArrival {
    readonly pathname: string;
    readonly resolve: () => void;
}

interface SceneState {
    readonly phase: ScenePhase;
    readonly label: string;
    readonly x: number;
    readonly y: number;
    readonly radius: number;
    readonly background: string;
    readonly ink: string;
}

/** Persistent route adapter. DOM delegation keeps server cards and editorial links server-only.
 * It enhances explicit page links, native anchors and declared analytics actions only.
 */
export function PageRuntime(): JSX.Element | null {
    const router = useRouter();
    const pathname = usePathname();
    const active = useRef<RouteEffect | null>(null);
    const anchorScroll = useRef<AbortController | null>(null);
    const arrival = useRef<RouteArrival | null>(null);
    const overlay = useRef<HTMLDivElement>(null);
    const position = useRef({ x: 0, y: 0 });
    const [scene, setScene] = useState<SceneState | null>(null);
    const moving = scene !== null;

    useEffect(() => {
        if (!moving) {
            return;
        }

        let frame: number | undefined;
        const update = () => {
            frame = undefined;
            position.current = {
                x: Math.min(innerWidth, Math.max(0, position.current.x)),
                y: Math.min(innerHeight, Math.max(0, position.current.y)),
            };
            overlay.current?.style.setProperty('--route-x', `${position.current.x}px`);
            overlay.current?.style.setProperty('--route-y', `${position.current.y}px`);
            overlay.current?.style.setProperty(
                '--route-radius',
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

        // One subscription spans cover, route arrival and reveal without resetting the origin.
        update();
        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('resize', schedule);
            if (frame !== undefined) {
                cancelAnimationFrame(frame);
            }
        };
    }, [moving]);

    useLayoutEffect(() => {
        // Cancel at commit, before an old-document frame can run against the new page.
        anchorScroll.current?.abort();
        anchorScroll.current = null;
    }, [pathname]);

    useEffect(() => {
        if (arrival.current?.pathname === pathname) {
            arrival.current.resolve();
        }
    }, [pathname]);

    useEffect(() => {
        let mounted = true;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        const settle = () => {
            active.current?.navigate();
            active.current?.controller.abort();
        };
        const historyChanged = () => {
            anchorScroll.current?.abort();
            active.current?.controller.abort();
        };
        const visibility = () => {
            if (document.hidden) {
                anchorScroll.current?.abort();
                settle();
            }
        };
        const click = (event: MouseEvent) => {
            if (!(event.target instanceof Element)) {
                return;
            }
            const anchor = event.target.closest('a[href]');
            if (!(anchor instanceof HTMLAnchorElement)) {
                return;
            }
            if (window.location.pathname.endsWith('/design-system')) {
                return;
            }
            const locale = window.location.pathname.split('/')[1];
            if (!isLocale(locale)) {
                return;
            }

            // Analytics never sends destinations, email addresses or query strings.
            const action = anchor.dataset.analytics;
            if (action === 'cv_download') {
                trackEvent({ name: action, locale });
            }
            if (
                action === 'contact_click' &&
                ['email', 'telegram', 'linkedin', 'hh'].includes(anchor.dataset.linkId ?? '')
            ) {
                trackEvent({ name: action, locale, linkId: anchor.dataset.linkId ?? '' });
            }
            const target = new URL(anchor.href, window.location.href);
            const caseMatch = target.pathname.match(
                /^\/(ru|en)\/projects\/([a-z0-9]+(?:-[a-z0-9]+)*)$/,
            );
            if (target.origin === location.origin && caseMatch) {
                trackEvent({ name: 'project_open', locale, projectSlug: caseMatch[2] });
            }
            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                anchor.hasAttribute('download') ||
                (anchor.target && anchor.target !== '_self') ||
                target.origin !== location.origin
            ) {
                return;
            }

            if (
                target.pathname === location.pathname &&
                target.search === location.search &&
                target.hash
            ) {
                if (active.current) {
                    event.preventDefault();
                    return;
                }
                const section = document.getElementById(decodeURIComponent(target.hash.slice(1)));
                if (!section) {
                    return;
                }
                event.preventDefault();
                anchorScroll.current?.abort();
                anchorScroll.current = new AbortController();
                history.pushState(null, '', target.href);
                section.focus({ preventScroll: true });
                scrollToAnchor(section, reduced, anchorScroll.current.signal);
                return;
            }
            if (target.pathname !== location.pathname || target.search !== location.search) {
                anchorScroll.current?.abort();
            }
            if (
                !anchor.matches('[data-portfolio-route],[data-project-card]') ||
                target.pathname === location.pathname
            ) {
                return;
            }
            if (active.current) {
                event.preventDefault();
                return;
            }
            if (reduced.matches || document.hidden) {
                return;
            }
            const release = acquireTransition({ resetCursor: true });
            if (!release) {
                return;
            }
            event.preventDefault();

            const controller = new AbortController();
            let dispatched = false;
            const href = `${target.pathname}${target.search}${target.hash}`;
            const navigate = () => {
                if (!dispatched) {
                    dispatched = true;
                    router.push(href);
                }
            };
            active.current = { controller, navigate };
            const box = anchor.getBoundingClientRect();
            const style = getComputedStyle(anchor.querySelector('[data-palette]') ?? anchor);
            const initial = {
                label:
                    anchor.getAttribute('aria-label') ??
                    anchor.dataset.cursorLabel ??
                    anchor.textContent?.trim() ??
                    '',
                x: event.detail ? event.clientX : box.x + box.width / 2,
                y: event.detail ? event.clientY : box.y + box.height / 2,
                radius: Math.ceil(Math.hypot(innerWidth, innerHeight)),
                background: style.getPropertyValue('--palette-accent').trim() || style.color,
                ink:
                    style.getPropertyValue('--palette-transition-ink').trim() ||
                    getComputedStyle(document.body).backgroundColor,
            };
            position.current = { x: initial.x, y: initial.y };
            const replace = () =>
                new Promise<void>((resolve, reject) => {
                    const cleanup = () => {
                        clearTimeout(timer);
                        controller.signal.removeEventListener('abort', abort);
                        arrival.current = null;
                    };
                    const abort = () => {
                        cleanup();
                        reject(controller.signal.reason);
                    };
                    // A failed route request must not leave a covered document or retained lock.
                    const timer = setTimeout(() => {
                        cleanup();
                        resolve();
                    }, 8000);
                    arrival.current = {
                        pathname: target.pathname,
                        resolve: () => {
                            cleanup();
                            resolve();
                        },
                    };
                    controller.signal.addEventListener('abort', abort, { once: true });
                    navigate();
                });
            void runSceneSequence(replace, {
                signal: controller.signal,
                animated: true,
                phase: (phase) => {
                    if (mounted) {
                        setScene((current) =>
                            phase === 'idle' ? null : { ...(current ?? initial), phase },
                        );
                    }
                },
            })
                .catch(() => {
                    if (!controller.signal.aborted) {
                        navigate();
                    }
                })
                .finally(() => {
                    active.current = null;
                    release();
                });
        };

        document.addEventListener('click', click, true);
        document.addEventListener('visibilitychange', visibility);
        window.addEventListener('popstate', historyChanged);
        reduced.addEventListener('change', settle);
        return () => {
            mounted = false;
            anchorScroll.current?.abort();
            anchorScroll.current = null;
            active.current?.controller.abort();
            document.removeEventListener('click', click, true);
            document.removeEventListener('visibilitychange', visibility);
            window.removeEventListener('popstate', historyChanged);
            reduced.removeEventListener('change', settle);
        };
    }, [router]);

    if (!scene) {
        return null;
    }
    const geometry: CSSProperties & Record<`--route-${string}`, string> = {
        '--route-x': `${scene.x}px`,
        '--route-y': `${scene.y}px`,
        '--route-radius': `${scene.radius}px`,
        '--route-background': scene.background,
        '--route-ink': scene.ink,
    };
    return (
        <div
            ref={overlay}
            aria-hidden="true"
            className={styles.overlay}
            style={geometry}
            data-phase={scene.phase}
        >
            <span className="px-[5%] text-center font-design text-[clamp(1.875rem,5vw,4.375rem)] tracking-[-0.04em]">
                {scene.label}
            </span>
        </div>
    );
}
