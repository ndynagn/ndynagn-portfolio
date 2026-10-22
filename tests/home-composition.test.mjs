import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

import { parseContent } from '../src/features/content/content-schema.ts';
import * as routes from '../src/shared/i18n/locales.ts';

const source = JSON.parse(
    readFileSync(new URL('../src/features/content/portfolio.json', import.meta.url), 'utf8'),
);
const jsx = (type, props) => ({ type, props: props ?? {} });
const ui = { jsx, jsxs: jsx, Fragment: 'fragment' };
const leaf = (props) => jsx('fixture-boundary', props);

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
    runInNewContext(outputText, {
        exports,
        require(name) {
            if (name === 'server-only') return {};
            assert.ok(name in imports, name);
            return imports[name];
        },
    });
    return exports;
}

function render(data, locale) {
    const records = parseContent(data);
    const server = load('features/content/server.ts', {
        'server-only': {},
        './records': records,
        '@/shared/i18n/locales': routes,
    });
    const dictionary = load('shared/i18n/portfolio.ts');
    const common = {
        'react/jsx-runtime': ui,
        'lucide-react': {
            ArrowDown: leaf,
            ArrowUpRight: leaf,
            Download: leaf,
            Menu: leaf,
            X: leaf,
        },
        '@/features/content/server': server,
        '@/shared/i18n/locales': routes,
        '@/shared/i18n/portfolio': dictionary,
        '@/shared/ui/cn': { cn: (...values) => values.join(' ') },
        '@/shared/ui/text-link': { TextLink: (props) => jsx('a', props) },
    };
    const { PortfolioNavigation } = load('features/portfolio/navigation/portfolio-navigation.tsx', {
        ...common,
        react: {
            useEffect() {},
            useId: () => 'menu',
            useRef: () => ({ current: null }),
            useSyncExternalStore: (_, __, serverValue) => serverValue(),
        },
        '@/shared/animation/measured-track': { MeasuredTrack: leaf },
        '@/shared/styles/glass-surface': { GlassSurface: leaf },
        './portfolio-navigation.module.css': { default: {} },
    });
    const shell = load('features/portfolio/page-shell.tsx', {
        ...common,
        '@/shared/animation/cursor-boundary': { CursorBoundary: leaf },
        '@/shared/theme/theme-toggle': { ThemeToggle: leaf },
        '@/shared/ui/language-links': { LanguageLinks: leaf },
        './page-header': {
            PageHeader: (props) =>
                jsx(PortfolioNavigation, { ...props, activeKey: props.links[0]?.key ?? '' }),
        },
    });
    const hero = load('features/portfolio/home-hero.tsx', {
        ...common,
        '@/shared/ui/button': { Button: leaf },
        '@/shared/ui/status-label': { StatusLabel: leaf },
        './home-photo': { HomePhoto: leaf },
        './page-shell': shell,
    });
    const contentElements = {
        SectionHeading: leaf,
        ExperienceEntry: (props) => jsx('experience-entry', props),
        EducationEntry: (props) => jsx('education-entry', props),
    };
    const experience = load('features/portfolio/home-experience.tsx', {
        ...common,
        './page-shell': shell,
        './content-elements': contentElements,
    });
    const { PortfolioHome } = load('features/portfolio/portfolio-home.tsx', {
        ...common,
        './home-hero': hero,
        './home-about': { HomeAbout: () => jsx('section', { id: 'about' }) },
        './home-experience': experience,
        './page-shell': shell,
        './content-elements': contentElements,
        './contact-section': { ContactSection: () => jsx('section', { id: 'contact' }) },
        './cards': { ProjectCard: leaf },
        './project-display': { projectCardData: (record) => record },
    });
    function expand(node) {
        if (Array.isArray(node)) return node.map(expand);
        if (!node || typeof node !== 'object') return node;
        if (typeof node.type === 'function') return expand(node.type(node.props));
        return { ...node, props: { ...node.props, children: expand(node.props.children) } };
    }
    return {
        tree: expand(PortfolioHome({ locale })),
        copy: dictionary.getPortfolioDictionary(locale),
    };
}

function nodes(node, predicate, found = []) {
    if (Array.isArray(node)) for (const child of node) nodes(child, predicate, found);
    else if (node && typeof node === 'object') {
        if (predicate(node)) found.push(node);
        nodes(node.props.children, predicate, found);
    }
    return found;
}
const anchors = (tree) => nodes(tree, (node) => node.type === 'a');
function assertValidFragments(tree) {
    const ids = new Set(nodes(tree, (node) => node.props.id).map((node) => node.props.id));
    for (const anchor of anchors(tree)) {
        const href = anchor.props.href;
        if (href?.startsWith('#')) assert.ok(ids.has(href.slice(1)), href);
    }
}
function fixture(mutate) {
    const data = structuredClone(source);
    mutate(data);
    return data;
}

for (const locale of ['ru', 'en']) {
    test(`${locale}: populated content retains section order and native featured CTA`, () => {
        const { tree, copy } = render(source, locale);
        assert.deepEqual(
            nodes(tree, (node) => node.type === 'section').map((node) => node.props.id),
            ['home', 'work', 'about', 'experience', 'contact'],
        );
        const cta = anchors(tree).find((node) => node.props.children?.[0] === copy.explore);
        assert.equal(cta.props.href, '#work');
        assert.equal(cta.props['data-portfolio-route'], undefined);
        assertValidFragments(tree);
    });

    test(`${locale}: empty featured selection uses real catalogue routes in hero and navigation`, () => {
        const { tree, copy } = render(
            fixture((data) => {
                data.featuredSlugs = [];
            }),
            locale,
        );
        const routes = anchors(tree).filter((node) => node.props.href === `/${locale}/projects`);
        assert.equal(routes.length, 3, 'hero plus desktop/mobile navigation');
        for (const anchor of routes) {
            assert.equal(anchor.props['data-portfolio-route'], true);
            assert.equal(anchor.props['data-cursor'], 'page');
        }
        assert.ok(routes.some((node) => node.props.children?.[0] === copy.all));
        assertValidFragments(tree);
    });

    test(`${locale}: no projects or experience leaves no dead project/experience controls`, () => {
        const data = fixture((data) => {
            data.featuredSlugs = [];
            data.projects = [];
            data.experience = [];
            data.education = [];
            data.courses = [];
        });
        const { tree, copy } = render(data, locale);
        assert.ok(!nodes(tree, (node) => ['work', 'experience'].includes(node.props.id)).length);
        assert.ok(
            !anchors(tree).some((node) =>
                ['#work', '#experience', `/${locale}/projects`].includes(node.props.href),
            ),
        );
        assert.ok(
            !anchors(tree).some((node) =>
                [copy.explore, copy.all].includes(node.props.children?.[0]),
            ),
        );
        assertValidFragments(tree);
    });
}

test('missing/unpublished featured translations fall back only in the affected locale', () => {
    const data = fixture((data) => {
        const featured = data.projects.filter((project) =>
            data.featuredSlugs.includes(project.slug),
        );
        delete featured[0].translations.en;
        for (const project of featured.slice(1)) project.translations.en.published = false;
    });
    const english = render(data, 'en').tree;
    assert.equal(anchors(english).filter((node) => node.props.href === '/en/projects').length, 3);
    assertValidFragments(english);
    const russian = render(data, 'ru').tree;
    assert.ok(nodes(russian, (node) => node.props.id === 'work').length);
    assertValidFragments(russian);
});

test('projects published only in the other language do not expose a catalogue CTA', () => {
    const data = fixture((data) => {
        for (const project of data.projects) project.translations.en.published = false;
    });
    const { tree } = render(data, 'en');
    assert.ok(!anchors(tree).some((node) => ['#work', '/en/projects'].includes(node.props.href)));
    assertValidFragments(tree);
});

test('RU-only education/course records do not leave an empty EN experience section', () => {
    for (const group of ['education', 'courses']) {
        const data = fixture((data) => {
            data.experience = [];
            data.education = [];
            data.courses = [];
            data[group] = [
                {
                    id: 'ru-only',
                    year: '2028',
                    translations: { ru: { title: 'School', description: 'Studies' } },
                },
            ];
        });
        const english = render(data, 'en').tree;
        assert.equal(nodes(english, (node) => node.props.id === 'experience').length, 0);
        assert.ok(!anchors(english).some((node) => node.props.href === '#experience'));
        const russian = render(data, 'ru').tree;
        assert.equal(nodes(russian, (node) => node.props.id === 'experience').length, 1);
        assert.equal(nodes(russian, (node) => node.type === 'education-entry').length, 1);
        assertValidFragments(english);
        assertValidFragments(russian);
    }
});

test('absent profile retains the technical placeholder without section navigation', () => {
    const { tree } = render(
        fixture((data) => {
            data.profile = null;
        }),
        'en',
    );
    assert.equal(nodes(tree, (node) => node.type === 'main').length, 1);
    assert.equal(anchors(tree).length, 0);
});
