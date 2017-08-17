---
title: "Mongoose objects and the IN operator"
path: "/mongoose-objects-and-the-in-operator/"
date: "2015-08-31T17:51:38.000Z"
date_updated:   2015-08-31T17:54:44.000Z
tags: mongodb, mongoose
---

Today I lost a few hours trying to understand why a document that I was fetching through Mongoose, kept returning true against checking for a field with the `in` operator, even though the document didn't contain that field.

But still it would return true:
```js

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var exampleSchema = new Schema({
  someField: String,
  notExistingField: String
}, { versionKey: false });

/* We know that this document doesn't have the notExistingField in the DB */
exampleSchema.findOne({
    '_id': id
  })
    .exec(function(err, document){

      console.log(document) /* { someField: 'value' } */
      console.log(document['notExistingField']) /* undefined */
      console.log('notExistingField' in document) /* true */

    })
```


The fact is that Mongoose will first comply the fetched document against the defined Schema in order for it's getters/setters functions to work. So even though, we can't see the `notExistingField`, the `in` operator will always return true.

A solution is to change the checking and check for an undefined value, like this:

```js
/* We know that this document doesn't have the notExistingField in the DB */
exampleSchema.findOne({
    '_id': id
  })
    .exec(function(err, document){

      console.log(document) /* { someField: 'value' } */
      console.log(document['notExistingField']) /* undefined */
      console.log(!!document['notExistingField']) /* false */

    })
```

Fixed.
