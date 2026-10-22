let busy = false;
let cursorReset = false;
const cursorListeners = new Set<() => void>();

interface TransitionOptions {
    /** Clear decorative hover while this effect is active; keyboard focus is unchanged. */
    readonly resetCursor?: boolean;
}

export function isCursorResetActive(): boolean {
    return cursorReset;
}

/** Observe cursor reset changes; releasing a lock never restores a previous hover target. */
export function subscribeCursorReset(listener: () => void): () => void {
    cursorListeners.add(listener);
    return () => {
        cursorListeners.delete(listener);
    };
}

/** One document effect at a time; repeated requests are ignored rather than queued. */
export function acquireTransition(options: TransitionOptions = {}): (() => void) | undefined {
    if (busy) {
        return undefined;
    }

    busy = true;
    let released = false;
    if (options.resetCursor) {
        cursorReset = true;
        cursorListeners.forEach((listener) => listener());
    }

    return () => {
        if (!released) {
            released = true;
            busy = false;
            if (cursorReset) {
                cursorReset = false;
                cursorListeners.forEach((listener) => listener());
            }
        }
    };
}
