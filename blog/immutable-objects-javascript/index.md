---
title: "Immutable Objects with Javascript"
path: "/immutable-objects-javascript/"
date: "2015-09-14T13:51:58.000Z"
date_updated:   2016-05-14T15:40:28.000Z
tags: javascript, node.js
---

There is no way, by default, to ensure that your Javascript Object you passed into a function will stay as is nevertheless. And that creates a problem and a lot of side effects.

To avoid this common pitfall we create immutable objects, those that no one can change during the app's lifecycle. By default, all Javascript types, except objects, define immutable values.

Have you ever tried to alter an object, say to delete a property, but you couldn't? Say to delete a Mongoose document's property? Mongoose documents are immutable and their properties can't be alter in any way, except of altering their actual values that they're holding.

###Cloning objects in Javascript
So what do we do when we need to alter them? We clone them.

The most easy way to clone an object is the simple hack:
```js
var object = { firstname: 'Kostas', lastname: 'Bariotis' };

var clone = JSON.parse(JSON.stringify(object));
```

That hack have been always working for me and I'm using in every chance I've got.

For Node.js/jQuery users there are also the appropriate `extend` methods:
```js
var extend = require('util')._extend;
var clone = extend({}, object);
```

```js
var clone = jQuery.extend({}, object);
```

There is also [this](http://stackoverflow.com/a/728694/1955940) answer that covers a generic `clone` functionality.

###Create immutable Javascript objects
There are two ways:

1. [Object.definePropety()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
Using Javascript's `defineProperty` we can create non configurable and/or hidden properties inside objects. This way we can be sure that a developer can't mess with our code or hide from them info about our structures that they don't have to know about. **`defineProperty` won't throw an error while you're trying to alter the object's properties and this can really be a PITA.**

2. [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) / [Object.seal()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
`freeze` and `seal` are basically shorthands for the `defineProperty` and can both come in handy. Make sure that their compatibility tables meet your needs before you use them. **Will throw an error and will save you hours of frustration.**

##The End
Next time you are writing a Javascript module and you are exposing objects that other developers may use, make sure that they have the exact needed permissions to alter your objects, otherwise they may broke your code without even realising it. Make sure also to document it.
