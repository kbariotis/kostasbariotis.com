---
title: "Removing JS from Magento CMS Pages"
path: "/removing-js-scripts-from-cms-pages/"
date: "2014-12-14T18:12:56.000Z"
date_updated:   2014-12-14T19:24:34.000Z
tags: magento, prototype.js, cms, load time, performance
---

Magento comes with a lot of Javascript. It uses [Prototype.js](http://prototypejs.org/), [Scriptaculus](https://github.com/madrobby/scriptaculous) and custom libraries written be the Varien people. No doubt that these libraries are old and I hardly use 'em on my themes, but they are very tight to the Magento theme ecosystem and we should be careful when we mess with them.

A modern website's home page is very important and we should focus at it's load time a lot. Magento's home page is indeed a CMS page and loads some of those scripts there too.

Magento Layout's system has also done a nice job when it comes to what scripts to load where. Something that bothers me is the load of these scripts on CMS pages where by my experience they are not so useful there except from some standard places.

So what we do? Say we created our [custom theme](http://www.magentocommerce.com/wiki/4_-_themes_and_template_customization/0_-_theming_in_magento/designing-for-magento). Let's remove those script completely from CMS pages including our home page, which is a CMS page.

```xml
<?xml version="1.0"?>
<layout version="0.1.0">

    <cms_page>
        <reference name="root">
            <reference name="head">
                <action method="removeItem"><type>js</type><name>prototype/prototype.js</name></action>
                <action method="removeItem"><type>js</type><name>lib/ccard.js</name></action>
                <action method="removeItem"><type>js</type><name>prototype/validation.js</name></action>
                <action method="removeItem"><type>js</type><name>scriptaculous/builder.js</name></action>
                <action method="removeItem"><type>js</type><name>scriptaculous/effects.js</name></action>
                <action method="removeItem"><type>js</type><name>scriptaculous/dragdrop.js</name></action>
                <action method="removeItem"><type>js</type><name>scriptaculous/controls.js</name></action>
                <action method="removeItem"><type>js</type><name>scriptaculous/slider.js</name></action>
                <action method="removeItem"><type>js</type><name>varien/js.js</name></action>
                <action method="removeItem"><type>js</type><name>varien/form.js</name></action>
                <action method="removeItem"><type>js</type><name>varien/menu.js</name></action>
                <action method="removeItem"><type>js</type><name>mage/translate.js</name></action>
            </reference>
        </reference>
    </cms_page>
</layout>
```

But now we are going to have problems and Dev Console will turn red. Some blocks are not functioning.

First the search block on top of our page. It's a form that uses the Validation module and also the Autocomplete feature. Let's remove those by opening the `catalogsearch/form.mini.phtml` file (after we have copied it on our theme's folder) and remove the `<script>...</script>`.

We also have the Translator, which translates Javascript strings. We don't going to need it either on our CMS pages. We open `page/html/head.phtml` and we are removing the `<?php echo $this->helper('core/js')->getTranslatorScript() ?>` definition.

But that's not all. A lot of widgets that we may have include on our CMS pages, may use some Javascript as well. The new products list widgets, which is located at `catalog/product/widget/new/content/new.[list|grid].phtml` uses the `setLocation` function for the Add To Card button. Let's remove that by replacing the button with an anchor. Like this:
```html
<a title="<?php echo $this->__('Add to Cart') ?>" class="button btn-cart" href="<?php echo $this->getAddToCartUrl($_product) ?>">
	<span><span><?php echo $this->__('Add to Cart') ?></span></span>
</a>
```

Header's menu will also not drop it's submenu, but why not replace it with a [CSS strictly mega menu](http://codepen.io/search?q=mega+menu&limit=all&depth=everything&show_forks=false)?

So keep in mind that you may have other files that may disfunction. Find what those files are and figure out how to remove it's Magento JS dependencies.

Removing Magento's JS and all it's dependencies from your theme completely will absolutely be the wisest road to take. But it's trivial and will cost you time and effort. Start small.

The new RWD theme follows the same philosophy but it has more widgets (newsletter subscription form on the footer). So be careful there too.

The results? Well we certainly got rid of 12 (~500K) Javascript files and more importantly from our home page, where we may have fancy jQuery sliders and other mambo jambo tricks. Also Magento loads these scripts in the HEAD of our tree which blocks the rendering of the rest of our page. Only pros here!

Hit me on [Twitter](http://twitter.com/kbariotis) if you have similar technics that you use and want to share.
