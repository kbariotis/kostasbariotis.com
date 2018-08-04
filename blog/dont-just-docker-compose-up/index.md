---
title: "Don't just \"docker-compose up\""
path: "/dont-just-docker-compose-up/"
date: "2018-08-05"
tags: docker-compose, docker
---

Chances are that you are working on a containerized stack. Whether
you built it yourself or joined a company and found one there,
you are probably using `docker-compose` to replicate a local development
environment as close to the production as possible. <small>(In case that
you are using a different approach, please let me know in the comments.
I would love to hear it!)</small>

I am going to guess that you have been probably typing `> docker-compose up`
once you are on your desktop early in the morning and then taking a deep
dive into an ocean of logs, scrolling up and down often for minutes until
you find that single line you have been looking for. In this post I want to share how I have been working with `docker-compose` that helped me be more
flexible and efficient and hopefully will help you too!

![docker-compose up example](https://www.summa.com/hs-fs/hubfs/docker-compose-up.gif?t=1532870602035&width=640&name=docker-compose-up.gif)

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
Redis logs while you are working on refactoring your favorite class?

So, since you are working on one container only and you want to watch its
logs, append the container's name at then end of the command as it's
written in your `docker-compose.yml` file. For a container called `api`:

`> docker-compose logs api`

`logs` will dump all logs that docker has been collecting for the whole
lifetime of that container are running. These can be long and every time
you call the `logs` command will be taking more and more time to reach the
end of the output. As a solution, we can only dump the tail of our logs by
using the `--tail` switch. Let's dump only the last 1000 lines:

`> docker-compose logs --tail=1000 api`

Great. But now you will have to switch on your terminal and rerun the
command every time. We can leave it open with the `-f` switch:

`> docker-compose logs --tail=1000 -f api`

Yeah! That's definitely better. Add that as an alias to your shell so
you won't have to remember and type it every time.

Thank you for reading this little piece. Let me know of your tips and tricks
while working on your local development environment in the comments. 😎
