/**
 * @fileoverview Rule to control the number of parameters in function definitions and expressions
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

function mapTypeToConfigKey(type) {
  switch (type) {
    case "FunctionDeclaration":
      return "funcDefinition";

    case "ArrowFunctionExpression":
      return "arrowFuncExpression";

    case "FunctionExpression":
      return "funcExpression";

    default:
      return "";
  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "enforce the number of parameters used in a function definition or expression",
      url: BASE_URL + "func-params.md",
    },
    schema: [
      {
        type: "object",
        properties: {
          global: {
            type: "integer",
          },
          funcDefinition: {
            type: "integer",
          },
          funcExpression: {
            type: "integer",
          },
          arrowFuncExpression: {
            type: "integer",
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      exceed:
        "function has too many params ({{count}}). Maximum allowed is ({{max}}).",
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

    function isConfiguredType(configKey) {
      return configKey && options[configKey];
    }

    function isGlobalOptionSet() {
      return options.global >= 0;
    }

    function checkFuncParams(node, limit) {
      if (node.params.length > limit) {
        report(node, {
          count: node.params.length,
          max: limit,
        });
      }
    }

    function processNode(node) {
      console.log(node.type);
      const configKey = mapTypeToConfigKey(node.type);
      console.log(configKey);
      let limit;

      if (isConfiguredType(configKey)) {
        limit = options[configKey];
      } else if (isGlobalOptionSet()) {
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
