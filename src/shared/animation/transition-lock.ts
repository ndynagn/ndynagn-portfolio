let busy = false;

/** One document effect at a time; repeated requests are ignored rather than queued. */
export function acquireTransition(): (() => void) | undefined {
    if (busy) {
        return undefined;
    }

    busy = true;
    let released = false;

    return () => {
        if (!released) {
            released = true;
            busy = false;
        }
    };
}
