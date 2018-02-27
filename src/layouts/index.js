import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import '../scss/boot.scss';

import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';

export default function IndexLayout({ children, data }) {
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
      <Footer />
    </div>
  );
}

IndexLayout.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object,
};

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
