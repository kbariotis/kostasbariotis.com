/* global graphql */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default function ResumeLayout({ children, data }) {
  let { description, title } = data.site.siteMetadata;

  return (
    <div>
      <Helmet titleTemplate={`%s - ${title}`} defaultTitle={title}>
        <meta name="description" content={description} />
        <html lang="en" /> {/* this is valid react-helmet usage! */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="HandheldFriendly" content="True" />
      </Helmet>
      <section className="main-content">{children()}</section>
    </div>
  );
}

ResumeLayout.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object,
};

export const pageQuery = graphql`
  query ResumeLayoutQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
