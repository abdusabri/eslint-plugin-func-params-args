# eslint-plugin-func-params-args

Limit the number of function parameters and arguments with ease and flexibility!

This plugin intends to give you control over how many parameters are used in function definitions (declarations), function expressions, arrow function expressions, and TypeScript function type annotations. In addition to this, you can also set limits on how many arguments can be used when calling functions, where you can set a global limit, and have even finer control by providing limits for specific function calls (set by configuring/providing the name of a function).

[![GitHub Actions Status](https://img.shields.io/github/actions/workflow/status/abdusabri/eslint-plugin-func-params-args/nodejs.yml?branch=master)](https://github.com/abdusabri/eslint-plugin-func-params-args/actions) [![Coveralls github branch](https://img.shields.io/coveralls/github/abdusabri/eslint-plugin-func-params-args/master?logo=coveralls&style=flat-square)](https://coveralls.io/github/abdusabri/eslint-plugin-func-params-args) [![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)

## Table of contents

- [eslint-plugin-func-params-args](#eslint-plugin-func-params-args)
  - [Table of contents](#table-of-contents)
  - [Why](#why)
  - [Installation](#installation)
  - [General usage notes](#general-usage-notes)
    - [No defaults](#no-defaults)
    - [Non-JavaScript files](#non-javascript-files)
  - [Available rules](#available-rules)
  - [What is next](#what-is-next)
  - [Contributing](#contributing)
    - [General guidelines](#general-guidelines)
      - [Documentation notes](#documentation-notes)
    - [Development guidelines](#development-guidelines)
      - [Development notes](#development-notes)
  - [Code of conduct](#code-of-conduct)
  - [Inspiration and credits](#inspiration-and-credits)

## Why

This plugin has two rules, one for parameters (when defining functions or expressions), and one for arguments when calling functions (including built-in or 3rd party functions). Why each?

- **Function Parameters:** ESLint has its own `max-params` rule, but it only provides one global setting, and that's not flexible enough. Let's say we need to call `array.reduce`, where sometimes there is a need to use all of the 4 arguments provided to the reducer callback in an arrow function expression (like `array.reduce((acc, val, index, arr) => {}, {})` for example). Using the built-in `max-params`, we would need to set it to 4 and that would be the global limit. This plugin's rule (`func-params`) allows for more flexibility when handling such cases. One approach would be to set the global setting for (`func-params`) to 3, and override this value to allow arrow function expressions to have 4 parameters instead of 3

- **Function Arguments:** The role of the first rule ends when defining functions or expressions, but what about calling functions, especially 3rd party or built-in functions? Let's take migrating from Vue v2 to v3 as an example. Vue v3 recommends using a library called `mitt` as an event bus implementation. Vue v2's own implementation allows more than 2 arguments to be used (passed in) when emitting events (`$emit`), however, `mitt`'s implementation only accepts 2 arguments. So, to help with doing such migration, we can use this plugin's rule (`func-args`) to allow only 2 arguments to be used whenever `$emit` is called. Of course this is only an example, and this rule is flexible to cover any user-configured named function calls - that's in addition to a global limit as well

## Installation

If you don't already have [ESLint](http://eslint.org) installed, you'll first need to install it:

```shell
npm install eslint --save-dev

# or yarn add eslint --dev
```

Next, install `eslint-plugin-func-params-args`:

```shell
npm install eslint-plugin-func-params-args --save-dev

# or yarn add eslint-plugin-func-params-args --dev
```

## General usage notes

### ESLint v8 (eslintrc)

Add `func-params-args` to the plugins section of your `.eslintrc.json` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["func-params-args"]
}
```

Or `.eslintrc.yml`

```yml
plugins:
  - func-params-args
```

Then configure the rules you want to use under the rules section.

(`json`)

```json
{
  "rules": {
    "func-params-args/func-args": [
      "warn",
      {
        "global": 3,
        "$emit": 2
      }
    ]
  }
}
```

Or (`yml`)

```yml
rules:
  func-params-args/func-args:
    - 'warn'
    - 'global': 3
      '$emit': 2
```

### ESLint v9 (flat config)

For ESLint v9 with flat config (`eslint.config.js` or `eslint.config.mjs`), import the plugin and configure it as follows:

```js
import funcParamsArgs from 'eslint-plugin-func-params-args';

export default [
  {
    plugins: {
      'func-params-args': funcParamsArgs,
    },
    rules: {
      'func-params-args/func-args': [
        'warn',
        {
          global: 3,
          $emit: 2,
        },
      ],
    },
  },
];
```

Or using CommonJS (`eslint.config.cjs`):

```js
const funcParamsArgs = require('eslint-plugin-func-params-args');

module.exports = [
  {
    plugins: {
      'func-params-args': funcParamsArgs,
    },
    rules: {
      'func-params-args/func-args': [
        'warn',
        {
          global: 3,
          $emit: 2,
        },
      ],
    },
  },
];
```

As shown in the example above, the configuration approach for this plugin's rules uses a simple object structure (no arrays or nested objects), where keys like `$emit` are the options, and the value of a given key is the limit (like `2`). So, in the example above, it means that any calls to `$emit` function should have no more than `2` arguments, and the global limit for any other function call is `3`.

### No defaults

By design, this plugin's rules don't have pre-set defaults. So, you've to configure them as shown in the example above and as explained in details in the docs of each rule ([Available rules](#available-rules)).

### Non-JavaScript files

ESLint's eco-system is full of parsers and plugins taking care of non-JavaScript files, like TypeScript and JSX for example. This plugin doesn't provide its own parser (nor does it have a custom AST parsing logic). So, handling non-JS files depends on your existing ESLint setup.

#### ESLint v8 (eslintrc)

As an example, to use this plugin in TS files, you may configure parsing options in your `.eslintrc` file as follows:

If you don't have any existing parsers (or other plugins that are already taking care of handling TS files)

```json
"parser": "@typescript-eslint/parser"
```

Or you may override only the parsing of TS files if you've other parsers or plugins that are doing their own parsing

```json
"overrides": [
  {
    "files": "*.ts",
    "parser": "@typescript-eslint/parser"
  }
]
```

In both examples above, you would need to install `@typescript-eslint/parser` from npm.

#### ESLint v9 (flat config)

For ESLint v9 with flat config, configure the parser in `languageOptions`:

```js
import funcParamsArgs from 'eslint-plugin-func-params-args';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      'func-params-args': funcParamsArgs,
    },
    rules: {
      'func-params-args/func-params': ['warn', { global: 3 }],
    },
  },
];
```

You would need to install `@typescript-eslint/parser` from npm.

## Available rules

- [enforce the number of parameters used in a function definition or expression (func-params)](./docs/rules/func-params.md)

- [enforce the number of arguments used in a function call (func-args)](./docs/rules/func-args.md)

## What is next

In general, all feedback is welcome, and I would love to get more ideas and contributions to make this project better. As of now, here are a few items I can think of:

- Instead of only setting a value as an upper limit when configuring a rule, let's say 3 parameters or arguments max, would setting a min limit as well be a useful addition? Maybe for some function calls you want to allow between 1-3 arguments, but not without any arguments and not with more than 3

- Add more examples on how to handle non-JS files, like `.vue` files for instance

- ~~Currently, in `func-params` rule, when there is an error reported, in addition to the code location (file and line number), an error message like `function has too many parameters (3). Maximum allowed is (2).` is reported. An improvement would be to report the name of the function (or the variable name in the case of a function expression) in the message instead of the generic `function`. For example, a message like `function has too many parameters...` could be `handleSubmit has too many parameters...` instead~~ **Added in v3**

- Consider adding options for pattern matching. Maybe as a start, support `startsWith` and `endsWith` options. Could be useful if you use or have Node-style function names that end with a specific pattern like `[whatever]Sync` or `[whatever]Async`

- Adopt the [all-contributors](https://github.com/all-contributors/all-contributors) specification for recognizing contributors

## Contributing

If you want to report a bug, request a feature, or ask questions, please feel free to open a new issue.

All contributions are welcome and appreciated. If you want to help out, please follow the guidelines outlined below. The objective is to ensure that your time and effort are will spent, and to avoid a situation where you might spend time on something that someone else is already working on. Contributors time is valuable, and I hope these guidelines ensure that we can make the best out of it 🙏

### General guidelines

- Working on your first Pull Request? You can learn how from this free series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github) - Thanks to [Kent C. Dodds](https://github.com/kentcdodds)

- Please follow [this guide for your commit messages](https://chris.beams.io/posts/git-commit/). Though the recommended length of the subject line is 50, it is fine to go up to 72 if you need to

- For documentation improvements or fixing typos, feel free to open a PR without an existing issue. Otherwise, please follow the development guidelines outlined below

#### Documentation notes

- You may sometimes find open issues related to documentation. Such issues will have `documentation` label

- For minor documentation updates or fixing typos, it is usually fine to do so directly on GitHub website. For large documentation updates, it is recommended to clone the repo and ensure that the project dependencies are installed (by running `npm install` or `yarn`). This is because [Prettier](https://prettier.io/) is used to ensure consistent style/formatting in the docs (all `.md` files), and having the dependencies installed will automatically fix style/formatting issues upon committing

### Development guidelines

- If you are new to ESLint plugin development, the resources in [Inspiration and credits](#inspiration-and-credits) should help you get started

- Check open issues to see if an existing one is already addressing what you want to contribute/help with, or if there is one that is interesting for you to work on. If you want to work on (grab) an existing issue, please ensure that it has the label `up for grabs`, and comment on it to signal your interest. I will then assign the issue to you and add the `assigned` label to it (will remove `up for grabs` as well). [Here is a link to open issues that are up for grabs](https://github.com/abdusabri/eslint-plugin-func-params-args/labels/up%20for%20grabs)

- If you don't find an existing issue addressing what you want to contribute/help with, create a new issue and include a short description

- If the changes you are working on require documentation updates, please update the docs accordingly

- When you are ready to open a PR (all pull requests should be opened against master branch):
  - Add a summary explaining your changes

  - Add `Fixes #[issue number]` or `Closes #[issue number]` in the PR description

- Here is [a nice article](https://medium.engineering/the-code-review-mindset-3280a4af0a89) about code reviews that I found helpful. Knew about it from [Automattic's Calypso contributing guide](https://github.com/Automattic/wp-calypso/blob/master/docs/CONTRIBUTING.md)

#### Development notes

- Please run `npm install` or `yarn` to ensure that the required dev dependencies are properly installed

- The target for test coverage is `100%`. If not met, a PR will fail on CI (Travis Continuous Integration). You can run `npm run test` locally as well

- The project uses Prettier for code formatting and style, and there is a pre-commit hook that auto-fixes any code style issues. This is also checked and will fail on CI if there are issues reported by Prettier

## Code of conduct

This project adopts Contributor Covenant's Code of Conduct. You can read it in full in [CODE_OF_CONDUCT](./CODE_OF_CONDUCT.md), which has my email address included.

## Inspiration and credits

This work wouldn't have been possible without the power of open source and people who share their knowledge and experiences. Following are some sources of inspiration and references that helped me while creating this plugin/project.

- [@gitlab/eslint-plugin](https://gitlab.com/gitlab-org/frontend/eslint-plugin), especially [this Merge Request (MR)](https://gitlab.com/gitlab-org/frontend/eslint-plugin/-/merge_requests/19) and [my MR](https://gitlab.com/gitlab-org/frontend/eslint-plugin/-/merge_requests/20) :)

- [AST explorer](https://astexplorer.net/)

- ESLint's developer guide, especially [Working with Plugins](https://eslint.org/docs/developer-guide/working-with-plugins) and [Working with Rules](https://eslint.org/docs/developer-guide/working-with-rules)

- ESlint's [max-params rule](https://eslint.org/docs/rules/max-params#enforce-a-maximum-number-of-parameters-in-function-definitions-max-params), and its linked sources on GitHub

- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)

- [You-Dont-Need-Lodash-Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)

- Articles and Q&A
  - [Create custom ESLint rules in 2 minutes](https://blog.webiny.com/create-custom-eslint-rules-in-2-minutes-e3d41cb6a9a0)

  - [Writing custom EsLint rules](https://www.kenneth-truyers.net/2016/05/27/writing-custom-eslint-rules/)

  - [How To Write Your First ESLint Plugin](https://dev.to/spukas/how-to-write-your-first-eslint-plugin-145)

  - [I can't make my custom eslint rule to work](https://stackoverflow.com/questions/60750019/i-cant-make-my-custom-eslint-rule-to-work)

  - [Writing Custom Lint Rules for Your Picky Developers](https://flexport.engineering/writing-custom-lint-rules-for-your-picky-developers-67732afa1803)

  - [Creating an ESLint Plugin](https://medium.com/@bjrnt/creating-an-eslint-plugin-87f1cb42767f)

- This course [Creating an Open Source JavaScript Library on Github](https://frontendmasters.com/courses/open-source/), and its associated [GitHub repo](https://github.com/kentcdodds/starwars-names)

- This course [Code Transformation and Linting with ASTs](https://frontendmasters.com/courses/linting-asts/)

- Badges from [shields.io](https://shields.io/)
