---
title: "Hands on React.js"
path: "/hands-on-react-js/"
date: "2015-03-29T17:25:06.000Z"
date_updated:   2016-05-14T15:41:06.000Z
tags: reactjs, javascript, node.js
---

I haven't really gotten into [React.js](https://facebook.github.io/react/) yet, even though I have heard about it about a year ago. It was this video, [about react-native](https://www.youtube.com/watch?v=KVZ-P-ZI6W4) and how you can build native iOS apps  with Javascript, that really got me thinking.

So, I started searching around, reading the [docs](https://facebook.github.io/react/docs/getting-started.html), reading what others [think](http://blog.reverberate.org/2014/02/react-demystified.html) [of it](http://blog.andrewray.me/reactjs-for-stupid-people/) and playing with this [amazing piece of code](https://github.com/RickWong/react-isomorphic-starterkit). But before you go too deep, let me straighten out some facts for you.

##What React isn't
React is not a complete framework, kit or anything else. From the homepage:

> A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES

You won't be able to use it on it's own. React is a library. People refer to it as the [**V**](http://blog.codinghorror.com/understanding-model-view-controller/) from the [**MVC**](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). But even as is, it does a hell of amazing job. Here's why.

##React Components
React consists of components. You may have already heard about [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that  allow us to create custom HTML tags and include them anywhere on the outside world as easile as we include an `H1` tag. React components work just like this but can only be used inside the React ecosystem.

Furthermore, Facebook implemented a [new syntax language](http://facebook.github.io/jsx/) based on XML in order to compile their new XML based Components into vanilla Javascript. By doing this, we are able to write HTML inside Javascript and not being worry about it.

What? Did I just say HTML inside Javascript? Isn't that against the whole MVC movement? Well sort of... But React's team thinks this wa,y we will be able to maintain our code more easily since it exists on fewer files. Newcomers will get their hands on our code more quickly.The new language JSX looks like this:
```js
React.render(
	<h1>Hello, world!</h1>,
    document.getElementById('example')
);
```

Lets talk a little bit more about the components. A component is basically a Javascript class that only knows how to render itself. A component can also contain child components it communicates with. This can help us write more modular code.

Think of a `List` element. We will write a List component that will contain a `ListItem` component. Every time we need to display it, the `List` component will render a `<ul/>` tag with a bunch of `ListItem` components,, and each of these `ListItem`s will render `<li/>`, each with their information.

But wait? Did you said... render... every time? Like every time someone adds something in the list we will rerender it?

##Reconciliation
Enter the [Virtual DOM magic, or in React's terms, the Reconciliation](https://facebook.github.io/react/docs/reconciliation.html). The essence of React. React will not render directly to the DOM every time something changes. Instead, it will render to its own internal DOM (the Virtual DOM) and then  compute diffs on the real DOM. React makes only the appropriate changes to the DOM to reflect the new changes. We never have to interact with the DOM again. We may never even have to write external stylesheets. React [has you covered](http://facebook.github.io/react/tips/inline-styles.html).

##Conclusion
I would suggest getting your hands on the React's documentation as fast as possible. There are a lot of concepts you need to understand in order to grasp its full potential.

As I said, in the beginning, it was [react-native](https://github.com/facebook/react-native) that forced me to play with React. But there are a [lot](http://blog.risingstack.com/from-angularjs-to-react-the-isomorphic-way/) [more](https://facebook.github.io/flux/) goodies to explore and I haven't play with all of them yet.
Until next time, take care!

*Please let me know if I missed or misunderstood something, since it's my second day using React. If you liked my article please share it. :)*

*I have to thank [Matthew Lewis](http://mplewis.com/) for reviewing this article. Thank you Matt.*

