---
title: "Jekyll + webpack = ❤️"
path: "/drafts/jekyll-webpack/"
date: "2017-02-25T00:00:00.000Z"
draft: true
---

Static site generators are amazing tools, hands down! I love working with [Jekyll](https://jekyllrb.com/) and here are some of the features you are missing if you aren't using one:

* Deduplication of common code blocks

Write you code once, include it everywhere

* Template engine

You know, for loops, if conditionals, etc

* Separated data stores

Separation of concerns

* Configuration management

Generate multiple versions of your site based on the environment or whatever

I have been using Jekyll for a while now and I have to love it. I wouldn't say that it's the best since I've never used some other but I would love to hear from someone that has features that are missing from Jekyll.

So on this blog, I would like to present you with my minimal Jekyll configuration that I use on every site I work with. It has the form of a tutorial, so either follows steps below or grab directly the code from GitHub and start coding.

## Generate a new site

Start by generating a new Jekyll project. Download and install `ruby`.

`jekyll new .`

## File and folders structure

At first, you will notice that there is no markup at all. By default, Jekyll uses a theme that hides all that from you. But we need to inject our custom markup. Let's first remove the line `theme: minima` from _config.yml.

You will also notice a `_posts` folder with an example blog post inside. Let's not spend time on that. Maybe in another post. Delete the whole folder.

Now, open `about.md` and `index.md`. Those are the main pages of our site the index page and the about page. Every file you put there, Jekyll will generate a new page with that page in that path.

About's page content:

```yaml
---
layout: page
title: "About"
permalink: /about/
---
```

Now, this is Jekyll's frontmatter. We are requesting here this page to be generated with the default layout, have that specific title and be the `index.html` in the root directory. Jekyll will either copy paste every HTML file as is inside the final folder or will generate HTML files as told. This is what we do here, we are instructing Jekyll to generate an `index.html` file in the root directory.

Index page uses the home layout. But what are these layouts? Glad you finally asked. Those layouts were being hidden again by the default time. Let's write our own. Let's have one for start. Create the `_layouts/default.html` file and put inside:

```xml
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
{{ content }}
</body>
</html>
```

This is a basic HTML structure with the `{{content}}` directive. This directive will render everything from a page that has extend that layout.

Great! Now we have a layout as well. I don't like HTML files laying around at the root directory. Let's have a separate folder for our pages. Create a `pages` folder in the root directory. The underscore demotes that this folder will be processed by Jekyll. Now we need an index page. Create an `index` folder inside `_pages` with an index.html file inside. Put inside the below snippet:

```yaml
---
layout: default
title: "WOW Jekyll"
permalink: index.html
---
<h1>Hello world</h1>
```

Do the same for the about page. This way, we will keep only configuration files in the root directory and have our content in respective folders.

Let's proceed with the 404 page. Same thing, create a `pages/404/index.html` with contents:

```yaml
---
layout: default
title: "404 Not Found"
permalink: 404.html
---
<h1>Not found</h1>
```

And here's our 404 page that our HTTP server will server whenever doesn't find a corresponding route.

Fire `jekyll serve` and open the displayed link in your browser. You will see our index page.

Go to an undefined route and you will see our 404 page.

## Webpack integration

Now that we have our basic file structure, we need a way to handle our frontend assets. I am using NPM for my JS dependencies. Same with CSS dependencies plus the SASS preprocessor. Let's first, create a folder to put all these there. Create a `_sources` folder and `js` and `sass` folders inside.

Let's first initialize NPM.

`npm init`

follow the instructions until you are finished.

Proceed with installing webpack and it's dependencies.

`npm i --save webpack style-loader file-loader extract-text-webpack-plugin css-loader postcss-loader webpack-dev-server sass-loader node-sass webpack`

Now let's install Bootstrap.

`npm i --save bootstrap-sass`

We are going to use a few Bootstrap's core modules like the typography and the grid. I am not going to use Bootstrap's JS modules since they require jQuery.

We will use `webpack` to process the files from that folder and put them inside `assets` folder. Jekyll will copy that folder inside the final build.

Create an `webpack.config.js` to the root directory. Put there the contents:

```js
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: `${__dirname}/source/sass/main.scss`,
    'index-page': `${__dirname}/source/js/index-page.js`
  },
  output: {
    path: "/path.join(__dirname, ../static/'),"
    publicpath: "/'/',"
    filename: 'js/[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: function () {
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }),
        include: `${__dirname}/source/sass`,
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/style.css',
      allChunks: true,
    })
  ],
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    inline: true,
    proxy: {
      "**": "http://localhost:4000"
    },
    host: '0.0.0.0'
  },
};
```

So webpack will process our main `scss` file and put it into `assets/css/style.css`. Jekyll will be able to grab it from there. Also, JS files will be processed, be bundled and put into `assets/js` as a separate file for each of our pages.

Last, we have enabled `webpack-dev-server` and make it a proxy to Jekyll's host and port. So, in order to use it and have all the good stuff like Hot module replacement we will use that server on development.

All we need now is to include them into our layout file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{page.title || site.title}}</title>
  <link rel="stylesheet" href../static/css/main.css">
</head>
<body>
{{ content }}
<script src../static/js/entry.js"></script>
</body>
</html>
```

Fire up webpack's dev server:

`./node_modules/.bin/webpack-dev-server --inline --hot`

## NPM Scripts
Now that everything is in place, we want to take advantage of webpack's cool dev features like hot module replacement, etc. To do this we need

## Deployment
