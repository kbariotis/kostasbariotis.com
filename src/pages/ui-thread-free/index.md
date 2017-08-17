---
title: "UI thread free"
path: "/drafts/ui-thread-free/"
date: "2015-10-15T00:00:00.000Z"
draft: true
---

With the rise of the upcoming [WebWorkers API](http://www.w3.org/TR/workers/) in the horizon, interesting things are emerging. And the one that got me go "whhaaaaat??" is the one that advices you to put all of your business logic inside a WebWorker. Whaaaaat?

A WebWorker is a separate thread that runs Javascript but has no access to the DOM or the `window` object. But it can do complex queries and loops, accessing core [functions and APIs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers), while you are letting the main thread, the UI thread, to handle the UI stuff only.

Rendering the DOM is so expensive, specially when it comes to complex interfaces we have nowadays. Not so long ago, the [VirtualDOM](https://facebook.github.io/react/docs/reconciliation.html) introduced which tried to speed up the rendering process by rendering only what actually changed, instead of re-rendering the whole page. But, that's not enough apparently, since even such few changes can't be handle well by low powered devices such as mobiles phones and watches.

In order to keep the 60fpm barrier, we are completely freeing the main thread to be able to handle the rendering only and we start WebWorkers to handle our business logic.

I found [two](http://www.pocketjavascript.com/blog/2015/11/23/introducing-pokedex-org) [great](https://medium.com/@nsisodiya/flux-inside-web-workers-cc51fb463882#.iv69h6ih2) examples of this concept. Both, they are suggesting keeping the whole app outside the main thread and send there only the patch of the changed DOM to be rendered. The UI thread can then handle only rendering and complex fancy animations.

Oh, by the way, Nodejs fans, [Workers are coming](https://github.com/nodejs/node/pull/2133).
