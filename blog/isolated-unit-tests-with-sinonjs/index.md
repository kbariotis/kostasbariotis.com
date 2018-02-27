---
title: "Isolated Unit Tests with Sinonjs"
path: "/isolated-unit-tests-with-sinonjs/"
date: "2016-03-05T21:02:37.000Z"
date_updated:   2017-01-16T19:59:41.000Z
tags: TDD, javascript, node.js
---

Units in Unit Testing is the smallest unit of code. But how small? Small enough to be tested. For that matter, Unit Tests need to be isolated and for that you need stubs.

Here I will use a small function and the [Sinonjs](http://sinonjs.org) to try to test it. My function does some checks and finally an HTTP call to an external service while similar functions would hit a DB. But our intention is to test the actual function and we don't want to hit the external service.

In case that you think: "No we should let it hit the external so we can test that too". Well no, remember, we are writing unit tests. You're talking about integration tests, where we test how multiple components interact with each other. Also, this is an external service and our test suite shouldn't test external services. This is a clean separation of concerns. It's not our test suite's responsibility to test anything else that itself.

Here's a simple function:
```js
const request = require('request');

const createToDoItem = function (description) {

  return new Promise(function (resolve, reject) {

    if (!description) {
      return reject(new Error('description is required'));
    }

    request.post({
      url: 'https://todo/items/endpoint',
      body: {
        description: description,
        completed: false
      }
    }, function (err, res, body) {

       if (err) {
         reject(err);
       } else {
         resolve(body);
       }
    });
  });
};
```

So the `createToDoItem` does two things. First it checks for the validity of the required parameter `description` and then contacts the external service that is responsible for storing Todo Items.

Now we need to test that function as a unit, so we have to isolate it. We don't want to contact the external service.

```js
describe('To Do Items', function () {

  describe('Create Items', function () {

    it('requires the description parameter', function (done) {

      createToDoItem()
        .catch(function (err) {

          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.equals('description is required');
          done();
        })
        .catch(done);
    });

    it('rejects on error from the remote service', function (done) {

      var stub = sinon.stub(request, post)
        .yields(new Error());

      createToDoItem()
        .catch(function () {

          stub.restore();
          done();
        })
        .catch(done);
    });

    it('resolves on succesfull creation', function (done) {

      var stub = sinon.stub(request, post)
        .yields(null, null, {
          _id: 'ITEM_ID',
          description: 'Remember to write that blog post',
          completed: false
        });

      createToDoItem('Remember to write that blog post')
        .then(function (todo) {

          expect(todo._id).to.equals('ITEM_ID')
          expect(todo.description).to.equals('Remember to write that blog post');
          stub.restore();
          expect(todo.completed).to.be.false;
        })
        .catch(done);
    });
  });
});
```

I hope the code to be self-documented. At first, we call our function without a parameter so the first condition will be true and an error will be thrown. Then we stub the `request` object so it will run the callback function with an error. This will trigger the second condition and reject our promise. Inside the `catch` function, we know that the promise has been rejected. For the end, we stub the callback to return with a null error and a body that will resolve the promise and we test that inside the `then` function. 100% code coverage.

This way we have completely isolated our Unit Under Test and made it blazingly fast to run since we don't make any actual HTTP requests. We pretty much covered the [F.I.R.S.T. principles of Unit Testing](https://pragprog.com/magazines/2012-01/unit-tests-are-first).

Unit tests should be completely isolated.

Always remember the [inverted testing pyramid](http://blogs.agilefaqs.com/2011/02/01/inverting-the-testing-pyramid/). Invest in Unit Testing so to avoid manual system testing. It is expensive.
