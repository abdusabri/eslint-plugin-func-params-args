/**
 * @fileoverview Rule to control the number of parameters in function definitions and expressions
 * @author Abdulrahman (Abdu) Assabri
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { BASE_URL, isOptionConfigured } = require('../utils');

const utils = require('eslint-utils');

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

    case 'TSFunctionType':
      return 'funcTypeAnnotation';
  }
}

function getFunctionNameWithKind(node) {
  if (node.type === 'TSFunctionType') {
    if (node?.parent?.type === 'TSTypeAliasDeclaration')
      return `function '${node.parent.id.name}'`;
    if (node?.parent?.parent?.key?.name)
      return `function '${node.parent.parent.key.name}'`;
  }

  return utils.getFunctionNameWithKind(node);
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
            minimum: -1,
          },
          funcDefinition: {
            type: 'integer',
            minimum: -1,
          },
          funcExpression: {
            type: 'integer',
            minimum: -1,
          },
          arrowFuncExpression: {
            type: 'integer',
            minimum: -1,
          },
          funcTypeAnnotation: {
            type: 'integer',
            minimum: -1,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      exceed:
        '{{name}} has too many parameters ({{count}}). Maximum allowed is ({{max}}).',
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
          name: getFunctionNameWithKind(node),
        });
      }
    }

    function processNode(node) {
      const configKey = mapTypeToConfigKey(node.type);
      let limit = -1;

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
      TSFunctionType: processNode,
    };
  },
};
