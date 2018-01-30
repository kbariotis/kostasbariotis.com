---
title: "Linting your project, progressively"
path: "/progressive-linting/"
date: "2017-02-03"
tags: Javascript, Linting
draft: true
---

Plenty of times, I was faced with a new Javascript codebase that was missing proper styleguide and rules. The coding style was varying across the project, undefined variables and forgotten required dependencies were lying everywhere, not to mention...

On this post, I will share my plan on how to add a linter to a codebase(Javascript) that has none but doing it in a controlled and progressive way.

## The problem
Now, the first thing that I imagine, most of developers would think after facing a problem like this, would be to stop everything and work exlusively on adding a linter and fixing and refactoring the whole codebase. Well guess what my friend, you have been bamboozled!

While refactoring is fun (at least for me), no one really likes doing it for a long period of time, let alone the fact that we can't stop releasing features regardless. The bigger the codebase, the longer will take to restructure it as a whole.

But even if we had the luxury to do it, major changes in a codebase may lead to unexpected behavior that may lead to major bugs that will certainly lead to hours and hours waste in debugging.

> ...Since each refactoring is small, it's less likely to go wrong. The system is also kept fully working after each small refactoring, reducing the chances that a system can get seriously broken during the restructuring.

With that statement [by Martin Fowler](https://refactoring.com/) In a similar position that I was a few months ago, I proposed to start fixing the code progressively, linting and refactoring only the affected code on every feature branch each of our team was working on.

This way we would have total control over what will break our code and we could fix it before it's released.

## The plan
The plan was consisted of two parts.

The first part was to setup the configuration of our linter, the rules that we wanted to follow and also to setup a pre-commit git hook that will trigger the linting and refuse to commit if it didn't pass. This way we would be sure that no "bad" code enters the codebase.

The second part was to manually run the formatter across the codebase and let it fix the easy parts (missing spaces and semicolons) in places that no human intervention would be required.

The plan worked great and in only a few weeks(we do weekly sprints) the whole codebase changed radically. We weren't bothering with formatting our code while writting it and we could be sure on every commit that we didn't forget to initialize a variable before using it.

What would you do in a similar position?
