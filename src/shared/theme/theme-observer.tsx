'use client';

import { useEffect, useSyncExternalStore } from 'react';

import { getTheme, observeTheme, subscribeTheme } from './browser-theme';
import type { Theme } from './preference';

export function ThemeObserver(): null {
    useEffect(observeTheme, []);

    return null;
}

export function useTheme(): Theme {
    return useSyncExternalStore(subscribeTheme, getTheme, () => 'light');
}
