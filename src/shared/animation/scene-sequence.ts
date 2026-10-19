export type ScenePhase = 'idle' | 'cover' | 'reveal';

interface SceneSequenceOptions {
    readonly signal: AbortSignal;
    readonly animated: boolean;
    readonly phase: (phase: ScenePhase) => void;
}

function wait(milliseconds: number, signal: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        if (signal.aborted) {
            reject(signal.reason);
            return;
        }

        const abort = () => {
            clearTimeout(timer);
            reject(signal.reason);
        };
        const timer = setTimeout(() => {
            signal.removeEventListener('abort', abort);
            resolve();
        }, milliseconds);

        signal.addEventListener('abort', abort, { once: true });
    });
}

/** Technical scenes only: never await this to navigate or move focus. */
export async function runSceneSequence(
    replaceScene: () => void,
    options: SceneSequenceOptions,
): Promise<void> {
    const { signal, animated, phase } = options;

    try {
        if (signal.aborted) {
            return;
        }
        if (animated) {
            phase('cover');
            await wait(600, signal);
        }
        if (!signal.aborted) {
            replaceScene();
        }
        if (animated && !signal.aborted) {
            phase('reveal');
            await wait(650, signal);
        }
    } finally {
        phase('idle');
    }
}
