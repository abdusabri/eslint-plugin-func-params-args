'use strict';

const { cpSync, rmSync } = require('node:fs');
const { resolve } = require('node:path');

const root = resolve(__dirname, '..');
rmSync(resolve(root, 'dist'), { recursive: true, force: true });
cpSync(resolve(root, 'lib'), resolve(root, 'dist'), { recursive: true });
