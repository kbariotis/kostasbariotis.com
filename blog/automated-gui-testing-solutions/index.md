---
title: "Automated GUI Testing Solutions"
path: "/automated-gui-testing-solutions/"
date: "2016-01-08T06:03:02.000Z"
date_updated:   2016-05-14T15:40:03.000Z
tags: GUI, javascript, Testing, node.js
---

I gave a talk entitled [TDD with Node.js](http://slides.com/kostasbariotis/tdd-nodejs) in the ~~latest~~ [SKGNode.js meetup](https://www.meetup.com/Thessaloniki-Node-js-Meetup/). I explained the concept of TDD and described my tools of choice for integrating the TDD flow with Node.js. It was great.

I didn't got into GUI testing and I saw a major interest on that. So I decided to take a look at the current state of GUI testing. Here are the main tools that I came up with:

## Zombie.js
[Zombie](http://zombie.js.org/) uses [jsdom](https://github.com/tmpvar/jsdom) to parse the required HTML and Javascript and then simulate the desired behaviour. I find it a great tool for testing basic functionality in small apps.

JSDom will create an in memory representation of the DOM and execute any Javascript dependencies so you can do a real testing scenario. Since it doesn't uses a real browser engine you can't find abnormalities of real world situations. So you can't rely on it for cross browser compatibility.

I got very frustrated while trying to test AJAX powered pages. For SPA apps, Zombie wouldn't be an ideal solution.

## Casper.js
[Casper](http://casperjs.org/) on the other hand, is a wrapper around [Phantom.js](http://phantomjs.org/) which utilises a [Webkit](https://webkit.org/) headless browser and will do a full rendering of your web page in order to test it. Since you will have a full representation of your site you can even [take screenshots for easier QA](https://github.com/sindresorhus/pageres).

Casper.js has neat documentation and it's API is really easy to follow and adopt.

## Nightwatch.js
Now, on the heavy side, we have [Selenium](http://www.seleniumhq.org/). Selenium is a set of projects. It started off by auto running browsers and injecting code into them so we can test it. Since then, browsers vendors kept evolving and expose a full set of control over their browsers so Selenium has native support over those, with the [Selenium WebDriver](http://www.seleniumhq.org/projects/webdriver/).

You will have to install all the browsers you need to test locally and then use Selenium to run tests on them. It's pretty basic.

Selenium's internals and configuration is a bit overcomplicated and if you don't need it, you don't have to get into it. [Nightwatch](http://nightwatchjs.org/) is a great layer of abstraction on top of Selenium that will do all the heavy work for you.

#At the end
I am sure there are tone of other solutions out there. Although, you will have to do a research on your own before starting your GUI testing journey, at then end just pick one and start.

Are you using something already? What's that?
