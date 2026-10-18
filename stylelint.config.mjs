/** @type {import('stylelint').Config} */
const config = {
    extends: ['stylelint-config-standard'],
    ignoreFiles: ['**/node_modules/**', '**/.next/**', '**/out/**', '**/build/**'],
    reportDescriptionlessDisables: true,
    reportInvalidScopeDisables: true,
    reportNeedlessDisables: true,
    reportUnscopedDisables: true,
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'theme',
                    'apply',
                    'utility',
                    'variant',
                    'custom-variant',
                    'source',
                    'reference',
                ],
            },
        ],
        'at-rule-prelude-no-invalid': [true, { ignoreAtRules: ['apply'] }],
        // Prettier owns whitespace; preserve the existing shadcn color notation.
        'at-rule-empty-line-before': null,
        'comment-empty-line-before': null,
        'custom-property-empty-line-before': null,
        'declaration-empty-line-before': null,
        'rule-empty-line-before': null,
        'declaration-block-single-line-max-declarations': null,
        'lightness-notation': 'number',
        'hue-degree-notation': 'number',
        'import-notation': 'string',
        // Immutable vendor names use a scoped disable on the nested :global() line.
        // Keep the authored owner outside that disable; never relax this pattern globally.
        'selector-class-pattern': '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
        'custom-property-pattern': '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
        'keyframes-name-pattern': '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
        // The root rule is depth 0; nested block at-rules also consume depth.
        'max-nesting-depth': 2,
        'selector-max-specificity': '0,3,1',
        'selector-max-id': 0,
        'declaration-no-important': true,
        'unit-no-unknown': true,
        'declaration-property-unit-allowed-list': [
            {
                'font-size': ['rem', 'em'],
                'line-height': [],
                'letter-spacing': ['em'],
            },
            // Fluid type may mix rem bounds and viewport units inside clamp().
            { ignore: ['inside-function'] },
        ],
    },
    overrides: [
        {
            files: ['**/*.module.css'],
            rules: {
                'selector-pseudo-class-no-unknown': [
                    true,
                    { ignorePseudoClasses: ['global', 'local'] },
                ],
                // Modules bypass the Tailwind loader and must remain native CSS.
                'at-rule-disallowed-list': [
                    'theme',
                    'apply',
                    'utility',
                    'variant',
                    'custom-variant',
                    'source',
                    'reference',
                    'config',
                    'plugin',
                    'import',
                ],
            },
        },
    ],
};

export default config;
