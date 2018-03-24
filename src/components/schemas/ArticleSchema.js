import React from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';
import { withPrefix } from 'gatsby-link';

export default function ArticleSchema({ authorName, title, description, date }) {
  const data = `{
    "@context": "http://schema.org/",
    "@type": "BlogPosting",
    "author": "${authorName}",
    "headline": "${title}",
    "datePublished": "${dateformat(new Date(date), 'isoDateTime')}",
    "description": "${description}",
    "publisher": {
      "@type": "Person",
      "name": "${authorName}",
      "logo": {
        "@type": "ImageObject",
        "url": "${withPrefix('/schema/avatar.jpg')}"
      }
    }
  }`;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

ArticleSchema.propTypes = {
  authorName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
};
