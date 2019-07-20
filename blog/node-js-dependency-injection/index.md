---
title: "Dependency injection in Node.js"
path: "/dependency-injection-in-node-js/"
date: "2019-07-20"
tags: Node.js, Dependency Injection, awilix
---

This article is about how to achieve [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) in Node.js using [awilix](https://github.com/jeffijoe/awilix), a Dependency Injection Container I have been personally using for quite some time now. I will use unit testing as a use case where dependency injection can be helpful, but needless to say, its purpose is far more greater than just that.

I've seen different patterns over the years and this is a summary of what led me to use dependency injection. Node.js, and JavaScript, being a dynamic language, can support different techniques and even forgive the wrong ones. My goal is to achieve a standard technique to use across all of my projects and teams I am working on.

## The case of unit testing

We strive to write more unit tests for our functions. Though they can be tough especially in situations where a function is having side effects, that is when it's communicating with the outer world directly and not from its standard input or output. Let's have a look:

```javascript
const client = require('axios');

const externalServiceRoot = 'https://api.example-external-service.com';

async function callExternalService(anArgument) {
  const { response } = await client.post(`${externalServiceRoot}/an/endpoint`, anArgument);

  if (!response.success) {
    throw new Error('Response doesn\'t look good');
  }

  return response.data;
}

module.exports = { callExternalService };
```

Here's a simple module that you intent to use in your application. Probably multiple times.

It can be tested using [Nock](https://github.com/nock/nock), a network interceptor, that will sit in the network card and assert certain connections going through. I am assuming that though to not be a unit test, but rather an integration test since the network request will actually reach the network card (or Node.js' `http` module). Also, it will make the test much slower since will go all the way through `axios`.

How can we unit test that? We mock the `axios` object with a one that actually does a fake request. This way the test will only test the code inside the function. Will be much faster and will actually do only what is intended to do, that is to only test the code inside our function.

How can we do that though in Node.js?

## Monkey patch

I have seen this over the years especially in the early days of Node.js, the days of prototype inheritance. The `axios` module would be attached to the exported object so it could be seen from the outside world. Using the `_` convention we could denote that is private. But tests would be able to patch it and pass a stub.

Here's an example:

```javascript
const axios = require('axios');

function ExternalServiceConstructor() {
  this._client = axios;
}

ExternalServiceConstructor.prototype.callExternalService(anArgument) {
  const { response } = await this._client.post(`${externalServiceRoot}/an/endpoint`, anArgument);

  if (!response.success) {
    throw new Error('Response doesn\'t look good');
  }

  return response.data;
}

module.exports = new ExternalServiceConstructor();
```

The module is now exporting a singleton and you will be able to access `_client` thus able to stub it. (Nowadays, same effect can be achieved using the `Class` keyword or `Object.create` for less boilerplate code)

I don't like this approach for two reasons.

First, since the exported module is a singleton, it means that if a test stubs the `_client` property, it will remain stubbed across all other places that have been required. You should be really careful to reset the stubbed version so other test files can function properly.

Second, it exposes public properties, which makes it dangerous for consumers. People will try to be smart and alter it.

## Dependency injection

Dependency injection is not a new concept and quite well known in other languages where monkey patching is not really feasible. In that, you are responsible to pass any dependencies of the module in runtime. Here's our first example with the `axios` module injected in our functions' signature:

```javascript
const externalServiceRoot = 'https://api.example-external-service.com';

async function callExternalService(client, anArgument) {
  const { response } = await client.post(`${externalServiceRoot}/an/endpoint`, anArgument);

  if (!response.success) {
    throw new Error('Response doesn\'t look good');
  }

  return response.data;
}

module.exports = { callExternalService };
```

Now the consumer is responsible to pass the module whenever he's calling the `callExternalService` function. That can be painful though and not be providing the best developer experience. First, the functions signature is bloated with mixed arguments and second you may have to do that all the time which creates redundancy and duplication.

Here are some other patterns I've seen and used my self.

### Function factory

Use currying from functional programming to create a factory that will produce our final function.

```javascript
const externalServiceRoot = 'https://api.example-external-service.com';

function makeCallExternalService(client) {
  return async function callExternalService(anArgument) {
    const { response } = await client.post(`${externalServiceRoot}/an/endpoint`, anArgument);

    if (!response.success) {
      throw new Error('Response doesn\'t look good');
    }

    return response.data;
  }
}

module.exports = { makeCallExternalService };
```

Call the `makeCallExternalService` with the client and you have your function.

### Dependencies always as the first argument

Have a convention to always pass all dependencies as the first argument of the function.

```javascript
const externalServiceRoot = 'https://api.example-external-service.com';

async function callExternalService(dependencies, anArgument) {
  const { response } = await dependencies.client.post(`${externalServiceRoot}/an/endpoint`, anArgument);

  if (!response.success) {
    throw new Error('Response doesn\'t look good');
  }

  return response.data;
}

module.exports = { callExternalService };
```

## Dependency injection container

A dependency injection container is kind of what you think. It contains all of your dependencies. It's responsibility is to construct all of your classes or modules thus abstracting that bit away from your business logic.

In addition, it handles the wiring of your modules as well. Instead, of directly requiring our `externalService` module, we are asking it from the container and it will make sure to return the needed function ready with its dependencies.

In Node.js, I have only used one such container and really never looked back. It's the [awilix container](https://github.com/jeffijoe/awilix).

awilix is really powerful and once you get on track with it, it can really abstract most of the dependency injection hassling away from you.

We will see an example shortly, but before that, let's add another minor requirement to our `externalService` module. Let's require that we want the `externalServiceRoot` variable to be injected as well, because we want to hit a different endpoint based on the environment our app runs. It's different for production/staging and the local development. Dependency injection cannot only be used for stubbing dependencies.

Here's the final function using plain dependency injection.

```javascript
async function callExternalService(client, externalServiceRoot, anArgument) {
  const { response } = await client.post(`${externalServiceRoot}/an/endpoint`, anArgument);

  if (!response.success) {
    throw new Error('Response doesn\'t look good');
  }

  return response.data;
}

module.exports = { callExternalService };
```

Right. Now the signature really starts to become bloated. Let's start with awilix. We will start by feeding configuration values that will come from environment variables.

```javascript
const { createContainer, asValue } = require('awilix');

const container = createContainer();

container.register({
  externalServiceRoot: asValue(process.env.EXTERNAL_SERVICE_ROOT)
});
```

Great, now our container is aware of the configuration values. `asValue` simply instructs awilix to pass that value as is, whenever someone requires the `externalServiceRoot` variable.

What I personally like to do though is adding an extra guard here to not allow our app to continue without that value. You could use a configuration manager to handle that for you, but for now let's do some changes.

```javascript
const { createContainer, asFunction } = require('awilix');

const container = createContainer();

container.register({
  externalServiceRoot: asFunction(() => {
    if (!process.env.EXTERNAL_SERVICE_ROOT) {
      throw new Error('EXTERNAL_SERVICE_ROOT is not defined.')
    }

    return process.env.EXTERNAL_SERVICE_ROOT;
  }
});
```

Now `asFunction` is a little different, as it will actually run that function whenever someone requires that variable.

Great. That's our first dependency of the `callExternalService` function. Now we need to pass the `axios` module. In an ideal world, you would actually pass a module that follows a specific interface, otherwise you are coupling your code to `axios` and making it harder later to switch to another HTTP client library. For now, let's suppose that `axios` follows our standard interface.

```javascript
const { createContainer, asFunction, asValue } = require('awilix');
const axios = require('axios');

const container = createContainer();

container.register({
  client: asValue(axios)
});

container.register({
  externalServiceRoot: asFunction(() => {
    if (!process.env.EXTERNAL_SERVICE_ROOT) {
      throw new Error('EXTERNAL_SERVICE_ROOT is not defined.')
    }

    return process.env.EXTERNAL_SERVICE_ROOT;
  }
});
```

Now our container is aware of our HTTP client as well. It's time to put everything together. We will use the function factory from above.

```javascript
const { createContainer, asFunction, asValue } = require('awilix');
const axios = require('axios');

const container = createContainer();

// The container will be passed to this function with
// everything is contained. awilix is smart enough to
// understand what exactly you are requiring.
function makeCallExternalService({ client, externalServiceRoot }) {
  return async function callExternalService(anArgument) {
    const { response } = await client.post(`${externalServiceRoot}/an/endpoint`, anArgument);

    if (!response.success) {
      throw new Error('Response doesn\'t look good');
    }

    return response.data;
  }
}

container.register({
  callExternalService: asFunction(makeCallExternalService)
})

container.register({
  client: asValue(axios)
});

container.register({
  externalServiceRoot: asFunction(() => {
    if (!process.env.EXTERNAL_SERVICE_ROOT) {
      throw new Error('EXTERNAL_SERVICE_ROOT is not defined.')
    }

    return process.env.EXTERNAL_SERVICE_ROOT;
  }
});

module.exports = container;
```

That's nice. We created the factory that takes our container as an input, thus we can request any value we passed to it so far and produces the function we want injected with these values.

When we pass the factory `makeCallExternalService` to awilix, it knows to run the function and pass its return value to whoever is requiring it. The return value will be our final function with all of its dependencies.

Let's try and use that function now.

```javascript
// require the container from above
const container = require('./container');

// Will fail if the environment doesn't contain
// the EXTERNAL_SERVICE_ROOT variable
const callExternalService = container.resolve('callExternalService');

// Call the function that was produced from the
// makeCallExternalService function factory
callExternalService('argument')
```

Amazing. Everything is wired and being handled by the container it self. We can use this function across our application and we can also do that for integration testing possibly with `nock`. But what's also amazing, is that our function is now able to be tested against stubs. Let's do that.

```javascript
// -- src/callExternalService.js

// We have moved our function to another file

function makeCallExternalService({ client, externalServiceRoot }) {
  return async function callExternalService(anArgument) {
    const { response } = await client.post(`${externalServiceRoot}/an/endpoint`, anArgument);

    if (!response.success) {
      throw new Error('Response doesn\'t look good');
    }

    return response.data;
  }
}

module.exports = { makeCallExternalService };

// -- callExternalService.test.js

// This is our unit test

// This time we require our function directly,
// not through the container
const { makeCallExternalService } = require('./callExternalService')

// HTTP Client stub
const client = {
  post: Promise.resolve({ response: { data: { success: false } } });
}

// Produce the function under test
// by passing our stubs
const callExternalService = makeCallExternalService({
  externalServiceRoot: 'FAKE_ROOT',
  client,
})

describe('callExternalService', () => {
  context('with false success response', () => {
    it('should throw', () => {
      expect(() => callExternalService('argument')).to.throw('Error');
    })
  })
})
```

There you have it. Unit testing our function with stubs. We have our container loaded with our dependencies and modules that we can use across our app. We don't have to worry about wiring our modules together. Every time we write a new module, we know exactly where to find any dependency, how to request them, and all we focus on is the task on hand.

## Conclusion

I advice you to take a look on [its repository](https://github.com/jeffijoe/awilix) and go through its documentation and examples. Also, I have found this [API boilerplate](https://github.com/talyssonoc/node-api-boilerplate) that uses awilix, and also makes uses of many best practices. It's a great read even if you don't intent to use it as is.

The above was an oversimplified example of how dependency injection with awilix can be achieved on Node.js. In practice, as the project grows, other complications arise, like the container being bloated it self. awilix is an amazing library though and has most of this issues solved already.

I would be curious to know how do you handle dependency injection in your projects. Leave a comment below.
