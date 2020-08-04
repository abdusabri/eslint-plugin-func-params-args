/**
 * @fileoverview Tests for func-params rule
 * @author Abdulrahman (Abdu) Assabri
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/func-params"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = { ecmaVersion: 6 };

var ruleTester = new RuleTester();
ruleTester.run("func-params", rule, {
  valid: [
    "function test(param1) {}",
    "a = (param1) => {};",
    "b = function(param1) {};",
    "c.forEach((param1) => {});",
  ]
    .map((code) => ({
      code,
      options: [{ global: 1 }],
      parserOptions,
    }))
    .concat(
      [
        "function test(param1, param2, param3, param4, param5) {}",
        "a = (param1, param2, param3, param4, param5) => {};",
        "b = function(param1, param2, param3, param4, param5) {};",
        "c.forEach((param1, param2, param3, param4, param5) => {});",
      ].map((code) => ({
        code,
        parserOptions,
      }))
    )
    .concat(
      [
        "function test(param1, param2) {}",
        "a = (param1) => {};",
        "b = function(param1) {};",
        "c.forEach((param1) => {});",
      ].map((code) => ({
        code,
        options: [{ global: 1, funcDefinition: 2 }],
        parserOptions,
      }))
    )
    .concat(
      [
        "function test(param1) {}",
        "a = (param1) => {};",
        "b = function(param1, param2) {};",
        "c.forEach((param1) => {});",
      ].map((code) => ({
        code,
        options: [{ global: 1, funcExpression: 2 }],
        parserOptions,
      }))
    )
    .concat(
      [
        "function test(param1) {}",
        "a = (param1, param2) => {};",
        "b = function(param1) {};",
        "c.forEach((param1, param2) => {});",
      ].map((code) => ({
        code,
        options: [{ global: 1, arrowFuncExpression: 2 }],
        parserOptions,
      }))
    )
    .concat(
      [
        "function test(param1, param2) {}",
        "a = (param1, param2, param3, param4) => {};",
        "b = function(param1, param2, param3) {};",
        "c.reduce((param1, param2, param3, param4) => {});",
      ].map((code) => ({
        code,
        options: [
          {
            global: 1,
            funcDefinition: 2,
            funcExpression: 3,
            arrowFuncExpression: 4,
          },
        ],
        parserOptions,
      }))
    ),

  invalid: [
    {
      code: "function test(param1, param2) {}",
      options: [{ global: 1 }],
      errors: [
        {
          type: "FunctionDeclaration",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "a = (param1, param2) => {};",
      options: [{ global: 1 }],
      parserOptions,
      errors: [
        {
          type: "ArrowFunctionExpression",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "b = function(param1, param2) {};",
      options: [{ global: 1 }],
      errors: [
        {
          type: "FunctionExpression",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "c.forEach((param1, param2) => {});",
      options: [{ global: 1 }],
      parserOptions,
      errors: [
        {
          type: "ArrowFunctionExpression",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "function test(param1, param2, param3) {}",
      options: [{ global: 1, funcDefinition: 2 }],
      errors: [
        {
          type: "FunctionDeclaration",
          message: "function has too many params (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: "a = (param1, param2) => {};",
      options: [{ global: 1, funcDefinition: 2 }],
      parserOptions,
      errors: [
        {
          type: "ArrowFunctionExpression",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "b = function(param1, param2) {};",
      options: [{ global: 1, funcDefinition: 2 }],
      errors: [
        {
          type: "FunctionExpression",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "c.forEach((param1, param2) => {});",
      options: [{ global: 1, funcDefinition: 2 }],
      parserOptions,
      errors: [
        {
          type: "ArrowFunctionExpression",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "function test(param1, param2) {}",
      options: [{ global: 1, funcExpression: 2 }],
      errors: [
        {
          type: "FunctionDeclaration",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "a = (param1, param2) => {};",
      options: [{ global: 1, funcExpression: 2 }],
      parserOptions,
      errors: [
        {
          type: "ArrowFunctionExpression",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "b = function(param1, param2, param3) {};",
      options: [{ global: 1, funcExpression: 2 }],
      errors: [
        {
          type: "FunctionExpression",
          message: "function has too many params (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: "c.forEach((param1, param2) => {});",
      options: [{ global: 1, funcExpression: 2 }],
      parserOptions,
      errors: [
        {
          type: "ArrowFunctionExpression",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "function test(param1, param2) {}",
      options: [{ global: 1, arrowFuncExpression: 2 }],
      errors: [
        {
          type: "FunctionDeclaration",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "a = (param1, param2, param3) => {};",
      options: [{ global: 1, arrowFuncExpression: 2 }],
      parserOptions,
      errors: [
        {
          type: "ArrowFunctionExpression",
          message: "function has too many params (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: "b = function(param1, param2) {};",
      options: [{ global: 1, arrowFuncExpression: 2 }],
      errors: [
        {
          type: "FunctionExpression",
          message: "function has too many params (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "c.forEach((param1, param2, param3) => {});",
      options: [{ global: 1, arrowFuncExpression: 2 }],
      parserOptions,
      errors: [
        {
          type: "ArrowFunctionExpression",
          message: "function has too many params (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: "function test(param1, param2, param3) {}",
      options: [
        {
          global: 1,
          funcDefinition: 2,
          funcExpression: 3,
          arrowFuncExpression: 4,
        },
      ],
      errors: [
        {
          type: "FunctionDeclaration",
          message: "function has too many params (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: "a = (param1, param2, param3, param4, param5) => {};",
      options: [
        {
          global: 1,
          funcDefinition: 2,
          funcExpression: 3,
          arrowFuncExpression: 4,
        },
      ],
      parserOptions,
      errors: [
        {
          type: "ArrowFunctionExpression",
          message: "function has too many params (5). Maximum allowed is (4).",
        },
      ],
    },
    {
      code: "b = function(param1, param2, param3, param4) {};",
      options: [
        {
          global: 1,
          funcDefinition: 2,
          funcExpression: 3,
          arrowFuncExpression: 4,
        },
      ],
      errors: [
        {
          type: "FunctionExpression",
          message: "function has too many params (4). Maximum allowed is (3).",
        },
      ],
    },
    {
      code: "c.reduce((param1, param2, param3, param4, param5) => {});",
      options: [
        {
          global: 1,
          funcDefinition: 2,
          funcExpression: 3,
          arrowFuncExpression: 4,
        },
      ],
      parserOptions,
      errors: [
        {
          type: "ArrowFunctionExpression",
          message: "function has too many params (5). Maximum allowed is (4).",
        },
      ],
    },
  ],
});
