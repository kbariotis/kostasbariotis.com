---
title: "Progressive JavaScript Linting"
path: "/progressive-javascript-linting/"
date: "2018-02-11"
tags: JavaScript, Linting
---

Linting and auto-formatting are a well known process among JavaScript developers, although due to the lack of a standard tool, lots of folks are not aware of it. While a linter analyzes your code and warns you for potential issues, a formatter can auto format it based on your preferences.

![ESLint Output example](./eslint-example.png)


Plenty of times, I had to deal with a JavaScript codebase that was missing proper styleguide and rules. The coding style was varying across the project, unused or implicit globals variables and unused required dependencies were lying everywhere.

On this post, I will share my plan on how to add a proper toolchain and a process to a codebase that has none but doing it in a controlled and progressive way. I will use [ESLint](https://eslint.org) as the linter and [Prettier](https://prettier.io) as the formatter (but as a plugin to ESLint) with the recommended set of rules. ESLint has come a long way and there is massive adoption by the community with lots of plugins. Prettier ... well, it's prettier than the [fix mode of ESLint](https://eslint.org/docs/user-guide/command-line-interface#--fix).

## The problem
The first thing that came to my mind when I first faced a situation was to stop everything and work exclusively on adding a linter and fixing and refactoring the whole codebase. I immediately dropped that option.

While refactoring is fun (at least for me), no one really likes doing it for a long period of time, let alone the fact that we can't stop releasing features to customers regardless. The bigger the codebase, the longer will take to restructure it as a whole.

But even if we had the luxury to do it, major changes in a codebase may lead to unexpected behavior that may lead to major bugs that will certainly lead to hours and hours wasted in debugging.

> ...Since each refactoring is small, it's less likely to go wrong. The system is also kept fully working after each small refactoring, reducing the chances that a system can get seriously broken during the restructuring.

With that statement [by Martin Fowler](https://refactoring.com/) in my mind, I proposed to start fixing the code progressively, refactoring only the affected code on every feature branch each of our team members was working on.

This way we would have total control over the changes that would break our code and we would fix them before they were released.

## The plan
Simple. We will first have to discuss and agree (if in a team) on the styleguide we want to follow and then put a configuration file for our tools to follow.

Then we want to run the process once and let the formatter fix the easy stylish parts (missing spaces, semicolons, etc..) hoping that no human intervention would be required for those changes.

The last part will be to setup a pre-commit git hook that will trigger the linting and refuse to commit if it didn't pass. This way we would be sure that no "bad" code enters the codebase.

Let's start by installing dependencies:

`npm i --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier`

Then add your `.eslintrc` file with contents. This is just an example setup I hacked for simplicity purposes. It follows the recommended rules by ESLint and also extends Prettier to work with ESLint seamlessly. Last I have added some custom rules of mine.

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 6
  },
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "trailingComma": "es5",
        "printWidth": 100
      }
    ]
  }
}
```

The configuration applies the recommended by ESLint set of rules and also the Prettier plugin which will both override ESLint's formatting rules and also run Prettier whenever ESLint is run. Then we override Prettier's default rules to match our preferences.

Now that our configuration is in place, let's run it and see how it goes. Add this your `package.json` (we will use it later) and run `npm run lint`.

```json
{
  ...

  "scripts": {
    "lint": "./node_modules/.bin/eslint --ext .js --ext .jsx src",
  }

  ...
}
```

If everything went well, you will see a bunch of errors on your console but you will also notice that Prettier formatted your code!

Now you have some work to do. First of all, run your tests and/or do some manual testing to ensure that everything works as before. Then, inspect the errors in your console and make sure you're happy with them. Remember that they won't stay there forever. The styleguide can change and adapt, so don't waste time figuring out particular edge cases.

Once you are done, commit all of your changes cause that will be the last time you committed code with errors in your codebase.

Now we want to setup the linter to run on pre-commit only on the modified files. Let's install some dependencies again that will help us do that.

`npm i --save-dev husky lint-staged`

Then modify your `package.json`:

```json
{
  ...

  "scripts": {
    "precommit": "lint-staged",
  },

  ...

  "lint-staged": {
    "*.{js,jsx}": [
      "./node_modules/.bin/eslint --fix",
      "git add"
    ]
  }

  ...
}
```

[Husky](https://github.com/typicode/husky) will add the `precommit` script as a precommit hook to Git. Every time you are going to commit a bunch of files will run the [lint-staged](https://github.com/okonet/lint-staged) which in turn will list all the currently staged files and run ESLint with every each of them. If one fails, the hook will fail.

Now try to modify a file and commit it. Husky will run the precommit hook only for the file that you tried to modify. You won't be able to commit unless the linter says so.

## The results
The plan worked great and after a few weeks, the whole codebase changed radically. We weren't bothering with formatting our code while writing it and we could be sure on every commit that we didn't forget to initialize a variable before using it.

What would you do in a similar position?
