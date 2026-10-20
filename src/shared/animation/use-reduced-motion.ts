'use client';

import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';

function subscribe(notify: () => void): () => void {
    const media = matchMedia(query);

    media.addEventListener('change', notify);

    return () => media.removeEventListener('change', notify);
}

function getSnapshot(): boolean {
    return matchMedia(query).matches;
}

function getServerSnapshot(): boolean {
    return true;
}

/** Server content starts static; mounted consumers also receive live OS preference changes. */
export function useReducedMotion(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
