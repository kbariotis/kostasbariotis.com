import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { graphql } from 'gatsby';
import { Grid, Row, Col } from '../components/grid';
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
      <div css={notificationStyle}>
        <GoLightBulb />
        Did you know you can print this page into a PDF? Try CTRL + P and choose
        {' "'}
        To PDF
        {'"'}
      </div>
      <Grid css={globalStyle}>
        <section css={pageInfo}>
          <QuickLinks />
          <hr />
        </section>
        <Header
          title="Kostas Bariotis"
          subtitle="Senior Software Engineer"
          summary="Architecture, System Design & User-Facing Product Development in
          Distributed Teams"
        />
        <Section title="Professional Summary">
          <p>
            Senior full-stack engineer who moves easily between architecture, product thinking, and
            cross-functional work in fully remote teams. I&apos;ve led large greenfield builds and
            critical migrations across education, energy, and e-commerce, always aiming for
            measurable improvements. I collaborate closely with designers, users, and
            non-engineering teams (async or otherwise) to understand the full picture, data,
            operations, customer success, business goals, and I bring that mindset into the teams I
            work with.
          </p>
        </Section>
        <Section title="Experience">
          <ExperienceItem
            title="Senior Software Engineer @ PBLWorks"
            duration="December 2023 - Present"
            description="Second engineer hired to build the next generation of PBLWorks' product suite."
            skills="TypeScript, Node.js, Next.js, React Query, Storybook, Prisma, Jest, Cypress, Vercel, PostgreSQL, Redis, TestContainers"
            bullets={[
              'Built Next.js-based web application with SSR achieving constant >90% scores on Web Core Vitals metrics',
              'Monitored developer experience through regular surveys and improved it by 20% in one year',
              'Built an event-driven architecture with a cloud event bus for handling asynchronous tasks and workflows',
              'Advocated and mentored the team on product development best practices, including monitoring Web Core Vitals and tracking user actions',
              'Implemented observability and monitoring tools using Sentry and created dashboards for the team to monitor product performance',
              'Developed an internal system for writing PostgreSQL database integration tests that would run on every pull request (locally and on GitHub CI)',
              'Architected and implemented a STAR design schema pulling data from various sources (Google Analytics, PostgreSQL, etc.) and integrated it with Tableau',
              'Maintained the existing PBLWorks.org platform, hosted on AWS',
            ]}
          />
          <ExperienceItem
            title="Senior Software Engineer @ Grover"
            duration="November 2021 - August 2023"
            description="Migrated a legacy monolith for invoice generation into a modern, scalable microservice architecture to support global growth."
            skills="Node.js, GoLang, Ruby, TypeScript, Nest.js, Prisma, PostgreSQL, Kafka, AWS, Kubernetes"
            bullets={[
              'Responsible for the legacy and new invoicing micro-service built with Node.js, serving in total >20,000 requests per day',
              'Architected observability tools on AWS CloudWatch for having a complete overview of the invoicing system',
              'Led the migration of the legacy invoicing system to the new microservice architecture, breaking down the tasks, designing the architecture and planning the releases from zero to production with zero downtime',
            ]}
          />
          <ExperienceItem
            title="Senior Product Engineer @ Bulb"
            duration="November 2019 - November 2021"
            description="Building internal tools for Bulbs' energy specialists and customer success teams to help them better serve Bulb's customers."
            skills="Node.js, Python, TypeScript, Sequelize, React, Redux, Storybook, Cypress, Jest, PostgreSQL, GCP, SQS/SNS, Kubernetes"
            bullets={[
              'Worked on the internal customer success platform built with Node.js and React, developing new features and integrations with third-party services including ZenDesk, Twilio, Salesforce, and others',
              'Worked on the architecture and implementation of a new authentication system that would work across different domains for multi-national expansion of the company',
              'Implemented a customer monitoring system that would proactively watch for customers with certain issues on their accounts and notify the internal customer-success team',
            ]}
          />
          <ExperienceItem
            title="Senior Product Engineer @ Trouva"
            duration="June 2018 - October 2019"
            description="Integrated with Shopify to help Trouva's merchants better manage their products and orders."
            skills="Node.js, Sequelize, React, Redux, Jest, MongoDB, AWS"
            bullets={[
              'Integrated with Sentry to monitor and track errors across the Node.js platform, immediately improving the error rate by more than 50%',
              'Led the architecture and implementation of a syncing system with our own platform and Shopify built on a queueing system (AWS SQS) that would handle thousands of products and orders per minute',
              'Maintained and improved the legacy Node.js backend system that was handling thousands of orders per day',
              'Integrated with Algolia as our main search engine, resulting in a 30% faster search experience for end-users',
            ]}
          />
          <ExperienceItem
            title="Earlier Experience"
            duration="2013 - 2018"
            bullets={[
              'Led the implementation of a booking platform based on AWS Lambda, DynamoDB, and React.js at Quotelier',
              'Built Node.js and MongoDB-based REST APIs at Goodvidio, handling thousands of daily requests',
              'Developed frontend applications using Angular at InsightReplay',
              'Built Magento-based e-commerce solutions at Walkinthepark',
              'Developed PHP and MySQL full-stack solutions including e-commerce and custom client projects at dTek',
            ]}
          />
        </Section>
        <Section title="Open source & Projects">
          <Row>
            <Col lg={12}>
              <ul css={listStyle}>
                <li style={{ marginBottom: '0.3rem' }}>
                  Maintainer / contributor to{' '}
                  <ExternalLink title="Excalidraw" url="https://github.com/excalidraw/excalidraw" />{' '}
                  Fastest growing open-source project on GitHub during 2020/21.
                </li>
                <li style={{ marginBottom: '0.3rem' }}>
                  Volunteer / Core organizer of the{' '}
                  <ExternalLink title="DEVit Conference" url="https://github.com/skgtech/devit" />.
                  5 editions with ~400 attendees each.
                </li>
                <li style={{ marginBottom: '0.3rem' }}>
                  Author of open-source tools,{' '}
                  <ExternalLink title="throw.js" url="https://github.com/kbariotis/throw.js" />,{' '}
                  <ExternalLink
                    title="node-cron-expression"
                    url="https://github.com/kbariotis/node-cron-expression"
                  />
                  ,{' '}
                  <ExternalLink
                    title="Presentador"
                    url="https://github.com/kbariotis/presentador"
                  />
                  ,{' '}
                  <ExternalLink
                    title="Go Discover"
                    url="https://github.com/kbariotis/go-discover"
                  />
                </li>
                <li style={{ marginBottom: '0.3rem' }}>
                  Host / interviewer on{' '}
                  <ExternalLink title="Devastation Podcast" url="https://devastation.tv" />. Greek
                  podcast about the software development industry.
                </li>
              </ul>
            </Col>
          </Row>
        </Section>
        <Section title="Impact & Collaboration">
          <ul>
            <li style={{ marginBottom: '0.3rem' }}>
              Mentored junior and mid-level engineers across multiple teams.
            </li>
            <li style={{ marginBottom: '0.3rem' }}>
              Led cross-functional initiatives involving product, design, and data.
            </li>
            <li style={{ marginBottom: '0.3rem' }}>
              Elevated engineering practices around testing, code quality, and architecture.
            </li>
          </ul>
        </Section>
        <Section title="Education">
          <h4>Alexander Technological Educational Institute of Thessaloniki (ATEITH)</h4>
          <p>Bachelor of Science (BS), Computer Software Engineering, 2006 – 2011</p>
        </Section>
        <section css={pageInfo}>
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
