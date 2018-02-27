---
title: "Go canonical import paths & Github forks"
path: "/go-canonical-import-paths-github-forks/"
date: "2016-02-27T15:49:31.000Z"
date_updated:   2016-11-20T13:29:42.000Z
tags: Golang, Github
---

I started playing with [Golang(or just Go)](http://golang.org) this week for the first time. Go is a compiled, statically typed language and I thought it would be a great fit for situations where Node.js, my primary go-to stack, won't be a great candidate for the job. For heavy processing and problems where concurrent-first solutions must be applied.

The first thing I did was to check the [online tour](https://tour.golang.org/welcome/1) on the official site. It's very well structured and has also some exercises to get you started. Wrapping my head around the language was very easy since it has a lot of well-known concepts like pointers and structs, similar to C.

After playing a bit around I thought I would make something using my new learnings and Go. I found a [really cool project](https://github.com/willnorris/imageproxy) and wanted to contribute to it. So I thought I will fork it and create a bootstrap application and try to import my fork. But that strange message appeared on my console:

```
package github.com/kbariotis/imageproxy: code in directory /Users/Bariotis/golang/src/github.com/kbariotis/imageproxy expects import "willnorris.com/go/imageproxy"
```

what this basically means is that my repo had an explicit [canonical import path]https://golang.org/cmd/go/#hdr-Import_path_checking) set that was forcing the consumer to download it from a [particular place](https://github.com/willnorris/imageproxy/blob/master/imageproxy.go#L17) and that was the original author's site.

[This post](https://texlution.com/post/golang-canonical-import-paths/) explains even more how this works. Since the Go command allows one to import packages from remote servers and a package may live in various places or it can be moved from one place to another, the maintainer must explicitly set the default URL that others must use to import the library, in order to avoid the [link rot](https://en.wikipedia.org/wiki/Link_rot).

But that confused me a bit since I do this all the time with `npm`. I can fork a library and import it from my fork directly.

I searched a bit around and found that the simplest thing to do (and didn't think of it) was to import the original repository and the Go command will clone it into my $GOPATH/src directory. From there I could change the git remotes URLs and send any changes onto my fork. Then make a PR to the original repo or change the canonical import path annotation if I wanted to use my fork directly.

Keep this in mind if you're just starting with the Go language. Btw, [Goroutines are awesome!](https://tour.golang.org/concurrency/1)
