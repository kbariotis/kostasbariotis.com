import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Row, Col } from 'react-flexbox-grid';

import IndexLayout from '../components/layouts/Index';
import Header from '../components/blog/Header';
import BioEntry from '../components/blog/BioEntry';
import MetaTags from '../components/blog/MetaTags';
import AboutSection from '../components/blog/AboutSection';

export default function About({ data }) {
  return (
    <IndexLayout>
      <Row>
        <Col
          lg={8}
          lgOffset={2}
          style={{
            'text-align': 'left',
          }}
        >
          <MetaTags
            title={`About`}
            path={`/about`}
            description={'Hey, I am Kostas. Nice having you here.'}
          />
          <Header fluid={data.file.childImageSharp.fluid}>
            Hey, I am Kostas. Nice having you here.
          </Header>
          <main role="main">
            <AboutSection title={'Intro'}>
              <p>
                I design software architectures, APIs and databases to serve the rest of an
                application. I am a full stack engineer but I love taking a specific field in my
                hands and getting the juice out of it. I am always interested in being a part of a
                team that builds great software and getting things done.
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
                <a href="http://gityeller.com">GitYeller</a> You can find more code samples and my
                contributions on <a href="https://github.com/kbariotis">Github</a>. Along with some
                folks, we are organizing the local{' '}
                <a href="www.meetup.com/Thessaloniki-Node-js-Meetup/">Nodejs meetup</a> and{' '}
                <a rel="noopener noreferrer" href="http://devit.org" target="_blank">
                  DEVit Conf
                </a>
                , the biggest web development conference in northern Greece. We are also known as{' '}
                <a rel="noopener noreferrer" href="http://skgtech.io" target="_blank">
                  SKGtech
                </a>
                .
              </p>
              <p>
                This site is being generated using Gatsby.js and you can find the source on{' '}
                <a href="https://github.com/kbariotis/kostasbariotis.com"> GitHub</a>.
              </p>
              <p>
                I am currently living in Thessaloniki, Greece. Have you ever been? Take a look, I am
                sure you will fall in love with the amazing beaches of Chalkidiki.
              </p>
            </AboutSection>
            <AboutSection title={'Bio'}>
              <BioEntry year={'2019'}>
                Started working with <a href="https://bulb.co.uk">Bulb</a>, hopefully I will get to
                help on world{"'"}s most serious issue at the moment.
              </BioEntry>
              <BioEntry year={'2018'}>
                Started working with <a href="https://trouva.com">Trouva</a>, a curated marketplace
                with unique products that you wont find on high streets.
              </BioEntry>
              <BioEntry year={'2018'}>
                Worked with <a href="https://geekbot.io">Geekbot</a>, a fully remote company with a
                mission to change the way we do standup meetings.
              </BioEntry>
              <BioEntry year={'2017'}>
                Worked with <a href="https://quotelier.com">Quotelier</a>. A amazing product on the
                hospitality industry.
              </BioEntry>
              <BioEntry year={'2017'}>
                Released <a href="https://janitr.net">Janitr.net</a>
              </BioEntry>
              <BioEntry year={'2016'}>
                Started the first ever{' '}
                <a href="http://devastation.tv">Podcast for greek developers</a>
              </BioEntry>
              <BioEntry year={'2015'}>
                Started working with <a href="http://goodvid.io">Goodvidio</a>
              </BioEntry>
              <BioEntry year={'2014'}>
                Won the first place at{' '}
                <a href="http://www.startuplive.org/events/thessaloniki-1/">
                  Thessaloniki Startup Live
                </a>{' '}
                with the <a href="http://tunedeck.navideck.com/">Tunedeck Team</a>
              </BioEntry>
              <BioEntry year={'2014'}>
                <a href="http://stargento.com">Stargento</a> is on the air
              </BioEntry>
              <BioEntry year={'2014'}>
                Started working with a local web design agency. Lots of E-Commerce, Magento based,
                projects
              </BioEntry>
              <BioEntry year={'2013'}>2013 This blog is born</BioEntry>
              <BioEntry year={'2013'}>
                Started working with <a href="http://dtek.gr">DTek</a>. A lot of nice projects born
                from there like <a href="http://carfinder.gr">Carfinder.gr</a> and{' '}
                <a href="http://viralcontestapp.com">Viral Contest App</a>
              </BioEntry>
              <BioEntry year={'2013'}>
                Fulfilled my military service as defined by the Greek Constitution (nine months)
              </BioEntry>
              <BioEntry year={'2012'}>
                Graduated from{' '}
                <a href="http://it.teithe.gr">
                  A.T.E.I. Thessalonikis with the BsC of Computer Science
                </a>
              </BioEntry>
              <BioEntry year={'2005'}>Started Web Development using raw HTML, CSS, JS</BioEntry>
              <BioEntry year={'2002'}>
                Started Web Development using Flash, Dreamweaver and MS Web Publisher
              </BioEntry>
              <BioEntry year={'2001'}>Wrote my first app (Lucky Seven) using Visual Basic</BioEntry>
              <BioEntry year={'2000'}>
                Bought my first computer. Since then I have formatted every hard disk of my close
                friends
              </BioEntry>
              <BioEntry year={'1988'}>
                Bing Bang happens somewhere in Thessaloniki, Greece.
                <a href="https://en.wikipedia.org/wiki/Millennials">Generation Y got upgraded</a>
              </BioEntry>
            </AboutSection>
            <AboutSection title={'Projects'}>
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
                  PHP sandbox powered up with the latest Magento installation to test your Magento
                  skills
                </Col>
              </Row>
            </AboutSection>

            <AboutSection title={'Talks'}>
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
            </AboutSection>
          </main>
        </Col>
      </Row>
    </IndexLayout>
  );
}

About.propTypes = {
  data: PropTypes.object,
};

export const aboutPageQuery = graphql`
  query AboutPageSiteMetadata {
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 750) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
