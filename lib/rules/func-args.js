/**
 * @fileoverview Rule to control the number of arguments in function calls
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

const getFuncName = (node) => {
  switch (node.callee.type) {
    case 'MemberExpression':
      return node.callee.property.name;
    case 'Identifier':
      return node.callee.name;
  }
};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce the number of arguments used in a function call',
      url: BASE_URL + 'func-args.md',
    },
    schema: [
      {
        type: 'object',
        properties: {
          global: {
            type: 'integer',
            minimum: -1,
          },
        },
        additionalProperties: { type: 'integer', minimum: -1 },
      },
    ],
    messages: {
      exceed:
        '{{name}} has been called with too many arguments ({{count}}). Maximum allowed is ({{max}}).',
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

    function checkFuncArgs(node, funcName, limit) {
      if (limit >= 0 && node.arguments.length > limit) {
        report(node, {
          name: funcName,
          count: node.arguments.length,
          max: limit,
        });
      }
    }

    return {
      CallExpression(node) {
        const funcName = getFuncName(node);
        let limit = -1;

        if (isOptionConfigured(options, funcName)) {
          limit = options[funcName];
        } else if (isOptionConfigured(options, 'global')) {
          limit = options.global;
        }

        checkFuncArgs(node, funcName, limit);
      },
    };
  },
};
