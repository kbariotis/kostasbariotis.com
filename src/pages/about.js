/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import Separator from './../components/Separator';
import Menu from './../components/Menu';
import MetaTags from './../components/MetaTags';

import { Grid, Row, Col } from 'react-flexbox-grid';

export default function About({ data }) {
  return (
    <div>
      <MetaTags
        siteUrl={data.site.siteMetadata.siteUrl}
        title={`About`}
        path={`/about`}
        description={'Hey, I am Kostas. Nice having you here.'}
        noIndex={false}
        tags=""
      />
      <Menu />
      <Grid className="blog about">
        <Row center="xs">
          <Col
            xs={8}
            style={{
              'text-align': 'left',
            }}
          >
            <header className="header">
              <Row center="xs">
                <Col>
                  <Img sizes={data.file.childImageSharp.sizes} className="header-avatar" />
                  <h1>Hey, I am Kostas. Nice having you here.</h1>
                </Col>
              </Row>
            </header>
            <Separator />
            <main role="main">
              <Row className="about-section">
                <Col md={2} className="about-section-title">
                  Intro
                </Col>
                <Col md={10}>
                  <p>
                    I design software architectures, APIs and databases to serve the rest of an
                    application. I am a full stack engineer but I love taking a specific field in my
                    hands and getting the juice out of it. I am always interested in being a part of
                    a team that builds great software and getting things done.
                  </p>
                  <p>
                    I like things like Node.js, Express.js, React.js, Webpack, Gulp, MySQL, MongoDB,
                    Mocha, Jest, AWS, Ansible, Git and a whole lot more.
                  </p>
                  <p>
                    I like <a href="http://slides.com/kostasbariotis">speaking</a> to meetups and
                    conferences about things that tried and also talking with others on my{' '}
                    <a href="http://devastation.tv">podcast</a>. I created{' '}
                    <a href="https://janitr.net">Janitr</a> and{' '}
                    <a href="http://gityeller.com">GitYeller</a> You can find more code samples and
                    my contributions on <a href="https://github.com/kbariotis">Github</a>. Along
                    with some folks, we are organizing the local{' '}
                    <a href="www.meetup.com/Thessaloniki-Node-js-Meetup/">Nodejs meetup</a> and{' '}
                    <a rel="noopener noreferrer" href="http://devit.org" target="_blank">
                      DEVit Conf
                    </a>, the biggest web development conference in northern Greece. We are also
                    known as{' '}
                    <a rel="noopener noreferrer" href="http://skgtech.io" target="_blank">
                      SKGtech
                    </a>.
                  </p>
                  <p>
                    This site is being generated using Gatsby.js and you can find the source on{' '}
                    <a href="https://github.com/kbariotis/kostasbariotis.com"> GitHub</a>.
                  </p>
                  <p>
                    I am currently living in Thessaloniki, Greece. Have you ever been? Take a look,
                    I am sure you will fall in love with the amazing beaches of Chalkidiki.
                  </p>
                </Col>
              </Row>
              <Row className="about-section">
                <Col md={2} className="about-section-title">
                  Bio
                </Col>
                <Col md={10}>
                  <Row>
                    <Col md={2} className="bio-date">
                      2018
                    </Col>
                    <Col md={10}>
                      Started working with <a href="https://geekbot.io">Geekbot</a>, a fully remote
                      company with a mission to change the way we do standup meetings.
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2017
                    </Col>
                    <Col md={10}>
                      Started working with <a href="https://quotelier.com">Quotelier</a>. A amazing
                      product on the hospitality industry.
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2017
                    </Col>
                    <Col md={10}>
                      Released <a href="https://janitr.net">Janitr.net</a>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2016
                    </Col>
                    <Col md={10}>
                      Started the first ever{' '}
                      <a href="http://devastation.tv">Podcast for greek developers</a>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2015
                    </Col>
                    <Col md={10}>
                      Started working with <a href="http://goodvid.io">Goodvidio</a>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2014
                    </Col>
                    <Col md={10}>
                      Won the first place at{' '}
                      <a href="http://www.startuplive.org/events/thessaloniki-1/">
                        Thessaloniki Startup Live
                      </a>{' '}
                      with the <a href="http://tunedeck.navideck.com/">Tunedeck Team</a>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2014
                    </Col>
                    <Col md={10}>
                      <a href="http://stargento.com">Stargento</a> is on the air
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2014
                    </Col>
                    <Col md={10}>
                      Started working with a local web design agency. Lots of E-Commerce, Magento
                      based, projects
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2013
                    </Col>
                    <Col md={10}>This blog is born</Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2013
                    </Col>
                    <Col md={10}>
                      Started working with <a href="http://dtek.gr">DTek</a>. A lot of nice projects
                      born from there like <a href="http://carfinder.gr">Carfinder.gr</a> and{' '}
                      <a href="http://viralcontestapp.com">Viral Contest App</a>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2013
                    </Col>
                    <Col md={10}>
                      Fulfilled my military service as defined by the Greek Constitution (nine
                      months)
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2012
                    </Col>
                    <Col md={10}>
                      Graduated from{' '}
                      <a href="http://it.teithe.gr">
                        A.T.E.I. Thessalonikis with the BsC of Computer Science
                      </a>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2005
                    </Col>
                    <Col md={10}>Started Web Development using raw HTML, CSS, JS</Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2002
                    </Col>
                    <Col md={10}>
                      Started Web Development using Flash, Dreamweaver and MS Web Publisher
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2001
                    </Col>
                    <Col md={10}>Wrote my first app (Lucky Seven) using Visual Basic</Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      2000
                    </Col>
                    <Col md={10}>
                      Bought my first computer. Since then I have formatted every hard disk of my
                      close friends
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} className="bio-date">
                      1988
                    </Col>
                    <Col md={10}>
                      Bing Bang happens somewhere in Thessaloniki, Greece.
                      <a href="https://en.wikipedia.org/wiki/Millennials">
                        Generation Y got upgraded
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="about-section">
                <Col md={2} className="about-section-title">
                  Projects
                </Col>
                <Col md={10}>
                  <Row>
                    <Col md={4}>
                      <a rel="noopener noreferrer" href="https://janitr.net" target="_blank">
                        Janitr
                      </a>
                    </Col>
                    <Col md={8} className="text-right">
                      A Slack bot that welcomes news members on your team
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <a rel="noopener noreferrer" href="https://gityeller.com" target="_blank">
                        GitYeller (Dead)
                      </a>
                    </Col>
                    <Col md={8} className="text-right">
                      Subscribe to your favorite GitHub repository and get notified by email for new
                      issues with specific labels.
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <a rel="noopener noreferrer" href="http://stargento.com" target="_blank">
                        Stargento (Dead)
                      </a>
                    </Col>
                    <Col md={8} className="text-right">
                      PHP sandbox powered up with the latest Magento installation to test your
                      Magento skills
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="about-section">
                <Col md={2} className="about-section-title">
                  Talks
                </Col>
                <Col md={10}>
                  <Row>
                    <Col md={4}>
                      <a
                        rel="noopener noreferrer"
                        href="http://slides.com/kostasbariotis/javascript-101"
                        target="_blank"
                      >
                        JavaScript 101
                      </a>
                    </Col>
                    <Col md={8} className="text-right">
                      A JavaScript journey for beginners
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <a
                        rel="noopener noreferrer"
                        href="https://slides.com/kostasbariotis/microservices"
                        target="_blank"
                      >
                        Micro Services Architecture
                      </a>
                    </Col>
                    <Col md={8} className="text-right">
                      How do I scale my codebase
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} />
                    <Col md={8} className="text-right">
                      Find all my presentation slides at{' '}
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://slides.com/kostasbariotis/"
                      >
                        Slides.com
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </main>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

About.propTypes = {
  data: PropTypes.object,
};

export const aboutPageQuery = graphql`
  query AboutPageSiteMetadata {
    site {
      siteMetadata {
        siteUrl
      }
    }
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        sizes {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
  }
`;
