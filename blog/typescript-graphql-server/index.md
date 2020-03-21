---
title: "Setting up a GraphQL server with TypeScript"
path: "/graphql-server-typescript/"
date: "2021-03-21"
tags: TypeScript, GraphQL
---

This article will go through setting up the basic structure of a GraphQL server with TypeScript. I will use [apollo's Koa server](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-koa) package that I found to be very straightforward and also will set up some basic smoke tests with `mocha` and `supertest`. Let's go!

GraphQL, [by providing its own definition language](https://graphql.org/learn/schema/), it's often hard to co-exist with our high-level language of choice. But things don't have to be complicated, so let's try to keep it simple and create a maintainable structure and keep separate concerns as possible.

I will assume that you have a TypeScript project set up already in your preferred way. If not, you will find a complete example by the end of this blog post. Bear with me till then.

## Kick off

Let's install some required packages first:

`> npm install --save apollo-server-koa koa koa-router`

`> npm install --save-dev chai supertest mocha`

Great, now let's start with setting up `koa` and the `apollo-server-koa` package. We will start with our apps' entrypoint, say `server.ts`:

```TypeScript
// src/server.ts

import Koa from "koa";
import KoaRouter from "koa-router";
import { ApolloServer, gql } from "apollo-server-koa";
```

We will first import our required modules.

```TypeScript
async function main() {
  const app = createApp();
  const port = process.env.PORT || 3100;

  app.listen(port);

  console.log(`Listening on port ${port}`);
}
```

Then we define a `main` function that will create a Koa app and start listening. We will come back to it later.

```TypeScript
// src/server.ts

// ...

export function createApp(): Koa {
  const app = new Koa();

  const router = new KoaRouter();

  const server = new ApolloServer({
    typeDefs: gql(`
      type RootQuery

      type RootMutation

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    context: ({ ctx }) => ctx,
    formatError: errorHandler,
    resolvers: {
      RootQuery: {},
      RootMutation: {},
    }
  });

  router.get("/healthz", ctxt => {
    ctxt.body = "ok";
  });

  router.post("/graphql", server.getMiddleware());
  router.get("/graphql", server.getMiddleware());

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}
```

The `createApp` function, as mentioned before, will construct our Koa app, along with the GraphQL schema and server. At the moment, our GraphQL schema is empty and does pretty much nothing. But notice how we were able to specify a Koa route for our GraphQL endpoint and a `/healtz` endpoint for our load balancer. Let's move on.

```TypeScript
// src/server.ts

// ...

const errorHandler = err => {
  console.log("Error while running resolver", {
    error: err
  });

  // Hide all internals by default
  return new Error("Internal server error");
};

```

Our error handler is very basic and as is, will always respond with a 500 and a mystic error message. We will change that later on.

```TypeScript
// src/server.ts

// ...

if (require.main === module) {
  main();
}
```

The final piece is an instruction to only call `main` if the file was called from the CLI and wasn't required from another module. That's important for our tests and we will see it right now.

Let's write some tests right away.

```TypeScript
// src/server.test.ts

import supertest from "supertest";

import { createApp } from "./server";

const request = supertest(createApp().listen());

describe("Server", () => {
  it("should respond for health check", async () => {
    await request
      .get("/healthz")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
```

Here we are using `createApp` to create and return an instance of our Koa app and pass it to `supertest`. That will give us the environment we need to make requests. We start off with a basic request to `/healtz` and expect to have a valid 200 OK response.

Now let's add our first GraphQL query. Let's go back to where we defined our Appolo server:

```TypeScript
// server.ts

// ...

const server = new ApolloServer({
  typeDefs: gql(`
    schema {
      query: Query
    }

    type Query {
      hello(name: String): String
    }
  `),
  resolvers: {
    Query: {
      hello: function hello(
        root: {},
        args: { name: string },
        context: {}
      ): String {
        return `Hello ${args.name}`;
      }
    }
  },
  formatError: errorHandler,
});

// ...
```

Our GraphQL schema is pretty basic now, we added a `hello` query and an apropriate resolver that will do nothing other than just returnig the passed argument. Let's write a test before we move on:

```TypeScript
// src/server.test.ts

// ...

describe("GraphQL Server", () => {
  it("should query hello", async () => {
    await request
      .post("/graphql")
      .send({
        query: `
          {
            hello(name: "Kostas")
          }
        `
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body.data.hello).to.eq("Hello Kostas");
      });
  });
});
```

Amazing, a very basic test for our query.

## Scaling up

Now let's go back to our server definition. Notice how fast it will grow as we start to add more queries and mutations. Let's break it up. Start by creating a folder `src/schema`. That's where we will store our GraphQL definitions. Then a folder `src/queries` where we will store our GraphQL resolvers. Let's move away the `hello` query.

```GraphQL
// src/schema/hello.graphql

extend type Query {
  hello(name: String): String
}
```

And our query:

```TypeScript
// src/queries/hello.ts

export default {
  Query: {
    hello: function hello(
      root: {},
      args: { name: string },
      context: {}
    ): String {
      return `Hello ${args.name}`;
    }
  }
}
```

And finally the server:

```TypeScript
// src/server.ts

import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

// ...

  const server = new ApolloServer({
    typeDefs: gql(
      readFileSync(pathJoin(__dirname, "schema/hello.graphql")).toString()
    ),
    resolvers: {
      Query: helloQuery.Query
    },
    formatError: errorHandler
  });

// ...

```

Amazing! Now run our tests again and they should pass.

Now to avoid having to add new lines every time we add a new query or mutation, let's do something slightly more sophisticated. Let's traverse our `schema` folder and build our server based on that.

```TypeScript
// src/server.ts

// ...

// Fetch all schema definition files
const schemaFiles = readdirSync(pathJoin(__dirname, "schema"))
  .filter(file => file.indexOf(".graphql") > 0);

// Concatanate them to create our schema
const schema = schemaFiles
  .map(file => readFileSync(pathJoin(__dirname, `schema/${file}`)).toString())
  .join();

// Based on these files, bring their respective query resolvers
const queryResolvers = schemaFiles
  .map(file => file.replace(".graphql", ""))
  .map(file => require(pathJoin(__dirname, `queries/${file}`)).default)
  .reduce(
    (initial, current) => ({
      ...initial,
      ...current.Query
    }),
    {}
  );

const server = new ApolloServer({
  typeDefs: gql(`
    type Query

    schema {
      query: Query
    }

    ${schema}
  `),
  resolvers: {
    Query: queryResolvers
  },
  formatError: errorHandler
});

// ...

```

Run our tests again, they should pass again. Try to start your server as well.

_Did you know that apollo's server comes with a development GraphQL client? Start your server and head to `/graphql` on your browser on your servers' host and port._

## More types

So far, we've been doing great. Notice the `hello` query how it returns a `String` type. That's great, but with TypeScript and GraphQL, we are able to define more complex type structures. As a matter of fact, we are definitely going to need them. So let's change the query to return a more complicated object.

```TypeScript
// src/queries/hello.ts

interface HelloResponse {
  name: String;
  greeting: String;
}

export default {
  Query: {
    hello: function hello(root: {}, args: { name: string }): HelloResponse {
      return {
        name: args.name,
        greeting: `Hello ${args.name}`
      };
    }
  }
};
```

```GraphQL
// src/schema/hello.graphql

type HelloResponse {
  name: String
  greeting: String
}

extend type Query {
  hello(name: String): HelloResponse
}

```

Amazing, now let's change our test as well.

```TypeScript
// src/schema/hello.ts

// ...

  it("should query hello", async () => {
    await request
      .post("/graphql")
      .send({
        query: `
          {
            hello(name: "Kostas") {
              name
              greeting
            }
          }
        `
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body.data.hello.name).to.eq("Kostas");
        expect(response.body.data.hello.greeting).to.eq("Hello Kostas");
      });
  });

// ...
```

And run our tests again. Hopefully, they should pass like nothing changed.

## Conclusion

That was it. I hope that you have been following along and managed to keep your tests green along the way.

You can find a complete example of the above [on GitHub](https://github.com/kbariotis/typescript-graphql-server). Give it a pass and see what differences you have with your own or simply clone it and play around with it.

Let me know in the comments what you thought of the article and remember to share it with your colleagues.
