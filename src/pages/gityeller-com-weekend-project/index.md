---
title: "GitYeller.com is my latest weekend project"
path: "/gityeller-com-weekend-project/"
date: "2017-03-01T08:49:08.000Z"
date_updated:   2017-03-01T09:02:18.000Z
tags: node.js, mongodb
---

It all started when [Adonis](https://twitter.com/_adonisk) told me that he was looking to contribute to some open source projects. He had a list of projects that he actively uses but he didn't want to always be checking their issues list for new issues that he could get his hands on. So we thought it would be cool if we had a way to watch a GitHub repository for issues of specific tags, e.g. "Need help", "Good first contribution", etc.

I thought that's something I could easily hack in a weekend. So here's [GitYeller](https://gityeller.com).

## Stack
GitYeller is built using JavaScript. Node.js and React more specifically. It's hosted on a [DigitalOcean droplet](https://m.do.co/c/2b3d657e5315), uses a [Let's Encrypt](https://letsencrypt.org/) certificate, [Mailgun](https://www.mailgun.com) for transactional emails and a MongoDB for persistent storage.

It looks like this:

![](./images/GitYellerDiagram.png)

So the Front End app is responsible for gathering emails from the user and inserting them into MongoDB. The worker is continuously traversing the collection and checking them against GitHub to see if there is anything new. It's that simple!

## Worker
At first, I thought a queue would be a good fit for this since I needed to keep the order that the documents were being created. I knew that the purpose of a queue was to keep the messages processing in order but only to be processed once. I wanted to keep processing the same messages over and over again. So I decided to go with the simplest way possible. Let's have a worker continuously fetching a collection over and over again.

```js
/**
 * Main run function that handles the infinite
 * loop over the database
 */
const run = (cursor, worker) => {
  if (cursor.isClosed()) {
    cursor.rewind();
  }

  return cursor
    .next()
    .then(subscription => {
      if (!subscription) {
        throw new Error('Cursor got to the end');
      } else {
        return subscription;
      }
    })
    .then(subscription => worker.run(subscription))
    .catch((error) => logger.error(error))
    .then(() => setTimeout(() => run(cursor, worker), 0));
};
```

By passing a [MongoDB cursor object](https://mongodb.github.io/node-mongodb-native/2.0/api/Cursor.html) and a function that you want to be called with every item, it keeps traversing the collection and gets updated even when a new item is being created. There is no need to restart the connection to MongoDB.

The `setTimeout` ensures that the next call will get it's own call stack so we don't overflow the current one.

[Here's the complete](https://github.com/kbariotis/gityeller/blob/master/worker/index.js) worker's source code.

## Check against GitHub
Let's see how we are asking GitHub if it has something new to show us. The actual API call is this:

```
URL: api.github.com/owner/repo?labels=label
```

This will return us a list of issues labeled with that specific label of that repository.

Once we make this request for the first time, we have a timestamp of the latest check. Next time, we will just query with that timestamp, in order to get only the issues that have been created between the last check and now (Actually GitHub returns those issues that have even been updated during that period, so [I have to make some extra checks](https://github.com/kbariotis/gityeller/blob/master/worker/worker.js#L89)). Now the query looks like this:

```
URL: api.github.com/owner/repo?labels=label&since=LATEST_RESPONSE_DATE
```

GitHub's API has a limit. They allow you to do certain API calls in a certain amount of time. I wanted to minimize the calls as much possible because once I hit that limit I won't be able to take the results I wanted so the users will never get notified.

Each time we are making this request, GitHub will count minus one requests of our available quota. In order to save some juice I am using [GitHub's conditional requests](https://developer.github.com/v3/#conditional-requests). The above request will return us an ETag header with a value. We can use that value to validate whether our latest response is outdated or not. If it's not, GitHub will respond with a 304 Not Modified status code and an empty body.

```
URL: api.github.com/owner/repo?labels=label&since=LATEST_RESPONSE_DATE
HEADERS: If-None-Match: LATEST_RESPONSE_ETAG
```

This way the request won't be counted. We saved a request and we will only be charged if there is actually something new.

Read more about [ETags and "conditional requests"](https://bitworking.org/news/150/REST-Tip-Deep-etags-give-you-more-benefits).

## Conclusion
Certainly, the solution is not optimal. Once the collection grows bigger, the time between the checks for each individual item in the collection will also be long. But it was a fun weekend project. I am already watching the [node.js](https://github.com/nodejs/node) repo for new issues labeled `v7.x`.

Which repo are you going to watch? Leave me a comment if you liked my weekend project. If you think you can help me make it better, please see the [source code](https://github.com/kbariotis/gityeller).
