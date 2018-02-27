---
title: "Our auditing service"
path: "/drafts/our-auditing-service/"
date: "2015-11-15T00:00:00.000Z"
draft: true
---

Last week, me and Goodvidio's CTO sit down to come up with a solution. We were in a need of an auditing service that will track down every movement inside our system.

Searching in Google we didn't find any real world example either any useful information as we expected. We had only our experience from the various systems we've used and how they are implementing such things. But again, we had never meet an isolated auditing service. That was our goal.

Here are my notes from the meeting.

* Our goal was to track down actions happens anywhere in the system
* We should track the action, the actor of that action(whether it's an actual user or another service) and a lot of metadata about the action.
* Actions are application level logic. This means that each of our applications (otherwise services) define their actions that want our service to track. There are no limitations, validations or anything like that. There are rules that must be followed but other than that, you are free to track what ever you want.
* We found a solution to allow the presenter of the audits to not have to render the message it self, instead we are generating a message directly from the data we receive so the presenter can take ready messages to display. Of course, it has the choice to rerender them itself.
