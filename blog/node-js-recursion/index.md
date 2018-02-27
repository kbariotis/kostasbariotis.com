---
title: "Node.js & Recursion"
path: "/node-js-recursion/"
date: "2015-10-01T13:54:36.000Z"
date_updated:   2016-05-14T15:40:16.000Z
tags: recursion, javascript, node.js
---

Recursion is one of the initial courses we take in every CS university, with the most used example being the Fibonacci sequence:

```js
let recursive = (n) => {
  if(n <= 2) {
    return 1
  } else {
    return recursive(n - 1) + recursive(n - 2);
  }
};
```

This works great in most of the languages we've been taught, but with asynchronous environments such as Node.js, things are getting tricky. Using asynchronous functions, we need to wait for the function to end before call the next iteration of the recursion.

Say we need to recursively delete an item and all of it's children from a connected list.

```js
let recursivelyDelete = (id) => {
  db.items.findOne(id, (err, item) => {
    if(err) {
      callback(err)
    } else {
      db.items.remove({ '_id': item._id}, (err, results) => {
        if(err) {
          callback(err)
        } else {
          if(item.child_id) {
            recursivelyDelete(item.child_id)
          } else {
            return true
          }
        }
      }
    }
  }
}
```

You can find all different recursion patterns for Node.js [here](http://metaduck.com/01-asynchronous-iteration-patterns.html).

This is all good but you can see how easily can lead to a callback hell. What if we had to do some checks before the deletion? Or update something else? What about a tree structure with multiple children?

Fortunately, we can use [Promises](https://www.promisejs.org/). Let's rewrite.

```js
let recursivelyDelete = (id) => {
  let item
  return findOne(id)
    .then((document) => {
      item = document

      if(item.child_id) {
        return recursivelyDelete(item.child_id)
      } else {
        return true;
      }

    })
    .then(() => {
      return remove(item._id)
    })
    .catch((err) => {
      console.log(err)
    })
}

let remove = (id) => {
  return new Promise((resolve, reject) => {
    db.remove(id, (err, item) => {
      if(err) {
        return reject(err)
      } else {
        return resolve()
      }
  })
}

let findOne = (id) => {
  return new Promise((resolve, reject) => {
    db.findOne(id, (err, item) => {
      if(err) {
        return reject(err)
      } else {
        return resolve(item)
      }
  })
}
```

We can see how it's better written and can easily scale and more functions can be added.

Here's a more complicated example. Say we need to handle the deletion of a category in a tree. Given an ID, we have to check if the category exists and if there are dependent blog posts connected with that category. Only then, we have to run the same process for it's children and for their children. Delete all or reject. Deletion must go after the checks of all children, just like the above example.

```js
let handleDeletion = (id) => {
  findOne(id)
    .then((item) => {
       return recursivelyDelete(item)
    })
    .catch((err) => {
      console.log(err)
    })
}

let findOne = (id) => {
  return new Promise((resolve, reject) => {
    db.findOne(id, (err, item) => {
      if(err) {
        return reject(err)
      } else {
        if(item) {
          return reject()
        } else {
          return resolve(item)
        }
      }
  })
}

let recursivelyDelete = (item) => {
  checkForDependencies(item._id)
    .then(() => {
      return getChildrenCategories(item._id)
    })
    .then((children) => {
      let calls = []

      children.forEach((c) => {
        calls.push(recursivelyDelete(c._id))
      })

      return Promise.all(calls)
    })
    .then(() => {
      return remove(item._id)
    })
    .catch((err) => {
      console.log(err)
    })
}

let checkForDependencies = (id) => {
  return new Promise((resolve, reject) => {
    db.products.find({ category_id: id }, (err, results) => {
      if(err) {
        return reject(err)
      } else {
        if(results && results.length) {
          return reject()
        } else {
          return resolve()
        }
      }
  })
}

let getChildrenCategories = (id) => {
  return new Promise((resolve, reject) => {
    db.categories.find({ parent_id: id }, (err, results) => {
      if(err) {
        return reject(err)
      } else {
        return resolve(results)
      }
  })
}

let remove = (id) => {
  return new Promise((resolve, reject) => {
    db.categories.remove(id, (err, item) => {
      if(err) {
        return reject(err)
      } else {
        return resolve()
      }
  })
}

```
<br/>

**Examples are written in [ES6](http://es6-features.org) with the [Promises API](https://www.promisejs.org/) which you can run using the latest [Node.js](https://nodejs.org/en/) v4 build**
<br/>
