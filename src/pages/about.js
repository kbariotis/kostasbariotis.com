import React from 'react';
import Head from 'react-helmet';
import GatsbyLink from 'gatsby-link';
import Helmet from 'react-helmet';
import LazyLoad from 'react-lazyload';

import Separator from './../components/Separator';
import Menu from './../components/Menu';
import AvatarImg from './../../assets/images/avatar.jpg';

export default function About() {
  return (
    <div>
      <Helmet
        title="Kostas Bariotis"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <Menu />
      <section className="blog container about">
        <div className="medium-8 medium-offset-2">
          <header className="header">
            <div className="row text-center">
              <LazyLoad height={250}>
                <img
                  className="header-avatar"
                  src={AvatarImg}
                  alt="Kostas Bariotis"
                />
              </LazyLoad>
              <h1>Hey, I'm Kostas. Nice having you here.</h1>
            </div>
          </header>
          <Separator />
          <main role="main">
            <div className="row about-section">
              <div className="medium-2 about-section-title">INTRO</div>
              <div className="medium-10">
                <p>
                  I am a web developer, a proud wanderer and a passionate doer.
                  I am sending you my regards from sunny Thessaloniki, Greece.
                  Have you ever been? Take a look, I am sure you will fall in
                  love with the amazing beaches of Chalkidiki.
                </p>
                <p>
                  I am a JavaScript kind of dude who's obsessed with clean and
                  efficient code. I am interested in designing software
                  architectures, APIs and databases to serve the rest of an
                  application. I am calling myself a full stack developer but I
                  love taking a specific field in my hands and getting the juice
                  out of it. I am interested in being a part of a team that
                  builds great software. I get things done.
                </p>
                <p>
                  I like things like Node.js, Express.js, React.js, Webpack,
                  Gulp, MySQL, MongoDB, Mocha, Jest, AWS, Ansible, Git and a
                  whole lot more.
                </p>
                <p>
                  This blog is my personal playground, I am also doing a lot of{' '}
                  <a href="http://slides.com/kostasbariotis">
                    public speaking
                  </a>{' '}
                  talking a lot about tech stuff and also talking with others on
                  my <a href="http://devastation.tv">podcast</a>.{' '}
                  <a href="http://stargento.com">Stargento</a> is one of my side
                  projects, an online PHP/Magento sandbox. You can find more
                  code samples and my contributions on
                  <a href="https://github.com/kbariotis" />Github. Along with
                  some folks, we are organizing the local{' '}
                  <a href="www.meetup.com/Thessaloniki-Node-js-Meetup/">
                    Nodejs meetup
                  </a>{' '}
                  and{' '}
                  <a href="http://devit.org" target="_blank">
                    DEVit Conf
                  </a>, the biggest web development conference in northern
                  Greece. We are also known as{' '}
                  <a href="http://skgtech.io" target="_blank">
                    SKGtech
                  </a>.
                </p>
              </div>
            </div>
            <div className="row about-section">
              <div className="medium-2 about-section-title">BIO</div>
              <div className="medium-10">
                <div className="row">
                  <div className="medium-2 bio-date">2016</div>
                  <div className="medium-10 text-right">
                    Started the first ever{' '}
                    <a href="http://devastation.tv">
                      Podcast for greek developers
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2015</div>
                  <div className="medium-10 text-right">
                    Started working with{' '}
                    <a href="http://goodvid.io">Goodvidio</a>
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2014</div>
                  <div className="medium-10 text-right">
                    Won the first place at{' '}
                    <a href="http://www.startuplive.org/events/thessaloniki-1/">
                      Thessaloniki Startup Live
                    </a>{' '}
                    with the{' '}
                    <a href="http://tunedeck.navideck.com/">Tunedeck Team</a>
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2014</div>
                  <div className="medium-10 text-right">
                    <a href="http://stargento.com">Stargento</a> is on the air
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2014</div>
                  <div className="medium-10 text-right">
                    Started working with a local web design agency. Lots of
                    E-Commerce, Magento based, projects
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2013</div>
                  <div className="medium-10 text-right">This blog is born</div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2013</div>
                  <div className="medium-10 text-right">
                    Started working with <a href="http://dtek.gr">DTek</a>. A
                    lot of nice projects born from there like{' '}
                    <a href="http://carfinder.gr">Carfinder.gr</a> and{' '}
                    <a href="http://viralcontestapp.com">Viral Contest App</a>
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2013</div>
                  <div className="medium-10 text-right">
                    Fulfilled my military service as defined by the Greek
                    Constitution (nine months)
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2012</div>
                  <div className="medium-10 text-right">
                    Graduated from{' '}
                    <a href="http://it.teithe.gr">
                      A.T.E.I. Thessalonikis with the BsC of Computer Science
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2005</div>
                  <div className="medium-10 text-right">
                    Started Web Development using raw HTML, CSS, JS
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2002</div>
                  <div className="medium-10 text-right">
                    Started Web Development using Flash, Dreamweaver and MS Web
                    Publisher
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2001</div>
                  <div className="medium-10 text-right">
                    Wrote my first app (Lucky Seven) using Visual Basic
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">2000</div>
                  <div className="medium-10 text-right">
                    Bought my first computer. Since then I've formatted every
                    hard disk of my close friends
                  </div>
                </div>
                <div className="row">
                  <div className="medium-2 bio-date">1988</div>
                  <div className="medium-10 text-right">
                    Bing Bang happens somewhere in Thessaloniki, Greece.{' '}
                    <a href="https://en.wikipedia.org/wiki/Millennials">
                      Generation Y got upgraded
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row about-section">
              <div className="medium-2 about-section-title">PROJECTS</div>
              <div className="medium-10">
                <div className="row">
                  <div className="medium-4">
                    <a
                      href="https://github.com/kbariotis/throw.js"
                      target="_blank"
                    >
                      Throw.js
                    </a>
                  </div>
                  <div className="medium-8 text-right">
                    HTTP Error collection to use in your next REST API
                  </div>
                </div>
                <div className="row">
                  <div className="medium-4">
                    <a
                      href="https://github.com/kbariotis/meanimum"
                      target="_blank"
                    >
                      MEANimum
                    </a>
                  </div>
                  <div className="medium-8 text-right">
                    Meanimum is my Mongo/Express/Angular/Node Boilerplate
                  </div>
                </div>
                <div className="row">
                  <div className="medium-4">
                    <a href="http://stargento.com" target="_blank">
                      Stargento
                    </a>
                  </div>
                  <div className="medium-8 text-right">
                    PHP sandbox powered up with the latest Magento installation
                    to test your Magento skills
                  </div>
                </div>
                <div className="row">
                  <div className="medium-4">
                    <a
                      href="https://github.com/kbariotis/documer"
                      target="_blank"
                    >
                      Documer
                    </a>
                  </div>
                  <div className="medium-8 text-right">
                    Bayes algorithm implementation with PHP
                  </div>
                </div>
                <div className="row">
                  <div className="medium-4">
                    <a
                      href="https://github.com/kbariotis/feedly-api"
                      target="_blank"
                    >
                      Feedly-Api
                    </a>
                  </div>
                  <div className="medium-8 text-right">
                    PHP wrapper around Feedly's REST API
                  </div>
                </div>
              </div>
            </div>

            <div className="row about-section">
              <div className="medium-2 about-section-title">TALKS</div>
              <div className="medium-10">
                <div className="row">
                  <div className="medium-4">
                    <a
                      href="http://slides.com/kostasbariotis/javascript-101"
                      target="_blank"
                    >
                      JavaScript 101
                    </a>
                  </div>
                  <div className="medium-8 text-right">
                    A JavaScript journey for beginners
                  </div>
                </div>
                <div className="row">
                  <div className="medium-4">
                    <a
                      href="https://slides.com/kostasbariotis/microservices"
                      target="_blank"
                    >
                      Micro Services Architecture
                    </a>
                  </div>
                  <div className="medium-8 text-right">
                    How do I scale my codebase
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
