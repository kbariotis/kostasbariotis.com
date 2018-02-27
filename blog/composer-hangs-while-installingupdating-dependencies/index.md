---
title: "Composer hangs while installing/updating dependencies"
path: "/composer-hangs-while-installingupdating-dependencies/"
date: "2014-08-09T07:22:26.000Z"
date_updated:   2014-08-09T07:22:26.000Z
---

A common dis-functionality of <a title="Composer PHP " href="https://getcomposer.org" target="_blank">Composer </a>is that when it just hangs while installing or updating dependencies. Especially when using heavy packages like these of Symfony, Composer is going to run hard.

This issue is not new, and while there is been <a title="Composer freezing when installing symfony vendors" href="http://stackoverflow.com/questions/17138319/composer-freezing-when-installing-symfony-vendors" target="_blank">some </a><a title="Slow updating of composer dependencies, despite --prefer-dist flag" href="http://stackoverflow.com/questions/19316650/slow-updating-of-composer-dependencies-despite-prefer-dist-flag" target="_blank">discussion </a><a title="Running an update just hangs #1959" href="https://github.com/composer/composer/issues/1959" target="_blank">about </a><a title="Composer seems hanged on &quot;Updating dependencies&quot; #2378" href="https://github.com/composer/composer/issues/2378" target="_blank">it</a> i still encounter issues running on a generally old machine with 4GB ram and a Core2Duo CPU.

Whilst i tried all of the suggested solution i ended up discovering that the problem is when you use the wildcard(*) for choosing the vendor package version.

Prefer using the latest version of the package you want instead of the wildcard(*) the next time you encounter the same problem.

Instead of writing

```json
&quot;require&quot;: {

    &quot;monolog/monolog&quot;:&quot;1.*&quot;

}

...
```

write

```json
...

&quot;require&quot;: {

    &quot;monolog/monolog&quot;:&quot;1.10.0&quot;

}

...

```

&nbsp;

You can also try cleaning your Composer cache which is located at %APPDATA%/local/composer/ on Windows and using -<a title="Composer Install Dependencies CLI options" href="https://getcomposer.org/doc/03-cli.md#install" target="_blank">-prefer-dist</a> flag which tries to download a zip file of the package whenever one is available.

Last but not least, use --vvv flag for a more <a title="Composer CLI Global Options" href="https://getcomposer.org/doc/03-cli.md#global-options" target="_blank">verbose </a>output of the Composer and --profile displaying some hardware information at the end.
