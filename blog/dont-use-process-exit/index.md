---
title: "Why you should not use process.exit()"
path: "/why-you-should-not-use-process-exit/"
date: "2022-01-11"
draft: false
---

I've been working with different teams and projects during the past few years and a common theme I've been seeing is the use of Node.js' `process.exit()` function.

Have you ever seen something like this?

```JS
// ...

process.on('SIGTERM', async () => {
  await server.close();
  process.exit(1);
});

// ...
```

So what's the problem with the above? Let's see.

## What is `process.exit()`?

Node.js gives us the ability to forcefully exit the current process. Emphasis to forcefully because as we may all know, Node.js is an asynchronous event-driven runtime, meaning a process may have asynchronous operations running in the background or waiting in the event loop and `process.exit()` will ignore them and exit itself with out waiting.

## How it works

Let's see an example. Consider the below snippet that will print the first 10 numbers of the fibonacci sequence.

```JS
const initial = [0, 1];

for (let i = 2; i <= 10; i++) {
  initial[i] = initial[i - 2] + initial[i - 1];
  console.log(initial[i]);
}
```

If you try to run the above, you will notice that the process will exit as soon as it finishes and will return control back to the terminal.

Let's see another example with an asynchronous operation this time.

```JS
let i = 0;
setInterval(() => {
    console.log('Infinite Loop Test interval n:', i++);
}, 5000);
```

This time if you try to run the above, it will never exit. It will just keep printing the above message to the terminal every 5 seconds. And the reason for that is that a Node.js process won't exit until the event loop is empty. But `setInterval` just keeps adding operations to the event loop in order to keep its recurring execution.

If we now add a `process.exit()` at the end of it, we won't even see the first message logged in the terminal, and thats how `process.exit()` forcefully exits a process.

## The dangerous nature of `process.exit()`

Sometimes there are caveats that people may not be aware. Consider the below snippet from a simple web service that runs an HTTP server and a queue consumer.

The service replicates itself and lives behind a load balancer that will send a `SIGTERM` event whenever wants to make a new deployment for example.  
The service is configured to close and exit the process when ever it receives the `SIGTERM` event which in a first glance it makes sense.

```JS
// ...

process.on('SIGTERM', async () => {
  await server.close();
  logger.error('Uncaught exception was thrown.');
  process.exit(1);
});

// ...
```

There are two caveats to watch out here.

First, the above doesn't guarantee that the log will be properly written as the process of writing to the output is an asynchronous IO operation. The above is quite dangerous because you will end up in a situation where your process is just randomly halting without any explanation!

Second, we mentioned that that service runs an HTTP service but also a queue consumer. We've handled the closure of the HTTP server when we received the `SIGTERM` event but we haven't close the queue consumer. That means that asynchronous operations may be waiting to be processed or they may even be processing at that specific moment. When we call `process.exit()` those operations will be terminated and we will be looking afterwards to find what happened.

## What should we do

It's simple. Never use `process.exit()` under no circumstances unless you specifically need to do it.

[Node.js docs state that](https://nodejs.org/api/process.html#processexitcode):

_"In most situations, it is not actually necessary to call process.exit() explicitly. The Node.js process will exit on its own if there is no additional work pending in the event loop. The process.exitCode property can be set to tell the process which exit code to use when the process exits gracefully."_

Make sure that you're correctly handling the initialization of your IO operations in your app but that you also properly handling the termination of them. Once that's done, the process will have no reason to stay running and it will exit by it self.

The above will ensure the normal operation of any Node.js service.

Do you have any examples of how the `process.exit()` can be dangerous? Let me know in the comments, I would love to read them.
