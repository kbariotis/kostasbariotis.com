import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { graphql } from "gatsby";
import { Grid, Row, Col } from "react-flexbox-grid";
import { GoLightBulb } from "@react-icons/all-files/go/GoLightBulb";

import ExternalLink from "../components/resume/ExternalLink";
import ResumeLayout from "../components/layouts/Resume";
import QuickLinks from "../components/resume/QuickLinks";
import Section from "../components/resume/Section";
import ExperienceItem from "../components/resume/ExperienceItem";
import Header from "../components/resume/Header";

const listStyle = css({
  listStyle: "none",
  marginLeft: 0,
});
const pageInfo = css({
  paddingTop: "20px",
  paddingBottom: "20px",
});
const globalStyle = css({
  a: {
    color: "#8ab2ff",
  },
});

const notificationStyle = css({
  textAlign: "center",
  backgroundColor: "#1eeab8",
  color: "white",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  "@media print": {
    display: "none",
  },
});

export default function Resume() {
  return (
    <ResumeLayout>
      <div className={notificationStyle}>
        <GoLightBulb />
        Did you know you can print this page into a PDF? Try CTRL + P and choose{" "}
        {'"'}
        To PDF
        {'"'}.
      </div>
      <Grid className={globalStyle}>
        <section className={pageInfo}>
          <QuickLinks />
          <hr />
        </section>
        <Header
          title="Kostas Bariotis"
          subtitle="Senior Software Engineer"
          summary="Architecture, System Design & User-Facing Product Development in
          Distributed Teams"
        />
        <Section title="Brief">
          <p>
            Senior full-stack engineer who moves easily between architecture,
            product thinking, and cross-functional work in fully remote teams.
            I’ve led large greenfield builds and critical migrations across
            education, energy, and e-commerce, always aiming for measurable
            improvements. I collaborate closely with designers, users, and
            non-engineering teams (async or otherwise) to understand the full
            picture, data, operations, customer success, business goals, and I
            bring that mindset into the teams I work with.
          </p>
        </Section>
        <Section title="Experience">
          <ExperienceItem
            title="Senior Software Engineer @ PBLWorks"
            duration="2023 December - Currently"
            description="Second engineer hired to build the next generation of PBLWorks’ product suite."
            bullets={[
              "Led the architecture and development of the whole product suite from scratch using TypeScript, Next.js, PostgreSQL, GCP, and various third-party services.",
              "Next.js based web application with SSR with constant >90% on Web Core Vitals metrics.",
              "Wired observability and monitoring tools using Sentry.",
              "Wrote an internal system for writing database integration tests that would run on every pull request (locally and on the CI).",
              "Maintained the existing PBLWorks.org platform, hosted on AWS.",
              "Architected and implemented a STAR design schema pulling data from various sources (GA, PostgresSQL, etc) and wired it through Tableau.",
            ]}
          />
          <ExperienceItem
            title="Senior Software Engineer @ Grover"
            duration="2021 November - 2023 August"
            description="Migrated a legacy monolith for invoice generation into a modern, scalable microservice architecture to support global growth."
            bullets={[
              "Responsible for the legacy and new invoicing micro service, serving in total >20k requests per day",
              "Architected observability tools on AWS CloudWatch for having a complete overview of the invoicing system.",
              "Led the migration of the legacy invoicing system to the new micro service, breaking down the tasks, designing the architecture and planning the releases from zero to production with no downtime.",
            ]}
          />
          <ExperienceItem
            title="Senior Product Engineer @ Bulb"
            duration="2019 November - 2021 November"
            description="Building internal tools for Bulbs' energy specialists and customer success teams to help them better serve Bulb's customers."
            bullets={[
              "Worked on the internal customer success platform, developing new features and integrations with third-party services, ZenDesk, Twilio, Salesforce, and others.",
              "Led the architecture and the implementation of a new authentication system that would work across different domains for multi-national expansion of the company.",
              "Implemented a customers monitoring system that would pro-actively watch for customers with certain issues on their accounts and notify the internal customer-success team.",
            ]}
          />
          <ExperienceItem
            title="Senior Product Engineer @ Trouva"
            duration="2018 June - 2019 October"
            description="Integrated with Shopify to help Trouva's merchants better manage their products and orders."
            bullets={[
              "Integrated with Sentry to monitor and track errors across the platform. Immediately improved the error rate by more than 50%.",
              "Led the architecture and implementation of a syncing system with our own platform and Shopify built on a queueing system (AWS SQS) that would handle thousands of products and orders per minute.",
              "Maintained and improved the legacy backend based on Node.js system that was handling thousands of orders per day.",
              "Integrated with Algolia as our main search engine, resulting in a 30% faster search experience for end-users.",
            ]}
          />
          <ExperienceItem
            title={"Earlier Experience"}
            duration="2013 - 2018"
            bullets={[
              "Led the implementation of a booking platform based on AWS Lambda/DynamoDB and React.js at Quotelier.",
              "Built Node.js/MongoDB based REST APIs at Goodvidio (thousands of daily requests).",
              "Frontend Angular work at InsightReplay.",
              "Magento-based e-commerce development at Walkinthepark.",
              "PHP/MySQL full-stack (e-commerce, custom clients projects) work at dTek.",
            ]}
          />
        </Section>
        <Section title="Open source & Projects">
          <Row>
            <Col lg={6}>
              <ul className={listStyle}>
                <li style={{ marginBottom: "0.3rem" }}>
                  Maintainer / contributor to{" "}
                  <ExternalLink
                    title="Excalidraw"
                    url="https://github.com/excalidraw/excalidraw"
                  />
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  Organizer of the{" "}
                  <ExternalLink
                    title="DEVit Conference"
                    url="https://github.com/skgtech/devit"
                  />{" "}
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  Author of open-source tools such as{" "}
                  <ExternalLink
                    title="throw.js"
                    url="https://github.com/kbariotis/throw.js"
                  />
                  ,{" "}
                  <ExternalLink
                    title="node-cron-expression"
                    url="https://github.com/kbariotis/node-cron-expression"
                  />
                  ,{" "}
                  <ExternalLink
                    title="Presentador"
                    url="https://github.com/kbariotis/presentador"
                  />
                  ,{" "}
                  <ExternalLink
                    title="Go Discover"
                    url="https://github.com/kbariotis/go-discover"
                  />
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  Host / interviewer on{" "}
                  <ExternalLink
                    title="Devastation Podcast"
                    url="https://devastation.tv"
                  />
                </li>
              </ul>
            </Col>
          </Row>
        </Section>
        <Section title="Impact & Collaboration">
          <ul>
            <li style={{ marginBottom: "0.3rem" }}>
              Mentored junior and mid-level engineers across multiple teams.
            </li>
            <li style={{ marginBottom: "0.3rem" }}>
              Led cross-functional initiatives involving product, design, and
              data.
            </li>
            <li style={{ marginBottom: "0.3rem" }}>
              Elevated engineering practices around testing, code quality, and
              architecture.
            </li>
          </ul>
        </Section>
        <Section title="Education">
          <h4>
            Alexander Technological Educational Institute of Thessaloniki
            (ATEITH)
          </h4>
          <p>
            Bachelor of Science (BS), Computer Software Engineering, 2006 – 2011
          </p>
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
