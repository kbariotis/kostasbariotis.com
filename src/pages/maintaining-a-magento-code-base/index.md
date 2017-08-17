---
title: "Maintaining a Magento code base"
path: "/maintaining-a-magento-code-base/"
date: "2014-09-08T17:23:58.000Z"
date_updated:   2014-11-19T17:11:02.000Z
tags: magento, code base, e-commerce
---

Magento is hard. No doubt about it. But this is not an excuse. Beside that (and a few other issues) it's still the number one e-commerce solution. It's proven.

So, i wanted to talk a little about how i maintaining my Magento projects.

<strong>1) I am keeping everything under version control</strong>

Magento's folder structure brings a lot of frustration. An extension can place it's files almost anywhere it's developer wants. It can be in base package theme either in package default theme. It can be in media folder for permanent files you want to keep under control either in /js folder for Javascript global libraries.

Keeping a .gitignore with all the Project's specific files is almost impossible.

Also, you can't carry with you your Project's modules, except using <a title="Composer with Magento" href="https://github.com/magento-hackathon/magento-composer-installer" target="_blank">Composer with Magento </a>which it's also complicate to work with. (Still struggling with it on Windows)

So, what i do is keep everything under version control, except temporary files like cache, logs, etc. etc.

<strong>2) Never touch core files</strong>

By never touching core files like in folders:
<ul>
	<li>app/code/core</li>
	<li>app/locale/</li>
	<li>app/design/frontend/(base|default|rwd)</li>
	<li>app/design/adminhtml/</li>
	<li>js/ (initial folders only)</li>
	<li>lib/ (initial folders only)</li>
	<li>skin/frontend/(base|default|rwd)</li>
	<li>includes/</li>
</ul>
you make sure that, when a feature release is out, you can just copy paste above you project and everything still works fine.

Keeping your Magento always up to date can save you from big disasters. I must make sure that feature releases wont be a pain to get.

<strong>3) Extend everything</strong>

In case you need to extend a Magento's core functionality or make it behave different, you are covered.

Magento's team had a purpose and only one. To make the most extensible e-commerce framework out there. They even sacrifice performance on this purpose. Now, some may argue that that was stupid or they didn't success after all. I will have to disagree with both.

Magento is a true PHP OOP project, powered by the most powerful framework, the <a title="Zend Framework" href="http://framework.zend.com/" target="_blank">Zend Framework</a>.

As about performance, these days you have a lot of tools in order to create a fast website. You may be hosted at an AWS super server, use fast caching methods, etc, etc.

<strong>4) Keep a local Magento with stuff i use a lot</strong>

After a few projects, i realized that a lot of processes were repeated again and again. The same modules i will installed on every fresh Magento install, the same configuration i would do. So i keep a private(yet!) Magento repository were i have all of my Modules and a clean Database dump with my configuration set.

How do you deal with your Magento projects? Share your tactics and technics with me on <a title="Kostas Bariotis on Twitter" href="http://twitter.com/kbariotis" target="_blank">Twitter </a>or bellow in the comments.
