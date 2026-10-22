import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

import { parseContent } from '../src/features/content/content-schema.ts';
import { parseProjectCategory } from '../src/features/portfolio/project-category.ts';
import * as routes from '../src/shared/i18n/locales.ts';

const source = JSON.parse(
    readFileSync(new URL('../src/features/content/portfolio.json', import.meta.url), 'utf8'),
);

function lookups(records) {
    const exports = {};
    const { outputText } = ts.transpileModule(
        readFileSync(new URL('../src/features/content/server.ts', import.meta.url), 'utf8'),
        { compilerOptions: { module: ts.ModuleKind.CommonJS } },
    );
    runInNewContext(outputText, {
        exports,
        require(name) {
            if (name === 'server-only') {
                return {};
            }
            if (name === './records') {
                return records;
            }
            assert.equal(name, '@/shared/i18n/locales');
            return {
                locales: ['ru', 'en'],
                projectPath: (locale, slug) => `/${locale}/projects/${slug}`,
            };
        },
    });
    return exports;
}

test('approved content preserves CV facts, published projects and explicit featured order', () => {
    const data = parseContent(source);
    assert.equal(data.projects.length, 8);
    assert.equal(data.experience[0].period, '2024-11/2026-10');
    assert.equal(data.profile.translations.ru.headline, 'Flutter-разработчик · Middle');
    assert.equal(data.education[0].translations.en.yearNote, 'expected');
    const server = lookups(data);
    assert.deepEqual(
        Array.from(server.getFeaturedProjects('en'), ({ project }) => project.slug),
        ['onetouch', 'potlucky', 'immergas'],
    );
    assert.equal(
        server.getProjects('ru').filter(({ project }) => project.category === 'commerce').length,
        4,
    );
});

test('invalid editorial data fails with a field path instead of becoming an empty catalogue', () => {
    for (const [mutate, field] of [
        [
            (data) => {
                data.projects[1].slug = data.projects[0].slug;
            },
            'projects.1.slug',
        ],
        [
            (data) => {
                data.experience[1].id = data.experience[0].id;
            },
            'experience.1.id',
        ],
        [
            (data) => {
                data.featuredSlugs.push('missing-project');
            },
            'featuredSlugs.3',
        ],
        [
            (data) => {
                data.featuredSlugs.push(data.featuredSlugs[0]);
            },
            'featuredSlugs.3',
        ],
        [
            (data) => {
                data.projects[0].websiteUrl = 'javascript:alert(1)';
            },
            'projects.0.websiteUrl',
        ],
        [
            (data) => {
                delete data.projects[0].translations.ru.published;
            },
            'projects.0.translations.ru.published',
        ],
        [
            (data) => {
                data.profile.translations.ru.cvPath = 'https://example.com/cv.pdf';
            },
            'profile.translations.ru.cvPath',
        ],
    ]) {
        const data = structuredClone(source);
        mutate(data);
        assert.throws(
            () => parseContent(data),
            (error) => error.message.includes(field),
        );
    }
});

test('missing and unpublished translations disappear consistently from cases, cards and alternatives', () => {
    const data = structuredClone(source);
    delete data.projects[0].translations.en;
    data.projects[1].translations.ru.published = false;
    const server = lookups(parseContent(data));
    assert.equal(server.getProject('en', 'onetouch'), undefined);
    assert.equal(server.getProject('ru', 'potlucky'), undefined);
    assert.equal(server.getProject('ru', 'missing-project'), undefined);
    assert.equal(server.getProjectAlternatives('onetouch').en, undefined);
    assert.equal(server.getProjectAlternatives('onetouch').ru, '/ru/projects/onetouch');
    assert.deepEqual(
        Array.from(server.getFeaturedProjects('en'), ({ project }) => project.slug),
        ['potlucky', 'immergas'],
    );
    assert.equal(server.getProjects('en').length, 7);
});

test('empty content is valid and never synthesizes public records', () => {
    const data = parseContent({
        profile: null,
        projects: [],
        experience: [],
        education: [],
        courses: [],
        socialLinks: [],
        skills: [],
        featuredSlugs: [],
    });
    const server = lookups(data);
    assert.equal(server.getProfile('ru'), undefined);
    assert.equal(server.getProjects('ru').length, 0);
    assert.equal(server.getFeaturedProjects('en').length, 0);
});

test('case media preserves approved files, captions and the OOMI provenance', () => {
    const data = parseContent(source);
    const oomi = data.projects.find((project) => project.id === 'potlucky');
    assert.ok(oomi.gallery.every((group) => group.translations.en.title.startsWith('OOMI')));
    for (const project of data.projects) {
        for (const translation of Object.values(project.translations)) {
            assert.ok(!('sections' in translation));
            assert.ok(translation.role);
            assert.ok(translation.contributions.length > 0);
        }
        for (const group of project.gallery) {
            for (const image of group.images) {
                for (const path of [image.src, image.thumbnail]) {
                    assert.ok(
                        readFileSync(new URL(`../public${path}`, import.meta.url)).length > 0,
                    );
                }
                for (const locale of ['ru', 'en']) {
                    assert.ok(image.translations[locale].alt);
                    assert.ok(image.translations[locale].caption);
                }
            }
        }
    }
});

test('invalid media IDs, paths, dimensions and captions fail with actionable paths', () => {
    for (const [field, value] of [
        ['src', '/images/projects/../private.webp'],
        ['thumbnail', 'https://example.com/image.webp'],
        ['width', 0],
        ['height', 1.5],
        ['id', source.projects[0].gallery[0].id],
        ['translations', { ru: { alt: '', caption: 'Caption' } }],
    ]) {
        const data = structuredClone(source);
        data.projects[0].gallery[0].images[0][field] = value;
        assert.throws(
            () => parseContent(data),
            (error) => error.message.includes(`projects.0.gallery.0.images.0.${field}`),
        );
    }
});

test('next case cycles only through published localized records and hides for zero or one', () => {
    const data = structuredClone(source);
    delete data.projects[1].translations.en;
    let server = lookups(parseContent(data));
    assert.equal(server.getNextProject('en', 'onetouch').project.slug, 'immergas');
    assert.equal(server.getNextProject('ru', 'aventin').project.slug, 'onetouch');
    assert.equal(server.getNextProject('en', 'missing'), undefined);
    data.projects = data.projects.slice(0, 1);
    data.featuredSlugs = [];
    data.experience = [];
    server = lookups(parseContent(data));
    assert.equal(server.getNextProject('ru', 'onetouch'), undefined);
    data.projects = [];
    assert.equal(lookups(parseContent(data)).getNextProject('ru', 'onetouch'), undefined);
});

test('URL categories are bounded and unknown or repeated values select all projects', () => {
    assert.equal(parseProjectCategory('commerce'), 'commerce');
    assert.equal(parseProjectCategory('service'), 'service');
    for (const value of [
        undefined,
        null,
        '',
        'all',
        'professional',
        'pet',
        ['commerce', 'service'],
    ]) {
        assert.equal(parseProjectCategory(value), 'all');
    }
});

test('sitemap includes locale catalogues and only published case translations', () => {
    const data = structuredClone(source);
    delete data.projects[0].translations.en;
    data.projects[1].translations.ru.published = false;
    const server = lookups(parseContent(data));
    const exports = {};
    const { outputText } = ts.transpileModule(
        readFileSync(new URL('../src/app/sitemap.ts', import.meta.url), 'utf8'),
        { compilerOptions: { module: ts.ModuleKind.CommonJS } },
    );
    runInNewContext(outputText, {
        exports,
        URL,
        require(name) {
            if (name === '@/features/content/server') {
                return server;
            }
            if (name === '@/shared/i18n/locales') {
                return routes;
            }
            assert.equal(name, '@/shared/seo/site');
            return { getSiteUrl: () => new URL('https://portfolio.example') };
        },
    });
    const entries = exports.default();
    const urls = Array.from(entries, (entry) => entry.url);
    assert.ok(urls.includes('https://portfolio.example/ru/projects'));
    assert.ok(urls.includes('https://portfolio.example/en/projects'));
    assert.ok(!urls.includes('https://portfolio.example/en/projects/onetouch'));
    assert.ok(!urls.includes('https://portfolio.example/ru/projects/potlucky'));
    assert.ok(urls.every((url) => !url.includes('?') && !url.includes('design-system')));
    assert.equal(
        entries.find((entry) => entry.url.endsWith('/ru/projects')).alternates.languages.en,
        'https://portfolio.example/en/projects',
    );
});
