/* global graphql */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { css } from 'glamor';

import Footer from '../components/Footer';
import Variables from '../components/variables';
import Menu from '../components/Menu';

import '../scss/boot.scss';

import { Grid } from 'react-flexbox-grid';

css.global('.gatsby-resp-image-wrapper', {
  zIndex: '1 !important',
});
css.global('a', {
  color: Variables.lightblue,
  ':hover': {
    color: Variables.red,
  },
  ':active': {
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
  /* http://colorzilla.com/gradient-editor/#7db9e8+0,221931+99&0+0,1+100 */
  // backgroundImage:
  //   "-moz-linear-gradient(top, rgba(125, 185, 232, 0) 0%, rgba(34, 25, 49, 1) 100%), url('/images/header_index.jpg')",
  // backgroundImage:
  //   "-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(125, 185, 232, 0)), color-stop(100%, rgba(34, 25, 49, 1))), url('/images/header_index.jpg')",
  // backgroundImage:
  //   "-webkit-linear-gradient(top, rgba(125, 185, 232, 0) 0%, rgba(34, 25, 49, 1) 100%), url('/images/header_index.jpg')",
  // backgroundImage:
  //   "-o-linear-gradient(top, rgba(125, 185, 232, 0) 0%, rgba(34, 25, 49, 1) 100%), url('/images/header_index.jpg')",
  // backgroundImage:
  //   "-ms-linear-gradient(top, rgba(125, 185, 232, 0) 0%, rgba(34, 25, 49, 1) 100%), url('/images/header_index.jpg')",
  backgroundImage:
    "linear-gradient(to bottom, rgba(125, 185, 232, 0) 0%, rgba(34, 25, 49, 1) 100%), url('/images/header_index.jpg')",
  filter:
    "progid:DXImageTransform.Microsoft.gradient(startColorstr='#007db9e8', endColorstr='#221931', GradientType=0)",
  backgroundRepeat: 'no-repeat',
  '-webkit-font-smoothing': 'antialiased',
  fontSmoothing: 'antialiased',
  textRendering: 'optimizeLegibility',
  wordWrap: 'break-word',
  hyphens: 'auto',
});

const blogContainer = css({
  textAlign: 'left',
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
      <Grid className={blogContainer}>{children()}</Grid>
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
