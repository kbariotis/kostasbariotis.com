---
title: "Environment based application configuration using Webpack"
path: "/environment-based-application-configuration-using-webpack/"
date: "2017-05-14T09:47:37.000Z"
date_updated:   2017-05-14T11:35:09.000Z
tags: webpack
---

I am using webpack a lot. A common pattern I am constantly using is how to manage the application specific configuration between different environments. I want to be able to set different API URLs, access codes, feature flags for every environment of my team's workflow.

In this post, I will try to explain why we need application specific configuration and I am using it. Then I will show you two common techniques and why I chose the second one. It's fairly small as the horizontal scrollbar on right says.

## An example

Let's start with a simple app. Of course, it does absolutely nothing. It's just a theoretical fully working application:

```js
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import Raven from 'raven-js';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://graphql.example.com',
  }),
});

Raven.config('https://4a426bd18cd86e90b186dcbfa3ce1b0d@sentry.io/321321').install();

client.query({
  query: gql`
    query TodoApp {
      todos {
        id
        text
        completed
      }
    }
  `,
})
  .then(data => console.log(data))
  .catch(error => Raven.captureException(error));

```

Notice the various constants across this simple snippet. We have our GraphQL's API Url and the Sentry's access code. We want to build the above snippet for two different environments, the production one, and the staging. But we want the production environment to talk to our production GraphQL API while the staging to talk to the staging one. The same goes for the Sentry access code, different for every environment (Sentry supports error tags though, that's just an example.)

Great so let's rewrite:

```js
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: __CONFIG__.graphql.endpoint,
  }),
});

Raven.config(__CONFIG__.sentry.code).install();

client.query({
  query: gql`
    query TodoApp {
      todos {
        id
        text
        completed
      }
    }
  `,
})
  .then(data => console.log(data))
  .catch(error => Raven.captureException(error));

```

Great! Notice the constants I have put in. Now we need to properly assign those constants depending on the environment.

Before we do that, let's take it a step further. I want Sentry to be enabled only on the production environment. I need a toggle switch.

```js
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: __CONFIG__.graphql.endpoint,
  }),
});

if (__CONFIG__.sentry.is_enabled) {
  import Raven from 'raven-js';
  Raven.config(__CONFIG__.sentry.code).install();
}

const logger = (e) {
  if (Raven) {
    Raven.captureException(e);
  } else {
    console.error(e);
  }
}

client.query({
  query: gql`
    query TodoApp {
      todos {
        id
        text
        completed
      }
    }
  `,
})
  .then(data => console.log(data))
  .catch(error => logger(error));

```

Again, `__CONFIG__.sentry.is_enabled` will only be true on the production environment. When it's false, will never initialize it.

## Searching for a solution

Let's see now how we can actually achieve this. First, we need the configuration management. [node-config](https://github.com/lorenwest/node-config) would be great for this. Just install it, write some configuration files and load it in your webpack configuration like this:

```
const config = require('node-config');
```

`config` here will be the environment specific configuration you have defined. Now we need to inject that into our application entry file.

One way would be to create a module alias. Then you can just import from every file you are going to need it. Although you may need to adjust it a bit to use it with `node-config`, it's fairly simple and works in most cases.

One caveat here is that the configuration is being imported into your application and just sits there, whether you are using it or not. Configuration values that are not being used are still there, which may even be considered as a security flaw. We don't want that.

A better solution would be webpack's [DefinePlugin](https://webpack.js.org/plugins/define-plugin/). DefinePlugin will replace every occurrence of a key you are passing it with its respective value on compile time.

So this:

```js
if (__CONFIG__.sentry.is_enabled) {
  import Raven from 'raven-js';
  Raven.config(__CONFIG__.sentry.code).install();
}
```

will become

```js
if (false) {
  import Raven from 'raven-js';
  Raven.config(__CONFIG__.sentry.code).install();
}
```

on the staging environment. What's even greater about that, is that webpack will pass it (using UglifyJS) and completely remove it since it's never going to be used.

Heads up though!

> Note that because the plugin does a direct text replacement, the value given to it must include actual quotes inside of the string itself. Typically, this is done either with either alternate quotes, such as '"production"', or by using JSON.stringify('production').

You need to write your configuration respectively because of that.

The webpack configuration will look like this:

```js
const path = require('path');
const webpack = require('webpack');
const config = require('config');

module.exports = {
  entry: './index.js',
  plugins: [
    new webpack.DefinePlugin({
      __CONFIG__: packinize(config)
    })
  ],
  output: {
    filename: 'app.bundle.js',
    path: "/path.join(__dirname, 'dist')/"
  }
}
```

We pass `node-config` into `packinize` which will pass every value and stringify it. Then we feed the result into DefinePlugin.

## To conclude

I am using configuration files as much as possible. For constants that are being varied based on the environments, API URLs, access codes, feature flags, toggle switches. Being able to manipulate the end code based on those values is just awesome!

I have added an example to my [webpack-patterns collection](http://github.com/kbariotis/webpack-patterns). Take a look and let me know what you think.

How are you using your application specific configuration when you use webpack? Or any other bundler?
