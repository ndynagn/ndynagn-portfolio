import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const require = createRequire(import.meta.url);
const [mode, ...paths] = process.argv.slice(2);

if (mode !== '--write' && mode !== '--check') {
    throw new Error('Expected --write or --check.');
}

const result = spawnSync(
    process.execPath,
    [require.resolve('prettier/bin/prettier.cjs'), mode, ...(paths.length ? paths : ['.'])],
    { stdio: 'inherit' },
);

if (result.error) {
    throw result.error;
}

process.exitCode = result.status ?? 1;
