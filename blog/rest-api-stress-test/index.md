---
title: "REST API Stress Test"
path: "/drafts/rest-api-stress-test/"
date: "2016-11-01T00:00:00.000Z"
draft: true
---

Great, so finished your newly designed REST API that will back up your upcoming platform. You are about to hit live and you are expecting a fair amount of visitors, but there is the possibility of overcoming that amount and you want to test your API to see how far it can go.

Enter stress tests. Stress tests can simulate users that come and hit requests over your API. The frequency of those requests is the key metric here and what you really want to know is how much you can afford.

The most well known stress test utility out there is Apache's AB. If you have installed Apache already you also have installed AB. So fire up your console, write `ab` and hit Enter.

AB is benchmarking tool for Apache servers, but you can use it with every HTTP serving platforms, such as Nodejs apps.
