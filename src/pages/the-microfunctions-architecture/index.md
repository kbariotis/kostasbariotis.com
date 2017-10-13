---
title: "The Microfunctions architecture"
path: "/drafts/the-microfunctions-architecture/"
date: "2017-10-04T00:00:00.000Z"
draft: true
---

I have been working with a serverless architecture for the past one year. We have gone full serverless on the project we are currently working on and after a lot of research and trial and error, I came up with a pattern of organizing such an architecture. This post will be an attempt to explain this approach and how it came to be.
This post won't go deep on how various Serverless providers works and I certainly wont try to convince you to adopt it. My goal is to share my solution with you and ask for your feedback. I hope that my expirience will help somebody.

## No servers? Really?
Let's start with the elephant in the room. Serverless doesn't mean "no servers".

<img src="https://media.giphy.com/media/j2nATOAdRgYZq/giphy.gif" alt="Serverless doesn't mean no servers">

It simply means that you don't have to worry about them. On my mind, serverless is another layer on top of the famous PaaS platforms. We are doing a step away from hiding the machines's specifics by hiding your application's specifics, such as the process management and the routing.

Ofcourse, you would still have to worry about databases and other components of your stack. But you can be sure that your code will always be running and not be tighted to one process that can bring your whole application down.

## Functions
Taking the servers away, what have you left with? Code. Organized in functions. Thus the famous "functions" name you are seeing here and there.

Functions can be anything. Let's see an example:

Imagine a simple Node.js app with a router, two controllers attached to certain paths that call some models and return. We have two functions on that app and some bootstrap code. Remove the router and you are only left with two functions.

Let's try to do this the serverless way. I will be using AWS and the famous [serverless](http://serverless.com) framework. All we need for the example above are the two controllers and a serverless configuration file:

```yml
service: serverless-example

provider:
  name: aws
  runtime: nodejs4.3
  environment:
    DYNAMODB_TABLE: ${self:service}-${opt:stage, self:provider.stage}

functions:
  create:
    handler: users/register.handler
    events:
      - http: POST /users
  login:
    handler: users/login.handler
    events:
      - http:
          path: POST /users/login

resources:
  Resources:
    UsersDynamoDbTable:
      Type: 'AWS::DynamoDB::Table'
      DeletionPolicy: Retain
      Properties:
        AttributeDefinitions:
          -
            AttributeName: id
            AttributeType: S
        KeySchema:
          -
            AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: ${self:provider.environment.DYNAMODB_TABLE}
```

The configuration is pretty straightforward. We want the AWS provider with the node4.3 runtime. Two AWS Lambda functions each tight to a certail API Gateway path and a DynamoDB table described as a Clouformation resource object. After this gets deployed, API Gateway will respond back with an AWS URL (e.g.: https://some-random-id.api.aws.com) that we can hit to reach our two controllers.

And there you go. That's all it takes to create an API. Awesome, right?

With the ability to create so many functions in a gif, we could end up very fast in a hell that none knows where anything goes. This is where the Micro Functions architecture comes in. But before we dive into that, let's take a look and understand how AWS runs our code.

## Combining the pieces
Essentially, the way to go about this, and the way AWS Lambdas works, is to spin up a instance for your functions each time an event arises and run those predefined functions. Routing and the exposure to the outside world is being handled by the API Gateway which will raise an event each time someone hits your endpoint and route it to the specific Lambda Function. So when you hit `https://some-random-id.api.aws.com/users/login` from the outside, an instance will be created and run the handler you have defined above.

The instance (that may be new(cold state) or may have been up for a while(hot state)) will start and run the function using the payload passed to API Gateway. It will then return the results back to API Gateway and it will pass it back to the client. That's really all there is in a serverless architecture.

The big question ofcourse here, is whether the cold/hot state is significant enough to prevent you from even thinking about getting into it. Truth is that I haven't seen any major latency, but it could also mean that there is a latency that we chose to not give attention to.

## The Micro Functions architecture
Our project started growing quickly and became hard to test and add features to.

This style is derived by two major patterns, the microservices and the serverless architecture. The goal is to organize a codebase in a way that can support adding new features with ease, that is easily testable and can be managable and deployable with single terminal commands.

Microservices architecture is able to deliver all of the above (when done correctly) by splitting up the architecture in smaller, isolated services. Each service hide its internals by exposing a single API that allows other services to communicate with it. The communication protocol must be well defined and respected by all others.

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
