import { acquireTransition } from '../animation/transition-lock';

interface ThemeRevealOptions {
    readonly theme: 'light' | 'dark';
    readonly origin: { readonly x: number; readonly y: number };
    readonly signal: AbortSignal;
}

/** Apply once even if capture fails. Busy/aborted requests do not apply or queue. */
export async function revealTheme(
    applyTheme: () => void,
    options: ThemeRevealOptions,
): Promise<boolean> {
    if (options.signal.aborted) {
        return false;
    }

    const release = acquireTransition();

    if (!release) {
        return false;
    }

    const root = document.documentElement;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let applied = false;
    let transition: ViewTransition | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let finishEarly: (() => void) | undefined;
    const apply = () => {
        if (!applied) {
            applied = true;
            applyTheme();
        }
    };
    const skip = () => {
        transition?.skipTransition();
        apply();
        finishEarly?.();
    };
    const visibility = () => {
        if (document.hidden) {
            skip();
        }
    };

    try {
        if (document.hidden || media.matches || !document.startViewTransition) {
            apply();
            return true;
        }

        const { x, y } = options.origin;
        const radius = Math.ceil(
            Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)),
        );

        root.dataset.themeReveal = options.theme === 'dark' ? 'expand' : 'contract';
        root.style.setProperty('--theme-x', `${x}px`);
        root.style.setProperty('--theme-y', `${y}px`);
        root.style.setProperty('--theme-radius', `${radius}px`);
        const early = new Promise<void>((resolve) => {
            finishEarly = resolve;
        });

        document.addEventListener('visibilitychange', visibility);
        options.signal.addEventListener('abort', skip, { once: true });
        media.addEventListener('change', skip);
        transition = document.startViewTransition(apply);
        void transition.ready.catch(skip);
        timer = setTimeout(skip, 2500);
        await Promise.race([transition.finished, early]);
        apply();
    } catch {
        skip();
    } finally {
        clearTimeout(timer);
        document.removeEventListener('visibilitychange', visibility);
        options.signal.removeEventListener('abort', skip);
        media.removeEventListener('change', skip);
        delete root.dataset.themeReveal;
        for (const name of ['--theme-x', '--theme-y', '--theme-radius']) {
            root.style.removeProperty(name);
        }
        release();
    }

    return true;
}
