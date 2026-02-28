'use strict';

const eslintPlugin = require('eslint-plugin-eslint-plugin');

module.exports = [
  {
    files: ['lib/rules/*.js'],
    ...eslintPlugin.configs['flat/rules-recommended'],
  },
  {
    files: ['tests/lib/rules/*.js'],
    ...eslintPlugin.configs['flat/tests-recommended'],
  },
];
