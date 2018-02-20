import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import OGImageImg from './../../static/images/og.jpg';

const MetaTags = ({ title, description, path, tags, noIndex, siteUrl }) => (
  <div>
    <Helmet>
      {noIndex && <meta name="robots" content="noindex" />}

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags} />

      <meta property="og:site_name" content="Kostas Bariotis" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}${path}`} />
      <meta property="og:image" content={`${siteUrl}${OGImageImg}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={`${siteUrl}${path}`} />
      <meta name="twitter:image" content={`${siteUrl}${OGImageImg}`} />
    </Helmet>
  </div>
);

MetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  tags: PropTypes.string,
  noIndex: PropTypes.bool,
  siteUrl: PropTypes.string
};

export default MetaTags;
