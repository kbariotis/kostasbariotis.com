---
title: "Queue-Centric Workflow"
path: "/queue-centric-workflow/"
date: "2015-12-06T13:33:15.000Z"
date_updated:   2015-12-12T13:14:25.000Z
tags: Microservices, node.js, AWS, QCW
---

We started adopting a Queue-Centric workflow recently at [Goodvidio](http://goodvid.io), although it's still too early to talk whether it served us well and what the benefits were. In this article I would like to talk about the mindset of adopting such an infrastructure and some key concepts you must keep in mind, especially when using [AWS's SQS](https://aws.amazon.com/sqs/), a cloud hosted Messaging System.

Besides SQS, there is also, [Azure's Storage](https://azure.microsoft.com/en-us/services/storage/) and I am sure there are others as well. There are also [open source implementations](http://queues.io/) that you can host on your machines.

## What's a QCW
A QCW is purely described by the separation of the Web Tier that generates requests and the Service Tier that processes them and it's a subset of the [CQRS pattern](http://martinfowler.com/bliki/CQRS.html). Thus, loose coupling of the dependent services can be achieved.

The essential part here is that we are going from a *direct response of the Server* model to a *I will process that later, continue with what you're doing* model, moving towards a Tasks Based workflow. It's a great candidate for time consuming processes or when the possibility of a system to be down is high and won't be able to service requests immediately. The *at-least-once delivery* of requests can be guaranteed.

By Queue we are referring to a service that implements the standard data structure Queue and sits between a Producer and a Consumer. The Producers generates requests and puts them in the Queue via an [API](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/MakingRequestsArticle.html). The Consumer then reads the Queue and processes them. The communication is asynchronous which mean that the Producers won't get an immediate response from the requests that sends.  Instead the Consumer may then choose to somehow inform the Producer about the results. Either by sending an email to the admin or by sending a message through a WebSocket that can then be displayed directly to the user.

## Why to use it
While there are a lot of problems such a workflow can solve, the most common one is that the processing part of our application can't handle eager clients that are sending requests too fast or send requests that will take too long to process.

The Producers can send requests to the Consumer, through the Queue, as aggressively as he wants, but the Consumer will process them based on the current workload.

By keeping Requests to a separate place we can also not worry about losing requests since the Consumer can go off and back online again and start processing requests from the point where he left them.

There are many more gains but we found those to be the most essential problems we need to solve.

## Consuming the Queue
A complex thing about consuming a Queue is that of the Consumer and the policy he follows for reading and processing messages. In general, the flow goes like this:

1. Get the next available message from the top of the Queue
2. Process the message
3. Delete the message

It's essential to note that you need the message that is in the the top of the queue. Otherwise, you can't guarantee that all messages will be processed in the same time period. You need the **[FIFO](https://en.wikipedia.org/wiki/FIFO)** policy. Unfortunately, AWS SQS can't guarantee that for you, because of their distributed nature and you have to implement such functionality by your self.

### Long Polling
In order to get new messages, you have to ask the Queue once in a while if it has any messages. That's [Polling](http://stackoverflow.com/a/12855533/1955940). Several implementation provides some sort of Pushing mechanism that will directly notify a Consumer that there are pending messages to be processed. SQS doesn't support that, but they support **[Long Polling](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-long-polling.html)** which is actually when we ask the Queue for new messages and if there are none, the connection is being kept alive until there is one or till the connection times out. SQS supports up to 20 seconds of Long Polling. After that, we must re ask the Queue and wait another 20 seconds.

### Visibility Timeout
While processing a message, a lot of things can go wrong that will make the process to fail. In such case, the message can't be deleted and must remain in the Queue in order to reprocess it. But if we leave it there, it's going to be returned over and over again and we can't be sure that is going to succeed the next time. Instead of deleting the message, the Queue can hide it for a specific period of time, so we can continue processing other messages and reprocess that message at some point in the future again. This is a **[Queue's Visibility Timeout](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/AboutVT.html)**.

### Poisoned Messages
Still, this won't guarantee that the message will be processed successfully at any time. The message may be poisoned, that means that it failed passing our domain's model requirements and that it won't be processed unless we change our logic. Those are called **Poison Messages** and a policy must be specified that will take care of those. For example, a counter may be kept for each poisoned message and after the third time that it failed to be processed it must be deleted.

### Dead Letter Queues
In case of such a failure, you don't want to bypass that without investigating the cause. You'll need to know what was the reason that marked the message as poisoned. Hopefully, instead of deleting it after the third attempt, you can store it in a **[Dead Letter Queue](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/SQSDeadLetterQueue.html)**. A Dead Letter Queue is simply another Queue that holds only the failed messages. Those can be messages that couldn't be processed or messages that couldn't be pushed in the Queue cause it's full or non responding. After you store them there, you can go back at any time and examine those messages and see what you have done wrong in the first place.

## Finally
So we talked about what a QCW is, how it can be used and also for some key concepts of SQS such as Queue's Visibility Timeout, Polling, Poison Messages and Dead Letter Queues. AWS has a great [documentation on SQS](https://aws.amazon.com/documentation/sqs/).

Also, [Ben Addel](http://www.bennadel.com/index.cfm) has a nice implementation of a [Nodejs SQS Consumer](http://www.bennadel.com/blog/2792-shedding-the-monolithic-application-with-aws-simple-queue-service-sqs-and-node-js.htm) that uses Promises to do Long Polling. It is basic, without handling Poison Messages or using Dead Letter Queues and it's a great starting point.

I've also found the Queue Centric Workflow chapter of the [Cloud Architecture Patterns](http://www.amazon.com/Cloud-Architecture-Patterns-Using-Microsoft/dp/1449319777) books to have some excellent resources.

If you have any previous experience in any of the subjects talked above, please share it in the comments. Thank you!
