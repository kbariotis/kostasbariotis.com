---
title: "Making a REST API discoverable"
path: "/making-a-rest-api-discoverable/"
date: "2015-08-24T14:39:27.000Z"
date_updated:   2015-08-24T14:45:08.000Z
tags: rest, api
---

Making a discoverable API means thats some software would be able to traverse it, by only providing it's root endpoint. For example, my IDE could provide me all the endpoints, input schemas and responses of Github's API by putting in it's root, that is `https://api.github.com`.

This can have some major advantages. Speed would be the absolute greatest, since I don't have to search through documentation and going back and forth their site. Also, in case of an endpoint changes it's name, the software will automatically adopt the new name.

Now, all these are definitely good, but we don't see that much of API's making themselves discoverable. Why is that? Well, mostly because speed is not that much of an issue, since REST is pretty explanatory it self, you only have a few verbs to respond to, so each API's documentation wouldn't be that much. As for the breaking changes, well putting a Version number in front of each endpoint seems to work pretty good.

The first thing that comes in mind when talking about discovering web services is Web Services Description Language(WSDL). Before the major adoption of REST principles, people would create APIs in different forms. And so a way to describe them was necessary. That's where WSDL would take action. REST on the other hand is not the same. When we hear an API is REST compliant, we know that uses the common HTTP verbs, can return/accept XML or JSON and respond with the known HTTP statuses codes. That is what REST APIs is all about.

Nevertheless, I would say that machines that talk to each other, that are indeed able to discover each other's resources, is a tasty subject and I'm pretty sure that we will see it really soon. At the mean time, let's focus on making our APIs usable and understandable with bare eye.

Here are some references you can use if you want to make your API's discoverable. You can check out these great specs about describing your API through it's responses. I am not sure how these can be widely adopted, but once they do, we should expect it to go big. Never used them, so I am expecting from you. Google's also has looked into this and came out with some really fascinated results, be sure to check them also.

http://micro-api.org/
http://jsonapi.org/
http://www.odata.org/
https://developers.google.com/discovery/
