/**
 * @fileoverview Shared test utilities for ESLint rule tests
 * @author Abdulrahman (Abdu) Assabri
 */
'use strict';

const { RuleTester } = require('eslint');

/**
 * Detects the major version of ESLint being used
 * @returns {number} The major version number
 */
function getEslintMajorVersion() {
  const eslintVersion = require('eslint/package.json').version;
  return parseInt(eslintVersion.split('.')[0], 10);
}

/**
 * Check if ESLint version is 9 or later (uses flat config format)
 * @returns {boolean}
 */
function isEslint9OrLater() {
  return getEslintMajorVersion() >= 9;
}

/**
 * Creates a RuleTester configuration object compatible with both ESLint 8 and 9.
 *
 * ESLint 8 uses eslintrc format (parser string, parserOptions)
 * ESLint 9 uses flat config format (languageOptions.parser object)
 *
 * @param {Object} options - Configuration options
 * @param {number} [options.ecmaVersion=2022] - ECMAScript version
 * @param {string|null} [options.parser=null] - Parser module path (for ESLint 8) or parser object (for ESLint 9)
 * @returns {Object} RuleTester configuration object
 */
function createRuleTesterConfig(options = {}) {
  const { ecmaVersion = 2022, parser = null } = options;

  if (isEslint9OrLater()) {
    const config = {
      languageOptions: {
        ecmaVersion,
      },
    };
    if (parser) {
      config.languageOptions.parser = require(parser);
    }
    return config;
  }

  // ESLint 8 format
  const config = {
    parserOptions: { ecmaVersion },
  };
  if (parser) {
    config.parser = require.resolve(parser);
  }
  return config;
}

/**
 * Creates a configured RuleTester instance compatible with both ESLint 8 and 9.
 *
 * @param {Object} options - Configuration options
 * @param {number} [options.ecmaVersion=2022] - ECMAScript version
 * @param {string|null} [options.parser=null] - Parser module name (e.g., '@typescript-eslint/parser')
 * @returns {RuleTester} Configured RuleTester instance
 */
function createRuleTester(options = {}) {
  return new RuleTester(createRuleTesterConfig(options));
}

module.exports = {
  createRuleTester,
};
