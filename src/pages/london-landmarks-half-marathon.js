import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Row, Col } from 'react-flexbox-grid';

import IndexLayout from '../components/layouts/Index';
import Header from '../components/blog/Header';
import MetaTags from '../components/blog/MetaTags';
import AboutSection from '../components/blog/AboutSection';

export default function LLHM({ data }) {
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
            title={`I will run at London Landmarks Half Marathon`}
            path={`/london-landmarks-half-marathon`}
            description={''}
          />
          <Header fluid={data.file.childImageSharp.fluid}>
            I will run at London Landmarks Half Marathon
          </Header>
          <main role="main">
            <AboutSection title={'Why'}>
              <p>
                I set to run a marathon as my new years resolution. Three years ago! And that is a
                lesson that if you really want something, eventually (after three years) you will
                have an opportunity!
              </p>
              <p>
                Seriously. Running marathons was never a priority for me. But I do enjoy running and
                I am constantly training for a lower pace and longer distances.
              </p>
              <small>I stopped using Strava this fall, so you will have to trust me on this.</small>
              <iframe
                height="454"
                width="100%"
                frameBorder="0"
                allowTransparency="true"
                scrolling="no"
                src="https://www.strava.com/athletes/24820048/latest-rides/02bb37285f12542eae89484a4df7e5c29ab5ad97"
              />
              <p>
                I found <a href="https://www.llhm.co.uk/">London Landmarks Half Marathon</a> through{' '}
                <a href="http://www.opensourcerer.io/">Michael</a> and I was immediately keen to
                join and put my self in a real race.
              </p>
              The event is being held by the{' '}
              <a href="https://www.tommys.org">
                baby charity Tommy
                {"'"}s
              </a>
              . Tommy
              {"'"}s is funding research into miscarriage, stillbirth and premature birth. Their
              abour page says it better than anyone:
              <br />
              <br />
              <blockquote>
                <p>
                  We want every parent to have the best possible pregnancy outcomes and to take home
                  happy, healthy babies.
                </p>
              </blockquote>
            </AboutSection>
            <AboutSection title={'When'}>
              <p>
                LLHM will take place on 24th of March 2019. Roads will be closed and more than
                13,000 runners will be part of it.
              </p>
              <p>
                It will be a great path through central London that will start from Pall Mall to St
                Paul’s Cathedral to the Tower of London and the London Eye and will eventually end
                by Downing Street.
              </p>
            </AboutSection>
            <AboutSection title={'You'}>
              <p>
                In order to join this marathon I (pinky)-promised Tommy
                {"'"}s that I will raise an amount of money. Those will be used by them to further
                their cause, fund more research and eventually reach their goals. You have goals
                too, you know how it is.
              </p>
              <p>
                I have setup this page to help me take money from people like you that want to see
                me running. Click the link below to visit it.
              </p>
              <p>
                <a
                  href="http://www.justgiving.com/kostas-bariotis"
                  title="JustGiving - Sponsor me now!"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    src="http://www.justgiving.com/App_Themes/JustGiving/images/badges/badge10.gif"
                    width="270"
                    height="50"
                    alt="JustGiving - Sponsor me now!"
                  />
                </a>
              </p>
            </AboutSection>
            <AboutSection title={'Perks'}>
              <p>
                I hear you! Why should you give me your money? Well if you are still not sold, hear
                me out. They who will support me, will get:
              </p>
              <p>
                <ul>
                  <li>
                    A dedicated tweet from my personal Twitter account to get you more followers!{' '}
                    <small>(Note to editors: they will probably get none.)</small>
                  </li>
                  <li>A warm hug for my gals out there and a hardcore bro-shake for my dudes.</li>
                  <li>
                    I will get to be your personal motivator for a healthier life. I will be calling
                    you at 6am to go running and stuff.
                  </li>
                </ul>
              </p>
              <p>Do not tell me. Still not sold?</p>
              <p>
                <strong>Thank you very much for your support! Peace, Kostas.</strong>
              </p>
            </AboutSection>
          </main>
        </Col>
      </Row>
    </IndexLayout>
  );
}

LLHM.propTypes = {
  data: PropTypes.object,
};

export const LLHMPageQuery = graphql`
  query LLHMPageSiteMetadata {
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 750) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
