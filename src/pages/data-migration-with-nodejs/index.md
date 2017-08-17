---
title: "Database Migrations with Nodejs"
path: "/data-migration-with-nodejs/"
date: "2016-05-14T15:19:51.000Z"
date_updated:   2016-05-15T17:00:12.000Z
tags: Database, CI, node.js
---

A database is a vital part of every complex application. Databases change very often and contain data that can even disintegrate our whole application if they get out of sync. Changing a live database, whether it's related to schema or data, can be hard. Modern apps, where Agile methodologies along with processes such as [Continuous Integration](http://continuousdelivery.com/) apply, have raised the bar of complexity so maintaining a database separately from the application's business logic can be quite painful.

Fortunately, we have [Database Migrations](https://en.wikipedia.org/wiki/Schema_migration), a technique to help us keep our database changes under control.

## The problem

Problems I have seen over the years:

* Apps often need certain data to be in place in order to run. In a fresh environment, a team member may not have those or may need to import a subset of the production database.
* Different instances of databases, such as production, stage, local environments, may get out of sync.
* Multiple environments setups raise the complexity of different databases versions running at the same time
* Continuous delivery needs repeatable and testable tasks
* When a developer puts his/her hands in the DB, that change will be lost forever. Code evolves along with our Schema so keeping changes tracked is quite a necessity
* Data integrity after updates
* Rollbacks are our safety net of broken deployments. You can’t rollback your app when your data will be out of order.

Shorter release cycles often require database changes. Having those changes under version control allows us to make changes safely and in a more consistent way. A crucial part of following such methodologies is the evolutionary design which can help us keep track of how the database evolved along with our application. That way our data can rollback at any point of the history hand in hand with our app.

Evolving our database design along with our core functioning data during the application development, and doing that in a seamless way, requires the use of more sophisticated processes like Database migrations, which essentially are the management of incremental, reversible changes to our databases.

Database migrations are all about treating our database as another piece of code while applying core principles of Continuous Integration. Publishing new features along with the database changes, without requiring manual Ops work and removing any hands-on session from the DB is the way to move forward and create robust apps.

This article will walk you through the different types of migrations, how they are being used and how to write DB migrations in a Nodejs environment.

Let's explore the types of database migrations.

## Types of Migrations
Database migrations usually have two forms. Both of those forms are usually required in a long-running project.

### Altering schema
One of them is when we are in need of changing the database's schema. For example, when we add an Index, removing/adding a field or restructuring the current fields, moving one from being a String into an Integer.
This could also mean that we may need to restructure the data that is already in the database, which brings us to the second form of migrations.

### Migrating data
In a production environment, where data is already in the DB, we may have to migrate those as well. Same cases apply to testing and staging environments but production is a more fragile universe where mistakes are not forgiven.  Say we need to split the `Name` field of our Users table into a `First/Last Name` fields combination. One approach would be to create a field called `Last Name`. Traverse the table, split the `Name` into two chunks and move the latter to the newly created field. Finally, rename the `Name` field into `First Name`. This is a case of data migrations.

But how do we handle this without putting our hands in the DB?

## Automation is the key
We must be able to describe our database and the migrations with code. This will allow us to store them into our VCS and run them on demand and in an autonomous way.

## SQL vs NoSQL
As we know, SQL and NoSQL have some core differences but that also doesn't mean that we can omit migrations in any of them. SQL structure is strictly defined and both data and schema changes can be safely done using migrations. NoSQL, on the other hand, may not need that much of a schema change, due to their elasticity in that subject, but will definitely need data migrations.

## Database?
Modern apps don't necessarily handle data or talk to a database directly. E.g., in a Microservices environment, applications may rely on other applications to hold their data and communicate with them through a REST API. That's ok because migrations may still need to run. But instead of interacting directly with a database, you have to use the API to make your changes.

## Migrations dive with Nodejs
Applications built with Nodejs have no differences from any other stack.

After doing a little research, I ended up using [umzug](https://github.com/sequelize/umzug) which provides a nice programmatic API to make your migrations. It's not opinionated at all and it doesn't provide any helper functions to make your actual migrations. It's just a library that will store what migrations have run. Which is actually what I need. If you need a more powerful thing you may want to take a look at [db-migrate](https://github.com/db-migrate/node-db-migrate), which provides adapters for major databases and it will help you make changes to those in a more intuitive way.

Migration systems are providing a few standard things in order to make your migrations. Let's see those using Node.js:

### Write a migration
Usually, we want to define two standard methods for a migration script. The function to run when we are migrating and the function when we are rolling back:

```js
'use strict';

var Promise = require('bluebird');

module.exports = {
  up: function () {
    return new Promise(function (resolve, reject) {
      /* Here we write our migration function */
    });
  },

  down: function () {
    return new Promise(function (resolve, reject) {
      /* This runs if we decide to rollback. In that case we must revert the `up` function and bring our database to it's initial state */
    });
  }
};
```

Our migrations are residing inside a configurable storage and umzug is referring to them with their filenames. For that matter, we should choose our naming strategy wisely before implementation. I have chosen to give them a separate versioning, e.g. 1.0.js, 1.1.js or we could give them the issue ID of our PM that refers to the particular requirement. The choice is yours. Just be consistent.

### Keep track of the migrations that have already been executed
At any given moment, we must be able to tell what migrations have been executed and which migration needs to run next if there is one to run.
This allows us to know the state of our database.

Umzug can use Sequelize to store the history of the migration into MySQL. [But with no hassle at all, we can write our own Adaptor to store them wherever we want](https://github.com/sequelize/umzug#custom).

### Run a migration or run all migrations
We have to be able to run a specific migration or run all migrations we have written. Those must run in order because usually some of them depend on others.
E.g. on a fresh environment we must run all migrations in order to bring the newly created database to its current state, as it currently lies in production.

To run all migrations:
```js
umzug.up().then(...);
```

or to run up to a particular migration:
```js
umzug.up({ to: 'migration-filename' }).then(...);
```
### Rollback a migration
When defining one particular migration we are describing changes that will be applied to the database. Those changes must be reversible and that is why we must also describe the reverse action of that migration.
In case we need to rollback our application back in a previous state that also introduced database changes, those changes must be revert as well in order for the application to continue operating like it used to do.

Just like `up`, but running `down` instead:
To revert all migrations:
```js
umzug.down().then(...);
```
or to revert down to a particular migration:
```js
umzug.down({ to: 'migration-filename' }).then(...);
```

### Automating
umzug doesn't come with a CLI out of the box, but it doesn't take much to write one yourself.
After I wrote mine, it's just a matter of:
```bash
node scripts/migrate
```
to run all migrations in fresh environments.

```bash
node scripts/migrate [up|down] {version}
```
to go to that particular migration. This will run on every instance of our application at boot time, so if there is a pending migration, it will run it.

## In conclusion
Database manipulation should be part of our development process. There could be heavy changes where a developer couldn't handle and a DBA should come, but for rapid changes, migrations will serve us right, especially when we seeking for faster release cycles and keeping track of our Database changes.

I am sure that your system handles migration somehow, search it up if you have never thought of it.

In case you are already doing migrations, what is your preferred workflow? Leave me a comment.

See also:

* http://enterprisecraftsmanship.com/2015/08/10/database-versioning-best-practices/
* http://martinfowler.com/articles/evodb.html
* http://www.brunton-spall.co.uk/post/2014/05/06/database-migrations-done-right/
* http://databaserefactoring.com/index.html

<br/>
*[Kwstas](https://twitter.com/_margaritis/), thank you for helping me write this post. :D*
