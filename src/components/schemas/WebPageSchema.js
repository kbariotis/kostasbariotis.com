import React from 'react';
import PropTypes from 'prop-types';

export default function WebPageSchema({ title, description, url }) {
  const data = `{
    "@context": "http://schema.org/",
    "@type": "WebPage",
    "name": "${title}",
    "url": "${url}",
    "description": "${description}"
  }`;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

WebPageSchema.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
};
