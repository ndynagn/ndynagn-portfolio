export type Theme = 'light' | 'dark';

export const themeStorageKey = 'portfolio-theme';

export function parseTheme(value: unknown): Theme | undefined {
    return value === 'light' || value === 'dark' ? value : undefined;
}

export function readStoredTheme(): Theme | undefined {
    try {
        return parseTheme(localStorage.getItem(themeStorageKey));
    } catch {
        return undefined;
    }
}

/** Trusted static source only: no user text, environment values or secrets. */
export const themeBootstrap = `(()=>{try{const t=localStorage.getItem('${themeStorageKey}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch{}})();`;
