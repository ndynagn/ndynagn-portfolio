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

/** Cover/replacement/reveal timing. Async replacement may wait for a committed route;
 * its owner must bound that wait and handle abort. Technical consumers stay synchronous.
 */
export async function runSceneSequence(
    replaceScene: () => void | Promise<void>,
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
            await replaceScene();
        }
        if (animated && !signal.aborted) {
            phase('reveal');
            await wait(650, signal);
        }
    } finally {
        phase('idle');
    }
}
