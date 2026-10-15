import assert from 'node:assert/strict';
import test from 'node:test';

import { createMetricaTracker, getCounterId } from '../src/shared/analytics/metrica.ts';

test('analytics is disabled outside production and without a valid public ID', () => {
    assert.equal(getCounterId('12345', false), undefined);

    for (const value of [undefined, '', '0', '-1', '1.5', 'abc', ' 123', '9007199254740992']) {
        assert.equal(getCounterId(value, true), undefined);
    }

    assert.equal(getCounterId('12345', true), 12345);
});

test('effect replays initialize once and deduplicate hits while return visits still count', () => {
    const calls = [];
    const tracker = createMetricaTracker(12345, (...args) => calls.push(args));

    tracker.visit('/ru', 'Портфолио');
    tracker.visit('/ru', 'Портфолио');
    tracker.visit('/ru/projects/example', 'Project');
    tracker.visit('/ru/projects/example', 'Project');
    tracker.visit('/ru', 'Портфолио');

    assert.equal(calls.filter(([, method]) => method === 'init').length, 1);
    assert.deepEqual(calls[0][2], {
        defer: true,
        webvisor: false,
        trackLinks: false,
        clickmap: false,
        accurateTrackBounce: true,
    });
    assert.deepEqual(
        calls.filter(([, method]) => method === 'hit').map(([, , path]) => path),
        ['/ru', '/ru/projects/example', '/ru'],
    );
    assert.equal(calls[2][3].referer, '/ru');
});

test('named events do not send another page hit', () => {
    const calls = [];
    const tracker = createMetricaTracker(12345, (...args) => calls.push(args));

    tracker.visit('/en', 'Portfolio');
    tracker.track({ name: 'project_open', locale: 'en', projectSlug: 'example' });

    assert.deepEqual(calls.at(-1), [
        12345,
        'reachGoal',
        'project_open',
        { locale: 'en', projectSlug: 'example' },
    ]);
    assert.equal(calls.filter(([, method]) => method === 'hit').length, 1);
});

test('provider failures do not escape and a failed hit may be retried', () => {
    let fail = true;
    const calls = [];
    const tracker = createMetricaTracker(12345, (...args) => {
        if (fail) {
            throw new Error('blocked provider');
        }
        calls.push(args);
    });

    assert.doesNotThrow(() => tracker.visit('/ru', 'Portfolio'));
    assert.doesNotThrow(() => tracker.track({ name: 'cv_download', locale: 'ru' }));
    fail = false;
    tracker.visit('/ru', 'Portfolio');
    assert.deepEqual(
        calls.map(([, method]) => method),
        ['init', 'hit'],
    );
});
