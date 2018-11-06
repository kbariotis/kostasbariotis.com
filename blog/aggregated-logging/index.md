---
title: "Aggregated logging"
path: "/aggregated-logging/"
date: "2018-10-01"
draft: true
---

This is an attempt to write about aggregated logging.

Before that I would like to test [mermaid](https://mermaidjs.github.io/)
along with Gatsby.

Here it goes:

Imagine multiple services that log to stdout

```mermaid
graph BT
  subgraph Service 1
    stdout1[Your standard logs]
  end
  subgraph Service 2
    stdout2[Your standard logs]
  end
  subgraph Service 3
    stdout3[Your standard logs]
  end

  Application-.->stdout1
  Application-.->stdout2
  Application-.->stdout3

  Application[Aggregator]
```
