import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

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
