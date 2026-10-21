import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

import { designAssets } from '../src/features/content/design-assets.ts';

function load(path, dependencies = {}, globals = {}) {
    const { outputText } = ts.transpileModule(
        readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8'),
        {
            compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
        },
    );
    const exports = {};

    runInNewContext(outputText, {
        exports,
        setTimeout,
        clearTimeout,
        AbortController,
        require: (name) => {
            assert.ok(name in dependencies, `Unexpected dependency ${name}`);
            return dependencies[name];
        },
        ...globals,
    });

    return exports;
}

function events(extra = {}) {
    const listeners = new Map();

    return {
        ...extra,
        addEventListener(name, listener) {
            if (!listeners.has(name)) {
                listeners.set(name, new Set());
            }
            listeners.get(name).add(listener);
        },
        removeEventListener(name, listener) {
            listeners.get(name)?.delete(listener);
        },
        fire(name, event = {}) {
            for (const callback of listeners.get(name) ?? []) {
                callback(event);
            }
        },
        listenerCount() {
            return [...listeners.values()].reduce((sum, set) => sum + set.size, 0);
        },
    };
}

function environment({ reduced = false, systemDark = false, storageDenied = false } = {}) {
    const properties = new Map();
    const root = {
        dataset: {},
        style: {
            setProperty: (name, value) => properties.set(name, value),
            removeProperty: (name) => properties.delete(name),
        },
    };
    const document = events({ documentElement: root, hidden: false });
    const window = events();
    const system = events({ matches: systemDark });
    const motion = events({ matches: reduced });
    const data = new Map();
    const localStorage = {
        getItem: (key) => {
            if (storageDenied) {
                throw Error('Denied');
            }
            return data.get(key) ?? null;
        },
        setItem: (key, value) => {
            if (storageDenied) {
                throw Error('Denied');
            }
            data.set(key, value);
        },
    };
    const globals = {
        document,
        window,
        localStorage,
        innerWidth: 1000,
        innerHeight: 700,
        matchMedia: (query) => (query.includes('prefers-color-scheme') ? system : motion),
    };
    const lock = load('shared/animation/transition-lock.ts');
    const reveal = load(
        'shared/theme/reveal-theme.ts',
        { '../animation/transition-lock': lock },
        globals,
    );
    const preference = load('shared/theme/preference.ts', {}, globals);

    return {
        globals,
        document,
        window,
        root,
        properties,
        motion,
        system,
        data,
        lock,
        reveal,
        preference,
    };
}

const options = () => ({
    theme: 'dark',
    origin: { x: 20, y: 30 },
    signal: new AbortController().signal,
});

test('all supplied public resources match the approved inventory including the updated CV', () => {
    assert.equal(designAssets.length, 88);
    assert.equal(
        designAssets.reduce((sum, file) => sum + file.bytes, 0),
        6437668,
    );
    assert.equal(new Set(designAssets.map((file) => file.path)).size, 88);

    for (const file of designAssets) {
        assert.match(file.path, /^\/[a-zA-Z0-9/_.-]+$/);
        const bytes = readFileSync(new URL(`../public${file.path}`, import.meta.url));
        assert.equal(bytes.length, file.bytes, file.path);
        assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256, file.path);
    }
    assert.match(
        readFileSync(new URL('../public/images/projects/SOURCES.md', import.meta.url), 'utf8'),
        /These do not represent Potlucky/,
    );
});

test('pre-paint bootstrap ignores unknown values and storage denial', () => {
    for (const value of ['dark', 'light', 'system', '', null, '<script>']) {
        const env = environment();
        if (value !== null) {
            env.data.set(env.preference.themeStorageKey, value);
        }
        runInNewContext(env.preference.themeBootstrap, env.globals);
        assert.equal(
            env.root.dataset.theme,
            value === 'dark' || value === 'light' ? value : undefined,
        );
    }
    const denied = environment({ storageDenied: true });
    assert.doesNotThrow(() => runInNewContext(denied.preference.themeBootstrap, denied.globals));
    assert.equal(denied.preference.readStoredTheme(), undefined);
});

test('missing View Transitions, reduced motion and hidden documents apply immediately', async () => {
    for (const mode of ['unsupported', 'reduced', 'hidden']) {
        const env = environment({ reduced: mode === 'reduced' });
        env.document.hidden = mode === 'hidden';
        let applied = 0;
        if (mode !== 'unsupported') {
            env.document.startViewTransition = () => assert.fail('Should not capture');
        }
        assert.equal(await env.reveal.revealTheme(() => applied++, options()), true);
        assert.equal(applied, 1);
        assert.equal(env.properties.size, 0);
        assert.equal(env.document.listenerCount(), 0);
    }
});

test('capture exceptions and ready rejection apply once and release effects', async () => {
    for (const captureThrows of [true, false]) {
        const env = environment();
        let applied = 0;
        env.document.startViewTransition = (update) => {
            if (captureThrows) {
                throw Error('Capture failed');
            }
            update();
            return {
                ready: Promise.reject(Error('Capture failed')),
                finished: Promise.resolve(),
                skipTransition() {},
            };
        };
        await env.reveal.revealTheme(() => applied++, options());
        assert.equal(applied, 1);
        assert.equal(env.root.dataset.themeReveal, undefined);
        assert.equal(env.properties.size, 0);
        assert.equal(env.motion.listenerCount(), 0);
        const release = env.lock.acquireTransition();
        assert.equal(typeof release, 'function');
        release();
    }
});

test('a hidden tab or cancellation releases an unfinished capture without waiting for finished', async () => {
    for (const action of ['hidden', 'abort']) {
        const env = environment();
        let applied = 0;
        let skipped = 0;
        const controller = new AbortController();
        env.document.startViewTransition = (update) => {
            update();
            return {
                ready: Promise.resolve(),
                finished: new Promise(() => {}),
                skipTransition() {
                    skipped++;
                },
            };
        };
        const pending = env.reveal.revealTheme(() => applied++, {
            ...options(),
            signal: controller.signal,
        });
        assert.equal(await env.reveal.revealTheme(() => applied++, options()), false);
        if (action === 'hidden') {
            env.document.hidden = true;
            env.document.fire('visibilitychange');
        } else {
            controller.abort();
        }
        await pending;
        assert.equal(applied, 1);
        assert.equal(skipped, 1);
        assert.equal(env.root.dataset.themeReveal, undefined);
        assert.equal(env.document.listenerCount(), 0);
        assert.equal(env.properties.size, 0);
    }
});

test('theme and scene owners share a lock and ignore repeated busy requests', async () => {
    const env = environment();
    const release = env.lock.acquireTransition();
    let applied = 0;
    assert.equal(await env.reveal.revealTheme(() => applied++, options()), false);
    assert.equal(applied, 0);
    release();
    release();
    assert.equal(await env.reveal.revealTheme(() => applied++, options()), true);
    assert.equal(applied, 1);
});

test('denied persistence retains the explicit document choice across system changes', async () => {
    const env = environment({ storageDenied: true });
    const browser = load(
        'shared/theme/browser-theme.ts',
        { './preference': env.preference, './reveal-theme': env.reveal },
        env.globals,
    );
    const dispose = browser.observeTheme();
    assert.equal(browser.getTheme(), 'light');
    assert.equal(
        await browser.toggleTheme({
            getBoundingClientRect: () => ({ x: 0, y: 0, width: 40, height: 40 }),
        }),
        true,
    );
    assert.equal(browser.getTheme(), 'dark');
    env.system.fire('change');
    assert.equal(browser.getTheme(), 'dark');
    dispose();
    assert.equal(env.system.listenerCount(), 0);
    assert.equal(env.window.listenerCount(), 0);
});

test('system theme and storage events use one document owner and notify subscribers', () => {
    const env = environment();
    const browser = load(
        'shared/theme/browser-theme.ts',
        { './preference': env.preference, './reveal-theme': env.reveal },
        env.globals,
    );
    const dispose = browser.observeTheme();
    let notified = 0;
    const unsubscribe = browser.subscribeTheme(() => notified++);
    env.system.matches = true;
    env.system.fire('change');
    assert.equal(browser.getTheme(), 'dark');
    env.data.set(env.preference.themeStorageKey, 'light');
    env.window.fire('storage', { key: env.preference.themeStorageKey });
    assert.equal(browser.getTheme(), 'light');
    assert.equal(notified, 2);
    unsubscribe();
    dispose();
});

test('external storage wins before and after the capture update, including storage clear', async () => {
    for (const timing of ['before', 'after']) {
        for (const key of ['portfolio-theme', null]) {
            const env = environment();
            const writes = [];
            const storage = env.globals.localStorage;
            const setItem = storage.setItem;
            storage.setItem = (name, value) => {
                writes.push([name, value]);
                setItem(name, value);
            };
            env.data.set(env.preference.themeStorageKey, 'light');
            let captureUpdate;
            let skipped = 0;
            env.document.startViewTransition = (update) => {
                captureUpdate = update;
                if (timing === 'after') {
                    update();
                }
                return {
                    ready: Promise.resolve(),
                    finished: new Promise(() => {}),
                    skipTransition() {
                        skipped++;
                    },
                };
            };
            const browser = load(
                'shared/theme/browser-theme.ts',
                { './preference': env.preference, './reveal-theme': env.reveal },
                env.globals,
            );
            const dispose = browser.observeTheme();
            let notified = 0;
            const unsubscribe = browser.subscribeTheme(() => notified++);
            const pending = browser.toggleTheme({
                getBoundingClientRect: () => ({ x: 0, y: 0, width: 40, height: 40 }),
            });
            const expectedWrites = timing === 'after' ? 1 : 0;
            assert.equal(writes.length, expectedWrites);
            if (key === null) {
                env.data.clear();
            } else {
                env.data.set(key, 'light');
            }

            env.window.fire('storage', { key });
            assert.equal(browser.getTheme(), 'light');
            assert.equal(env.root.dataset.theme, key === null ? undefined : 'light');
            assert.equal(
                env.data.get(env.preference.themeStorageKey),
                key === null ? undefined : 'light',
            );
            assert.equal(writes.length, expectedWrites);
            assert.equal(notified, timing === 'after' ? 2 : 1);
            await pending;
            captureUpdate();
            assert.equal(browser.getTheme(), 'light');
            assert.equal(writes.length, expectedWrites);
            assert.equal(skipped, 1);
            assert.equal(env.root.dataset.themeReveal, undefined);
            assert.equal(env.properties.size, 0);
            assert.equal(env.document.listenerCount(), 0);
            assert.equal(env.motion.listenerCount(), 0);
            const release = env.lock.acquireTransition();
            assert.equal(typeof release, 'function');
            release();
            unsubscribe();
            dispose();
            assert.equal(env.system.listenerCount(), 0);
            assert.equal(env.window.listenerCount(), 0);
        }
    }
});

test('observer cleanup invalidates a delayed capture update and releases subscriptions and lock', async () => {
    const env = environment();
    env.data.set(env.preference.themeStorageKey, 'light');
    let captureUpdate;
    env.document.startViewTransition = (update) => {
        captureUpdate = update;
        return {
            ready: Promise.resolve(),
            finished: new Promise(() => {}),
            skipTransition() {},
        };
    };
    const browser = load(
        'shared/theme/browser-theme.ts',
        { './preference': env.preference, './reveal-theme': env.reveal },
        env.globals,
    );
    const dispose = browser.observeTheme();
    const pending = browser.toggleTheme({
        getBoundingClientRect: () => ({ x: 0, y: 0, width: 40, height: 40 }),
    });

    dispose();
    await pending;
    captureUpdate();
    assert.equal(browser.getTheme(), 'light');
    assert.equal(env.data.get(env.preference.themeStorageKey), 'light');
    assert.equal(env.root.dataset.themeReveal, undefined);
    assert.equal(env.properties.size, 0);
    for (const owner of [env.document, env.window, env.system, env.motion]) {
        assert.equal(owner.listenerCount(), 0);
    }
    const release = env.lock.acquireTransition();
    assert.equal(typeof release, 'function');
    release();
});

test('cancelled cover never commits a stale technical scene', async () => {
    const { runSceneSequence } = load('shared/animation/scene-sequence.ts');
    const controller = new AbortController();
    const phases = [];
    let committed = 0;
    const pending = runSceneSequence(() => committed++, {
        signal: controller.signal,
        animated: true,
        phase: (phase) => phases.push(phase),
    });
    controller.abort();
    await assert.rejects(pending);
    assert.equal(committed, 0);
    assert.deepEqual(phases, ['cover', 'idle']);
});

test('scene sequence preserves source timing, reduced mode and failure recovery', async () => {
    const delays = [];
    const { runSceneSequence } = load(
        'shared/animation/scene-sequence.ts',
        {},
        {
            setTimeout(callback, duration) {
                delays.push(duration);
                queueMicrotask(callback);
                return 0;
            },
        },
    );
    const phases = [];
    let committed = 0;
    const input = {
        signal: new AbortController().signal,
        animated: true,
        phase: (phase) => phases.push(phase),
    };
    await runSceneSequence(() => committed++, input);
    assert.deepEqual(delays, [600, 650]);
    assert.deepEqual(phases, ['cover', 'reveal', 'idle']);
    await runSceneSequence(() => committed++, { ...input, animated: false });
    assert.equal(committed, 2);
    await assert.rejects(
        runSceneSequence(() => {
            throw Error('Scene failed');
        }, input),
    );
    assert.equal(phases.at(-1), 'idle');
});

test('route reveal waits for async replacement commit', async () => {
    const { runSceneSequence } = load(
        'shared/animation/scene-sequence.ts',
        {},
        {
            setTimeout(callback) {
                queueMicrotask(callback);
                return 0;
            },
        },
    );
    let commit;
    const phases = [];
    const pending = runSceneSequence(
        () =>
            new Promise((resolve) => {
                commit = resolve;
            }),
        {
            signal: new AbortController().signal,
            animated: true,
            phase: (phase) => phases.push(phase),
        },
    );
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(phases, ['cover']);
    commit();
    await pending;
    assert.deepEqual(phases, ['cover', 'reveal', 'idle']);
});

test('rejected route replacement clears the scene without revealing stale content', async () => {
    const { runSceneSequence } = load(
        'shared/animation/scene-sequence.ts',
        {},
        {
            setTimeout(callback) {
                queueMicrotask(callback);
                return 0;
            },
        },
    );
    const phases = [];
    await assert.rejects(
        runSceneSequence(() => Promise.reject(Error('Route failed')), {
            signal: new AbortController().signal,
            animated: true,
            phase: (phase) => phases.push(phase),
        }),
    );
    assert.deepEqual(phases, ['cover', 'idle']);
});

test('installed optimizer retains standard and prefixed native glass in prefix-first order', () => {
    const require = createRequire(import.meta.url);
    const { optimize } = createRequire(require.resolve('@tailwindcss/turbopack'))(
        '@tailwindcss/node',
    );
    const { code } = optimize(
        '.material{-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px)}',
        { minify: true },
    );
    assert.match(code, /-webkit-backdrop-filter:blur\(24px\)/);
    assert.match(code, /[;{]backdrop-filter:blur\(24px\)/);
});
