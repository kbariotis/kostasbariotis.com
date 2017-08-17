import React from 'react';
import Helmet from 'react-helmet';

const MetaTags = ({ title, description, path, tags, noIndex }) =>
  <div>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: description },
        { name: 'keywords', content: tags },
      ]}
    >
      {noIndex && <meta name="robots" content="noindex" />}

      <meta property="og:site_name" content="Kostas Bariotis" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={path} />
      <meta
        property="og:image"
        content={`${__PATH_PREFIX__}/images/avatar.jpg`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={path} />
      <meta
        name="twitter:image"
        content={`${__PATH_PREFIX__}/images/avatar.jpg`}
      />
    </Helmet>
  </div>;

export default MetaTags;
