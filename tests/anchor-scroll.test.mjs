import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

function events(extra = {}) {
    const listeners = new Map();
    return {
        ...extra,
        addEventListener(name, callback) {
            if (!listeners.has(name)) {
                listeners.set(name, new Set());
            }
            listeners.get(name).add(callback);
        },
        removeEventListener(name, callback) {
            listeners.get(name)?.delete(callback);
        },
        emit(name, event = {}) {
            for (const callback of [...(listeners.get(name) ?? [])]) {
                callback(event);
            }
        },
        count() {
            return [...listeners.values()].reduce((total, callbacks) => total + callbacks.size, 0);
        },
    };
}

function environment({ reduced = false, initial = 0 } = {}) {
    let position = initial;
    let now = 0;
    let nextFrame = 0;
    const frames = new Map();
    const preference = events({ matches: reduced });
    const window = events({
        scrollTo({ top, behavior }) {
            assert.equal(behavior, 'instant');
            position = top;
        },
    });
    const exports = {};
    const { outputText } = ts.transpileModule(
        readFileSync(
            new URL('../src/features/portfolio/anchor-scroll.ts', import.meta.url),
            'utf8',
        ),
        { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
    );
    runInNewContext(outputText, {
        exports,
        window,
        document: { documentElement: { scrollHeight: 6000 } },
        innerHeight: 1000,
        get scrollY() {
            return position;
        },
        getComputedStyle: () => ({ scrollMarginTop: '128px' }),
        performance: { now: () => now },
        requestAnimationFrame(callback) {
            frames.set(++nextFrame, callback);
            return nextFrame;
        },
        cancelAnimationFrame: (frame) => frames.delete(frame),
    });
    return {
        preference,
        window,
        start(top, controller = new AbortController()) {
            exports.scrollToAnchor(
                { getBoundingClientRect: () => ({ top: top - position }) },
                preference,
                controller.signal,
            );
            return controller;
        },
        advance(time) {
            now = time;
            const callbacks = [...frames.values()];
            frames.clear();
            for (const callback of callbacks) {
                callback(time);
            }
        },
        position: () => position,
        assertClean() {
            assert.equal(frames.size, 0);
            assert.equal(window.count(), 0);
            assert.equal(preference.count(), 0);
        },
    };
}

test('anchor scrolling eases both ends, honors scroll margin and releases completed work', () => {
    const env = environment();
    env.start(1128);
    assert.equal(env.position(), 0);
    env.advance(187.5);
    assert.ok(env.position() > 0 && env.position() < 250);
    env.advance(375);
    assert.equal(env.position(), 500);
    env.advance(562.5);
    assert.ok(env.position() > 750 && env.position() < 1000);
    env.advance(750);
    assert.equal(env.position(), 1000);
    env.assertClean();
});

test('short and long destinations stay within the document and finish within 1200ms', () => {
    const env = environment({ initial: 1000 });
    env.start(9000);
    env.advance(1200);
    assert.equal(env.position(), 5000);
    env.assertClean();
    env.start(0);
    env.advance(2400);
    assert.equal(env.position(), 0);
    env.assertClean();
    env.start(228);
    env.advance(3015);
    assert.equal(env.position(), 100);
    env.assertClean();
});

test('a replacement anchor cannot be overwritten by an aborted operation', () => {
    const env = environment();
    const previous = env.start(5000);
    env.advance(200);
    previous.abort();
    env.assertClean();
    env.start(1128);
    env.advance(1400);
    assert.equal(env.position(), 1000);
    env.assertClean();
});

for (const [name, detail] of [
    ['wheel', {}],
    ['touchstart', {}],
    ['keydown', { key: 'PageDown' }],
    ['keydown', { key: 'Escape' }],
    ['resize', {}],
]) {
    test(`${name} ${detail.key ?? ''} interrupts scrolling without a jump`, () => {
        const env = environment();
        env.start(4000);
        env.advance(300);
        const stopped = env.position();
        env.window.emit(name, detail);
        env.advance(2000);
        assert.equal(env.position(), stopped);
        env.assertClean();
    });
}

test('reduced motion is instant initially and settles an in-flight anchor immediately', () => {
    const env = environment({ reduced: true });
    env.start(1128);
    assert.equal(env.position(), 1000);
    env.assertClean();
    env.preference.matches = false;
    env.start(3128);
    env.advance(200);
    env.preference.matches = true;
    env.preference.emit('change');
    assert.equal(env.position(), 3000);
    env.advance(2000);
    assert.equal(env.position(), 3000);
    env.assertClean();
});

test('an already aborted request neither moves the viewport nor registers work', () => {
    const env = environment();
    const controller = new AbortController();
    controller.abort();
    env.start(1128, controller);
    assert.equal(env.position(), 0);
    env.assertClean();
});
