---
title: "Frontend apps with Docker multi-stage builds"
path: "/frontend-apps-docker-multi-stage-builds/"
date: "2021-12-30T03:49:16.408Z"
tags: Docker
draft: true
---

I'm probably late to the game, but I have just discovered Docker's new (well..) feature, the [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/). At first, it came handy for building Go binaries, starting with a `golang` base image, compiling the project and then continuing with a `scratch` image to actually run the binary. Here's how it helped me build the containers for [the Discover project](https://github.com/kbariotis/go-discover/blob/2fede2c221ba8bd343db03c64778adaab53b4266/Dockerfile.crawler). Superb!

But then I started thinking about other cases and suddenly it struct me! Frontend baby! In this article I will through building a `Dockerfile` suitable for holding a Gatsby project. This `Dockerfile` will be able to serve a development environment with the help of docker-compose, but also creating a final image from `nginx` ready to go up on your kubernetes cluster (or wherever really).

So, let's get on.

## The process

In a frontend project, usually there are two distinct processes. The development and the build process. Development will sping up a local server, probably with `webpack`, some file-watching daemon, etc. The build process will build everything up producing the final artifacts that will go on your server. `create-react-app` anyone?

The base in each of these processes is the same. Install Node, fetch npm packages, and so on and so fourth.

Gatsby in particular, has two commands, `gatsby develop` and `gatsby build`. 

## The Dockerfile

Let's start with the base image. Here's a very common `Dockerfile` for building a Gatsby project.

```Dockerfile
FROM node:10 as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8000

CMD [ "gatsby", "build" ]
```

Pretty basic.

Now let's add a `docker-compose.yaml` file to help us with local development. You may have one of these already probably serving a local API, so embedding it into your workflow will be a breeze.

```YAML 
version: "3.4"

services:
  website:
    container_name: gatsby_website
    build:
      context: ./
      dockerfile: Dockerfile
    ports:
      - 8000:8000
    command: ./node_modules/.bin/gatsby develop -H 0.0.0.0
    volumes:
      - /usr/src/app/node_modules
      - .:/usr/src/app
    environment:
      - NODE_ENV=development
```

Notice how we are overriding the command so instead of running `gatsby build` inside the container, the `gatsby develop` process will kick in instead. Try it by running running `docker-compose up`.

## The deployment

But now, we would like to actually build our website and put it inside an `nginx` container. That container will then be deployed in a `kuberentes` cluster. Let's do some modifications to our files above:

```Dockerfile
FROM node:10 as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "gatsby", "build" ]

+ FROM nginx as server
+ 
+ EXPOSE 80
+
+ COPY --from=node /usr/src/app/public /usr/share/nginx/html
```

```YAML 
version: "3.4"

services:
  website:
    container_name: gatsby_website
    build:
      context: ./
      dockerfile: Dockerfile
+     target: node
    ports:
      - 8000:8000
    command: ./node_modules/.bin/gatsby develop -H 0.0.0.0
    volumes:
      - /usr/src/app/node_modules
      - .:/usr/src/app
    environment:
      - NODE_ENV=development
```

That's it! Now our `Dockerfile` will produce an `nginx` container with our final website deployed in. Docker-compose will continue to work as is but notice the `target` option. That's to say to Docker to stop at the first stage of our multi-stage build. Brilliant!

## Conclusion

And there you go. A single `Dockerfile` to use for both development and production in conjuction with `docker-compose`. Life just became simpler.

I'm sure more use cases can come out of that. I would love to hear how are you using it! Hit me in the comments below.
