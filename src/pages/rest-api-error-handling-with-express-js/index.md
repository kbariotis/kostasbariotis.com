---
title: "REST API Error Handling with Express.js"
path: "/rest-api-error-handling-with-express-js/"
date: "2015-05-22T16:35:17.000Z"
date_updated:   2015-12-13T13:35:25.000Z
tags: node.js, rest, express.js, api
---

When you are writing an API, especially when is going to go public, you want the error responses to be as consistent as possible. You want your errors to be identical everywhere, to provide not too much information for your internal system but enough information to the debugger.

I am a REST fan and I hope you are too. What basically REST tell us, is to use [HTTP's error codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes) for our API responses. E.g. when the user requests a particular row from our DB, using an identifier, and that row doesn't exists we should respond with a `404 Not Found` status code.

Express.js has a [default error handler](http://expressjs.com/guide/error-handling.html). Basicaly it's just a middleware, with an extra argument, the `err` argument.

On an Express.js request lifecycle, when an error occurs, we pass on to the next middleware with populated error variable, and the error handler triggers.

Let's start with that.
```js
router.use(function (err, req, res, next) {
	/* We log the error internaly */
    logger.error(err);

	/*
     * Remove Error's `stack` property. We don't want
     * users to see this at the production env
     */
    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

	/* Finaly respond to the request */
    res.status(err.statusCode || 500).json(err);
});
```
Two are the most essential parts here. Logging the error and proper displaying it. So I am logging it using a [logger](https://github.com/winstonjs/winston) module and passing it to the user, using the error's status code. I have predefined those status codes so I don't have to deal with them every time. How? Let's see.

An error often consists of more than just an error code. We need a title, little more information and the stack trace on development environment. Instead of dealing with those information every time we create objects and only changing the bits we want each time. Here's a `Not Found` error object.

```js
module.exports = function notFound(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'The requested resource couldn\'t be found';
  this.statusCode = 404;
  this.errorCode = errorCode || 404;
};

```

We are inheriting the Node.js `Error` class and create a generic `Not Found` error object we can use every time we need one.

So now we need to pass this to the Express.js error handler. So on an ordinary controller we do:

```js
app.use('/customers/:id', function(req, res, next){

	var id = properSanitization(req.params.id);

	someDBDriver.findOne(id, function(model){
    	if(!model) {
        	next(new NotFound('Entity with id: ' + id + ' couldn\'t be bound.');
        } else {
        	/* ... */
        }
    });
});
```

So now the error handler will take place and do it's magic.

Often, in a more complex API will need more expressive status codes to express it's disfunctionalities. In that case, you can still respond with the proper status code but keep an internal error eode that makes sense on your application. So, in case a user tries to login with wrong credentials, send a 401 to the API consumer but keep an internal code, e.g. 4001 that means **"Wrong Username/Password"**. And that's what the `errorCode` is.

Here's a simple [error collection](http://github.com/kbariotis/throw.js) i've wrote, to save you the hassle. Use it and send me your suggestions and/or notices.
