# enforce the number of parameters used in a function definition or expression (func-params)

This rule allows you to set a max limit for the number of parameters used in function definitions, function expressions, and arrow function expressions. It allows you to set a global limit, and to override this global limit for each of the types (definitions and expressions).

## Rule Details

By design, this plugin's rules don't have pre-set defaults. So, you've to configure this rule as described here in order to use it. Noting that all the options are used as keys in a single config object (no arrays or nested objects).

### Options

Here are the available options for this rule:

- `global`: accepts an integer indicating the max number of parameters used in a function definition or expression. This applies to all types unless overridden for a specific type

- `funcDefinition`: accepts an integer indicating the max number of parameters used in a function definition. This overrides the global limit

- `funcExpression`: accepts an integer indicating the max number of parameters used in a function expression. This overrides the global limit

- `arrowFuncExpression`: accepts an integer indicating the max number of parameters used in an arrow function expression. This overrides the global limit

- `funcTypeAnnotation`: accepts an integer indicating the max number of parameters used in a TypeScript function type annotation. This overrides the global limit

If you have a need to set the value of an option to `0`, it is a valid limit that's supported by this rule.

If you want to disable this rule (removing all restrictions) for any of the options, you can set its value to `-1`. For example, setting an option like `"arrowFuncExpression": -1` in the config, allows you to use arrow functions with any number of parameters (basically from 0 to an unlimited number of parameters). This overrides the global limit.

**Error message examples:**

- `function 'foo' has too many parameters (3). Maximum allowed is (1).`
- `arrow function 'b' has too many parameters (3). Maximum allowed is (1).`
- `arrow function has too many parameters (3). Maximum allowed is (1).`
- `function 'onBar' has too many parameters (3). Maximum allowed is (1).` [TS key in interface or object type]
- `function 'onBarFn' has too many parameters (3). Maximum allowed is (1).` [TS function type alias]

#### Example (A)

With a config like:

```json
{
  "rules": {
    "func-params-args/func-params": [
      "warn",
      {
        "global": 3,
        "arrowFuncExpression": 4
      }
    ]
  }
}
```

Examples of **incorrect** code for this rule:

```ts
function foo(param1, param2, param3, param4) {}

a = function (param1, param2, param3, param4) {};

b = (param1, param2, param3, param4, param5) => {};

c.reduce((param1, param2, param3, param4, param5) => {});

interface IFoo {
  onBar: (
    param1: string,
    param2: string,
    param3: string,
    param4: string
  ) => void;
}

type FooType = {
  onBar: (
    param1: number,
    param2: number,
    param3: number,
    param4: number
  ) => void;
};

type onBarFn = (
  param1: number,
  param2: number,
  param3: number,
  param4: number
) => void;
```

Examples of **correct** code for this rule:

```ts
function foo(param1, param2, param3) {}

a = function (param1, param2, param3) {};

b = (param1, param2, param3, param4) => {};

c.reduce((param1, param2, param3, param4) => {});

function foo(param1) {}

a = function (param1, param2) {};

b = () => {};

c.reduce((param1, param2, param3) => {});

interface IFoo {
  onBar: (param1: string, param2: string, param3: string) => void;
}

type FooType = {
  onBar: (param1: number, param2: number, param3: number) => void;
};

type onBarFn = (param1: number, param2: number, param3: number) => void;
```

#### Example (B)

With a config like:

```json
{
  "rules": {
    "func-params-args/func-params": [
      "warn",
      {
        "funcDefinition": 1,
        "funcExpression": 2
      }
    ]
  }
}
```

Examples of **incorrect** code for this rule:

```js
function foo(param1, param2) {}

a = function (param1, param2, param3) {};
```

Examples of **correct** code for this rule:

```js
function foo(param1) {}

a = function (param1, param2) {};

// No restrictions below on arrow function expressions
// since the 'global' option is not configured

b = (param1, param2, param3, param4, param5) => {};

c = () => {};

c.reduce((param1, param2, param3, param4) => {});
```
