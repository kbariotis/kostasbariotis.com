---
title: "Dive deep on docker-compose"
path: "/drafts/dive-deep-docker-compose/"
date: "2018-08-05"
draft: true
---

Chances are that you are working on a containerized stack. Whether
you built it yourself or joined a company and found one there. If
that's the case then I guess you are using `docker-compose` to
orchestrate your containers and replicate a local development
environment as close to the production as possible. <small>(In case that
you are using a different approach, please let me know in the comments.
I would love to hear it!)</small>

I am going to guess that you have been probably typing `> docker-compose up`
once you are on your desktop early in the morning and then hitting `CTRL+C`
before you leave. In this post I want to share my way of operating the above
command and hopefully will help you too.

First, start docker-compose with the `-d` switch. From the docs:

> Running docker-compose up -d starts the containers in the background and leaves them running.

You will notice that the commands exits immediately and you don't see
the logs of the standard output anymore.

Let's see the state of the containers now:

`> docker-compose ps`

The output of the command is similar to the `docker ps` command. You
will see a table with the names, the commands that have been used to start the containers, their state and their exposes ports. If the state of a
container is `Up`, it means that it successfully booted up.

But where are the logs you will be wondering.

`> docker-compose logs`

and you will see the same output as from when we were not using the `-d`
switch. As your docker-compose stack grows though, those logs will start
to become harder and harder to watch. And also, why would you want to watch
Redis logs while you are working on a refactoring of your favorite class?

docker-compose up -d
docker-compose ... docker commands
docker-compose logs / -f /--tail=N
docker-compose ps
