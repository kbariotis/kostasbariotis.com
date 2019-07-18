---
title: "Dependency injection in Node.js"
path: "/drafts/dependency-injection-in-node-js/"
date: "2019-07-18"
draft: true
tags: Node.js
---

We strive to write more unit tests for our functions. Though they can be tough especially in situations where a function is having side effects, that is when it's communicating with the outer scope directly and not from its standard input or output. Let's have a look:

```JS
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

This is a simple module that you use across your application.

It can be tested using [Nock](https://github.com/nock/nock), a network interceptor, that will sit in the network card and assert certain connections. I am assuming that though to not be a unit test, but rather an integration test since the network request will actually reach the network card (or Node.js' `http` module). Also, it will make the test much slower since will go all the way through `axios` and reach the network ard.

How can we unit test that? We mock the `axios` object with a one that actually fakes work. This way the test will only test the code inside the function. Will be much faster and will actually do only what is intended to do.

How can we do that though in Node.js?

## Monkey patch

I have seen this over the years especially in the early days of Node.js, the days of prototype inheritance. The `axios` module would be attached to the exported object so it could be seen from the outside world. Using the `_` convention we could denote that is private. But tests would be able to patch it and pass a stub.

Here's an example:

```JS
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

The module is now exporting a singleton and you will be able to access `_client` thus able to stub it.

I don't like this approach for two reasons. First, since the exported module is a singleton, it means that if a test stubs the `_client` property, it will remain stubbed across all other places that have been required. You should be really careful to reset the stubbed version so other test files can function properly.

Second, it exposes public properties, which makes it dangerous for consumers.

## Dependency injection

Dependency injection is not a new concept and quite well known in other languages where monkey patching is not really feasible. In that, you are responsible to pass any dependencies of the module in runtime. Here's our first example with the `axios` module injected in our functions' signature:

```JS
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

Use currying from function programming to create a factory that will produce our function.

```JS
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

Have a convention to always pass all dependencies as the first argument of the function. This kind of creates a dependency injection container.

```JS
const externalServiceRoot = 'https://api.example-external-service.com';

async function callExternalService(dependecies, anArgument) {
  const { response } = await dependecies.client.post(`${externalServiceRoot}/an/endpoint`, anArgument);

  if (!response.success) {
    throw new Error('Response doesn\'t look good');
  }

  return response.data;
}

module.exports = { callExternalService };
```

## Dependency injection container

A dependency injection container handles is kind of what it seems to be. It contains all of your dependencies and you can pass that on your functions regardless of what it needs.

In addition, it handles the wiring of your modules as well. Instead, of directly requiring our `externalService` module, we are asking it from the container and it will make sure to return the needed function ready with its dependencies.

In Node.js, I have only used one such container and really never looked back. It's the [awilix container](https://github.com/jeffijoe/awilix).

Awilix is really powerful and once you get on track with it, it can really abstract most of the dependency injection hassling away from you.

We will see an example shortly, but before that, let's add another minor requirement to our `externalService` module. Let's require that we want the `externalServiceRoot` variable to be injected as well, because we want to hit a different endpoint based on the environment our app runs. It's different for production/staging and the local development. Dependency injection cannot only be used for stubbing dependencies.

Here's the final function using plain dependency injection.

```JS
async function callExternalService(client, externalServiceRoot, anArgument) {
  const { response } = await client.post(`${externalServiceRoot}/an/endpoint`, anArgument);

  if (!response.success) {
    throw new Error('Response doesn\'t look good');
  }

  return response.data;
}

module.exports = { callExternalService };
```

Right. Now the signature really starts to become bloated. Let's start with awilix.
