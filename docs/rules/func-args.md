# enforce the number of arguments used in a function call (func-args)

This rule allows you to set a max limit for the number of arguments used in function calls. It allows you to set a global limit, and to override this global limit for any number of named functions you want.

## Rule Details

By design, this plugin's rules don't have pre-set defaults. So, you've to configure this rule as described here in order to use it. Noting that all the options are used as keys in a single config object (no arrays or nested objects).

### Options

Here are the available options for this rule:

- `global`: accepts an integer indicating the max number of arguments used in a function call. This applies to all function calls unless overridden for specifically configured function names

- `[functionName]`: `functionName` is a placeholder for a key that represents the name of a function (`foo`, `bar`, `doSomething`, etc.), and accepts an integer indicating the max number of arguments for a call to `functionName`. This overrides the global limit. You can add as many keys for as many function names you would like to override/set a limit to

If you have a need to set the value of an option to `0`, it is a valid limit that's supported by this rule.

#### Example (A)

With a config like:

```json
{
  "rules": {
    "func-params-args/func-args": [
      "warn",
      {
        "global": 3,
        "bar": 2,
        "baz": 1
      }
    ]
  }
}
```

Examples of **incorrect** code for this rule:

```js
foo('arg1', 'arg2', arg3, arg4);
a.foo('arg1', 'arg2', arg3, arg4);

bar('arg1', 'arg2', arg3);
b.bar('arg1', 'arg2', arg3);

baz('arg1', arg2);
b.baz('arg1', arg2);
```

Examples of **correct** code for this rule:

```js
foo('arg1', 'arg2', arg3);
foo('arg1', 'arg2');
foo('arg1');
a.foo('arg1', 'arg2', arg3);
a.foo('arg1', 'arg2');
a.foo('arg1');

bar('arg1', arg2);
bar('arg1');
b.bar('arg1', arg2);
b.bar('arg1');

baz();
a.baz();
baz('arg1');
b.baz('arg1');
```

#### Example (B)

With a config like:

```json
{
  "rules": {
    "func-params-args/func-args": [
      "warn",
      {
        "foo": 2
      }
    ]
  }
}
```

Examples of **incorrect** code for this rule:

```js
foo('arg1', 'arg2', arg3);
a.foo('arg1', 'arg2', arg3);
```

Examples of **correct** code for this rule:

```js
foo('arg1', 'arg2');
foo('arg1');
foo();
a.b.foo('arg1', 'arg2');
a.b.c.foo('arg1');
a.b.foo();

bar('arg1', 'arg2', arg3, arg4);
a.bar('arg1', 'arg2', arg3, arg4);

// whatever else function calls

// any other function call than foo would have no restrictions
// since the 'global' option is not configured
```
