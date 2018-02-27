---
title: "The road to Client Side Javascript"
path: "/state-of-client-side-js-frameworks/"
date: "2015-09-19T09:54:54.000Z"
date_updated:   2015-09-20T07:15:08.000Z
tags: javascript, client-side, frameworks
---

Client Side JS frameworks have come a long way. Since the rise of [Backbone.js](http://backbonejs.org/) back at 2010, the way we write Javascript and everything about it has changed. A lot of frameworks have born, almost one for every need. But what does a Client Side JS framework consists of? Should I adopt one out of the wild or write my own? As always, it depends. And you should do your [homework](https://medium.com/@kbariotis/choosing-your-next-best-tool-fba96eb19a7f) before choosing one or the other.

I've come up with a list of six concepts you should consider adopting on your next setup.

###MV*
Whether it's MVC or any other convention, your framework should have a standard way of doing things, naming things and moving around things. Never write or mix JS inside HTML unless you know what you're doing. When you're in a seek for a file, you should know exactly where to look and it has to be there.

A structure like that should help you organise your code. Keeping everything where it should be. Organise both by type and module, so many teams can work on different parts of the project and not having conflicts.

Backbone.js first taught us how to organise our code, using the [MVP pattern](http://addyosmani.com/blog/understanding-mvc-and-mvp-for-javascript-and-backbone-developers/). Since then lots of conventions have come up.

###Dependency Injection / Dependency Management
Modularizing everything is not only a current trend but a trend that our developers ancestor would like us to follow. It will allow you for much code reusability and less duplication. Modules are easy to share, as easy as is to use other's people modules.

But those modules must be managed and be injected in the appropriated places and not everywhere. They should also be called by the modules that need them and not by a `script` tag or any other place, keeping also the required HTTP calls for dependencies at the greatest low.

Your framework can do some sort of [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection). Each place of your application, should load only the modules it needs. [Angular's powerful DI](https://docs.angularjs.org/guide/di) system does lazy loading only the modules you need each time. From the docs:

>The Angular injector subsystem is in charge of creating components, resolving their dependencies, and providing them to other components as requested.

###2 Way Data Bindings
I first saw this concept with [Angular](https://docs.angularjs.org/guide/databinding). I've never encountered something like that before and I am not sure if it was exist. But that blew up my mind.

Imagine a form with 10 input fields and an object that you just fetched from the server. Now you need to populate the form with that object so the user can edited, hit save and send the object back to the server.

You start by selecting fields using a library like jQuery. One after the other and then put the appropriate field of the object into that field. You could also use a function that will take the name of each field in the form and seek that property inside the object.

This is what I am talking about. All that, should be done by the framework. Not you. And it should be done in a clever, performant and robust way. Make sure your framework support this.

###Virtual DOM diffing
Oh, the Virtual DOM. The sugar on top of everything. DOM manipulation is expensive. Even though computing resources are cheap and almost in saturation, still DOM is expensive. So what we do? Instead of talking to the DOM directly, we talk to a Virtual DOM, one that is in memory. When we done and we want to render, we compute a diff between the real DOM and the Virtual DOM. So we render only the changes. In other words, we apply a patch on top of the real DOM. Much like how git works.

[React](http://kostasbariotis.com/hands-on-react-js/) works that way. By componetizing our DOM, we almost never compute the diff in the whole DOM, just inside the components we like to rerender.

This is pretty much a safe technique and I would say although not a must, you should consider adopting it. Comes handy, especially on those, rich with data, UIs where frequently rerendering is required.

###Client Side Routing
Doing Server requests while bouncing on a web site's pages is time expensive. What if we could only load the assets we need to render a specific page and let the browser know, so a User can hit the Back button and go the previous state? This is the Client Side routing which every major framework supports out of the box.

This site runs with [pjax](http://www.pixelstech.net/article/1366737736-What-is-pjax-and-why-we-should-use-it) the simplest client side routing technique. Open Developer Tools at the Network tab and see it your self.

Although, Client Side routing hides troubles, especially with SEO, it's a neat technique.  Lots of big players, like Youtube and Twitter, are using for a long time now.

And this brings me to the final feature:

###Isomorphic / Universal Javascript
[Meteor.js](https://www.meteor.com/) first gave us the opportunity to run the same code both in the Server side and in the Client side. Imagine if we could allow a User to use the Client Side app while letting Users (or search engines) with no or limited Javascript support on their Browsers to use our Server Side app. This must be the real deal. (BTW, of course [Google can understand Javascript](http://searchengineland.com/tested-googlebot-crawls-javascript-heres-learned-220157))

After Meteor.js, Isomorphic Javascript got showed up everywhere while Airbnb's [Rendr](http://nerds.airbnb.com/weve-open-sourced-rendr-run-your-backbonejs-a/) framework was introduced. Since then, [Isomorphic](http://isomorphic.net/) evolved into the so called [Universal Javascript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) that made our apps [even faster](http://techblog.netflix.com/2015/08/making-netflixcom-faster.html).

In case that you need the best of the two worlds, Server side and Client size, this must be the feature you need.

##Closing
Client Side Javascript have become a trivial part of our every day's development life. Keeping it updated, organised and features full can guarantee a performant project and/or business.

I will try, on a future post, to write an implementation of the above, using separate modules that I've picked out of the wild. In cases where you can't/want to use a framework, building your own client side infrastructure is absolutely OK.

**So, what are your favorite concepts of a Client Side Javascript framework?**
