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

    if (Object.keys(options).length === 0) {
      return;
    }

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

    function checkFuncArgs(node, funcName) {
      if (node.arguments.length > options[funcName]) {
        report(node, {
          name: funcName,
          count: node.arguments.length,
          max: options[funcName],
        });
      }
    }

    return {
      CallExpression(node) {
        const funcName = getFuncName(node);

        if (isConfiguredFuncCall(funcName)) {
          checkFuncArgs(node, funcName);
        }
      },
    };
  },
};
