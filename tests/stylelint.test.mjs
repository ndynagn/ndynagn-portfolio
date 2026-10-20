import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import stylelint from 'stylelint';

const configFile = fileURLToPath(new URL('../stylelint.config.mjs', import.meta.url));

async function lint(code, filename = 'policy.css') {
    return stylelint.lint({
        code,
        codeFilename: fileURLToPath(new URL(`../src/${filename}`, import.meta.url)),
        configFile,
    });
}

function diagnostics(result) {
    return result.results.flatMap((file) => [
        ...file.warnings,
        ...file.invalidOptionWarnings,
        ...file.parseErrors,
    ]);
}

test('Tailwind directives and existing shadcn token notation are accepted', async () => {
    const result = await lint(`
        @import 'tailwindcss';
        @source './components';
        @reference './app/globals.css';
        @custom-variant expanded (&[data-expanded='true']);
        @theme inline {
            --color-background: var(--background);
        }
        :root {
            --background: oklch(0.145 0 0);
        }
        @utility content-auto {
            content-visibility: auto;
        }
        @layer base {
            body {
                @apply bg-background;
                @variant expanded {
                    opacity: 1;
                }
            }
        }
    `);

    assert.equal(result.errored, false, JSON.stringify(diagnostics(result)));
});

test('plain Modules accept owned vendor selectors, states, tokens and fluid type', async () => {
    const result = await lint(
        `
        @layer components {
            .card-surface {
                --card-surface-offset: 0px;
                padding: 1rem;
                color: var(--foreground);
                font-size: clamp(1.5rem, 1rem + 2vw, 3rem);
                line-height: 1.5;
                letter-spacing: -0.02em;
                &[data-expanded='true'] {
                    opacity: 1;
                }
            }
            .chart :global(.vendor-tooltip) {
                color: var(--foreground);
            }
            :local(.icon) {
                width: 1em;
            }
        }
        `,
        'card.module.css',
    );

    assert.equal(result.errored, false, JSON.stringify(diagnostics(result)));
});

test('vendor imports can stay below authored components and utilities', async () => {
    const result = await lint(`
        @layer theme, base, components, utilities;
        @import 'tailwindcss';
        @import 'vendor-package/styles.css' layer(components.vendor);
        @layer components {
            .chart { color: var(--foreground); }
        }
    `);

    // This proves accepted source syntax; browser verification owns cascade behavior.
    assert.equal(result.errored, false, JSON.stringify(diagnostics(result)));
});

test('depth counts from zero, including nested conditionals but not root at-rules', async (t) => {
    const cases = [
        ['root plus two nested rules', '.surface { .content { .action { opacity: 1; } } }', false],
        [
            'root layer adds no depth',
            '@layer components { .surface { .content { .action { opacity: 1; } } } }',
            false,
        ],
        [
            'root media query adds no depth',
            '@media (width >= 40rem) { .surface { .content { .action { opacity: 1; } } } }',
            false,
        ],
        [
            'nested media plus child reaches depth two',
            '.surface { @media (width >= 40rem) { .content { opacity: 1; } } }',
            false,
        ],
        [
            'third nested rule exceeds depth two',
            '.surface { .content { .action { &:hover { opacity: 1; } } } }',
            true,
        ],
        [
            'nested media does not reset depth',
            '.surface { .content { @media (width >= 40rem) { &:hover { opacity: 1; } } } }',
            true,
        ],
    ];

    for (const [name, code, rejected] of cases) {
        await t.test(name, async () => {
            const result = await lint(code, 'chart.module.css');
            assert.equal(result.errored, rejected, JSON.stringify(diagnostics(result)));
            if (rejected) {
                assert.ok(
                    diagnostics(result).some((warning) => warning.rule === 'max-nesting-depth'),
                );
            }
        });
    }
});

test('a vendor naming exception preserves authored owner and other rule checks', async () => {
    const code = `
        @layer components {
            .chart {
                /* stylelint-disable-next-line selector-class-pattern -- VendorChart public tooltip class is immutable; remove with the integration. */
                & :global(.VendorTooltip) {
                    color: var(--foreground);
                }
            }
        }
    `;
    const accepted = await lint(code, 'chart.module.css');
    assert.equal(accepted.errored, false, JSON.stringify(diagnostics(accepted)));

    const badOwner = await lint(code.replace('.chart {', '.BadOwner {'), 'chart.module.css');
    assert.equal(badOwner.errored, true);
    assert.ok(
        diagnostics(badOwner).some(
            (warning) =>
                warning.rule === 'selector-class-pattern' && warning.text.includes('BadOwner'),
        ),
    );

    const badProperty = await lint(code.replace('color:', 'colro:'), 'chart.module.css');
    assert.ok(diagnostics(badProperty).some((warning) => warning.rule === 'property-no-unknown'));
});

test('vendor names still require a necessary and explained exception', async () => {
    const withoutException = await lint(
        '.chart { & :global(.VendorTooltip) { color: var(--foreground); } }',
        'chart.module.css',
    );
    assert.ok(
        diagnostics(withoutException).some((warning) => warning.rule === 'selector-class-pattern'),
    );

    const unexplained = await lint(
        `.chart {
            /* stylelint-disable-next-line selector-class-pattern */
            & :global(.VendorTooltip) { color: var(--foreground); }
        }`,
        'chart.module.css',
    );
    assert.equal(unexplained.errored, true, JSON.stringify(diagnostics(unexplained)));

    const needless = await lint(
        `.chart {
            /* stylelint-disable-next-line selector-class-pattern -- Vendor API name. */
            & :global(.vendor-tooltip) { color: var(--foreground); }
        }`,
        'chart.module.css',
    );
    assert.equal(needless.errored, true, JSON.stringify(diagnostics(needless)));
});

test('syntax and policy violations remain errors', async (t) => {
    const cases = [
        ['.card { colro: red; }', 'property-no-unknown'],
        ['.card { width: 1rme; }', 'unit-no-unknown'],
        ['.card { color: red; color: blue; }', 'declaration-block-no-duplicate-properties'],
        ['.card {}', 'block-no-empty'],
        ['.card {} .card { color: red; }', 'no-duplicate-selectors'],
        ['.CardSurface { color: red; }', 'selector-class-pattern'],
        ['.card { --badName: 1rem; }', 'custom-property-pattern'],
        ['@keyframes BadName { to { opacity: 1; } }', 'keyframes-name-pattern'],
        ['.card { font-size: 16px; }', 'declaration-property-unit-allowed-list'],
        ['.card { line-height: 1.5rem; }', 'declaration-property-unit-allowed-list'],
        ['.card { letter-spacing: 1px; }', 'declaration-property-unit-allowed-list'],
        ['.card { padding: 0px; }', 'length-zero-no-unit'],
        ['#card { color: red; }', 'selector-max-id'],
        ['.a.b.c.d { color: red; }', 'selector-max-specificity'],
        ['.a { .b { .c { .d { opacity: 1; } } } }', 'max-nesting-depth'],
        ['.card { color: red !important; }', 'declaration-no-important'],
        ['@aply bg-background;', 'at-rule-no-unknown'],
        ['.card:globl(.vendor) { color: red; }', 'selector-pseudo-class-no-unknown'],
    ];

    for (const [code, rule] of cases) {
        await t.test(rule, async () => {
            const result = await lint(code, 'card.module.css');
            assert.equal(result.errored, true);
            assert.ok(
                diagnostics(result).some((warning) => warning.rule === rule),
                JSON.stringify(diagnostics(result)),
            );
        });
    }
});

test('Module-only pseudo-classes do not leak into global CSS', async () => {
    const result = await lint('.chart :global(.vendor-tooltip) { opacity: 1; }');
    assert.ok(
        diagnostics(result).some((warning) => warning.rule === 'selector-pseudo-class-no-unknown'),
    );
});

test('Modules cannot silently rely on Tailwind processing or global CSS imports', async () => {
    for (const code of ['.card { @apply p-4; }', "@import './app/globals.css';"]) {
        const result = await lint(code, 'card.module.css');
        assert.ok(
            diagnostics(result).some((warning) => warning.rule === 'at-rule-disallowed-list'),
        );
    }
});

test('necessary, explained accessibility exceptions pass and ineffective disables fail', async () => {
    const accepted = await lint(`
        @media (prefers-reduced-motion: reduce) {
            .card {
                /* stylelint-disable-next-line declaration-no-important -- Override inline motion for the OS preference. */
                animation-duration: 0.01ms !important;
            }
        }
    `);
    assert.equal(accepted.errored, false, JSON.stringify(diagnostics(accepted)));

    for (const code of [
        '/* stylelint-disable-next-line declaration-no-important */\n.card { color: red !important; }',
        '/* stylelint-disable-next-line declaration-no-important -- Unneeded exception. */\n.card { color: red; }',
        '/* stylelint-disable -- Too broad. */\n.card { color: red !important; }',
        '/* stylelint-disable-next-line missing-rule -- Invalid rule. */\n.card { color: red; }',
    ]) {
        const result = await lint(code);
        assert.equal(result.errored, true, code);
    }
});
