---
title: "Guide to package-lock.json"
path: "/guide-to-package-lock-json/"
draft: true
tags: NPM
---

In this article I am going to talk about `package-lock.json`, why is it important to have and to maintain and also how in my opinion is best to use it in your day to day life.

## History
NPM version 5 introduced `package-lock.json` as a mechanism to capture the exact dependency tree installed in any point in time. That would help with the collaboration across different environments where you want everyone that are going to fetch dependencies for a specific version of your project to always fetch the same tree.

`package.json` defines the dependencies required for a project and also the accepted versions using [semantic versioning](https://semver.org/). Semantic versioning though can be ambiguous.

Consider a dependency stated as `"express": "^4.16.4"`. The publisher of this module (without using `package-lock.json`) would have `express` version 4.16.4 installed since he installed the latest version. If I download this module and try to install dependencies on it and by that time `express` has published a new version, say 4.17.1, I would download the latest version. The `caret` symbol [tells us exactly that](https://stackoverflow.com/a/22345808/1955940).

The problem with the above is that if version 4.17.x contain a bug, my local setup will fail but the publishers' will continue to work fine on the previous version. Imagine the same to happen in the production environment and you have no idea why is failing.

*Prior to NPM version 5, you would use `shrinkwrap`. [Here are the differences between the two.](https://github.com/npm/cli/blob/latest/doc/spec/package-lock.md)*

So `package-lock.json` will describe the exact dependency tree currently installed. The format is described in [NPM documentation page](https://docs.npmjs.com/files/package-lock.json#dependencies-1). By committing it on your VCS, and you should absolutely do, you are able to go back in history and replicate the exact dependency tree of that time.

**Key takeaway: Always commit `package-lock.json` to your VCS.**

## `package.json` vs `package-lock.json`
You shouldn't be changing `package-lock.json` directly. That is being handled automatically by NPM. It reflects changes made to `package.json` to `package-lock.json` and keeps it up to date.

That is though only if you use NPMs' CLI to make any changes. If you manually change `package.json` don't expect `package-lock.json` to be updated. Always use the CLI commands, like `install`, `uninstall`, etc.

**Key takeaway: Don't attempt to manually update neither `package.json` or `package-lock.json`.**

## How to use the NPM CLI

NPM will auto generate a `package-lock.json` when you first use it in a fresh project. Then you use NPM as usual:

### npm install (with specific modules are arguments)
`install` can be used with names of modules to install as arguments, which will result in altering both `package.json` and `package-lock.json` since the dependency tree will change.

An example is: `npm install express body-parser cors`

### npm install (without arguments)
`install` will attempt to install all dependencies in respect to `package-lock.json`.

A key point here is that `install` is able to alter `package-lock.json` if it figures out that it's outdated. For example, if someone manually alters `package.json`, say they remove a package since is just a matter of removing a single line, next time that someone runs `npm install`, it will alter `package-lock.json` to reflect the removal of the previous package. That can be tricky. Imagine pulling the latest version of your project, running `npm install` to get up to date, only to figure out that you immediately have a bunch of changes in your tree that makes no sense. They will most probably make no sense to the people reviewing your changes too.

### npm uninstall
Similar to `install` but with names of modules to remove as arguments. Will alter both `package.json` and `package-lock.json`.

### npm update
`update` will read `package.json` to find any dependencies that can be updated. After it, will construct a new dependency tree and update the `package-lock.json` as well.

Remember semantic versioning? Say we have a dependency in our `package.json` stated as `^1.4.5`. The `^` character tells NPM to check if there is a newer version under the `1.X.X` scope and if there is, to install that. Similar the `~` character will go only up to hot-fixes, so `1.4.X`. You could also omit the special character and keep a fixed version always, which makes `package-lock.json` less helpful (but not useless).

### npm ci
`ci` will install all dependencies in respect to `package-lock.json` similar to `install`. Key difference here is that it will not alter `package-lock.json` under any circumstances.

Its purpose is to be used by environments, e.g. build servers, where installation happens in an automated way.

**Key takeaway: Don't use `npm install` without arguments to fetch dependencies. Use `npm ci` for that and `npm install` to install a specific dependency.**

## Takeaways expanded

### Always commit `package-lock.json` to your VCS.
It will ensure that all clients that download your project and attempt to install dependencies, will get the exact same dependency tree.

### Don't attempt to manually update neither `package.json` or `package-lock.json`.
Use always NPMs' CLI and it will automatically keep both files in sync.

### Don't use `npm install` without arguments to fetch dependencies. Always use `npm ci` and `npm install` to install a specific dependency.
Use `npm ci` everywhere when all you want is to update your local dependencies tree. Always use NPMs' CLI to install/uninstall specific dependencies. Use `update` in a repetitive fashion (once a month? or use a service like [dependabot](https://dependabot.com/) to update all your dependencies.

### Conclusion

**More references**:
- Differences between `npm install` and `npm ci`: https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci
- NPM CLI source code: https://github.com/npm/cli/blob/latest/lib/install.js
- Semantic versioning: https://blog.npmjs.org/post/162134793605/why-use-semver
