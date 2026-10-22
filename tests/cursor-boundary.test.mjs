import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

import * as lock from '../src/shared/animation/transition-lock.ts';

test('only an acquired opt-in lock notifies cursor subscribers, once per state change', () => {
    const states = [];
    const unsubscribe = lock.subscribeCursorReset(() => states.push(lock.isCursorResetActive()));
    const ordinaryRelease = lock.acquireTransition();
    assert.equal(lock.acquireTransition({ resetCursor: true }), undefined);
    assert.equal(lock.isCursorResetActive(), false);
    ordinaryRelease();
    assert.deepEqual(states, []);
    const release = lock.acquireTransition({ resetCursor: true });
    assert.equal(lock.acquireTransition(), undefined);
    release();
    release();
    assert.deepEqual(states, [true, false]);
    unsubscribe();
    const nextRelease = lock.acquireTransition({ resetCursor: true });
    nextRelease();
    assert.deepEqual(states, [true, false]);
});

function events(extra = {}) {
    const listeners = new Map();
    return {
        ...extra,
        addEventListener(name, callback) {
            if (!listeners.has(name)) listeners.set(name, new Set());
            listeners.get(name).add(callback);
        },
        removeEventListener: (name, callback) => listeners.get(name)?.delete(callback),
        emit(name, value) {
            for (const callback of listeners.get(name) ?? []) callback(value);
        },
    };
}

function environment() {
    const properties = new Map();
    const attributes = new Set();
    const node = {
        dataset: {},
        style: {
            setProperty: (key, value) => properties.set(key, value),
            removeProperty: (key) => properties.delete(key),
        },
        setAttribute: (name) => attributes.add(name),
        removeAttribute: (name) => attributes.delete(name),
    };
    const root = events({ ...node, contains: () => true });
    const label = { textContent: '' };
    let target = {
        closest: (selector) => (selector.startsWith('input') ? null : target),
        getAttribute: (name) => (name === 'data-cursor' ? 'page' : 'Explore'),
        querySelector: () => null,
    };
    const document = events({
        hidden: false,
        hasFocus: () => true,
        elementFromPoint: () => target,
    });
    const window = events();
    const media = events({ matches: true });
    const frames = new Map();
    let nextFrame = 0;
    let ref = 0;
    let cleanup;
    let mutated;
    const dependencies = {
        react: {
            useRef: () => ({ current: [root, node, label][ref++] }),
            useEffect: (callback) => (cleanup = callback()),
        },
        'react/jsx-runtime': { jsx: () => null, jsxs: () => null },
        './transition-lock': lock,
        './cursor-boundary.module.css': { default: {} },
    };
    const { outputText } = ts.transpileModule(
        readFileSync(
            new URL('../src/shared/animation/cursor-boundary.tsx', import.meta.url),
            'utf8',
        ),
        {
            compilerOptions: {
                module: ts.ModuleKind.CommonJS,
                target: ts.ScriptTarget.ES2022,
                jsx: ts.JsxEmit.ReactJSX,
            },
        },
    );
    const exports = {};
    runInNewContext(outputText, {
        exports,
        require: (name) => {
            assert.ok(name in dependencies, name);
            return dependencies[name];
        },
        document,
        window,
        matchMedia: () => media,
        getComputedStyle: () => ({
            getPropertyValue: (key) => (key === '--palette-accent' ? '#35898e' : '#e0e9e7'),
        }),
        requestAnimationFrame(callback) {
            frames.set(++nextFrame, callback);
            return nextFrame;
        },
        cancelAnimationFrame: (id) => frames.delete(id),
        MutationObserver: class {
            constructor(callback) {
                mutated = callback;
            }
            observe() {}
            disconnect() {}
        },
    });
    exports.CursorBoundary({ children: null });
    return {
        node,
        label,
        properties,
        media,
        active: () => attributes.has('data-cursor-active'),
        visible: () => attributes.has('data-visible'),
        replaceContent() {
            target = { ...target };
            mutated();
        },
        cleanup: () => cleanup(),
        mutate: () => mutated(),
        move(x = 100) {
            root.emit('pointermove', { pointerType: 'mouse', clientX: x, clientY: 120 });
        },
        flush() {
            for (const [id, callback] of [...frames]) {
                frames.delete(id);
                callback();
            }
        },
    };
}

test('route reset clears hover immediately, tracks movement and waits for a new move after release', () => {
    const env = environment();
    let release;
    try {
        env.move();
        env.flush();
        assert.equal(env.node.dataset.mode, 'page');
        assert.equal(env.label.textContent, 'Explore');
        release = lock.acquireTransition({ resetCursor: true });
        assert.equal(env.node.dataset.mode, 'default');
        assert.equal(env.label.textContent, '');
        assert.equal(env.properties.has('--cursor-page-fill'), false);
        assert.equal(env.properties.has('--cursor-page-ink'), false);
        env.move(200);
        env.flush();
        assert.equal(env.node.dataset.mode, 'default');
        assert.equal(env.properties.get('--cursor-x'), '200px');
        release();
        env.mutate();
        env.flush();
        assert.equal(env.node.dataset.mode, 'default');
        env.move(201);
        env.flush();
        assert.equal(env.node.dataset.mode, 'page');
        assert.equal(env.label.textContent, 'Explore');
    } finally {
        release?.();
        env.cleanup();
    }
});

test('ordinary locks preserve hover and reset subscriptions detach on cursor unmount', () => {
    const env = environment();
    env.move();
    env.flush();
    const ordinaryRelease = lock.acquireTransition();
    assert.equal(lock.isCursorResetActive(), false);
    assert.equal(env.node.dataset.mode, 'page');
    ordinaryRelease();
    env.cleanup();
    const release = lock.acquireTransition({ resetCursor: true });
    assert.equal(env.node.dataset.mode, 'page');
    release();
    release();
    assert.equal(lock.isCursorResetActive(), false);
});

test('a boundary mounted during a route cannot select a target until release and pointer movement', () => {
    const release = lock.acquireTransition({ resetCursor: true });
    const env = environment();
    try {
        env.move();
        env.flush();
        assert.equal(env.node.dataset.mode, 'default');
        release();
        env.flush();
        assert.equal(env.node.dataset.mode, 'default');
        env.move();
        env.flush();
        assert.equal(env.node.dataset.mode, 'page');
        env.media.matches = false;
        env.media.emit('change');
        env.move();
        env.flush();
        assert.equal(env.properties.has('--cursor-page-fill'), false);
    } finally {
        release();
        env.cleanup();
    }
});

test('persistent boundary keeps its dot and native suppression when page content is replaced', () => {
    const env = environment();
    let release;
    try {
        env.move();
        env.flush();
        release = lock.acquireTransition({ resetCursor: true });
        env.flush();
        env.replaceContent();
        env.flush();
        release();
        env.flush();
        assert.equal(env.node.dataset.mode, 'default');
        assert.equal(env.label.textContent, '');
        assert.equal(env.active(), true);
        assert.equal(env.visible(), true);
        assert.equal(env.properties.get('--cursor-x'), '100px');
        env.move(101);
        env.flush();
        assert.equal(env.node.dataset.mode, 'page');
    } finally {
        release?.();
        env.cleanup();
    }
});

test('public routes share the layout cursor owner and the workbench keeps its own boundary', () => {
    let pathname = '/ru';
    const boundary = Symbol('CursorBoundary');
    const fragment = Symbol('Fragment');
    const children = Symbol('server content');
    const dependencies = {
        'react/jsx-runtime': { jsx: (type, props) => ({ type, props }), Fragment: fragment },
        'next/navigation': { usePathname: () => pathname },
        '@/shared/animation/cursor-boundary': { CursorBoundary: boundary },
    };
    const { outputText } = ts.transpileModule(
        readFileSync(
            new URL('../src/features/portfolio/portfolio-cursor.tsx', import.meta.url),
            'utf8',
        ),
        {
            compilerOptions: {
                module: ts.ModuleKind.CommonJS,
                target: ts.ScriptTarget.ES2022,
                jsx: ts.JsxEmit.ReactJSX,
            },
        },
    );
    const exports = {};
    runInNewContext(outputText, { exports, require: (name) => dependencies[name] });
    for (pathname of ['/ru', '/ru/projects', '/ru/projects/onetouch', '/en', '/en/projects']) {
        const result = exports.PortfolioCursor({ children });
        assert.equal(result.type, boundary);
        assert.equal(result.props.children, children);
    }
    pathname = '/ru/design-system';
    assert.equal(exports.PortfolioCursor({ children }).type, fragment);
});
