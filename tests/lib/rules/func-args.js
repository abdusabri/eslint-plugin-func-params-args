/**
 * @fileoverview Tests for func-args rule
 * @author Abdulrahman (Abdu) Assabri
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/func-args"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const options = [{ foo: 3, bar: 2, global: 1 }];

var ruleTester = new RuleTester();
ruleTester.run("func-args", rule, {
  valid: [
    "foo('arg1');",
    "a.foo('arg1');",
    "foo('arg1', 'arg2');",
    "a.foo('arg1', 'arg2');",
    "foo('arg1', 'arg2', arg3);",
    "a.foo('arg1', 'arg2', arg3);",
    "bar('arg1');",
    "a.bar('arg1');",
    "bar('arg1', 'arg2');",
    "a.bar('arg1', 'arg2');",
    "baz('arg1');",
    "a.baz('arg1');",
  ]
    .map((code) => ({
      code,
      options,
    }))
    .concat(
      ["baz('arg1', arg2);", "a.baz('arg1', arg2);"].map((code) => ({
        // these cases would be invalid if a global limit is set (covered in the invalid cases below)
        code,
        options: [{ foo: 3, bar: 2 }],
      }))
    )
    .concat([
      "foo('arg1','arg2','arg3','arg4','arg5');",
      "a.foo('arg1','arg2','arg3','arg4','arg5');",
    ]),

  invalid: [
    {
      code: "foo('arg1', 'arg2', arg3, arg4);",
      options,
      errors: [
        {
          type: "CallExpression",
          message:
            "foo has been called with too many arguments (4). Maximum allowed is (3).",
        },
      ],
    },
    {
      code: "a.foo('arg1', 'arg2', arg3, arg4);",
      options,
      errors: [
        {
          type: "CallExpression",
          message:
            "foo has been called with too many arguments (4). Maximum allowed is (3).",
        },
      ],
    },
    {
      code: "foo('arg1', 'arg2', arg3, arg4, arg5);",
      options,
      errors: [
        {
          type: "CallExpression",
          message:
            "foo has been called with too many arguments (5). Maximum allowed is (3).",
        },
      ],
    },
    {
      code: "a.foo('arg1', 'arg2', arg3, arg4, arg5);",
      options,
      errors: [
        {
          type: "CallExpression",
          message:
            "foo has been called with too many arguments (5). Maximum allowed is (3).",
        },
      ],
    },
    {
      code: "bar('arg1', 'arg2', arg3);",
      options,
      errors: [
        {
          type: "CallExpression",
          message:
            "bar has been called with too many arguments (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: "a.bar('arg1', 'arg2', arg3);",
      options,
      errors: [
        {
          type: "CallExpression",
          message:
            "bar has been called with too many arguments (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: "bar('arg1', 'arg2', arg3, arg4);",
      options,
      errors: [
        {
          type: "CallExpression",
          message:
            "bar has been called with too many arguments (4). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: "a.bar('arg1', 'arg2', arg3, arg4);",
      options,
      errors: [
        {
          type: "CallExpression",
          message:
            "bar has been called with too many arguments (4). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: "baz('arg1', arg2);",
      options,
      errors: [
        {
          type: "CallExpression",
          message:
            "baz has been called with too many arguments (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: "a.baz('arg1', arg2);",
      options,
      errors: [
        {
          type: "CallExpression",
          message:
            "baz has been called with too many arguments (2). Maximum allowed is (1).",
        },
      ],
    },
  ],
});
