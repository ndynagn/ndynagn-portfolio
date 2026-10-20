'use client';

import { useEffect, useRef, useState, type JSX, type ReactNode } from 'react';

import {
    PortfolioNavigation,
    type NavigationBackLink,
    type NavigationLink,
} from '@/features/portfolio/navigation';

interface NavigationDemoProps {
    readonly kind: 'home' | 'portfolio' | 'project';
    readonly links: readonly NavigationLink[];
    readonly backLink?: NavigationBackLink;
    readonly label: string;
    readonly menuLabel: string;
    readonly description: string;
    readonly controls: ReactNode;
}

/** Local scroller only: no window-scroll subscription, route interception or catalogue access. */
export function NavigationDemo({
    kind,
    links,
    backLink,
    label,
    menuLabel,
    description,
    controls,
}: NavigationDemoProps): JSX.Element {
    const root = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [activeKey, setActiveKey] = useState(links[0]?.key ?? '');

    useEffect(() => {
        const scroller = root.current;
        if (!scroller) {
            return;
        }
        let frame: number | undefined;
        const update = () => {
            frame = undefined;
            const origin = scroller.getBoundingClientRect().top + scroller.clientTop;
            const header = scroller.querySelector('[data-portfolio-navigation]');
            const threshold =
                kind === 'home'
                    ? scroller.clientHeight * 0.45
                    : (header?.getBoundingClientRect().height ?? 84) + 64;
            const sections = Array.from(
                scroller.querySelectorAll<HTMLElement>('[data-navigation-section]'),
            );
            const current = sections.findLast(
                (section) => section.getBoundingClientRect().top - origin < threshold,
            );
            const atBottom =
                scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
            setActiveKey(
                (atBottom
                    ? sections.at(-1)?.dataset.navigationSection
                    : current?.dataset.navigationSection) ??
                    links[0]?.key ??
                    '',
            );
            setProgress(Math.min(1, Math.max(0, scroller.scrollTop / 240)));
        };
        const schedule = () => {
            if (frame === undefined) {
                frame = requestAnimationFrame(update);
            }
        };
        const observer = new ResizeObserver(schedule);
        observer.observe(scroller);
        const header = scroller.querySelector('[data-portfolio-navigation]');
        if (header) {
            observer.observe(header);
        }
        scroller.addEventListener('scroll', schedule, { passive: true });
        document.fonts.addEventListener('loadingdone', schedule);
        update();
        return () => {
            observer.disconnect();
            scroller.removeEventListener('scroll', schedule);
            document.fonts.removeEventListener('loadingdone', schedule);
            if (frame !== undefined) {
                cancelAnimationFrame(frame);
            }
        };
    }, [kind, links]);

    return (
        <div
            ref={root}
            id={`navigation-demo-${kind}`}
            data-navigation-demo={kind}
            role="region"
            aria-label={label}
            tabIndex={0}
            className="relative isolate h-(--navigation-available-height) min-w-0 overflow-y-auto border [--navigation-available-height:min(70svh,40rem)] motion-safe:scroll-smooth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
            <div className="sticky top-0 z-10 h-0">
                <PortfolioNavigation
                    links={links}
                    activeKey={activeKey}
                    label={label}
                    menuLabel={menuLabel}
                    backLink={backLink}
                    controls={controls}
                    progress={progress}
                />
            </div>
            {links.map((link, index) => (
                <section
                    key={link.key}
                    id={link.href.slice(1)}
                    tabIndex={-1}
                    data-navigation-section={link.key}
                    className="grid min-h-[30rem] scroll-mt-32 content-start gap-6 border-b p-6 pt-40 odd:bg-card/40 md:p-12 md:pt-40"
                >
                    <span aria-hidden="true" className="text-sm text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-2xl">{link.label}</h4>
                    <p className="max-w-[50ch] text-sm text-muted-foreground">{description}</p>
                </section>
            ))}
        </div>
    );
}
