---
title: "Guide to package-lock.json"
path: "/guide-to-package-lock-json/"
tags: NPM
date: "2019-10-22"
canonical: https://blog.logrocket.com/why-you-should-use-package-lock-json/
---

*This article first appeared on [LogRocket's blog](https://blog.logrocket.com/why-you-should-use-package-lock-json/).*

In this article, we'll look at `package-lock.json`, why it's important, and how it's best used along with NPM CLI in your day-to-day life. 
 
## History
NPM version 5 introduced `package-lock.json` as a mechanism to capture the exact dependency tree installed at any point in time. 

This helps with collaboration across different environmentsin which you want everyone fetching dependencies for a specific version of your project to fetch the same tree.

`package.json` defines the required dependencies and also their respective versions using [semantic versioning](https://semver.org/). However, semantic versioning can be tricky.

Consider a dependency stated as `"express": "^4.16.4"`. 

The publisher of this module (without using `package-lock.json`) would have `express` version 4.16.4 installed since they installed the latest version. 

If `express` has published a new version by the time I download this module and try to install dependencies on it, I can download the latest version. 

The `caret` symbol [tells us exactly that](https://stackoverflow.com/a/22345808/1955940).

The problem with the above is that if version 4.17.x contains a bug, my local setup will fail, but the publisher's will continue to work fine on the previous version. 

The same thing could happen in the production environment, and you'd have no idea why it was failing. 

Prior to NPM version 5, you would use `shrinkwrap`. It differs from `package-lock.json` because it's allowed to be published with your module on the NPM registry, whereas `package-lock.json` is not. 

If all members can use NPM+5, it's best to go with package-lock.json for unpublished projects. 

But if you are developing a module and you intend to publish it, you might need to think about whether you want the clients to install the exact dependency tree you dictate, or if you want to be more flexible about it. [Here's a more detailed version on the subject.](https://stackoverflow.com/a/46132512/1955940)

So, `package-lock.json` will describe the exact dependency tree currently installed. The format is described in [NPM documentation page](https://docs.npmjs.com/files/package-lock.json#dependencies-1). 

By committing it on your VCS--which you should absolutely do--you are able to go back in history and replicate the exact dependency tree from that time.

Make sure to always commit `package-lock.json` to your VCS to keep track of exact dependency trees at any given time. 

It will ensure that all clients that download your project and attempt to install dependencies will get the exact same dependency tree. Furthermore, it'll ensure you're able to check out previous commits and replicate the dependencies state of each commit. 

## `package.json` vs `package-lock.json`

Make sure you don't change `package-lock.json` directly. That's being handled automatically by NPM. It reflects changes made to `package.json` to `package-lock.json` and keeps it up to date.

However, this only happens if you use NPMs' CLI to make changes. If you manually change `package.json,` don't expect `package-lock.json` to update. Always use the CLI commands, like `install`, `uninstall`, etc. 

## How to use the NPM CLI
NPM will auto generate a `package-lock.json` when you first use it in a fresh project. 

Then, you can use NPM as normal.

### npm install (with specific modules as arguments)
`install` can be used with the names of modules to install as arguments, which will alter both `package.json` and `package-lock.json` since the dependency tree will change.

Consider the following example: 
 `npm install express body-parser cors`

### npm install (without arguments)
`install` will attempt to install all dependencies in respect to `package-lock.json`.

A key point here is that `install` can alter `package-lock.json` if it registers that it's outdated. 

For example, if someone manually alters `package.json`--say, for example, they remove a package since it's just a matter of removing a single line--the next time that someone runs `npm install`, it will alter `package-lock.json` to reflect the removal of the previous package. 

That can be tricky. Imagine pulling the latest version of your project, running `npm install` to get up to date, only to find that you immediately have a bunch of changes in your tree that make no sense. 

It's also highly likely that the changes in your tree would make no sense to the people reviewing your changes.  

### npm uninstall
Similar to `install` but with names of modules to remove as arguments. Will alter both `package.json` and `package-lock.json`.

### npm update
`update` will read `package.json` to find any dependencies that can be updated. Subsequently, it will construct a new dependency tree and update the `package-lock.json` as well.

Remember semantic versioning? Say we have a dependency in our `package.json` stated as `^1.4.5`. 

The `^` character tells NPM to check if there's a newer version under the `1.X.X` scope and if there is, to install that. Similarly, the `~` character will only go up to hot-fixes, or `1.4.X`. 

You could also omit the special character and keep a fixed version, which makes `package-lock.json` less helpful (but not useless).

### npm ci
`ci` will install all dependencies in respect to `package-lock.json` similar to `install`. The key difference here is that it won't alter `package-lock.json` under any circumstances.

Its purpose is to be used by environments, e.g. build servers, where installation happens in an automated way.

Conclusion

Remember these key takeaways when using 'package-lock.json':

Don't use `npm install` without arguments to fetch dependencies--use `npm ci` for that. You can use the `npm install` to install specific dependencies. 

Use `npm ci` everywhere when you only want the local dependencies tree--even on your local develpment environment.

Make `npm update` a repetitive task, say once a month, to update your dependencies. (or use a service like [dependabot](https://dependabot.com/), but make sure that you have a good test coverage). 

This way you ensure that you keep your dependencies up to date and you avoid bubbling up technical debt.

**More references**:
- Differences between `npm install` and `npm ci`: https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci
- NPM CLI source code: https://github.com/npm/cli/blob/latest/lib/install.js
- Semantic versioning: https://blog.npmjs.org/post/162134793605/why-use-semver
- Why does “npm install” rewrite package-lock.json? https://stackoverflow.com/questions/45022048/why-does-npm-install-rewrite-package-lock-json
