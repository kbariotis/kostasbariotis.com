---
title: "Geospatial Query with MongoDB and Node.js"
path: "/geospatial-query-with-mongodb-and-node-js/"
date: "2014-10-30T18:16:00.000Z"
date_updated:   2015-07-16T16:14:43.000Z
tags: node.js, mongodb, wearetech.io
---

Hasn't been a long time when i started working with <a title="Wearetech.io" href="http://wearetech.io" target="_blank">Wearetech.io</a> and my first challenge was on. Sweet!

If you want to learn more about Wearetech.io, check the <a title="Wearetech.io" href="http://wearetech.io" target="_blank">site</a> and our <a title="Wearetech.io on Github" href="https://github.com/WeAreTech/wearetech.io" target="_blank">Github repo</a>.

Now on the fun part. We have a use case where an individual would be able to register on our site as a City Curator.

He could search for his City and if he wouldn’t find it in our database he would register it. When the next candidate comes in, he searches for his place and if it would be inside a 10 kilometers range of an already registered city we would deny it, since we wouldn’t want to have city calendars overlapping with each other.

When <a title="Thanasis Polychronakis on Twitter" href="http://twitter.com/thanpolas" target="_blank">Thanasis </a>started building Wearetech.io he decided to go with MongoDB. So in order to create the above scenario, <a title="MongoDB Geospatial Queries" href="http://docs.mongodb.org/manual/applications/geospatial-indexes/" target="_blank">MongoDB Geospatial Queries</a> to the rescue!

MongoDB supports two types of <a title="Geospatial Queries on Wikipedia" href="http://en.wikipedia.org/wiki/Spatial_query" target="_blank">Geospatial Queries</a> indexing.
<ul>
	<li>The spherical (<a title="2dSphere Indexes on MongoDB" href="http://docs.mongodb.org/manual/core/2dsphere/" target="_blank">2dSphere</a>), that would allow you to store shapes made of points (coordinates) and then make comparisons with them like intersection, etc.</li>
	<li>The flat (<a title="2d indexes on MongoDB" href="http://docs.mongodb.org/manual/core/2d/" target="_blank">2d</a>), that would store single points and then come up with their distances.</li>
</ul>
Your choice will affect your development a lot down the road, so think wisely.

Now on the code side, we will use Mongoose to shape our models. Here's the most simple one.

```js

var mongoose     = require('mongoose');
var Schema     = mongoose.Schema;

var CitySchema   = new Schema({
  name: String,
  geo: {
    type: [Number],
    index: '2d'
  }
});

module.exports = mongoose.model('City', CitySchema);
```

Now we can start populating our DB like this

```js
var City = require('./app/models/city');

var cityModel     = new City(); 
cityModel.name = req.body.name; 
cityModel.geo    = [ req.body.lat, req.body.lng ]; 

cityModel.save(function (err) {
  if (err)
    res.send(err);

  res.json({});
});
```

And now on the fun part

```js

var distance = 1000 / 6371;

var query = City.findOne({'geo': {
  $near: [
    req.body.lat,
    req.body.lng
  ],
  $maxDistance: distance

  }
});

query.exec(function (err, city) {
  if (err) {
    console.log(err);
    throw err;
  }

  if (!city) {
    res.json({});
  } else {
    console.log('Cant save: Found city:' + city);
    res.json(city);
 }

});
```

Our distance is in radians metric system and you can find more on how to calculate it <a title="Convert to radians" href="http://docs.mongodb.org/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/" target="_blank">here</a>.

*Due to recent Heroku pricing changes, this demo has broke. Still haven't find the time to fix it. :(*
Here is a <a title="MongoDB Geospatial Queries PoC" href="https://damp-everglades-7521.herokuapp.com/" target="_blank">demo </a>of it. Try searching your City. If it's available register it and then try to find a place inside a 10 kilometers range of your previeus registered City.

Hope you will find it interesting. Comments?
