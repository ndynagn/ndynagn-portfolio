'use client';

import {
    useEffect,
    useId,
    useRef,
    useSyncExternalStore,
    type CSSProperties,
    type JSX,
    type ReactNode,
} from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import { MeasuredTrack } from '@/shared/animation/measured-track';
import { GlassSurface } from '@/shared/styles/glass-surface';
import { cn } from '@/shared/ui/cn';

import styles from './portfolio-navigation.module.css';

export interface NavigationLink {
    readonly key: string;
    readonly label: string;
    readonly href: string;
}

export interface NavigationBackLink {
    readonly label: string;
    readonly href: string;
    readonly cursorLabel?: string;
    /** Opt into the public page runtime; workbench links remain native. */
    readonly animateRoute?: boolean;
}

interface PortfolioNavigationProps {
    readonly links: readonly NavigationLink[];
    readonly activeKey: string;
    readonly label: string;
    readonly menuLabel: string;
    readonly backLink?: NavigationBackLink;
    readonly controls: ReactNode;
    readonly progress?: number;
}

function subscribeMotion(notify: () => void): () => void {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    media.addEventListener('change', notify);
    return () => media.removeEventListener('change', notify);
}

const getReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const getServerMotion = () => false;

/** Controlled navigation. The embedding consumer owns routes, scroll progress and active section.
 * A local scroller may supply --navigation-available-height; the default is the viewport.
 * Separate desktop/mobile markup preserves native details behavior without JS.
 */
export function PortfolioNavigation({
    links,
    activeKey,
    label,
    menuLabel,
    backLink,
    controls,
    progress = 0,
}: PortfolioNavigationProps): JSX.Element {
    const host = useRef<HTMLDivElement>(null);
    const desktop = useRef<HTMLElement>(null);
    const menu = useRef<HTMLDetailsElement>(null);
    const menuId = useId();
    const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerMotion);
    const style = {
        '--navigation-progress': reducedMotion ? 0 : Math.min(1, Math.max(0, progress)),
    } as CSSProperties;

    useEffect(() => {
        const root = host.current;
        const details = menu.current;
        const desktopNav = desktop.current;
        if (!root || !details || !desktopNav) {
            return;
        }

        let focusedNavigation: HTMLElement | null = null;
        const rememberFocus = (event: FocusEvent) => {
            focusedNavigation =
                event.target instanceof HTMLElement && root.contains(event.target)
                    ? event.target
                    : null;
        };
        const forgetFocus = () => {
            focusedNavigation = null;
        };
        const releaseFocus = (event: FocusEvent) => {
            // Either responsive region can blur its child before matchMedia fires.
            // Retain only that hidden target; an ordinary blur must not reclaim focus.
            if (
                event.target === focusedNavigation &&
                (event.relatedTarget !== null || focusedNavigation?.getClientRects().length)
            ) {
                forgetFocus();
            }
        };
        const close = () => {
            // A normal menu close must not leave a hidden link eligible for resize recovery.
            if (
                focusedNavigation &&
                details.contains(focusedNavigation) &&
                focusedNavigation !== details.querySelector('summary')
            ) {
                forgetFocus();
            }
            details.open = false;
        };
        const escape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && details.open) {
                event.preventDefault();
                close();
                details.querySelector('summary')?.focus();
            }
        };
        const outside = (event: PointerEvent) => {
            if (event.target instanceof Node && !root.contains(event.target)) {
                forgetFocus();
            }
            if (event.target instanceof Node && !details.contains(event.target)) {
                close();
            }
        };
        const select = (event: MouseEvent) => {
            if (event.target instanceof Element && event.target.closest('a[href]')) {
                close();
            }
        };
        const media = matchMedia('(min-width: 48rem)');
        const resize = () => {
            const active = document.activeElement;
            const source =
                active instanceof HTMLElement && root.contains(active)
                    ? active
                    : active === document.body &&
                        document.hasFocus() &&
                        focusedNavigation?.isConnected &&
                        focusedNavigation.getClientRects().length === 0
                      ? focusedNavigation
                      : null;
            forgetFocus();
            if (!media.matches) {
                close();
                if (source && desktopNav.contains(source)) {
                    const mobileBack = root.querySelector<HTMLElement>(
                        '[data-navigation-focus="back"]:not([data-navigation-desktop] *)',
                    );
                    const next =
                        source.dataset.navigationFocus === 'back' && mobileBack
                            ? mobileBack
                            : details.querySelector('summary');
                    next?.focus({ preventScroll: true });
                }
                return;
            }
            if (source && !desktopNav.contains(source)) {
                const key = source.dataset.navigationFocus;
                let next: HTMLElement | null = key
                    ? desktopNav.querySelector(`[data-navigation-focus="${CSS.escape(key)}"]`)
                    : null;
                const mobileControls = details.querySelector('[data-navigation-controls]');
                const controlIndex = mobileControls
                    ? Array.from(mobileControls.querySelectorAll('a,button')).indexOf(source)
                    : -1;
                if (controlIndex >= 0) {
                    next =
                        desktopNav.querySelectorAll<HTMLElement>(
                            '[data-navigation-controls] a,[data-navigation-controls] button',
                        )[controlIndex] ?? null;
                }
                (next ?? desktopNav.querySelector<HTMLElement>('a'))?.focus({
                    preventScroll: true,
                });
            }
            close();
        };
        document.addEventListener('keydown', escape);
        document.addEventListener('focusin', rememberFocus);
        root.addEventListener('focusout', releaseFocus);
        window.addEventListener('blur', forgetFocus);
        document.addEventListener('pointerdown', outside);
        details.addEventListener('click', select);
        media.addEventListener('change', resize);
        return () => {
            document.removeEventListener('keydown', escape);
            document.removeEventListener('focusin', rememberFocus);
            root.removeEventListener('focusout', releaseFocus);
            window.removeEventListener('blur', forgetFocus);
            document.removeEventListener('pointerdown', outside);
            details.removeEventListener('click', select);
            media.removeEventListener('change', resize);
        };
    }, []);

    const back = (mobile: boolean) =>
        backLink && (
            <a
                href={backLink.href}
                data-portfolio-route={backLink.animateRoute || undefined}
                data-navigation-focus="back"
                data-cursor={backLink.cursorLabel ? 'page' : undefined}
                data-cursor-label={backLink.cursorLabel}
                className={cn(
                    styles.link,
                    'inline-flex min-w-0 max-w-full items-center gap-2.25 rounded-[40px] font-design leading-normal font-medium wrap-anywhere transition-[color] duration-250 ease-[ease]',
                    mobile
                        ? 'px-4 py-2.75 text-[0.6875rem]'
                        : 'px-(--navigation-link-px) py-(--navigation-link-py) text-[0.6875rem] lg:text-[0.75rem]',
                )}
            >
                <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 rotate-[-135deg] stroke-[1.5]"
                />
                <span className="min-w-0">{backLink.label}</span>
            </a>
        );
    const items = links.map((link) => (
        <a
            key={link.key}
            href={link.href}
            data-track-key={link.key}
            data-navigation-focus={link.key}
            aria-current={link.key === activeKey ? 'location' : undefined}
            className={cn(
                styles.link,
                'relative z-1 min-w-0 max-w-full rounded-[40px] px-(--navigation-link-px) py-(--navigation-link-py) font-design text-[0.875rem] leading-normal font-medium wrap-anywhere transition-[color] duration-250 ease-[ease] aria-[current=location]:text-background md:text-[0.6875rem] lg:text-[0.75rem] forced-colors:aria-[current=location]:text-[HighlightText]',
            )}
        >
            {link.label}
        </a>
    ));
    const track = (mobile: boolean) => (
        <MeasuredTrack
            activeKey={activeKey}
            indicatorTone="foreground"
            className={cn(
                'items-center gap-(--navigation-gap) rounded-[50px] border-0 p-(--navigation-padding)',
                mobile ? 'w-full flex-col [&>a]:w-full' : 'w-full',
            )}
        >
            {!mobile && backLink && (
                <div className="relative z-1 mr-1.25 border-r pr-2">{back(false)}</div>
            )}
            {items}
            <div
                data-navigation-controls
                className={cn(
                    'relative z-1 flex items-center',
                    mobile
                        ? 'mt-1.5 w-full flex-wrap justify-between gap-4.5 border-t px-1.5 pt-4 pb-1'
                        : 'ml-2 gap-3.25 border-l pr-2 pl-4.5 lg:gap-4',
                )}
            >
                {controls}
            </div>
        </MeasuredTrack>
    );

    return (
        <div
            ref={host}
            style={style}
            className={cn(
                styles.header,
                'relative flex min-h-(--navigation-height) items-center justify-between px-[6%] font-design md:justify-center md:px-[5%]',
            )}
            data-portfolio-navigation
        >
            <GlassSurface
                aria-hidden="true"
                data-navigation-bar
                className="pointer-events-none absolute inset-0 rounded-none border-x-0 border-t-0 border-b-border md:hidden"
            />
            <nav
                ref={desktop}
                aria-label={label}
                className="hidden min-w-0 max-w-full md:block"
                data-navigation-desktop
            >
                <GlassSurface className={cn(styles.surface, 'rounded-[50px]')}>
                    {track(false)}
                </GlassSurface>
            </nav>
            <div className="relative z-1 min-w-0 md:hidden">
                {backLink && (
                    <GlassSurface className="w-fit max-w-full rounded-[40px] border-border">
                        {back(true)}
                    </GlassSurface>
                )}
            </div>
            <details ref={menu} className="group/navigation z-1 md:hidden" data-navigation-menu>
                <summary
                    aria-label={menuLabel}
                    aria-controls={menuId}
                    className={cn(styles.summary, 'cursor-pointer list-none py-1.25 pl-0.5')}
                >
                    <Menu
                        aria-hidden="true"
                        className="size-5.75 stroke-[1.5] group-open/navigation:hidden"
                    />
                    <X
                        aria-hidden="true"
                        className="hidden size-5.75 stroke-[1.5] group-open/navigation:block"
                    />
                </summary>
                <nav
                    id={menuId}
                    aria-label={label}
                    className="absolute top-(--navigation-panel-top) left-[6%] z-10 w-[88%]"
                    data-navigation-mobile
                >
                    <GlassSurface
                        className={cn(
                            styles.surface,
                            styles.panel,
                            'overflow-y-auto rounded-[20px]',
                        )}
                    >
                        {track(true)}
                    </GlassSurface>
                </nav>
            </details>
        </div>
    );
}
