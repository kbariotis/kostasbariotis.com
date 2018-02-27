---
title: "Valiation : The most awesome validation engine ever created for PHP"
path: "/valiation-the-most-awesome-validation-engine-ever-created-for-php/"
date: "2014-10-08T16:02:59.000Z"
tags: php, validation, oop
---

The past few weeks, you would find Validation at <a title="Github PHP Trending Projects" href="https://github.com/trending?l=php" target="_blank">Github's PHP Trending projects.</a>

<a title="Respect/Validation on Github" href="https://github.com/Respect/Validation" target="_blank">Validation</a> is a very flexible, fully customizable, loaded with tone of validators, engine that you can use on your PHP projects right away.

Here is a great list why this library it's actually awesome.

From <a title="Respect/Validation on Reddit" href="http://www.reddit.com/r/PHP/comments/1telis/respectvalidation_the_most_awesome_validation/ce7emzs" target="_blank">Reddit</a>:
<blockquote>
<ul>
	<li>The chain is not a simple chain (it is not just linear), it is a fluent builder for a composite structure. You can write almost any validation rule for any data structure and group it in a single object:v::key("name", v::string()-&gt;length(1, 32)) -&gt;key("birth", v::date('Y-m-d')-&gt;minimumAge(18)) -&gt;assert($someArrayWithData);</li>
	<li>You can nest as many validators as you want.</li>
	<li>Each validator is an instance that you can reuse (even for composing new, more complex instances).</li>
	<li>Three kinds of validation reports (validate() returns true/false, check() stops on first error, assert() collect all errors).</li>
	<li>Nested reports implement RecursiveIteratorIterator AND RecursiveTreeIterator (that's where the ASCII tree report came from!)</li>
	<li>A selector API for finding messages in complex nested reports (findMessages(["user.address.street.length"])).</li>
	<li>Reports are only generated when needed (true/false validation doesn't even touch the reporting system).</li>
	<li>Really easy to extend (most rules have a single method).</li>
	<li>Really easy to make inline rules:v::callback(function ($input) { return $input == 42; });</li>
	<li>Logic operations on any validator:v::allOf(v::numeric(), v::hexa(), v::min(1)); // numeric, hexadecimal and at least 1 v::oneOf(v::nullValue(), v::numeric()); // null or numeric</li>
	<li>Integrates with ZF1, ZF2 and Symfony2 validators if needed. Dependency is optional.</li>
	<li>A full concrete API (not relying on magic methods or chains) that can be built using dependency injection.</li>
	<li>Straightforward to use on unit tests instead of the PHPUnit assertion library.</li>
</ul>
</blockquote>
Here i wrote a simple User Model class where we can make our validation:

https://gist.github.com/stakisko/dfba7e1b576954232cd5

Validation will throw an exception when it fail and you can inform your users.
