---
title: "The Configuration Service"
path: "/the-configuration-service/"
date: "2015-11-13T18:51:34.000Z"
date_updated:   2015-11-14T20:05:04.000Z
tags: Microservices
---

While we were moving towards the [Microservices](http://martinfowler.com/microservices/) path at [Goodvidio](https://goodvid.io), we were in the need of keeping in a central place the configuration of our system. Thus, we created the *Configuration Service*.

The *Configuration Service* exposes a REST API (like all of our services) and provides a place to store configuration variables and values to all of our developers. Each Service of our infrastructure can have a record stored in the *Configuration Service*. Those records will then be consumed and manipulated by a front end screen, so that even non technical people can alter their values.

As a developer that I am working in a feature and I want to make use of the *Configuration Service*, I must first make sure that there isn't already a record for the Service that I work on and if there isn't I have to create it.

```
GET /v1/configurations/ONBOARDING
```

If the above call return an empty array, I can create it by `POST`ing a body:
```json
{
  "_id": "ONBOARDING",
  "configuration": {
    "free_trial_duration" : "43800"
  }
}
```

This way we keep all the configuration of our System in a central place and even the marketing team can decide some day to change the duration of the free trial period.

That means fewer deployments, thus faster involvement.
