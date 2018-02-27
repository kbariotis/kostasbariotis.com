/* global graphql */
import React from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';
import Img from 'gatsby-image';

import Separator from './../components/Separator';
import Menu from './../components/Menu';
import MetaTags from './../components/MetaTags';

export default function Contact({ data }) {
  return (
    <div>
      <MetaTags
        siteUrl={data.site.siteMetadata.siteUrl}
        path={'/contact'}
        title={`Contact`}
        description={'In need for a Web Developer? Search no more.'}
        noIndex={false}
        tags=""
      />
      <Menu />
      <section className="blog container about">
        <div className="medium-8 medium-offset-2 large-10 large-offset-1">
          <header className="header">
            <div className="row text-center">
              <Img sizes={data.file.childImageSharp.sizes} className="header-avatar" />
              <h1>
                In need for a Web Developer? <br />Search no more.
              </h1>
            </div>
          </header>
          <Separator />
          <main role="main">
            <p>
              I am a web developer with almost ten years of experience in creating web applications
              and services. I can help you design your business infrastructure and your development
              team management process. I can help you set your testing strategy and build your
              application{"'"}s architecture.
            </p>
            <p>
              Regarding the stack, I am currently working extensively with Javascript/Node.js and
              React.js to build robust web applications and services. My I/P/F-aaS of preference is
              AWS.
            </p>
            <p>Above all, I am getting things done.</p>
            <p>
              This site should provide you with{' '}
              <GatsbyLink className="footer-link" to="/about" title="About Kostasbariotis.com">
                all the information
              </GatsbyLink>{' '}
              you need but if you still have questions, please consult my{' '}
              <a href="https://www.linkedin.com/pub/kostas-bariotis/81/b74/2a8">LinkedIn profile</a>,
              my <a href="https://github.com/kbariotis">GitHub profile</a> or{' '}
              <a href="mailto:konmpar@gmail.com?subject=Freelance%20Javascript%20development">
                contact me directly
              </a>. I like receiving email from people.
            </p>
            <p>
              <b>I am currently available to hire for a limited time of work per week.</b>
            </p>
            <p>
              <a href="mailto:konmpar@gmail.com?subject=Freelance%20Javascript%20development">
                Email me
              </a>{' '}
              to talk about your project or just to say hi.
            </p>
          </main>
        </div>
      </section>
    </div>
  );
}

Contact.propTypes = {
  data: PropTypes.object,
};

export const contactPageQuery = graphql`
  query ContactPageSiteMetadata {
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
