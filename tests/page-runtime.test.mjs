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
            if (!listeners.has(name)) listeners.set(name, new Set());
            listeners.get(name).add(callback);
        },
        removeEventListener: (name, callback) => listeners.get(name)?.delete(callback),
        emit(name, event = {}) {
            for (const callback of [...(listeners.get(name) ?? [])]) callback(event);
        },
    };
}

// Execute the real persistent adapter and scrolling/scene operations. Only the
// browser, clock, router and hook scheduler are replaced, not lifecycle behavior.
function environment({ reduced = false, routeError = false } = {}) {
    let now = 0;
    let position = 0;
    let nextId = 0;
    let focusCount = 0;
    const writes = [];
    const hashes = [];
    const navigations = [];
    const frames = new Map();
    const timers = new Map();
    const preference = events({ matches: reduced });
    const location = new URL('http://localhost/ru');
    class Element {}
    class HTMLAnchorElement extends Element {
        constructor(href, options) {
            super();
            Object.assign(this, {
                href: new URL(href, location).href,
                target: '',
                dataset: {},
                ...options,
            });
        }
        closest() {
            return this;
        }
        hasAttribute(name) {
            return name === 'download' && this.download;
        }
        matches() {
            return Boolean(this.route);
        }
        getBoundingClientRect() {
            return { x: 10, y: 10, width: 20, height: 20 };
        }
        querySelector() {
            return null;
        }
        getAttribute(name) {
            return name === 'aria-label' ? (this.ariaLabel ?? null) : null;
        }
    }
    const section = {
        focus() {
            focusCount++;
        },
        getBoundingClientRect: () => ({ top: 2000 - position }),
    };
    const document = events({
        hidden: false,
        body: {},
        documentElement: { scrollHeight: 6000 },
        getElementById: () => section,
    });
    const window = events({
        location,
        scrollTo({ top }) {
            position = top;
            writes.push({ pathname: location.pathname, top });
        },
    });
    const globals = {
        window,
        document,
        location,
        Element,
        HTMLAnchorElement,
        AbortController,
        URL,
        history: {
            pushState(_, __, href) {
                location.href = href;
                hashes.push(location.hash);
            },
        },
        matchMedia: () => preference,
        innerWidth: 1440,
        innerHeight: 900,
        get scrollY() {
            return position;
        },
        getComputedStyle: () => ({
            scrollMarginTop: '128px',
            color: '#222',
            backgroundColor: '#fff',
            getPropertyValue: () => '',
        }),
        performance: { now: () => now },
        requestAnimationFrame(callback) {
            frames.set(++nextId, callback);
            return nextId;
        },
        cancelAnimationFrame: (id) => frames.delete(id),
        setTimeout(callback, delay) {
            timers.set(++nextId, { callback, at: now + delay });
            return nextId;
        },
        clearTimeout: (id) => timers.delete(id),
    };
    function load(path, imports = {}) {
        const exports = {};
        const { outputText } = ts.transpileModule(
            readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8'),
            {
                compilerOptions: {
                    module: ts.ModuleKind.CommonJS,
                    target: ts.ScriptTarget.ES2022,
                    jsx: ts.JsxEmit.ReactJSX,
                },
            },
        );
        const context = {
            exports,
            require(name) {
                assert.ok(name in imports, name);
                return imports[name];
            },
        };
        Object.defineProperties(context, Object.getOwnPropertyDescriptors(globals));
        runInNewContext(outputText, context);
        return exports;
    }
    const lock = load('shared/animation/transition-lock.ts');
    const hooks = [];
    let index = 0;
    let pending = [];
    const react = {
        useRef(value) {
            const slot = index++;
            return (hooks[slot] ??= { current: value });
        },
        useState(value) {
            const slot = index++;
            hooks[slot] ??= { value };
            return [
                hooks[slot].value,
                (next) => {
                    hooks[slot].value = typeof next === 'function' ? next(hooks[slot].value) : next;
                },
            ];
        },
        useEffect(callback, dependencies) {
            const slot = index++;
            const previous = hooks[slot];
            if (
                !previous ||
                dependencies.some((value, i) => !Object.is(value, previous.dependencies[i]))
            ) {
                pending.push(() => {
                    previous?.cleanup?.();
                    hooks[slot] = { dependencies, cleanup: callback() };
                });
            }
        },
    };
    // Explicit commits flush effects before the synthetic browser advances RAF.
    react.useLayoutEffect = react.useEffect;
    const router = {
        push(href) {
            if (routeError) {
                throw new Error('Route request failed');
            }
            navigations.push(href);
            location.href = new URL(href, location).href;
            position = 0;
        },
    };
    const { PageRuntime } = load('features/portfolio/page-runtime.tsx', {
        react,
        'react/jsx-runtime': {
            jsx: (type, props) => ({ type, props }),
            jsxs: (type, props) => ({ type, props }),
        },
        'next/navigation': { usePathname: () => location.pathname, useRouter: () => router },
        '@/shared/analytics/browser': { trackEvent() {} },
        '@/shared/animation/scene-sequence': load('shared/animation/scene-sequence.ts'),
        '@/shared/animation/transition-lock': lock,
        '@/shared/i18n/locales': { isLocale: (locale) => ['ru', 'en'].includes(locale) },
        './anchor-scroll': load('features/portfolio/anchor-scroll.ts'),
        './page-runtime.module.css': { default: {} },
    });
    let rendered;
    function render() {
        index = 0;
        pending = [];
        rendered = PageRuntime();
        for (const effect of pending) effect();
    }
    const flush = async () => {
        await new Promise((resolve) => setImmediate(resolve));
        render();
        await new Promise((resolve) => setImmediate(resolve));
    };
    render();
    return {
        writes,
        hashes,
        navigations,
        preference,
        click(href, options = {}, details = {}) {
            const event = {
                target: new HTMLAnchorElement(href, options),
                button: 0,
                detail: 1,
                clientX: 20,
                clientY: 20,
                preventDefault() {
                    this.defaultPrevented = true;
                },
                ...details,
            };
            document.emit('click', event);
            render();
            return event;
        },
        async advance(time) {
            now = time;
            for (const [id, timer] of [...timers]) {
                if (timer.at <= now) {
                    timers.delete(id);
                    timer.callback();
                }
            }
            await flush();
            for (const [id, callback] of [...frames]) {
                frames.delete(id);
                callback(now);
            }
            await flush();
        },
        commit(href) {
            location.href = new URL(href, location).href;
            render();
        },
        history() {
            window.emit('popstate');
        },
        async dispose() {
            for (const hook of hooks) hook.cleanup?.();
            await new Promise((resolve) => setImmediate(resolve));
        },
        frames: () => frames.size,
        focusCount: () => focusCount,
        cursorResetActive: lock.isCursorResetActive,
        overlayLabel: () => rendered?.props.children.props.children,
        assertUnlocked() {
            const release = lock.acquireTransition();
            assert.ok(release);
            release();
        },
        flush,
    };
}

test('route overlay uses the destination title independently of control and cursor captions', async () => {
    for (const [options, expected] of [
        [
            {
                dataset: { transitionLabel: 'OneTouch', cursorLabel: 'Далее' },
                ariaLabel: 'Next project',
                textContent: 'Следующий проект OneTouch',
            },
            'OneTouch',
        ],
        [
            {
                ariaLabel: 'Accessible title',
                dataset: { cursorLabel: 'Explore' },
                textContent: 'Card',
            },
            'Accessible title',
        ],
        [{ dataset: { cursorLabel: 'Explore' }, textContent: 'Card' }, 'Explore'],
        [{ textContent: '  На главную  ' }, 'На главную'],
    ]) {
        const env = environment();
        env.click('/ru/projects/onetouch', { route: true, ...options });
        assert.equal(env.overlayLabel(), expected);
        await env.dispose();
    }
});

test('pending route suppresses anchor hash/focus/scroll through cover and reveal', async () => {
    const env = environment();
    env.click('/ru/projects', { route: true });
    assert.equal(env.cursorResetActive(), true);
    await env.advance(100);
    assert.equal(env.click('#about').defaultPrevented, true);
    assert.equal(env.focusCount(), 0);
    assert.deepEqual(env.hashes, []);
    await env.advance(600);
    assert.deepEqual(env.navigations, ['/ru/projects']);
    env.click('#contact');
    assert.equal(env.frames(), 0);
    assert.deepEqual(env.writes, []);
    await env.advance(1250);
    env.assertUnlocked();
    assert.equal(env.cursorResetActive(), false);
    env.click('#contact');
    assert.equal(env.focusCount(), 1);
    assert.deepEqual(env.hashes, ['#contact']);
    await env.dispose();
});

test('route activation cancels an existing anchor operation before navigation', async () => {
    const env = environment();
    env.click('#about');
    await env.advance(100);
    assert.ok(env.writes.length > 0);
    env.click('/ru/projects', { route: true });
    const previousWrites = env.writes.length;
    await env.advance(700);
    await env.advance(1350);
    assert.equal(env.writes.length, previousWrites);
    env.assertUnlocked();
    await env.dispose();
});

test('pathname commits outside the adapter cancel previous-document anchor frames', async () => {
    const env = environment();
    env.click('#about');
    await env.advance(100);
    const previousWrites = env.writes.length;
    env.commit('/en');
    assert.equal(env.frames(), 0);
    await env.advance(2000);
    assert.equal(env.writes.length, previousWrites);
    await env.dispose();
});

test('history cancellation and unmount release route locks and frames', async () => {
    for (const cancel of ['history', 'unmount']) {
        const env = environment();
        env.click('/ru/projects', { route: true });
        assert.equal(env.cursorResetActive(), true);
        if (cancel === 'history') {
            env.history();
            await env.flush();
        } else await env.dispose();
        env.assertUnlocked();
        assert.equal(env.cursorResetActive(), false);
        await env.advance(2000);
        assert.deepEqual(env.navigations, []);
        assert.equal(env.frames(), 0);
        await env.dispose();
    }
});

test('failed route replacement releases cursor reset and the transition lock', async () => {
    const env = environment({ routeError: true });
    env.click('/ru/projects', { route: true });
    assert.equal(env.cursorResetActive(), true);
    await env.advance(600);
    assert.equal(env.cursorResetActive(), false);
    env.assertUnlocked();
    await env.dispose();
});

test('native exclusions remain untouched during a route effect', async () => {
    const env = environment();
    env.click('/ru/projects', { route: true });
    for (const [href, options, details] of [
        ['#about', {}, { ctrlKey: true }],
        ['#about', {}, { metaKey: true }],
        ['#about', {}, { defaultPrevented: true }],
        ['#about', { target: '_blank' }, {}],
        ['/resume.pdf', { download: true }, {}],
        ['https://example.com', {}, {}],
    ]) {
        const event = env.click(href, options, details);
        assert.equal(Boolean(event.defaultPrevented), Boolean(details.defaultPrevented));
    }
    assert.deepEqual(env.hashes, []);
    await env.dispose();
    env.assertUnlocked();
});

test('reduced motion retains instant anchors and native route navigation', async () => {
    const env = environment({ reduced: true });
    env.click('#about');
    assert.equal(env.focusCount(), 1);
    assert.equal(env.frames(), 0);
    assert.equal(env.writes.at(-1).top, 1872);
    assert.equal(env.click('/ru/projects', { route: true }).defaultPrevented, undefined);
    env.assertUnlocked();
    await env.dispose();
});
