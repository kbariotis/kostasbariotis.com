---
title: "Consistent dependencies across teams"
path: "/consistent-dependencies-across-teams/"
date: "2015-06-26T18:29:20.000Z"
date_updated:   2016-05-14T15:40:39.000Z
tags: npm, shrinkwrap, team, node.js
---

A common pitfall when comes to development teams is the inconsistent software and library versions across developers.

The first time you install a Node.js dependency by `npm install --save`, the latest version of that package, will be installed along with the npm's default [save prefix (^)](https://docs.npmjs.com/misc/config#save-prefix). The '^' allows npm to auto install minor upgrades for this package, according to the [semver schema](http://semver.org/).

Because of that, it's hard to guarantee that every developer in the team will have the same version and this creates problems. It can really save your day, when two different people on the same codebase gets different results on an predefined procedure and the cause is a breaking change on a package that got updated.

So what we do? There are a few ways you can pass this:

### Reset the default `--save-prefix`.
By running `npm config set save-prefix=''` you're overriding npm's default [save-prefix](https://docs.npmjs.com/misc/config#save-prefix) value which is `^`. Now every package you install will be locked on it's current version and every person that runs `npm install` will get that version.

This can also introduce outdated packages, so make sure that you keep an eye on your dependencies for critical updates that you don't want to miss. You can also take advantage of the npm's [outdated command](https://docs.npmjs.com/cli/outdated) that will check every package and report back for outdated packages.

Consider also keeping this setting in your [`.npmrc`](https://docs.npmjs.com/files/npmrc) file, to not force every developer to set it explicitly on his/her machine.

### shrinkwrap
npm's [shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) is also a handy way to lock your versions across your team. By running `npm shrinkwrap`, a `shrinkwrap.json` file will be created at the root of your repo with the current versions  of your dependencies that are install at the moment and their dependencies.

With `shrinkwrap` you get the exact same dependencies tree across and not worry about breaking updates. `npm install` will respect a `shrinkwrap.json` file if it finds but it must also agrees with the current `package.json` file, so expect errors if those two files are not align.

`shinkwrap` is the most safe way of locking your dependencies versions and still keeping them out of your repo, which brings me to the third and final option.

### Keep Your Dependencies Under Version Control
This method is widely used, especially when maximum security is required. It's a proven method that keeps not only locked versions but code content too, so you don't worry if a malicious piece of code find it's way inside your favorite open source dependencies.

Be careful though, cause your repo will increase in size really quick. In case of a dependency that needs to be compiled (e.g. by [node-gyp](https://github.com/TooTallNate/node-gyp)) the source code is usually really big, so be careful on that.

The npm guys have also a [few words](https://docs.npmjs.com/cli/shrinkwrap#caveats) on this.

##Not a Node.js Fan
In case that you aren't really into Node.js but you still reading this piece (big ups man!!), I shall inform you that these techniques aren't new either have been introduced by the Node.js community for the first time.

PHP's Composer keeps a [composer.lock](https://getcomposer.org/doc/01-basic-usage.md#composer-lock-the-lock-file) file that locks the current installed versions and Ruby's Bundler has a Gemfile.lock file. Same goes for other systems.

So, do your homework and find your PM's way of handling this kind of life saver functionality.

##A Final Word
Dependencies of a codebase is an every day process and can easily lead to few hours of bug hunting. Make sure to save those hours.

But, sooner or later, your team's inner policies will fail and this is ok, as soon as you understand the causes, you fix them and move. Move faster every time. Like a [c25k](http://www.c25k.com/) training. ;)

What's your preferred way of handling dependencies versions?
