import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

import * as metrica from '../src/shared/analytics/metrica.ts';

// Exercise the actual browser adapter without loading the remote SDK or a DOM.
const source = readFileSync(new URL('../src/shared/analytics/browser.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});

function loadAdapter(production, counterValue) {
    const browserWindow = {};
    const exports = {};

    runInNewContext(outputText, {
        exports,
        window: browserWindow,
        process: {
            env: {
                NODE_ENV: production ? 'production' : 'development',
                NEXT_PUBLIC_YANDEX_METRIKA_ID: counterValue,
            },
        },
        require: (name) => {
            assert.equal(name, './metrica');
            return metrica;
        },
    });

    return { adapter: exports, browserWindow };
}

test('disabled builds never create a browser SDK queue', () => {
    for (const [production, id] of [
        [false, '12345'],
        [true, undefined],
        [true, 'invalid'],
    ]) {
        const { adapter, browserWindow } = loadAdapter(production, id);
        adapter.trackEvent({ name: 'cv_download', locale: 'ru' });
        assert.equal(adapter.getBrowserAnalytics(), undefined);
        assert.equal(browserWindow.ym, undefined);
        assert.equal(browserWindow.portfolioMetrica, undefined);
    }
});

test('browser singleton survives provider remounts and queues commands once', () => {
    const { adapter, browserWindow } = loadAdapter(true, '12345');
    const first = adapter.getBrowserAnalytics();
    first.tracker.visit('/ru', 'Portfolio');
    const remounted = adapter.getBrowserAnalytics();
    remounted.tracker.visit('/ru', 'Portfolio');
    adapter.trackEvent({ name: 'contact_click', locale: 'ru', linkId: 'github' });

    assert.equal(first, remounted);
    assert.deepEqual(
        Array.from(browserWindow.ym.a, ([, method]) => method),
        ['init', 'hit', 'reachGoal'],
    );
});

test('tag failure clears pending commands and makes later events harmless', () => {
    const { adapter, browserWindow } = loadAdapter(true, '12345');
    adapter.getBrowserAnalytics().tracker.visit('/ru', 'Portfolio');
    adapter.disableBrowserAnalytics();
    adapter.trackEvent({ name: 'cv_download', locale: 'ru' });
    adapter.getBrowserAnalytics().tracker.visit('/en', 'Portfolio');

    assert.equal(browserWindow.ym.a.length, 0);
    assert.equal(browserWindow.portfolioMetrica.failed, true);
});
