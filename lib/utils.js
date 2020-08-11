/**
 * @fileoverview shared util functions & constants to be used in all rules
 * @author Abdulrahman (Abdu) Assabri
 */
'use strict';

function isOptionConfigured(options, key = '') {
  return options && key in options;
}

module.exports = {
  isOptionConfigured,
  BASE_URL:
    'https://github.com/abdusabri/eslint-plugin-func-params-args/blob/master/docs/rules/',
};
