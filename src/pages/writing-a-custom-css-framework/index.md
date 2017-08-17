---
title: "Writing a custom CSS framework"
path: "/writing-a-custom-css-framework/"
date: "2017-04-04T09:40:42.000Z"
tags: CSS, Bootstrap
---

Writing CSS is hard! Especially cross browser testing, this is like the least fun game ever. But still, it's a big deal in our day to day life and you always feel good by the outcome.

Personally, I am reusing whatever I can get off the internet and the open source community. [Bootstrap](http://getbootstrap.com) is an example of this. Bootstrap is a fine set of reusable components you can just plug into your website. The thing is that it's quite big and usually you won't be needing all of the [components](http://getbootstrap.com/components/) it offers.

Furthermore, the latest version of Bootstrap still requires jQuery which I am trying to avoid. Especially for smaller projects that have a few click events and a contact form, it's really not that necessary.

So, like a true hacker, I am using SASS to build my CSS files and my main file looks like this at first:

```scss
$bootstrap-sass-asset-helper: true;

@import "~bootstrap-sa../static/stylesheets/bootstrap/variables";
@import "~bootstrap-sa../static/stylesheets/bootstrap/mixins";
@import "~bootstrap-sa../static/stylesheets/bootstrap/normalize";
@import "~bootstrap-sa../static/stylesheets/bootstrap/print";
@import "~bootstrap-sa../static/stylesheets/bootstrap/glyphicons";
@import "~bootstrap-sa../static/stylesheets/bootstrap/scaffolding";
@import "~bootstrap-sa../static/stylesheets/bootstrap/type";
@import "~bootstrap-sa../static/stylesheets/bootstrap/grid";
@import "~bootstrap-sa../static/stylesheets/bootstrap/forms";
@import "~bootstrap-sa../static/stylesheets/bootstrap/buttons";
@import "~bootstrap-sa../static/stylesheets/bootstrap/utilities";
@import "~bootstrap-sa../static/stylesheets/bootstrap/responsive-utilities";
```

I am using [webpack](https://webpack.js.org) to parse the files. Here's an example configuration of [webpack along with Bootstrap](https://github.com/kbariotis/webpack-patterns).

The end file will contain only the essentials components I am going to need. You may have already spotted that I don't include any [components that require Javascript](http://getbootstrap.com/javascript/) thus jQuery. I am not going to include Bootstrap's Javascript files either.

Great, now let's write some HTML:
```html
<div class="container posts-container">
  <div class="row posts-row">
    <div class="col-sm-6 col-md-3 posts-row__post">
      <h1 class="post__title">Post title</h1>
    </div>
    <div class="col-sm-6 col-md-3 posts-row__post">
      <h1 class="post__title">Another blog post</h1>
    </div>
  </div>
</div>
```
Ok it works. But, there is a strong coupling with Bootstrap's grid system and our HTML code. Since Bootstrap is a CSS framework, only our CSS code should be dealing with it. This way I could remove Bootstrap in the future and only have to change my CSS code, not the HTML too.

Let's rewrite:
```html
<div class="posts-container">
  <div class="posts-row">
    <div class="posts-row__post">
      <h1 class="post__title">Post title</h1>
    </div>
    <div class="posts-row__post">
      <h1 class="post__title">Another blog post</h1>
    </div>
  </div>
</div>
```

Yeap, much cleaner, readable and domain oriented. Now let's tie this together with Bootstrap:

```scss
.posts-container {
  @extend .container;
}

.posts-row {
  @include make-row();
}

.posts-row__post {
  @include make-sm-column(6);
  @include make-md-column(3);
}
```

We either extend a Bootstrap's class or using it's [mixins](https://github.com/twbs/bootstrap-sass/blob/mast../static/stylesheets/bootstrap/mixins/_grid.scss).

Now only our CSS knows about Bootstrap. HTML doesn't care. Bootstrap can be anyone of your favorite CSS frameworks.

If I was about to switch to Flexbox for example, I would go like this:
```scss
.posts-row {
  display: flex;
  flex-wrap: wrap;
}

.posts-row__post {
  flex: 1 0 200px;
  box-sizing: border-box;
  padding: 10px;
}
```

This is how I always start a CSS codebase for a project. It helps me to create prototypes quickly and once the project hits a more mature stage, I could start rewriting and throwing away dependencies.

To conclude, try to keep your codebase clean and not mixed-up. Have a vision in your mind of how it is going to evolve in the future. Once you have that, you can start thinking of you can ease the process in the future.

Leave me a comment if you liked my approach on starting a new custom CSS framework.
