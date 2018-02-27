---
title: "MongoDB Aggregation: $lookup for JOINs"
path: "/mongodb-aggregation-lookup-for-joins/"
date: "2016-01-28T17:15:54.000Z"
date_updated:   2016-01-28T17:16:36.000Z
tags: mongodb
---

As of MongoDB 3.2, a [new feature](https://docs.mongodb.org/manual/reference/operator/aggregation/lookup/) has been added that introduces a left outer join for the first time.

`$lookup` is part of the MongoDB aggregation pipeline. It's a separate stage and the syntax is really simple:

```js
db.orders.aggregate([
    {
      $lookup:
        {
          from: "inventory",
          localField: "item",
          foreignField: "sku",
          as: "inventory_docs"
        }
   }
])
```

The above command will fetch every document from the orders collection with the inventory_docs field in each one of them, populated with the matched documents from the inventory collection.

One will first notice that there is no way to specify matching conditions for the records to be joining the document. My hypothesis is that you're using an SQL data store in case you have many and complex relations between your entities. But in case that you are using a MongoDB data store while having that much relations, you will be disappointed.

Mongo's `$lookup` stage isn't coming to a step closer to traditional SQL join. It seems like a nice tool to have in your aggregation toolbox, but it won't cover you full if you need to do relational queries.
