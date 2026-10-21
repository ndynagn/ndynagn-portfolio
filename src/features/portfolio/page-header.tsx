'use client';

import { useEffect, useRef, useState, type JSX, type ReactNode } from 'react';

import { PortfolioNavigation, type NavigationLink } from './navigation';

interface PageHeaderProps {
    readonly links: readonly NavigationLink[];
    readonly label: string;
    readonly menuLabel: string;
    readonly homeHref: string;
    readonly backLabel?: string;
    readonly controls: ReactNode;
}

/** Document scroll belongs to page composition, independently from the kit's local demos. */
export function PageHeader({
    links,
    label,
    menuLabel,
    homeHref,
    backLabel,
    controls,
}: PageHeaderProps): JSX.Element {
    const [position, setPosition] = useState({ progress: 0, active: links[0]?.key ?? '' });
    const header = useRef<HTMLElement>(null);

    useEffect(() => {
        let frame: number | undefined;
        const update = () => {
            frame = undefined;
            const line = (header.current?.getBoundingClientRect().bottom ?? 114) + 32;
            const sections = links.flatMap((link) => {
                if (!link.href.startsWith('#')) {
                    return [];
                }
                const node = document.getElementById(link.href.slice(1));
                return node ? [{ key: link.key, node }] : [];
            });
            let active = sections[0]?.key ?? links[0]?.key ?? '';
            for (const section of sections) {
                // Anchor placement follows scalable scroll-margin, not just compact header height.
                const anchorLine = Number.parseFloat(
                    getComputedStyle(section.node).scrollMarginTop,
                );
                if (section.node.getBoundingClientRect().top <= Math.max(line, anchorLine + 1)) {
                    active = section.key;
                }
            }
            if (Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2) {
                active = sections.at(-1)?.key ?? active;
            }
            const progress = Math.min(1, Math.max(0, scrollY / 240));
            setPosition((previous) =>
                previous.progress === progress && previous.active === active
                    ? previous
                    : { progress, active },
            );
        };
        const schedule = () => {
            if (frame === undefined) {
                frame = requestAnimationFrame(update);
            }
        };
        const observer = new ResizeObserver(schedule);
        observer.observe(document.body);
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        window.addEventListener('hashchange', schedule);
        update();
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            window.removeEventListener('hashchange', schedule);
            if (frame !== undefined) {
                cancelAnimationFrame(frame);
            }
        };
    }, [links]);

    return (
        <header ref={header} className="pointer-events-none fixed inset-x-0 top-0 z-30">
            <div className="pointer-events-auto">
                <PortfolioNavigation
                    links={links}
                    activeKey={position.active}
                    progress={position.progress}
                    label={label}
                    menuLabel={menuLabel}
                    controls={controls}
                    backLink={
                        backLabel
                            ? { label: backLabel, href: homeHref, animateRoute: true }
                            : undefined
                    }
                />
            </div>
        </header>
    );
}
