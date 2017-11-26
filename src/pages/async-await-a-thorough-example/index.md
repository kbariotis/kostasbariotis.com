---
title: "Async/await - A thorough example"
path: "/async-await-a-thorough-example/"
date: "2017-11-24T09:40:42.000Z"
tags: Node.js, AsyncAwait
---

With the eighth (8) version of Node.js becoming an LTS, I think that this is a good time to consider switching to it and enjoy the awesome new [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) feature that will help us move away to an even more readable and synchronous flow. Promises served us well for the past 2 or so years but they came with frustration as well.

In this post, I will try to provide a real world example of how we can move a Promise-based REST API controller to an async/await style. This way we can have a better understanding of how things have changed and what are the benefits of such a move.

## A Promise-based example
Let's take an example and move from there. This is an actual controller (slighty changed for the purposes of this post) from a project of mine I've been working on:

```Javascript
const BPromise = require('bluebird');

const { WrongCredentialsError, DBConnectionError, EmailError } = require('./../errors');

/**
 * Emulate an Express.js route call as an example
 */
loginController({}, { json: response => console.log(response) }, null)

function loginController (req, res, err) {
  const { email, password } = req;

  let user;

  BPromise.try(() => validateUserInput(req))
    .then(() => fetchUserByEmail(email))
    .then(fetchedUser => user = fetchedUser)
    .then(() => comparePasswords(req.password, user.password))
    .then(() => markLoggedInTimestamp(user.userId))
    .then(() => sendEmail(user.userId))
    .then(() => generateJWT(user))
    .then(token => res.json({ success: true, token }))
    .catch(WrongCredentialsError, () => res.json({ success: false, error: 'Invalid email and/or password' }))
    .catch(EmailError, DBConnectionError, () => res.json({ success: false, error: 'Unexpected error, please try again' }))
    .catch(() => res.json({ success: false }))
}

/**
 * Validate input from Request
 *
 * @param {Object} input
 * @throws {WrongCredentialsError}
 * @returns {Void}
 */
function validateUserInput(input) {
  if (!input.email || !input.password) {
    throw new WrongCredentialsError();
  }
}

/**
 * Fetch a User from the DB by Email
 *
 * @throws WrongCredentialsError
 * @throws DBConnectionError
 * @returns {BPromise}
 */
function fetchUserByEmail(email) {
  const user = {
    userId: 'DUMMY_ID',
    email: 'konmpar@gmail.com',
    password: 'DUMMY_PASSWORD_HASH'
  }
  return new BPromise(resolve => resolve(user));
}

/**
 * Compare two password
 *
 * @param {String} inputPwd
 * @param {String} storedPwd
 * @throws {WrongCredentialsError}
 * @returns {Void}
 */
function comparePasswords(inputPwd, storedPwd) {
  if (hashPassword(inputPwd) !== storedPwd) {
    throw new WrongCredentialsError();
  }
}

/**
 * Hash password
 *
 * @param {String} password
 * @returns {String}
 */
function hashPassword(password) {
  return password;
}

/**
 * Mark a user's logged in timestamp
 *
 * @param {String} userId
 * @throws DBConnectionError
 * @returns {BPromise}
 */
function markLoggedInTimestamp(userId) {
  return new BPromise(resolve => resolve());
}

/**
 * Send a follow up email
 *
 * @param {String} userId
 * @throws EmailError
 * @returns {BPromise}
 */
function sendEmail(userId) {
  return new BPromise(resolve => resolve());
}

/**
 * Generate a JWT token to send to the client
 *
 * @param {Object} user
 * @returns {BPromise<String>}
 */
function generateJWT(user) {
  const token = 'DUMMY_JWT_TOKEN';

  return new BPromise(resolve => resolve(token));
}

```

So a few notes here:

### Outer scope variables
```Javascript
let user;

/* ... */
  .then(fetchedUser => user = fetchedUser)
  /* ... */
  .then(() => sendEmail(user.userId))
  /* ... */
```
Notice here how I am making a global inside the function, in order to use the User object on various calls in my Promise chain. A possible overcome would be to make my functions always return the User object, but that would a) make my functions make no sense at all and b) tightly couple my functions with this particular Promise chain so I couldn't use them in other places.

### Start the Promise chain with a Promise
```Javascript
/* ... */
BPromise.try(() => validateUserInput(req))
/* ... */
```
A Promise chain must start from a Promise, but the `validateUserInput` function doesn't return one. `Bluebird` to the resque. This way I can wrap my functions inside of a Promise call. I agree when you tell me this is just noise.

### Bluebird
I am using Bluebird a lot. And that's because without it my code would be even more bloated with Promise returns here and there. Bluebird makes a good use of DRY so I don't have to. I could make all my functions, even those that doesn't do async stuff, return a Promise but that would mean that I had to "wait" for them, which means even more noise.

But, Bluebird is just another dependency that can possibly break my code on its next release. We don't want that.

## Async/Await version
Let's now see the same code, but written with async/await and compare it with the above.

```Javascript
const { WrongCredentialsError, DBConnectionError, EmailError } = require('./../errors');

/**
 * Emulate an Express.js route call as an example
 */
loginController({}, { json: response => console.log(response) }, null)

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} err
 * @returns {Void}
 */
async function loginController(req, res, err) {
  const { email, password } = req.email;

  try {
    if (!email || !password) {
      throw new WrongCredentialsError();
    }

    const user = await fetchUserByEmail(email);

    if (user.password !== hashPassword(req.password)) {
      throw new WrongCredentialsError();
    }

    await markLoggedInTimestamp(user.userId);
    await sendEmail(user.userId);

    const token = await generateJWT(user);

    res.json({ success: true, token });

  } catch (err) {
    if (err instanceof WrongCredentialsError) {
      res.json({ success: false, error: 'Invalid email and/or password' })
    } else if (err instanceof DBConnectionError || err instanceof EmailError) {
      res.json({ success: false, error: 'Unexpected error, please try again' });
    } else {
      res.json({ success: false })
    }
  }
}

/**
 * Fetch a User from the DB by Email
 *
 * @throws WrongCredentialsError
 * @throws DBConnectionError
 * @returns {Promise}
 */
function fetchUserByEmail(email) {
  const user = {
    userId: 'DUMMY_ID',
    email: 'konmpar@gmail.com',
    password: 'DUMMY_PASSWORD_HASH'
  }
  return new Promise(resolve => resolve(user));
}

/**
 * Hash password
 *
 * @param {String} password
 * @returns {String}
 */
function hashPassword(password) {
  return password;
}

/**
 * Mark a user's logged in timestamp
 *
 * @param {String} userId
 * @throws DBConnectionError
 * @returns {Promise}
 */
function markLoggedInTimestamp(userId) {
  return new Promise(resolve => resolve());
}

/**
 * Send a follow up email
 *
 * @param {String} userId
 * @throws EmailError
 * @returns {Promise}
 */
function sendEmail(userId) {
  return new Promise(resolve => resolve());
}

/**
 * Generate a JWT token to send to the client
 *
 * @param {Object} user
 * @returns {Promise<String>}
 */
function generateJWT(user) {
  const token = 'DUMMY_JWT_TOKEN';

  return new Promise(resolve => resolve(token));
}
```

Yay!

### No outer scope variables
Now all our functions are called in the same block thus the same scope, without being passed in a `then` function. We don't have to do unneeded assignments and keep global variables.

### No unessecary Promise returns
Previously declared functions `validateInput` and `comparePasswords` can now live inside the main block. I wouldn't write unit tests on them neither I would use them somewhere else in my codebase, so I don't have to put them in separate functions. Less functions, less code.

### Readable code
Less code means easier to read and argue about.

### No Bluebird dependency
Bluebird is now not needed since we can return native Promise objects. Previously, I was using `catch` with specific error type and `try` which are Bluebird specific.

## Conclussion
We should always strive to refine and improve our codebases. Async/await can bring a lot of improvements and help us write more readable code, easier to argue about and to spot bugs. In case, you have to use still Promises, check out a [wonderfull piece by Dr. Axel Rauschmayer](http://2ality.com/2017/08/promise-callback-data-flow.html) for more Promises and Async/Await patterns.

Node.js 8 is now in LTS mode, so you have no reasons not to upgrade and miss the shiny new features of Javascript.

Let me know what you think in the comments below and share this article with someone you know it would be helpfull to. 🤝
