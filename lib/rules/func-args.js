/**
 * @fileoverview Rule to control the number of arguments in function calls
 * @author Abdulrahman (Abdu) Assabri
 */
"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { BASE_URL } = require("../base-url");

// ------------------------------------------------------------------------------
//   Helpers
// ------------------------------------------------------------------------------

const getFuncName = (node) => {
  switch (node.callee.type) {
    case "MemberExpression":
      return node.callee.property.name;
    case "Identifier":
      return node.callee.name;
    default:
      return "";
  }
};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "error",
    docs: {
      description: "enforce the number of arguments used in a function call",
      url: BASE_URL + "func-args.md",
    },
    schema: [
      {
        type: "object",
        properties: {
          global: {
            type: "integer",
          },
        },
        additionalProperties: { type: "integer" },
      },
    ],
    messages: {
      exceed:
        "{{name}} has been called with too many arguments ({{count}}). Maximum allowed is ({{max}}).",
    },
  },
  create(context) {
    const options = context.options[0] || {};

    function report(node, data) {
      context.report({
        node,
        messageId: "exceed",
        data,
      });
    }

    function isConfiguredFuncCall(funcName) {
      return funcName && options[funcName];
    }

    function isGlobalOptionSet() {
      return options.global >= 0;
    }

    function checkFuncArgs(node, funcName, limit) {
      if (node.arguments.length > limit) {
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
        let limit;

        if (isConfiguredFuncCall(funcName)) {
          limit = options[funcName];
        } else if (isGlobalOptionSet()) {
          limit = options.global;
        }

        checkFuncArgs(node, funcName, limit);
      },
    };
  },
};
