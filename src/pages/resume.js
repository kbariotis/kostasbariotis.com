import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { graphql } from 'gatsby';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GoLightBulb } from '@react-icons/all-files/go/GoLightBulb';

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
        <GoLightBulb />
        Did you know you can print this page into a PDF? Try CTRL + P and choose {'"'}
        To PDF
        {'"'}.
      </div>
      <Grid className={globalStyle}>
        <section className={pageInfo}>
          <QuickLinks />
          <hr />
        </section>
        <Header title="Kostas Bariotis" subtitle="Senior Software Engineer" />
        <Section title="Brief">
          <p>
            I am Kostas Bariotis, a software engineer from Thessaloniki, Greece currently living in
            London, UK. I have over seven years of experience as a software engineer in small but
            also in bigger technological companies. I have worked with some amazing companies and
            individuals. I have done open source work and have also contributed to lots of projects.
            I have been actively involved with the vibrant tech community of Thessaloniki and have
            been helping in the organization of the DEVit conference since day one. I have been
            documenting my technical journey on my blog and have interviewed some amazing people on
            my podcast.
          </p>
        </Section>
        <Section title="Experience">
          <ExperienceItem
            title="Senior Product Engineer @ Bulb"
            duration="2019 November - Present"
            description="As a member of the team that is building internal tools for Bulbs' energy specialist, I've been involved in building many tools but also integrating third-party services into our every-day processes. Bulbs' main stack is TypeScript/React.js/Node.js and are using Terraform to manage our platform provider and Kubernetes to manage our runtime services. I've been involved in different side projects as well, from security to onboarding. As a senior engineer, I led several projects, by braking them down, designing the architecture and planning the release from zero to production."
          />
          <ExperienceItem
            title="Senior Product Engineer @ Trouva"
            duration="2018 June - 2019 October"
            description="In a very fast paced environment and a small, I participated in many decisions
            and involved in many parts of the product teams' process. As a member of the consumer squad, I
            designed and built an integration with Shopify that would allow our customers
            to be in sync with our platform. As a member of the platform squad, I involved
            in many DevOps operations, building and re-architecting existing parts, writing documentation
            and helping in defining engineering processes. I was also helping
            other team members to when blocked in designing extensions of our system in a
            micro-services architecture. We were using Node.js for our backend services and React.js/Ember.js
            for our frontend apps. Our architecture was built on AWS (ECS for VMs, SQS/SNS for intercommunication,
            and others)."
          />
          <ExperienceItem
            title="Senior Software Developer @ ​Quotelier​"
            duration="2017 February - 2018 March"
            description="As the lead developer in a team of three, I helped set up the infrastructure
            for the Quotelier platform and apply best practices to both the backend and
            the frontend blocks. We chose AWS for our infrastructure and used many services
            like AWS Lambda and DynamoDB. I have worked with both the backend
            project, built completely on AWS Lambdas with Node.js. I ‘ve also worked
            on the frontend project, built with React.js and helped set up the testing
            strategy and raised the code coverage of the whole codebase."
          />
          <ExperienceItem
            title="Nodejs Developer, Backend Product Engineer @ ​Goodvidio​"
            duration="2015 March - 2016 December"
            description="Being the fourth engineer, I helped the company grow its platform from an MVP to
            fully scalable, modularized architecture that was servicing thousands of requests
            per day. I have developed the backbone REST API that served the Goodvidio service using
            Node.js. I have participated in the architecture build process that was
            designed to serve an application that would scale fast. We payed attention on our
            testing strategy and kept keeping a high test coverage."
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
                  <ExternalLink
                    title="Presentador"
                    url="https://github.com/kbariotis/presentador"
                  />
                </li>
                <li>
                  <ExternalLink title="Excalidraw" url="https://github.com/excalidraw/excalidraw" />
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
