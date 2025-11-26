/**
 * @fileoverview Tests for func-params rule
 * @author Abdulrahman (Abdu) Assabri
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/func-params');
var { createRuleTester } = require('../test-utils');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = createRuleTester({ parser: '@typescript-eslint/parser' });
ruleTester.run('func-params', rule, {
  valid: [
    'function test(param1) {}',
    'a = (param1) => {};',
    'b = function(param1) {};',
    'c.forEach((param1) => {});',
    `interface IFoo {
      onBar: (param1:string) => void;
    }`,
    `type FooType = {
      onBar: (param1:number) => void;
    }`,
    'type onBarFn = (param1:number) => void;',
  ]
    .map((code) => ({
      code,
      options: [{ global: 1 }],
    }))
    .concat(
      [
        'function test(param1, param2, param3, param4, param5) {}',
        'a = (param1, param2, param3, param4, param5) => {};',
        'b = function(param1, param2, param3, param4, param5) {};',
        'c.forEach((param1, param2, param3, param4, param5) => {});',
        `interface IFoo {
          onBar: (param1:string, param2:string, param3:string, param4:string, param5:string) => void;
        }`,
        `type FooType = {
          onBar: (param1:number, param2:number, param3:number, param4:number, param5:number) => void;
        }`,
        'type onBarFn = (param1:number, param2:number, param3:number, param4:number, param5:number) => void;',
      ].map((code) => ({
        code,
      })),
    )
    .concat(
      [
        'function test(param1, param2) {}',
        'a = (param1) => {};',
        'b = function(param1) {};',
        'c.forEach((param1) => {});',
        `interface IFoo {
          onBar: (param1:string) => void;
        }`,
        `type FooType = {
          onBar: (param1:number) => void;
        }`,
        'type onBarFn = (param1:number) => void;',
      ].map((code) => ({
        code,
        options: [{ global: 1, funcDefinition: 2 }],
      })),
    )
    .concat(
      [
        'function test(param1) {}',
        'a = (param1) => {};',
        'b = function(param1, param2) {};',
        'c.forEach((param1) => {});',
        `interface IFoo {
          onBar: (param1:string) => void;
        }`,
        `type FooType = {
          onBar: (param1:number) => void;
        }`,
        'type onBarFn = (param1:number) => void;',
      ].map((code) => ({
        code,
        options: [{ global: 1, funcExpression: 2 }],
      })),
    )
    .concat(
      [
        'function test(param1) {}',
        'a = (param1, param2) => {};',
        'b = function(param1) {};',
        'c.forEach((param1, param2) => {});',
        `interface IFoo {
          onBar: (param1:string) => void;
        }`,
        `type FooType = {
          onBar: (param1:number) => void;
        }`,
        'type onBarFn = (param1:number) => void;',
      ].map((code) => ({
        code,
        options: [{ global: 1, arrowFuncExpression: 2 }],
      })),
    )
    .concat(
      [
        'function test(param1) {}',
        'a = (param1) => {};',
        'b = function(param1) {};',
        'c.forEach((param1) => {});',
        `interface IFoo {
          onBar: (param1:string, param2:string) => void;
        }`,
        `type FooType = {
          onBar: (param1:number, param2:number) => void;
        }`,
        'type onBarFn = (param1:number, param2:number) => void;',
      ].map((code) => ({
        code,
        options: [{ global: 1, funcTypeAnnotation: 2 }],
      })),
    )
    .concat(
      [
        'function test(param1, param2) {}',
        'a = (param1, param2, param3, param4) => {};',
        'b = function(param1, param2, param3) {};',
        'c.reduce((param1, param2, param3, param4) => {});',
        `interface IFoo {
          onBar: () => void;
        }`,
        `type FooType = {
          onBar: () => void;
        }`,
        'type onBarFn = () => void;',
      ].map((code) => ({
        code,
        options: [
          {
            global: 1,
            funcDefinition: 2,
            funcExpression: 3,
            arrowFuncExpression: 4,
            funcTypeAnnotation: 0,
          },
        ],
      })),
    )
    .concat(
      [
        'function foo(param1) {}',
        'a = function (param1, param2) {};',
        'b = (param1, param2, param3, param4, param5) => {};',
        'c = () => {};',
        'c.reduce((param1, param2, param3, param4) => {});',
        `interface IFoo {
          onBar: (param1:string, param2:string, param3:string, param4:string, param5:string) => void;
        }`,
        `type FooType = {
          onBar: (param1:number, param2:number, param3:number, param4:number, param5:number) => void;
        }`,
        'type onBarFn = (param1:number, param2:number, param3:number, param4:number, param5:number) => void;',
      ].map((code) => ({
        code,
        options: [
          {
            funcDefinition: 1,
            funcExpression: 2,
          },
        ],
      })),
    )
    .concat(
      [
        'function foo(param1, param2) {}',
        'a = function () {};',
        'b = (param1, param2, param3) => {};',
        'c = () => {};',
        'c.reduce((param1, param2, param3, param4) => {});',
        `interface IFoo {
          onBar: (param1:string, param2:string, param3:string, param4:string, param5:string) => void;
        }`,
        `type FooType = {
          onBar: (param1:number, param2:number, param3:number, param4:number, param5:number) => void;
        }`,
        'type onBarFn = (param1:number, param2:number, param3:number, param4:number, param5:number) => void;',
      ].map((code) => ({
        code,
        options: [
          {
            funcExpression: 0,
          },
        ],
      })),
    )
    .concat(
      [
        'function foo(param1) {}',
        'a = function () {};',
        'b = (param1, param2, param3) => {};',
        'c = () => {};',
        'c.reduce((param1, param2, param3, param4) => {});',
        `interface IFoo {
          onBar: (param1:string) => void;
        }`,
        `type FooType = {
          onBar: (param1:number) => void;
        }`,
        'type onBarFn = (param1:number) => void;',
      ].map((code) => ({
        code,
        options: [
          {
            global: 1,
            arrowFuncExpression: -1,
          },
        ],
      })),
    )
    .concat(
      [
        'function foo(param1) {}',
        'a = function () {};',
        'b = (param1) => {};',
        'c = () => {};',
        'c.reduce((param1) => {});',
        `interface IFoo {
          onBar: (param1:string, param2:string, param3:string, param4:string, param5:string) => void;
        }`,
        `type FooType = {
          onBar: (param1:number, param2:number, param3:number, param4:number, param5:number) => void;
        }`,
        'type onBarFn = (param1:number, param2:number, param3:number, param4:number, param5:number) => void;',
      ].map((code) => ({
        code,
        options: [
          {
            global: 1,
            funcTypeAnnotation: -1,
          },
        ],
      })),
    ),

  invalid: [
    {
      code: 'function test(param1, param2) {}',
      options: [{ global: 1 }],
      errors: [
        {
          type: 'FunctionDeclaration',
          message:
            "function 'test' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'a = (param1, param2) => {};',
      options: [{ global: 1 }],
      errors: [
        {
          type: 'ArrowFunctionExpression',
          message:
            "arrow function 'a' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'b = function(param1, param2) {};',
      options: [{ global: 1 }],
      errors: [
        {
          type: 'FunctionExpression',
          message:
            "function 'b' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'c.forEach((param1, param2) => {});',
      options: [{ global: 1 }],
      errors: [
        {
          type: 'ArrowFunctionExpression',
          message:
            'arrow function has too many parameters (2). Maximum allowed is (1).',
        },
      ],
    },
    {
      code: `interface IFoo {
        onBar: (param1:string, param1:string) => void;
      }`,
      options: [{ global: 1 }],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBar' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'type onBarFn = (param1:string, param1:string) => void;',
      options: [{ global: 1 }],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBarFn' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'function test(param1, param2, param3) {}',
      options: [{ global: 1, funcDefinition: 2 }],
      errors: [
        {
          type: 'FunctionDeclaration',
          message:
            "function 'test' has too many parameters (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: 'a = (param1, param2) => {};',
      options: [{ global: 1, funcDefinition: 2 }],
      errors: [
        {
          type: 'ArrowFunctionExpression',
          message:
            "arrow function 'a' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'b = function(param1, param2) {};',
      options: [{ global: 1, funcDefinition: 2 }],
      errors: [
        {
          type: 'FunctionExpression',
          message:
            "function 'b' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'c.forEach((param1, param2) => {});',
      options: [{ global: 1, funcDefinition: 2 }],
      errors: [
        {
          type: 'ArrowFunctionExpression',
          message:
            'arrow function has too many parameters (2). Maximum allowed is (1).',
        },
      ],
    },
    {
      code: 'function test(param1, param2) {}',
      options: [{ global: 1, funcExpression: 2 }],
      errors: [
        {
          type: 'FunctionDeclaration',
          message:
            "function 'test' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'a = (param1, param2) => {};',
      options: [{ global: 1, funcExpression: 2 }],
      errors: [
        {
          type: 'ArrowFunctionExpression',
          message:
            "arrow function 'a' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'b = function(param1, param2, param3) {};',
      options: [{ global: 1, funcExpression: 2 }],
      errors: [
        {
          type: 'FunctionExpression',
          message:
            "function 'b' has too many parameters (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: 'c.forEach((param1, param2) => {});',
      options: [{ global: 1, funcExpression: 2 }],
      errors: [
        {
          type: 'ArrowFunctionExpression',
          message:
            'arrow function has too many parameters (2). Maximum allowed is (1).',
        },
      ],
    },
    {
      code: `interface IFoo {
        onBar: (param1:string, param2:string) => void;
      }`,
      options: [{ global: 1, funcExpression: 2 }],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBar' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'type onBarFn = (param1:string, param2:string) => void;',
      options: [{ global: 1, funcExpression: 2 }],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBarFn' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'function test(param1, param2) {}',
      options: [{ global: 1, arrowFuncExpression: 2 }],
      errors: [
        {
          type: 'FunctionDeclaration',
          message:
            "function 'test' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'a = (param1, param2, param3) => {};',
      options: [{ global: 1, arrowFuncExpression: 2 }],
      errors: [
        {
          type: 'ArrowFunctionExpression',
          message:
            "arrow function 'a' has too many parameters (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: 'b = function(param1, param2) {};',
      options: [{ global: 1, arrowFuncExpression: 2 }],
      errors: [
        {
          type: 'FunctionExpression',
          message:
            "function 'b' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'c.forEach((param1, param2, param3) => {});',
      options: [{ global: 1, arrowFuncExpression: 2 }],
      errors: [
        {
          type: 'ArrowFunctionExpression',
          message:
            'arrow function has too many parameters (3). Maximum allowed is (2).',
        },
      ],
    },
    {
      code: `interface IFoo {
        onBar: (param1:string, param2:string) => void;
      }`,
      options: [{ global: 1, arrowFuncExpression: 2 }],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBar' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'type onBarFn = (param1:string, param2:string) => void;',
      options: [{ global: 1, arrowFuncExpression: 2 }],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBarFn' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: `interface IFoo {
        onBar: (param1:string, param2:string, param3:string) => void;
      }`,
      options: [{ global: 1, funcTypeAnnotation: 2 }],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBar' has too many parameters (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: 'function test(param1, param2, param3) {}',
      options: [
        {
          global: 1,
          funcDefinition: 2,
          funcExpression: 3,
          arrowFuncExpression: 4,
          funcTypeAnnotation: 0,
        },
      ],
      errors: [
        {
          type: 'FunctionDeclaration',
          message:
            "function 'test' has too many parameters (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: 'a = (param1, param2, param3, param4, param5) => {};',
      options: [
        {
          global: 1,
          funcDefinition: 2,
          funcExpression: 3,
          arrowFuncExpression: 4,
          funcTypeAnnotation: 0,
        },
      ],
      errors: [
        {
          type: 'ArrowFunctionExpression',
          message:
            "arrow function 'a' has too many parameters (5). Maximum allowed is (4).",
        },
      ],
    },
    {
      code: 'b = function(param1, param2, param3, param4) {};',
      options: [
        {
          global: 1,
          funcDefinition: 2,
          funcExpression: 3,
          arrowFuncExpression: 4,
          funcTypeAnnotation: 0,
        },
      ],
      errors: [
        {
          type: 'FunctionExpression',
          message:
            "function 'b' has too many parameters (4). Maximum allowed is (3).",
        },
      ],
    },
    {
      code: 'c.reduce((param1, param2, param3, param4, param5) => {});',
      options: [
        {
          global: 1,
          funcDefinition: 2,
          funcExpression: 3,
          arrowFuncExpression: 4,
          funcTypeAnnotation: 0,
        },
      ],
      errors: [
        {
          type: 'ArrowFunctionExpression',
          message:
            'arrow function has too many parameters (5). Maximum allowed is (4).',
        },
      ],
    },
    {
      code: `interface IFoo {
        onBar: (param1:string, param2:string) => void;
      }`,
      options: [
        {
          global: 1,
          funcDefinition: 2,
          funcExpression: 3,
          arrowFuncExpression: 4,
          funcTypeAnnotation: 0,
        },
      ],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBar' has too many parameters (2). Maximum allowed is (0).",
        },
      ],
    },
    {
      code: 'type onBarFn = (param1:string, param2:string) => void;',
      options: [
        {
          global: 1,
          funcDefinition: 2,
          funcExpression: 3,
          arrowFuncExpression: 4,
          funcTypeAnnotation: 0,
        },
      ],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBarFn' has too many parameters (2). Maximum allowed is (0).",
        },
      ],
    },
    {
      code: 'function foo(param1, param2) {}',
      options: [
        {
          funcDefinition: 1,
          funcExpression: 2,
        },
      ],
      errors: [
        {
          type: 'FunctionDeclaration',
          message:
            "function 'foo' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'a = function (param1, param2, param3) {};',
      options: [
        {
          funcDefinition: 1,
          funcExpression: 2,
        },
      ],
      errors: [
        {
          type: 'FunctionExpression',
          message:
            "function 'a' has too many parameters (3). Maximum allowed is (2).",
        },
      ],
    },
    {
      code: 'a = function (param1) {};',
      options: [
        {
          funcExpression: 0,
        },
      ],
      errors: [
        {
          type: 'FunctionExpression',
          message:
            "function 'a' has too many parameters (1). Maximum allowed is (0).",
        },
      ],
    },
    {
      code: 'function foo(param1, param2) {}',
      options: [
        {
          global: 1,
          arrowFuncExpression: -1,
        },
      ],
      errors: [
        {
          type: 'FunctionDeclaration',
          message:
            "function 'foo' has too many parameters (2). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'a = function (param1, param2, param3) {};',
      options: [
        {
          global: 1,
          arrowFuncExpression: -1,
        },
      ],
      errors: [
        {
          type: 'FunctionExpression',
          message:
            "function 'a' has too many parameters (3). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: `interface IFoo {
        onBar: (param1:string, param2:string, param3:string) => void;
      }`,
      options: [
        {
          global: 1,
          arrowFuncExpression: -1,
        },
      ],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBar' has too many parameters (3). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: `type IFoo = {
        onBar: (param1:string, param2:string, param3:string) => void;
      }`,
      options: [
        {
          global: 1,
          arrowFuncExpression: -1,
        },
      ],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBar' has too many parameters (3). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: `type IFoo = {
        nested1: {
          nested2: {
            onBarNested: (param1:string, param2:string, param3:string) => void;
          }
        }
      }`,
      options: [
        {
          global: 1,
          arrowFuncExpression: -1,
        },
      ],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBarNested' has too many parameters (3). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: `
        const func2: (param1:string, param2:string, param3:string) => void = (arg1, arg2, arg3, arg4) => {
          // function body
      };`,
      options: [
        {
          global: 1,
          arrowFuncExpression: -1,
        },
      ],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'func2' has too many parameters (3). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: `interface MyInterface {
        myFunction(param1:string, param2:string, param3:string): void;
      };`,
      options: [
        {
          global: 1,
          arrowFuncExpression: -1,
        },
      ],
      errors: [
        {
          type: 'TSMethodSignature',
          message:
            "function 'myFunction' has too many parameters (3). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: 'a = async function (param1, param2, param3) {};',
      options: [
        {
          global: 1,
          arrowFuncExpression: -1,
        },
      ],
      errors: [
        {
          type: 'FunctionExpression',
          message:
            "async function 'a' has too many parameters (3). Maximum allowed is (1).",
        },
      ],
    },
    {
      code: `
        type onBarFn = (param1:string, param2:string, param3:string) => void;
      `,
      options: [
        {
          global: 1,
          arrowFuncExpression: -1,
        },
      ],
      errors: [
        {
          type: 'TSFunctionType',
          message:
            "function 'onBarFn' has too many parameters (3). Maximum allowed is (1).",
        },
      ],
    },
  ],
});
