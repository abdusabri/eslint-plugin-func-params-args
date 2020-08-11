/**
 * @fileoverview Rule to control the number of parameters in function definitions and expressions
 * @author Abdulrahman (Abdu) Assabri
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { BASE_URL, isOptionConfigured } = require('../utils');

// ------------------------------------------------------------------------------
//   Helpers
// ------------------------------------------------------------------------------

function mapTypeToConfigKey(type) {
  switch (type) {
    case 'FunctionDeclaration':
      return 'funcDefinition';

    case 'ArrowFunctionExpression':
      return 'arrowFuncExpression';

    case 'FunctionExpression':
      return 'funcExpression';
  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'enforce the number of parameters used in a function definition or expression',
      url: BASE_URL + 'func-params.md',
    },
    schema: [
      {
        type: 'object',
        properties: {
          global: {
            type: 'integer',
            minimum: 0,
          },
          funcDefinition: {
            type: 'integer',
            minimum: 0,
          },
          funcExpression: {
            type: 'integer',
            minimum: 0,
          },
          arrowFuncExpression: {
            type: 'integer',
            minimum: 0,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      exceed:
        'function has too many params ({{count}}). Maximum allowed is ({{max}}).',
    },
  },
  create(context) {
    const options = context.options[0] || {};

    function report(node, data) {
      context.report({
        node,
        messageId: 'exceed',
        data,
      });
    }

    function checkFuncParams(node, limit) {
      if (limit >= 0 && node.params.length > limit) {
        report(node, {
          count: node.params.length,
          max: limit,
        });
      }
    }

    function processNode(node) {
      const configKey = mapTypeToConfigKey(node.type);
      let limit;

      if (isOptionConfigured(options, configKey)) {
        limit = options[configKey];
      } else if (isOptionConfigured(options, 'global')) {
        limit = options.global;
      }

      checkFuncParams(node, limit);
    }

    return {
      FunctionDeclaration: processNode,
      ArrowFunctionExpression: processNode,
      FunctionExpression: processNode,
    };
  },
};
