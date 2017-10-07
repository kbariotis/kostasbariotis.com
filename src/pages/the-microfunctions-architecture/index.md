---
title: "The Microfunctions architecture"
path: "/drafts/the-microfunctions-architecture/"
date: "2017-10-04T00:00:00.000Z"
draft: true
---

I have been working with a serverless architecture for the past one year. This particular style is relatively new and not so much information has be shared. During my work on the project we are working at the moment and the research I am constantly doing, I came up with a recurring style of organizing such an architecture. This post will an attempt to explain this approach and how it came to be.

## No servers? Really?
Let's start with the elephant in the room. Serverless doesn't mean "no servers". It simply means that you don't have to worry about. On my mind, serverless is another layer on top of the famous PaaS platforms. We are doing a step away from hiding the machines's specifics by hiding your application's specifics, such as the routing.

Ofcourse, you would still have to worry about databases and other elements of your stack. But you can be sure that your code will always be running and never comes down again.

On top of that, spinning up a service is much more easier and fast.

## Functions
Taking the servers away, what have you left with? Code. Organized in functions. Thus the famous "functions" name you are seeing here and there.

Functions can be anything. Let's see an example:
Imagine a simple Node.js app with a router, a controller attached to a certain path that calls a model function and returns. We have two functions on that app and some bootstrap code. Remove the router and you are only left with two functions. Those functions can be safely deployed as is and never worry about where are going to run or if they ever going to run out of memory.

How we will organize those functions of course is our responsibility. We could squeeze them into one serverless function or break them into more. That will be based on your architecture.

With the ability to create so many functions in gif, we could end up very fast in a hell that none knows where anything goes.

This is where the Micro Functions architecture comes in.

## The Micro Functions architecture
