---
title: "Linting your project, progressively"
path: "/progressive-linting/"
date: "2017-01-31"
tags: Javascript, Linting
draft: true
---

Linting and auto formatting is two well known process among Javascript developers, although by not being built-in the language, lots of folks are not aware of them.

Plenty of times, I was faced with a new Javascript codebase that was missing proper styleguide and rules. The coding style was varying across the project, undefined variables and forgotten required dependencies were lying everywhere, not to mention...

On this post, I will share my plan on how to add a linter to a codebase that has none but doing it in a controlled and progressive way.

## The problem
Now, the first thing that I imagine, most of developers would think after facing a problem like this, would be to stop everything and work exlusively on adding a linter and fixing and refactoring the whole codebase. Well guess what my friend, you have been bamboozled!

While refactoring is fun (at least for me), no one really likes doing it for a long period of time, let alone the fact that we can't stop releasing features regardless. The bigger the codebase, the longer will take to restructure it as a whole.

But even if we had the luxury to do it, major changes in a codebase may lead to unexpected behavior that may lead to major bugs that will certainly lead to hours and hours waste in debugging.

> ...Since each refactoring is small, it's less likely to go wrong. The system is also kept fully working after each small refactoring, reducing the chances that a system can get seriously broken during the restructuring.

With that statement [by Martin Fowler](https://refactoring.com/) In a similar position that I was a few months ago, I proposed to start fixing the code progressively, linting and refactoring only the affected code on every feature branch each of our team was working on.

This way we would have total control over what will break our code and we could fix it before it's released.

## The plan
While the linting and formatting can be handle by two completely separated tools, I will refer to a linter as that is going to handle both. We use ESLint and Prettier. ESLint have a `fix mode` and can also be integrated with Prettier. So by running your linter, you can also take auto formatting.

The plan was consisted of two parts.

The first part was to manually run the formatter across the codebase and let it fix the easy parts (missing spaces and semicolons) in places that no human intervention would be required.

```JSON
{
  ...

  "scripts": {
    "lint": "eslint --ext .js --ext .jsx src",
  }

  ...
}
```

The second part was to setup the configuration of our linter, the rules that we wanted to follow and also to setup a pre-commit git hook that will trigger the linting and refuse to commit if it didn't pass. This way we would be sure that no "bad" code enters the codebase.

Start by installing dependencies:

`npm i --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier`

Then add your .eslintrc file with contents:

```JSON
{
  "extends": ["plugin:prettier/recommended"]

  ...

  "rules": {
    "no-console": "error",
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "trailingComma": "es5",
        "printWidth": 100
      }
    ],
    "comma-dangle": [
      "error",
      {
        "objects": "always-multiline",
        "arrays": "always-multiline",
        "functions": "never"
      }
    ]

    ...

  }
}
```

The above is only a subset of our configuration. We are [extending `Prettier` configuration](https://prettier.io/docs/en/eslint.html) and adding it as a plugin for the formatting to work. Also, we have make a few changes to our Prettier rules (such as the comma dangle).

Now we want to run the linter, on pre-commit only on the modified files. Let's install some dependecies again that will help us do exactly this.

`npm i --save-dev husky lint-staged`

Then modify your `package.json`:

```JSON
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

Now try to modify a file and commit it. Husky will run the precommit hook only for the file that you tried to modify. You won't be able to commit unless the linter say so.

The plan worked great and in only a few weeks(we do weekly sprints) the whole codebase changed radically. We weren't bothering with formatting our code while writting it and we could be sure on every commit that we didn't forget to initialize a variable before using it.

What would you do in a similar position?
