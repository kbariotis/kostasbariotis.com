/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { css, injectGlobal } from 'react-emotion';
import { Grid } from 'react-flexbox-grid';
import { StaticQuery } from 'gatsby';

import Footer from '../blog/Footer';
import Variables from '../blog/variables';
import Menu from '../blog/Menu';

import './fonts.css';

injectGlobal`
  body,
  html {
    font-weight: 300;
    font-style: normal;
    font-smoothing: 'antialiased',
    text-rendering: 'optimizeLegibility',
    word-wrap: 'break-word',
    hyphens: 'auto',
  }
  html.subset-fonts-enabled {
    font-family: 'Roboto Subset', sans-serif;
  }
  html.fonts-enabled {
    font-family: 'Roboto', sans-serif;
  }
  html.subset-fonts-enabled h1,
  html.subset-fonts-enabled h2,
  html.subset-fonts-enabled h3,
  html.subset-fonts-enabled h4,
  html.subset-fonts-enabled h5,
  html.subset-fonts-enabled h6 {
    font-family: 'Roboto Slab Subset', sans-serif;
  }
  html.fonts-enabled h1,
  html.fonts-enabled h2,
  html.fonts-enabled h3,
  html.fonts-enabled h4,
  html.fonts-enabled h5,
  html.fonts-enabled h6 {
    font-family: 'Roboto Slab', sans-serif;
  }
`;

const containerStyle = css({
  color: 'rgba(255,255,255,0.8)',
  backgroundColor: Variables.background,
  background: Variables.background,
  backgroundSize: '100% 300px',
  backgroundImage:
    "linear-gradient(to bottom, rgba(125, 185, 232, 0) 0%, rgba(34, 25, 49, 1) 100%), url('/images/header_index.jpg')",
  filter:
    "progid:DXImageTransform.Microsoft.gradient(startColorstr='#007db9e8', endColorstr='#221931', GradientType=0)",
  backgroundRepeat: 'no-repeat',
  '& a': {
    color: Variables.lightblue,
    '&:hover': {
      color: Variables.red,
    },
    '&:active': {
      color: Variables.red,
    },
  },
});

const blogContainer = css({
  textAlign: 'left',
  paddingTop: '4em',
  marginBottom: '4em',
});

export default function IndexLayout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              title
              description
              author
            }
          }
        }
      `}
      render={data => {
        let { description, title } = data.site.siteMetadata;

        return (
          <div className={containerStyle}>
            <Menu />
            <Helmet titleTemplate={`%s - ${title}`} defaultTitle={title}>
              <meta name="description" content={description} />
              <html lang="en" /> {/* this is valid react-helmet usage! */}
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
              <meta name="HandheldFriendly" content="True" />
              <meta
                name="google-site-verification"
                content="2cN-EmJ2d00_gaP6eUs43tdcXd1UL965Rs_UBQc0Oec"
              />
            </Helmet>
            <Grid className={blogContainer}>{children}</Grid>
            <Footer />
          </div>
        );
      }}
    />
  );
}

IndexLayout.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object,
};
