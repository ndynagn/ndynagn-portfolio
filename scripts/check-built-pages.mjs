import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import next from 'next';

// Exercise real production responses, including routes rejected before a locale layout renders.
const manifest = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'));
const app = next({ dev: false, hostname: '127.0.0.1' });
const server = createServer(app.getRequestHandler());

try {
    await app.prepare();
    await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', resolve);
    });
    const origin = `http://127.0.0.1:${server.address().port}`;
    const redirect = await fetch(origin, { redirect: 'manual' });
    assert.equal(redirect.status, 308);
    assert.equal(new URL(redirect.headers.get('location'), origin).pathname, '/ru');

    const routes = [
        { path: '/not-existing-audit-route', status: 404, language: 'ru' },
        { path: '/xx', status: 404, language: 'ru' },
    ];
    for (const locale of ['ru', 'en']) {
        routes.push(
            { path: `/${locale}`, status: 200, language: locale },
            { path: `/${locale}/projects`, status: 200, language: locale },
            { path: `/${locale}/not-existing-audit-route`, status: 404, language: 'ru' },
            { path: `/${locale}/design-system`, status: 404, language: 'ru' },
            { path: `/${locale}/projects/not-existing-audit-case`, status: 404, language: 'ru' },
        );
        const publishedCase = Object.keys(manifest.routes).find((path) =>
            new RegExp(`^/${locale}/projects/[^/]+$`).test(path),
        );
        if (publishedCase) {
            routes.push({ path: publishedCase, status: 200, language: locale });
        }
    }

    for (const { path, status, language } of routes) {
        const response = await fetch(`${origin}${path}`, { redirect: 'manual' });
        assert.equal(response.status, status, path);
        const html = await response.text();
        assert.match(html, new RegExp(`<html\\b[^>]*\\blang="${language}"`), path);
        const links = html.match(/<link\b[^>]*>/g) ?? [];
        assert.ok(
            links.some((tag) => /\brel="icon"/.test(tag) && /\bhref="\/favicon\.svg"/.test(tag)),
            `Missing SVG favicon: ${path}`,
        );
        assert.equal((html.match(/<title\b/g) ?? []).length, 1, path);
        if (status === 404) {
            assert.match(html, /\blang="en"/, path);
            assert.match(html, /Страница не найдена\./, path);
            assert.match(html, /Page not found\./, path);
            assert.match(html, /<a\b[^>]*\bhref="\/ru"/, path);
            assert.match(html, /<a\b[^>]*\bhref="\/en"/, path);
            assert.match(html, /<meta\b[^>]*name="robots"[^>]*content="noindex, nofollow"/, path);
            assert.doesNotMatch(html, /data-portfolio-route|data-cursor-active|mc\.yandex\./, path);
        } else {
            assert.equal((html.match(/id="main"/g) ?? []).length, 1, path);
        }
        console.log(`Verified ${status}, document language and favicon for ${path}.`);
    }

    const icon = await fetch(`${origin}/favicon.svg`);
    assert.equal(icon.status, 200);
    assert.match(icon.headers.get('content-type'), /image\/svg\+xml/);
    assert.equal(await icon.text(), readFileSync('public/favicon.svg', 'utf8'));
    console.log('Verified the supplied favicon is served unchanged.');
} catch (error) {
    // Next installs an uncaught-exception handler; make assertion failures fail the command.
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
