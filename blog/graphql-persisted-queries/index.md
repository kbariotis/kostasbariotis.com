---
title: "GraphQL Persisted Queries"
path: "/graphql-persisted-queries/"
date: "2020-12-05"
tags: GraphQL, JavaScript, NodeJS
---

Persisted queries (or persisted documents) serve two purposes when it comes to GraphQL: performance and security. The options for implementation varies depending on which one you focus on.

First, a short introduction. With persisted queries enabled, we omit the full body of the GraphQL query in the client and only send its pre-computed hash (along with run-time variables). The server will then know where to look for to fetch the right query body and execute it.

On the performance side, we've achieved a great reduction in bytes which will eventually translate to both speed and cost savings. On the security side, we've obfuscated internal information about our data graph but also are able to allow-list only recognized queries and revoke access to bad ones.

Staying on the security side for a bit, that's not to say that persisted queries will solve all your problems. [There are already quite a few things you need to consider when implementing your GraphQL API](https://carvesystems.com/news/the-5-most-common-graphql-security-vulnerabilities/). How I like to think about persisted queries is as a prevention mechanism **after** a security vulnerability has slipped through the cracks and made it in your production environment.

Let's take a step back. GraphQL is definitely rising in adoption but it's still not widely adopted. Major security holes are yet to come and it will take only one DefCON talk to make every GraphQL server out there a sandbox for black hats.
