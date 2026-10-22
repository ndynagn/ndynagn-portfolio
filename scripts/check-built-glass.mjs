import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createServer } from 'node:http';
import next from 'next';

function stylesheets(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);

        return entry.isDirectory() ? stylesheets(path) : path.endsWith('.css') ? [path] : [];
    });
}

const css = stylesheets('.next/static')
    .map((file) => readFileSync(file, 'utf8'))
    .join('\n');
const rules =
    css.match(
        /[^{}]*\{[^{}]*backdrop-filter:[^{}]*var\(--(?:glass-filter|cursor-blur)\)[^{}]*\}/g,
    ) ?? [];

assert.ok(rules.length, 'No built glass material found; build the workbench fixture first.');
assert.ok(
    rules.some((rule) => rule.includes('--glass-filter')),
    'Missing glass material.',
);
assert.ok(
    rules.some((rule) => rule.includes('--cursor-blur')),
    'Missing cursor material.',
);
for (const rule of rules) {
    assert.match(rule, /-webkit-backdrop-filter:/, rule);
    assert.match(rule, /[;{]backdrop-filter:/, rule);
}
console.log(
    `Verified both native backdrop-filter declarations in ${rules.length} built material rules.`,
);

// Check the stylesheet sequence delivered by each route, not filesystem/hash order.
const app = next({ dev: false, hostname: '127.0.0.1' });
const server = createServer(app.getRequestHandler());
try {
    await app.prepare();
    await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', resolve);
    });
    const origin = `http://127.0.0.1:${server.address().port}`;
    const manifest = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'));
    const cases = Object.keys(manifest.routes).filter((path) =>
        /^\/(ru|en)\/projects\/[^/]+$/.test(path),
    );
    for (const path of ['/ru', '/en', '/ru/projects', '/en/projects', ...cases]) {
        const response = await fetch(`${origin}${path}`);
        assert.equal(response.status, 200, path);
        const html = await response.text();
        const links = (html.match(/<link\b[^>]*>/g) ?? [])
            .filter((tag) => /\brel="stylesheet"/.test(tag))
            .map((tag) => tag.match(/\bhref="([^"]+)"/)?.[1]);
        assert.ok(links.length, `No stylesheet links for ${path}.`);
        const layers = new Set();
        for (const href of links) {
            assert.ok(href, `Missing stylesheet href for ${path}.`);
            const sheet = await fetch(new URL(href, origin));
            assert.equal(sheet.status, 200, href);
            const source = await sheet.text();
            for (const match of source.matchAll(/@layer\s+([^;{}]+)[;{]/g)) {
                for (const name of match[1].split(',')) {
                    layers.add(name.trim());
                }
            }
        }
        assert.deepEqual(
            [...layers].filter((name) =>
                ['properties', 'theme', 'base', 'components', 'utilities'].includes(name),
            ),
            ['properties', 'theme', 'base', 'components', 'utilities'],
            `Incorrect production layer precedence for ${path}.`,
        );
        console.log(`Verified reset/component/utility layer precedence for ${path}.`);
    }
} catch (error) {
    // Next installs an uncaught-exception handler; report failure explicitly to CI.
    console.error(error);
    process.exitCode = 1;
} finally {
    if (server.listening) {
        await new Promise((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()));
            server.closeAllConnections();
        });
    }
    await app.close();
}
