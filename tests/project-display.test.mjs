import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const exports = {};
const { outputText } = ts.transpileModule(
    readFileSync(new URL('../src/features/portfolio/project-display.ts', import.meta.url), 'utf8'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
);
runInNewContext(outputText, {
    exports,
    require: () => ({ projectPath: (locale, slug) => `/${locale}/projects/${slug}` }),
});
const source = JSON.parse(
    readFileSync(new URL('../src/features/content/portfolio.json', import.meta.url)),
);

test('localized gallery data omits empty groups, missing translations and missing image copy', () => {
    const project = structuredClone(source.projects[0]);
    const record = { project, translation: project.translations.en };
    assert.equal(
        exports.projectGalleryGroups(record, 'en').flatMap((group) => group.images).length,
        10,
    );
    delete project.gallery[0].translations.en;
    delete project.gallery[1].images[0].translations.en;
    let groups = exports.projectGalleryGroups(record, 'en');
    assert.equal(groups.length, 1);
    assert.equal(groups[0].images.length, 4);
    assert.ok(groups[0].images.every((image) => image.lightboxCaption.startsWith('OneTouch PRO')));
    assert.equal(
        exports.projectGalleryGroups(record, 'ru').flatMap((group) => group.images).length,
        10,
    );
    project.gallery[1].images = [];
    assert.equal(exports.projectGalleryGroups(record, 'en').length, 0);
    project.gallery = [];
    groups = exports.projectGalleryGroups(record, 'ru');
    assert.equal(groups.length, 0);
});
