import { parseTheme, readStoredTheme, themeStorageKey, type Theme } from './preference';
import { revealTheme } from './reveal-theme';

const listeners = new Set<() => void>();
let preference: Theme | undefined;
let active: AbortController | undefined;
let generation = 0;

function applyPreference(value: Theme | undefined): void {
    if (value) {
        document.documentElement.dataset.theme = value;
    } else {
        delete document.documentElement.dataset.theme;
    }
    listeners.forEach((listener) => listener());
}

export function getTheme(): Theme {
    return (
        parseTheme(document.documentElement.dataset.theme) ??
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
}

export function subscribeTheme(listener: () => void): () => void {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

/** Mounted once by document composition, including routes without a theme button. */
export function observeTheme(): () => void {
    preference = readStoredTheme();
    applyPreference(preference);
    const media = matchMedia('(prefers-color-scheme: dark)');
    const system = () => {
        if (!preference) {
            applyPreference(undefined);
        }
    };
    const storage = (event: StorageEvent) => {
        if (event.key === null || event.key === themeStorageKey) {
            // Aborting can synchronously invoke the pending capture's update callback.
            generation++;
            active?.abort();
            preference = readStoredTheme();
            applyPreference(preference);
        }
    };

    media.addEventListener('change', system);
    window.addEventListener('storage', storage);

    return () => {
        media.removeEventListener('change', system);
        window.removeEventListener('storage', storage);
        generation++;
        active?.abort();
    };
}

export async function toggleTheme(control: HTMLElement): Promise<boolean> {
    if (active) {
        return false;
    }

    const controller = new AbortController();
    const requestGeneration = ++generation;
    active = controller;
    const theme = getTheme() === 'dark' ? 'light' : 'dark';
    const box = control.getBoundingClientRect();

    try {
        return await revealTheme(
            () => {
                if (requestGeneration !== generation || controller.signal.aborted) {
                    return;
                }

                preference = theme;
                applyPreference(theme);
                try {
                    localStorage.setItem(themeStorageKey, theme);
                } catch {
                    // A denied write does not discard this document's explicit choice.
                }
            },
            {
                theme,
                origin: { x: box.x + box.width / 2, y: box.y + box.height / 2 },
                signal: controller.signal,
            },
        );
    } finally {
        if (active === controller) {
            active = undefined;
        }
    }
}
