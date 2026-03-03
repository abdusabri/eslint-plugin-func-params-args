import eslintPlugin from 'eslint-plugin-eslint-plugin';

export default [
  {
    files: ['lib/rules/*.js'],
    ...eslintPlugin.configs['rules-recommended'],
  },
  {
    files: ['tests/lib/rules/*.js'],
    ...eslintPlugin.configs['tests-recommended'],
  },
];
