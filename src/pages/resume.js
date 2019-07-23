import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { graphql } from 'gatsby';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FaLightbulbO from 'react-icons/lib/fa/lightbulb-o';

import ExternalLink from '../components/resume/ExternalLink';
import ResumeLayout from '../components/layouts/Resume';
import QuickLinks from '../components/resume/QuickLinks';
import Section from '../components/resume/Section';
import ExperienceItem from '../components/resume/ExperienceItem';
import Header from '../components/resume/Header';

const listStyle = css({
  listStyle: 'none',
  marginLeft: 0,
});
const pageInfo = css({
  paddingTop: '20px',
  paddingBottom: '20px',
});
const globalStyle = css({
  a: {
    color: '#8ab2ff',
  },
});

const notificationStyle = css({
  textAlign: 'center',
  backgroundColor: '#1eeab8',
  color: 'white',
  paddingTop: '0.5em',
  paddingBottom: '0.5em',
  '@media print': {
    display: 'none',
  },
});

export default function Resume() {
  return (
    <ResumeLayout>
      <div className={notificationStyle}>
        <FaLightbulbO />
        Did you know you can print this page into a PDF? Try CTRL + P and choose {'"'}
        To PDF
        {'"'}.
      </div>
      <Grid className={globalStyle}>
        <section className={pageInfo}>
          <QuickLinks />
          <hr />
        </section>
        <Header title="Kostas Bariotis" subtitle="Software Engineer" />
        <Section title="Brief">
          <p>
            I am Kostas Bariotis, a software engineer from Thessaloniki, Greece currently living in
            London, UK. I hold a BsC in Computer Science. I have been writing code professionally
            for the past six years and during that time I have worked with some amazing companies
            and individuals. I have done open source work and have also contributed to lots of
            projects. I have been actively involved with the vibrant tech community of Thessaloniki
            and have been helping in the organization of the DEVit conference since day one. I have
            been documenting my technical endeavours on my blog and have interviewed some amazing
            people on my podcast.
          </p>
        </Section>
        <Section title="Experience">
          <ExperienceItem
            title="Senior Software Developer @ Trouva"
            duration="2018 June - Present"
            description="In a truly fast pace environment, I helped maintain the core API of Trouvas' product and also to build more services around based on Node.js and AWS Lambda. I took part on various architectural decisions and worked closely to other engineers to help them get on track. I also built from scratch a Shopify integration to power the syncronization between Trouvas' system."
          />
          <ExperienceItem
            title="Senior Software Developer @ ​Quotelier​"
            duration="2017 February - 2018 March"
            description="As the lead developer in a team of three, I helped set up the infrastructure for the Quotelier platform and apply best practices to both the backend and the frontend blocks. I also learned a lot more about AWS infrastructure since it was our IaaS of
        preference. I have worked with both the backend project, built completely on AWS
        Lambdas with Node.js. I ‘ve also worked on the frontend project, built with React.js
        and helped set up the testing strategy and raised the code coverage of the codebase."
          />
          <ExperienceItem
            title="Nodejs Developer, Backend Product Engineer @ ​Goodvidio​"
            duration="2015 March - 2016 December"
            description="I have developed the backbone REST API that serves the Goodvidio service using
        Javascript. Besides that, being the fourth developer in the team, I have participated
        in the architecture build process that was designed to serve an application that would
        scale fast. TDD was a requirement for this job and I have enjoyed writing tests and
        keeping a high test coverage score."
          />
          <ExperienceItem
            title="Front-End Developer @ ​InsightReplay​"
            duration="2015 Jan - 2015 March"
            description="I helped the InsightReplay team with the front end development of their product while
        working closely with Angular.js 1.x."
          />
          <ExperienceItem
            title="Magento Developer, Front-End Developer @ ​Walkinthepark.gr​"
            duration="2014 Feb - 2015 March"
            description="Working mainly with E-Commerce businesses, I had the opportunity to work on the
        world’s most valuable E-Commerce platform, Magento. I have written a lot of modules
        and created many custom design themes."
          />
          <ExperienceItem
            title="Full Stack Web Developer @ ​dTek Net.working​"
            duration="2013 Apr - 2014 Feb"
            description="I have created several web applications, using PHP to serve dynamic content on the
              client, mySQL to handle persistent data and Javascript to deliver a rich user
              experiences. I have played with most popular Web's APIs whilst i had the
              opportunity to write one from scratch."
          />
        </Section>
        <Section title="Links">
          <Row>
            <Col lg={4}>
              <b>Social</b>
              <ul className={listStyle}>
                <li>
                  <ExternalLink
                    title="LinkedIn"
                    url="https://www.linkedin.com/in/kostas-bariotis-2a8b7481/"
                  />
                </li>
                <li>
                  <ExternalLink title="GitHub" url="https://github.com/kbariotis" />
                </li>
                <li>
                  <ExternalLink title="Twitter" url="https://twitter.com/@kbariotis" />
                </li>
                <li>
                  <ExternalLink title="Medium" url="https://medium.com/@kbariotis" />
                </li>
                <li>
                  <ExternalLink title="Slides" url="https://slides.com/kostasbariotis" />
                </li>
              </ul>
            </Col>
            <Col lg={4}>
              <b>Open source</b>
              <ul className={listStyle}>
                <li>
                  <ExternalLink title="throw.js" url="https://github.com/kbariotis/throw.js" />
                </li>
                <li>
                  <ExternalLink title="Feedly API" url="https://github.com/kbariotis/feedly-api" />
                </li>
                <li>
                  <ExternalLink
                    title="This blog"
                    url="https://github.com/kbariotis/kostasbariotis.com"
                  />
                </li>
                <li>
                  <ExternalLink
                    title="Go Discover"
                    url="https://github.com/kbariotis/go-discover"
                  />
                </li>
              </ul>
            </Col>
            <Col lg={4}>
              <b>Projects</b>
              <ul className={listStyle}>
                <li>
                  <ExternalLink title="Janitr" url="https://janitr.net" />
                </li>
                <li>
                  <ExternalLink title="DEVit Conference" url="https://devitconf.org" />
                </li>
                <li>
                  <ExternalLink title="Devastation Podcast" url="https://devastation.tv" />
                </li>
              </ul>
            </Col>
          </Row>
        </Section>
        <Section title="Personal skills">
          <ul>
            <li>Immediate familiarity on new technologies.</li>
            <li>Ability to work in a team effectively.</li>
            <li>Innovative, Analytical thinking.</li>
            <li>Mood for acquisition and transmission of knowledge.</li>
            <li>Organizational behavior, combined knowledge, methodically and consistently.</li>
            <li>Decision-making.</li>
            <li>Always in a mood to work and learn.</li>
          </ul>
        </Section>
        <Section title="Education">
          <h3>Alexander Technological Educational Institute of Thessaloniki (ATEITH)</h3>
          <p>Bachelor of Science (BS), Computer Software Engineering, 2006 – 2011</p>
        </Section>
        <section className={pageInfo}>
          <hr />
          <QuickLinks />
        </section>
      </Grid>
    </ResumeLayout>
  );
}

Resume.propTypes = {
  data: PropTypes.object,
};

export const aboutPageQuery = graphql`
  query ResumePageSiteMetadata {
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
