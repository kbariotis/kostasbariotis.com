---
title: "Serverless Demystified"
path: "/serverless-demystified/"
date: "2017-10-31T18:51:34.000Z"
draft: true
tags: Serverless, AWS
---

This post will be an attempt to start talking about serverless and Functions as a Service providers. I have been working with a serverless architecture on top of AWS for the last few months and I am feeling like I have a complete picture about it and a lot to talk about it.

I have gathered quite a few subjects I would like to write about but this post will be just an introduction and my point of view on serverless.

## "Serverless"? as in "without servers"?
Let us please start with the elephant in the room. Serverless doesn't mean no servers.

![](./images/giphy.gif)

It simply means that the underlying servers are being hidden from the developer. Like when you are talking with the GitHub API, the underlying infrastructure is completely hidden from you and you don't have to worry about it.

## What is serverless
From handling the proxy, managing scale and setting up the CI/CD, the infrastructure part of software development is one big chapter. By putting all of the above behind APIs, we can take the worries away from the developers.

Serverless hides its roots in the microservices architectures were bigger and complex systems are being broken out in multiple isolated services. The goal is to abstract away complex parts of our codebase from the other developers and let them interact with those through an API.

![](./images/serverless.png)

## Functions/Database/Router/etc... as a Service

> Anything that can be abstracted away, will be abstracted away.

Think of a simple CRUD REST API. We need a database, a runtime to run our code and an HTTP proxy/router. Each of these has its own caveats and things that we have to take actions for. Database needs indexing and backups operations, our runtime needs a scaling protocol and the proxy needs an authentication mechanism.

By putting all of the above, behind an API(one API for each service, remember the bounded context?) and let them take handle of their own issues, the only thing we left with is "our code".

It's a form of outsourcing really, but by giving the control to the developers. Now the developers can choose who they want to take handle their database and who they want to handle their router.

Jeff Bezos once intructed every team inside Amazon to have a developer that will create an API for that team and let all teams communicate only through these APIs. Thus AWS was born. Serverless is that mindset in scale.

## Serverless isn't really simpler

> Now you are able to focus on writing your code...

I know. Such a cliche. I have been hearing that for the past 4-5 years. In reality, it's not that simple. And while I am feeling like we are getting there, it's still not possible.

While serverless and the current state can boost development, it's still not that simple. You still need to have a knowledge of how servers works, basic understanding of distributed systems and security.

There are also cons that you will have take in consideration, such as the vendor lock in. Out sourcing your work means that you are bringing in partners. You need to think about each and every one of them.

The development tools around a serverless architecture is also still a bit, meh... Consider whether you want to run your serverless architecture

## Conclusion
Serverless is an amazing technology, or a mindset if you will. Major providers such as AWS and Google have brought it to the next level and if you haven't played with it even for a while, I am suggesting you to do so. Just to take a look.

I'am not sure if it will transform the way we structure and develop our architectures, but sure has some notable pros.
