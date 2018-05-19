/* global graphql */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { css } from 'glamor';
import { Grid } from 'react-flexbox-grid';

import Footer from '../components/blog/Footer';
import Variables from '../components/blog/variables';
import Menu from '../components/blog/Menu';

const bodyStyle = css({
  backgroundColor: Variables.background,
  color: '#fff',
  fontWeight: '300',
  background: Variables.background,
  backgroundSize: '100% 300px',
  backgroundImage:
    "linear-gradient(to bottom, rgba(125, 185, 232, 0) 0%, rgba(34, 25, 49, 1) 100%), url('/images/header_index.jpg')",
  filter:
    "progid:DXImageTransform.Microsoft.gradient(startColorstr='#007db9e8', endColorstr='#221931', GradientType=0)",
  backgroundRepeat: 'no-repeat',
  fontSmoothing: 'antialiased',
  textRendering: 'optimizeLegibility',
  wordWrap: 'break-word',
  hyphens: 'auto',
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

export default function IndexLayout({ children, data }) {
  let { description, title } = data.site.siteMetadata;

  return (
    <div className={bodyStyle}>
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
      <Grid className={blogContainer.toString()}>{children()}</Grid>
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
