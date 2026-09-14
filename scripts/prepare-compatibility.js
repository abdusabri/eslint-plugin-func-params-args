'use strict';

const {
  appendFileSync,
  cpSync,
  mkdtempSync,
  writeFileSync,
} = require('node:fs');
const { tmpdir } = require('node:os');
const { resolve, join } = require('node:path');
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const pkg = require('../package.json');

const eslint = process.env.ESLINT_VERSION;
assert.match(eslint || '', /^\d+(\.\d+\.\d+)?$/);
const root = resolve(__dirname, '..');
const directory = mkdtempSync(join(tmpdir(), 'func-compatibility-'));
for (const path of ['lib', 'tests']) {
  cpSync(resolve(root, path), join(directory, path), { recursive: true });
}
writeFileSync(
  join(directory, 'package.json'),
  JSON.stringify({
    name: pkg.name,
    version: pkg.version,
    private: true,
    dependencies: {
      ...pkg.dependencies,
      eslint,
      '@typescript-eslint/parser':
        pkg.devDependencies['@typescript-eslint/parser'],
      typescript: pkg.devDependencies.typescript,
      // Mocha 12 requires Node 20.19+. Retain Mocha 11 only for Node 20.9 tests.
      mocha:
        process.env.MINIMUM_NODE === 'true'
          ? '^11.0.0'
          : pkg.devDependencies.mocha,
    },
  }),
);
execFileSync(
  'npm',
  ['install', '--ignore-scripts', '--no-audit', '--no-fund'],
  {
    cwd: directory,
    stdio: 'inherit',
  },
);
const installed = require(
  join(directory, 'node_modules/eslint/package.json'),
).version;
assert.equal(installed.split('.')[0], eslint.split('.')[0]);
if (eslint.includes('.')) assert.equal(installed, eslint);
console.log(`Compatibility environment: ${directory}; ESLint ${installed}`);
if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `directory=${directory}\n`);
}
