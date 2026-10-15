import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

import { getSiteUrl } from '../src/shared/seo/site.ts';

const metadataSource = readFileSync(
    new URL('../src/shared/seo/metadata.ts', import.meta.url),
    'utf8',
);
const { outputText } = ts.transpileModule(metadataSource, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const metadataModule = {};
runInNewContext(outputText, {
    exports: metadataModule,
    URL,
    require: (name) => {
        if (name === 'server-only') {
            return {};
        }
        assert.equal(name, './site');
        return { getSiteUrl };
    },
});

function withOrigin(value, run) {
    const previous = process.env.SITE_URL;

    try {
        if (value === undefined) {
            delete process.env.SITE_URL;
        } else {
            process.env.SITE_URL = value;
        }
        run();
    } finally {
        if (previous === undefined) {
            delete process.env.SITE_URL;
        } else {
            process.env.SITE_URL = previous;
        }
    }
}

test('missing or local origins cannot enable public indexing', () => {
    for (const value of [
        undefined,
        '',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://10.0.0.1',
        'http://192.168.1.1',
        'http://172.16.0.1',
        'http://[::1]:3000',
        'http://portfolio.local',
    ]) {
        withOrigin(value, () => assert.equal(getSiteUrl(), undefined));
    }
});

test('malformed or unsafe origins are explicit configuration errors', () => {
    for (const value of [
        'no-url',
        'ftp://portfolio.dev',
        'https://user:password@portfolio.dev',
        'https://portfolio.dev/path',
        'https://portfolio.dev?x=1',
        'https://portfolio.dev#section',
    ]) {
        withOrigin(value, () => assert.throws(() => getSiteUrl(), /SITE_URL/));
    }
});

test('public origins normalize without confusing hostname prefixes with local addresses', () => {
    withOrigin('https://10.portfolio.dev', () =>
        assert.equal(getSiteUrl()?.hostname, '10.portfolio.dev'),
    );
    withOrigin('https://portfolio.dev', () =>
        assert.equal(getSiteUrl()?.href, 'https://portfolio.dev/'),
    );
    withOrigin('https://localhost-portfolio.dev', () =>
        assert.equal(getSiteUrl()?.hostname, 'localhost-portfolio.dev'),
    );
});

test('placeholder or unconfigured pages omit canonical and social URLs', () => {
    const input = {
        title: 'Portfolio',
        description: 'Setup',
        locale: 'ru',
        path: '/ru',
        alternatives: { ru: '/ru' },
        published: true,
    };

    withOrigin(undefined, () => {
        const result = metadataModule.createPageMetadata(input);
        assert.equal(result.robots.index, false);
        assert.equal(result.alternates, undefined);
        assert.equal(result.openGraph, undefined);
    });
    withOrigin('https://portfolio.dev', () => {
        const result = metadataModule.createPageMetadata({ ...input, published: false });
        assert.equal(result.robots.index, false);
        assert.equal(result.alternates, undefined);
    });
});

test('published case metadata has an absolute canonical and only available alternatives', () => {
    withOrigin('https://portfolio.dev', () => {
        const result = metadataModule.createPageMetadata({
            title: 'Case',
            description: 'Case description',
            locale: 'en',
            path: '/en/projects/case',
            alternatives: { en: '/en/projects/case' },
            published: true,
        });
        assert.equal(result.robots.index, true);
        assert.equal(result.alternates.canonical, 'https://portfolio.dev/en/projects/case');
        assert.equal(result.alternates.languages.en, result.alternates.canonical);
        assert.equal(result.alternates.languages.ru, undefined);
        assert.equal(result.openGraph.url, result.alternates.canonical);
        assert.equal(result.openGraph.locale, 'en_US');
    });
});
