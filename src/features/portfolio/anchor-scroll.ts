/** Optional enhancement for document anchors. The caller owns URL and focus;
 * this operation owns its frame and interruption/preference subscriptions.
 */
export function scrollToAnchor(
    section: HTMLElement,
    reduced: MediaQueryList,
    signal: AbortSignal,
): void {
    if (signal.aborted) {
        return;
    }

    const destination = () => {
        const margin = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
        const top = scrollY + section.getBoundingClientRect().top - margin;
        const maximum = Math.max(0, document.documentElement.scrollHeight - innerHeight);
        return Math.min(maximum, Math.max(0, top));
    };
    const start = scrollY;
    const end = destination();
    if (reduced.matches || Math.abs(end - start) < 1) {
        window.scrollTo({ top: end, behavior: 'instant' });
        return;
    }

    const duration = Math.min(1200, 600 + Math.abs(end - start) * 0.15);
    const started = performance.now();
    let frame: number | undefined;
    const cancel = () => {
        if (frame !== undefined) {
            cancelAnimationFrame(frame);
            frame = undefined;
        }
        signal.removeEventListener('abort', cancel);
        window.removeEventListener('wheel', cancel, true);
        window.removeEventListener('touchstart', cancel, true);
        window.removeEventListener('keydown', keydown, true);
        window.removeEventListener('resize', cancel);
        reduced.removeEventListener('change', preference);
    };
    const finish = () => {
        cancel();
        window.scrollTo({ top: destination(), behavior: 'instant' });
    };
    const preference = () => {
        if (reduced.matches) {
            finish();
        }
    };
    const keydown = (event: KeyboardEvent) => {
        if (
            [
                'ArrowUp',
                'ArrowDown',
                'ArrowLeft',
                'ArrowRight',
                'PageUp',
                'PageDown',
                'Home',
                'End',
                ' ',
                'Escape',
            ].includes(event.key)
        ) {
            cancel();
        }
    };
    const update = (now: number) => {
        frame = undefined;
        const progress = Math.min(1, Math.max(0, (now - started) / duration));
        if (progress === 1) {
            finish();
            return;
        }
        const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: start + (end - start) * eased, behavior: 'instant' });
        frame = requestAnimationFrame(update);
    };

    signal.addEventListener('abort', cancel, { once: true });
    window.addEventListener('wheel', cancel, { capture: true, passive: true });
    window.addEventListener('touchstart', cancel, { capture: true, passive: true });
    window.addEventListener('keydown', keydown, true);
    window.addEventListener('resize', cancel);
    reduced.addEventListener('change', preference);
    frame = requestAnimationFrame(update);
}
