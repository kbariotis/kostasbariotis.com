/* global graphql */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { css } from 'glamor';

import Footer from '../components/Footer';
import Variables from '../components/variables';
import Menu from '../components/Menu';

import { Grid } from 'react-flexbox-grid';

css.global('.gatsby-highlight-code-line', {
  backgroundColor: '#feb',
  display: 'block',
  marginRight: '-1em',
  marginLeft: '-1em',
  paddingRight: '1em',
  paddingLeft: '0.75em',
  borderLeft: '0.25em solid #f99',
});
css.global('.gatsby-highlight', {
  backgroundColor: '#fdf6e3',
  borderRadius: '0.3em',
  margin: '0.5em 0',
  padding: '1em',
  overflow: 'auto',
});
css.global('.gatsby-highlight pre[class*="language-"]', {
  backgroundColor: 'transparent',
  margin: '0',
  padding: '0',
  overflow: 'initial',
  float: 'left',
  minWidth: '100%',
});
css.global('.gatsby-resp-image-wrapper', {
  zIndex: '1 !important',
});
css.global('a', {
  color: Variables.lightblue,
  '&:hover': {
    color: Variables.red,
  },
  '&:active': {
    color: Variables.red,
  },
});
css.global('.anchor', {
  color: 'white',
  fill: 'currentColor',
});
css.global('body', {
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
});

const blogContainer = css({
  textAlign: 'left',
  paddingTop: '4em',
  marginBottom: '4em',
});

export default function IndexLayout({ children, data }) {
  let { description, title } = data.site.siteMetadata;

  return (
    <div>
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
