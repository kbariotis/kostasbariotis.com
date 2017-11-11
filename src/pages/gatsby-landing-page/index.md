---
title: "Create an SEO friendly and performant landing page with Gatsby.js"
path: "/gatsby-landing-page/"
date: "2017-10-30T18:16:00.000Z"
draft: true
tags: Javascript, gatsby.js, react.js, SSR
---

On this post, I will go through the process of creating a landing page using Gatsby.js and BootstrapCSS framework. I use the same process for all my projects and products and I can certainly say that it works like a charm every time.

Gatsby.js will allow us to describe our page's functionality and appearence with React.js and take full advantage of React's ecosystem. Using BootstrapCSS we will be able create fast prototypes for our various components we are going to need for our page. For start, we will use a ready made template found free over the Web.

For a quick introduction to Gatsby and it's benefits, I wrote an article recently that you may be find interesting.

This tutorial requires basic knowledge of the React.js framework and ofcourse HTML/CSS. Node.js and npm must be installed on your system.

Let's start.

## Set up Gatsby.js

`$> npm install -g gatsby`

Then create a new Gatsby.js project using the Gatsby CLI.

We will fire the command:

`$> gatsby new gatsby-tutorial`

The above will create a folder structure that is ready to be build. The structure is:

```
src
|- layouts
   |- index.css
   |- index.js
|- pages
   |- 404.js
   |- index.js
   |- page-2.js
.gitignore
package-lock.json
package.json
gatsby-config.js
```

Let's have a look on these files and folders.

`.gitignore` comes preconfigured with all files and folders used by Gatsby and needs to be ignored. You can add more entries but do not remove those already in there.

`package.json` and `package-lock.json` are used by npm and have the dependencies needed to run and build the Gatsby project.

`gatsby-config.js` is a configuration file for Gatsby. We will add our plugins in there and also static information we need available on our site.

The `layouts` will host different layouts for our site. For this tutorial, we will only need one layout, the default one. We will replace the `index.css` file with our SCSS file later on.

The `pages` folder contains all our different pages. The `index.js` file is our homepage. The `404.js` is the one that will be shown when a route was not found and the `page-2.js` is just another page.

Now that we have a better understanding of Gatsby's folder structure, we will add BootstapCSS. Open a terminal and type:

`$>npm i --save-dev bootstrap-scss`

We are installing the SCSS version of Bootstrap, in order to selectively import the modules we want, instead of just importing it all.

Now by default, Gatsby won't understand an SCSS file. We need to add a [plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-sass/) that will compile our SCSS files.

On your terminal again, type:

`$>npm i --save-dev gatsby-plugin-sass`

and then include the plugin in your `gatsby-config.js` file like this:

```json
// in gatsby-config.js
plugins: [
  `gatsby-plugin-sass`
]
```

Great! Now our Gatsby project is ready to be modified and add our own template. You may test it and see that everything went right:

On your terminal:

`$>npm run develop`

This will start Gatsby on development mode and instruct you to open your browser on a specific host. Open it and you will the Gatsby's starter site.

## Add your own template

Now, for the scope of this tutorial, we will use a ready made template found on the internet. We will use [this one](http://blacktie.co/2015/03/sumo-landing-html-wordpress-landing-page/) that I found and seems great for this tutorial. Download it and extract it. You will see that it's a huge HTML file and has Bootstrap and JQuery as a dependency and has a `style.css` file that contains the custom styles of the template.

Now what we will do, is to copy everything inside `<body>` and paste it inside our `pages/index.js` component's `render` method. Then we will need to rename all `class` attributes to `className` (cause thats what React understands). Do not copy the `<script>` at the end.

You will also notice that there are some `<img>` tags pointing to static assets. First copy those assets inside your `src` folder (make a subdirectory). Then we will require them first and then inject them inside our Markup. So, on top of the `index.js` file add a line for each of our images:

So we will turn this:

```HTML
<!-- old index.html file -->
...
<a href="#"><img src="assets/img/app-store.png" height="50" alt=""></a>
...
```

into this:
```JSX
// src/index.js
...
const appStoreImg = require('../assets/images/app-store.png)
...

...
render() {
  <div>
    {/* ... */}
    <a href="#"><img src={appStoreImg} height="50" alt=""></a>
    {/* ... */}
  </div>
}
```

So with this we are comming to the understanding, that Gatsby will compile everything inside `src` folder so there will be no paths that we can use before compiling. By doing the above, we are instructing Gatsby to do whatever it needs to be done with the `app-store.png` image, then figure out it's path and inject it into our `<img>` tag.

Now that we have our images in place, we need the custom style that comes with our template. We could just copy paste everything inside our `layouts/index.css` file, but remember that we indentionally decided to add SCSS support in order to selectively add our Bootstrap modules we want. So, we will rename and move our `layouts/index.css` into `scss/index.scss` that will contains:

```
import "./bootstrap"
import "./custom"
```

The create two more files, `layouts/bootstrap.scss` and `layouts/custom.scss`. `layouts/bootstrap.scss` will contain all our imports for Bootstrap, like that:

```scss
@charset "UTF-8";
$bootstrap-sass-asset-helper: true;

@import "~bootstrap-sass/assets/stylesheets/bootstrap/variables";

$font-size-base: 16px;

@import "~bootstrap-sass/assets/stylesheets/bootstrap/mixins";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/normalize";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/print";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/glyphicons";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/scaffolding";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/type";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/code";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/forms";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/navbar";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/navs";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/component-animations";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/utilities";
@import "~bootstrap-sass/assets/stylesheets/bootstrap/responsive-utilities";
```

Notice how we selectively add the Bootstrap modules we want and how we override Bootstrap's variables. This way our final bundle will be less in size and we can also configure Bootstrap without overriding it's values and thus adding more code.

Now in our `scss/custom.scss` we will paste the styles from the template (remeber to fix any url paths errors). CSS is valid SCSS so it should be functioning as before and we can extend it by adding SCSS mixins and variables. That's up to us.

## Multiple pages
Besides everything else, Gatsby does it great when it comes to multiple pages of our site. To demonstrate this behavior, we will break our landing page into two pages and extract the pricing section to another page.

You will find the different sections of the landing page at `src/pages/index.js`. We will create another file, `src/page/pricing.js` and extract the pricing and the testimonials section right there.

Navigate over at `localhost:8000/pricing` and you will notice that we are missing our header and footer. But we don't have to keep them on every page so we will extract them from the index page and move them to our `layouts/index.js` file.

I don't want the form to be on every page too, so I am going to do some modifications that you will find over at the repository of this project.

Notice also the use of `Link` component. Gatsby uses this component to track your pages and the transitions, in order to be able to smooth client side navigation.

## Contact form
Now that our page has some visual form and we are happy with the result, we can start adding some functionalities. To start with, we will make the subscription form on the header functional!

Since our index page is just a React component, we can just start adding functionality as we know. Let's add an event to fire once the Subscribe button is clicked and send the email to our server.

```JSX
...
class IndexPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
    }
  }

  handleEmailChange({value}) {
    /**
     * Validate User's input first
     */
    this.setState({
      email: value
    })
  }

  handleSubscribeClick() {
    /**
     * Email is in the state,
     * send it directly to your server
     */
  }

  render () {
    return (
      <div>
        {/* ... */}
      </div>
    )
  }
}
```

and the form inside `render`

```HTML
...
<form role="form" action="register.php" method="post" enctype="plain">
  <input
    type="email"
    name="email"
    className="subscribe-input"
    placeholder="Enter your e-mail address..."
    required
    onChange={({target}) => this.handleEmailChange(target)}
  />
  <button
    className='btn btn-conf btn-green'
    type="submit"
    onClick={() => this.handleSubscribeClick()}>
    Start your free trial
  </button>
</form>
...
```

## The end
Gatsby is an amazing static site generator that hides a lot of gems. You may find it's API complicated, but after
