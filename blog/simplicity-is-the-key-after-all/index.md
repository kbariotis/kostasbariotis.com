---
title: "Simplicity is the key after all..."
path: "/simplicity-is-the-key-after-all/"
date: "2013-09-02T16:02:09.000Z"
date_updated:   2013-09-02T16:02:09.000Z
---

I was called to create a Facebook Page Application to take part on contests, while an Admin panel was necessary to manage those contests. When i first heard about it, i immediately thought to give a try a new <a title="Fat Free Framework" href="http://fatfreeframework.com" target="_blank">PHP framework</a> i was working on lately. It's based on <a title="MVC Pattern" href="http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC principles.</a>

So, the main idea was that i would keep separate Controllers, one to serve the Facebook app through Facebook's iframe, that would answer only to POSTs, etc, etc; and one that would serve users wanting to access the Admin panel from anywhere.  I created separate Views on the Controller, that was serving the Facebook Page app, one that would determine if the user has liked our page or not, if the contest was currently drawed and would redirect the Facebook's iframe on the appropriate View.

The idea was so simple, that ended up too complex. So complex that bugs out of nowhere jumped in.

The latest bug i worked on all day today was that due to too many redirects, i was doing, on the same controller, Safari and it's '<a title="Safari's 3rd party block cookies policy discussed" href="http://stackoverflow.com/questions/14825805/cookies-not-setting-in-safari-6" target="_blank">Blocking 3rd Party Cookies</a>' policy wouldn't allow to keep sessions, so i had to eliminate those redirects in order to create a persistent user experience.

Some times too much simplicity can drive you crazy...
