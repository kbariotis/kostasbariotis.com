---
title: "removeEventListener and this"
path: "/removeeventlistener-and-this/"
date: "2017-01-17T14:46:20.000Z"
date_updated:   2017-01-19T11:04:25.000Z
tags: javascript, DOM
---

Have you ever tried to call `removeEventListener` on a previously attached element and couldn't remove it? Did you maybe try to pass a function to `addEventListener` that is bound to another context?

The context of the callback that we are passing to `addEventListener` is the same as the event.currentTarget when is being called. The problem is that when we bind the callback to another object, we can't remove it afterward.

Lets see an example:

```js
let element = document.createElement('button');

let callback = function (e) {
  console.assert(e.currentTarget === this);
}

element.addEventListener('click', callback);

element.dispatchEvent(new Event('click'));
```

In the example above, the assertion inside the callback is always going to be true. Great? Great. But that's not the case. Consider something like this:

```js
let Button = function () {
  this.el = document.createElement('button');
  this.addEvents();
}

Button.prototype.addEvents = function () {
  this.el.addEventListener('click', this.clickHandler.bind(this));
}

Button.prototype.clickHandler = function () {
  /* do something with this */
}
```

Great! I am trying to model my Button element and I need the event handlers to bind to the model itself.

Now let's try to remove the attached handler.

```js
let Button = function () {

  this.el = document.createElement('button');
  this.addEvents();
}

Button.prototype.addEvents = function () {
  this.el.addEventListener('click', this.clickHandler.bind(this));
}

Button.prototype.removeEvents = function () {
  this.el.removeEventListener('click', this.clickHandler);
}

Button.prototype.clickHandler = function () {
  /* do something with this */
}
```

The above won't work. Meaning that the `removeEventListener` won't actually remove the attached event handler. It will simply skip it. (And certainly if we bind again at the `removeEventListener` won't work). See, bind returns always a new function while `removeEventListener` and `addEventListener` second parameter must refer to the same function object.

So what do we do when we need to remove our attached event handlers at some point at runtime? Meet `handleEvent`, the default function that JavaScript looks for when tries to find a handler that has been attached to an event.

```js
let Button = function () {

  this.el = document.createElement('button');
  this.addEvents();
}

Button.prototype.addEvents = function () {
  this.el.addEventListener('click', this);
}

Button.prototype.removeEvents = function () {
  this.el.removeEventListener('click', this);
}

Button.prototype.handleEvent = function (e) {
  switch(e.type) {
    case 'click': {
     this.clickHandler(e);
    }
  }
}

Button.prototype.clickHandler = function () {
  /* do something with this */
}
```

Note how I pass only `this` to the `addEventListener`/`removeEventListener` functions.  `addEventListener` accepts objects as well. This way, JavaScript will look for the `handleEvent` function and call it with the event passed.

This way we are able to remove the event listeners while `this` inside `clickHandler` is correctly set to the `Button` class.

Another possible solution would be to keep a reference to the binded function and then remove that.

```js
let Button = function () {

  this.el = document.createElement('button');
  this.clickHandler = this.clickHandler.bind(this);
  this.addEvents();
}

Button.prototype.addEvents = function () {
  this.el.addEventListener('click', this.clickHandler);
}

Button.prototype.removeEvents = function () {
  this.el.removeEventListener('click', this.clickHandler);
}

Button.prototype.clickHandler = function () {
  /* do something with this */
}
```

I still like the `handleEvent` function because I keep my event handlers in a single place and I don't pollute the constructor with meaningless bindings.

All of the above behaves exactly the same way using the class keyword of ES6.

Have you ever run into a similar situation? What did you do? Leave me a comment! :)
