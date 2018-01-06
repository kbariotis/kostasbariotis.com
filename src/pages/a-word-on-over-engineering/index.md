---
title: "A word on premature optimization"
path: "/drafts/a-word-on-over-engineering/"
date: "2017-12-02"
draft: true
---


## Define the problem
ask and seek for answers
## Know your options
research the hell out
## Execute and measure

Let's have a word on premature optimization, on other words, over engineering.

The problem with premature optimization is when you are trying to forecast the future. When being biased by what you believe will happen when in reality the requirements are quite different. As a result, you end up spending time on something that is merely going to be needed and you could just spend less time producing the same outcome.

Consider the requirement:

> We need an API to support our current 100 customers.

And now this:

> We need an API to support our current 100 customers but also 1000 customers that we expect to have at the end of the year based on our customer aquisition report and our current marketing strategy.

And also this:

> We need an API to support our current 100 customers plus another 900 customers that may come in the future.

Yes, a Kubernetes cluster built on AWS will serve the requirements quite good. But so a DigitalOcean VM with a Node.js server will do.

As engineers, we tend to look for the absolute perfect solution on every subject. Quite a few times, that's not the matter. Instead of setting that Kubernetes cluster, spend half of the time to setup the smallest VM and spend the rest of the time to the rest of the backlog.

Think wisely and most importantly, think in the long term. Can you be sure that the thing you spend most of your time on will best serve your interests five years from now? How can you spend your time on something that will allow you to have more free time in the long term?

What was the biggest premature optimization you did in your career?

**Did you know about the common [cognitive biases of programmers?](https://hackernoon.com/cognitive-biases-in-programming-5e937707c27b)**
