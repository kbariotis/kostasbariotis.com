---
title: "The Microfunctions architecture"
path: "/drafts/the-microfunctions-architecture/"
date: "2017-10-04T00:00:00.000Z"
draft: true
---

I have been working with a serverless architecture for the past one year. The serverless style is relatively new and not so much information has been shared yet. During this work and the research I am constantly doing, I came up with a pattern of organizing such an architecture. This post will be an attempt to explain this approach and how it came to be. Before this, I am going to introduce you to the serverless model and how it really works.

## No servers? Really?
Let's start with the elephant in the room. Serverless doesn't mean "no servers".

<img src="https://media.giphy.com/media/j2nATOAdRgYZq/giphy.gif" alt="Serverless doesn't mean no servers">

It simply means that you don't have to worry about them. On my mind, serverless is another layer on top of the famous PaaS platforms. We are doing a step away from hiding the machines's specifics by hiding your application's specifics, such as the process management and the routing.

Ofcourse, you would still have to worry about databases and other components of your stack. But you can be sure that your code will always be running and not be tighted to one process that can bing your whole application down.

On top of that, spinning up a service is much more easier and fast.

## Functions
Taking the servers away, what have you left with? Code. Organized in functions. Thus the famous "functions" name you are seeing here and there.

Functions can be anything. Let's see an example:
Imagine a simple Node.js app with a router, a controller attached to a certain path that calls a model function and returns. We have two functions on that app and some bootstrap code. Remove the router and you are only left with two functions. Those functions can be safely deployed as is and never worry about where are going to run or if they ever going to run out of memory.

How we will organize those functions of course is our responsibility. We could squeeze them into one serverless function or break them into more. That will be based on your architecture choise.

With the ability to create so many functions in a gif, we could end up very fast in a hell that none knows where anything goes.

This is where the Micro Functions architecture comes in.

## Putting them all together
Essentially, the way to go about this, and the way AWS Lambdas works, is to spin up an instance of your stack each time an event arises and run the predefined functions. Routing and the exposure to the outside world is being handled by another component, API Gateway which will raise an event each time someone hits your endpoint and route it to the specific Lambda Function.

The instance (that may be new(cold state) or may have been up for a while(hot state)) will start and run the function using the payload passed to API Gateway. It will then return the results back to API Gateway and it will pass it to the client. That's really all there is in a serverless architecture.

The big question ofcourse here, is whether the cold/hot state is significant enough to prevent you from even thinking about getting into it. Truth is that I haven't seen any major latency, but it could also mean that there is a latency that we chose to not give attention to.

## The Micro Functions architecture
This style is derived by two major patterns, the microservices and the serverless architecture. The goal is to organize a codebase in a way that can support adding new features with ease, that is easily testable and can be managable and deployable with single terminal commands.

Microservices architecture is able to deliver all of the above (when done correctly) by splitting up the architecture in smaller, isolated services. Each service hide its internals by exposing a single API that allows other services to communicate with each other. The communication protocol must be well defined and respected by all others.

What this architecture desribes is to divide your codebase into smaller services much like in a microservices architecture but to let each service to expose serverless functions instead of an entire application.

### Boundaries
Each of these services handles a part of your business logic and doesnt share its internals with the others. They can be tested and deployed in isolation without affecting the others, much like in the microservices world.

### Communication
The communication between these may be direct by calling each other or in an event based architecture through a message broker. Again, both of these are valid and in my experience both can work very well.

### Responsibility
The responsibility for each Micro Function is up to you to decide. You can host an entire API in one function or have once function per action in a classic CRUD style.

An example:

Articles Service
 |
 | - Exposes a Micro Function called `API` that handles routing whether you want to fetch one Article or fetch all

Comments Service
 |
 | - Exposes a Micro Function called `getComment` that fetches one Comment
 | - Exposes a Micro Function called `getComments` that fetches all Comments
 | - Exposes a Micro Function called `getCommentsForArticle` that fetches all Comments for an Article

[Both of these styles](https://serverless.com/blog/serverless-architecture-code-patterns/) are valid and it's up to you to decide

### Testing
Testing

## Final words
It seems like all of the majors infrastructure providers have invest a lot in the serverless infrastructure services. It may be something that will revoluniotize the way we build applications but certainly has a long way to go and reach the maturity of the current systems.

For us over at Quotelier, has served us great so far. It's cost effective and allows the developers to act on the infrastructure in a way that we can be sure that it won't bring everything down. We are not in the need of hiring a dedicated DevOps guy and we certainly don't feel like missing something. For the record, here are some pros and cons, we have found:

Pros:
* Cost effective: Over 100 AWS Lambdas and the cost is still zero (fact is that we are not yet in the actual user base size we would like to be)
* Auto-scaling: We basically don't worry much about it
* DevOps out of the box

Cons:
* Vendor lock-in:
* Not exactly simpler: Having less DevOps to do doesnt neccesarily means it's simpler. You still need basic knowledge of how things not only to be able to spin up an architecture like this but also to do it in the right way.
* Development experience is still.. mehh

https://serverless.com/blog/serverless-conf-2017-nyc-recap/
