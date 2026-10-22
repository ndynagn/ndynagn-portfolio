import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import next from 'next';

// Exercise real production responses, including routes rejected before a locale layout renders.
const manifest = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'));
const content = JSON.parse(readFileSync('src/features/content/portfolio.json', 'utf8'));
const expectedCases = content.projects.flatMap((project) =>
    ['ru', 'en']
        .filter((locale) => project.translations[locale]?.published)
        .map((locale) => `/${locale}/projects/${project.slug}`),
);
assert.deepEqual(
    Object.keys(manifest.routes)
        .filter((path) => /^\/(ru|en)\/projects\/[^/]+$/.test(path))
        .sort(),
    expectedCases.sort(),
    'Every published translation must be prerendered, including when its sibling locale is empty.',
);
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
        const publishedCases = Object.keys(manifest.routes).filter((path) =>
            new RegExp(`^/${locale}/projects/[^/]+$`).test(path),
        );
        for (const path of publishedCases) {
            routes.push({ path, status: 200, language: locale });
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
            assert.equal((html.match(/<h1\b/g) ?? []).length, 1, path);
            if (/^\/(ru|en)\/projects\/[^/]+$/.test(path)) {
                const available = content.projects.filter(
                    (project) => project.translations[language]?.published,
                );
                const index = available.findIndex((project) => path.endsWith(`/${project.slug}`));
                assert.ok(index >= 0, path);
                const project = available[index];
                assert.match(html, /data-project-cover/, path);
                assert.match(html, /id="project-overview"/, path);
                assert.equal(
                    html.includes('id="project-contribution"'),
                    project.translations[language].contributions.length > 0,
                    path,
                );
                const groups = project.gallery.filter(
                    (group) =>
                        group.translations[language] &&
                        group.images.some((image) => image.translations[language]),
                );
                assert.equal(html.includes('id="project-gallery"'), groups.length > 0, path);
                for (const group of groups) {
                    for (const image of group.images.filter(
                        (item) => item.translations[language],
                    )) {
                        assert.ok(
                            links.length > 0 && html.includes(`href="${image.src}"`),
                            `${path}: native original image link`,
                        );
                        assert.ok(
                            html.includes(`src="${image.thumbnail}"`),
                            `${path}: SSR thumbnail`,
                        );
                    }
                }
                assert.equal(html.includes('data-next-project'), available.length > 1, path);
                if (available.length > 1) {
                    const next = available[(index + 1) % available.length];
                    const nextAnchor = (html.match(/<a\b[^>]*>/g) ?? []).find((tag) =>
                        tag.includes('data-next-project'),
                    );
                    assert.ok(
                        nextAnchor?.includes(`href="/${language}/projects/${next.slug}"`),
                        path,
                    );
                }
            }
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
