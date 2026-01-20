import React from 'react';
import dateformat from 'dateformat';
import { withPrefix } from 'gatsby-link';

interface ArticleSchemaProps {
  authorName: string;
  title: string;
  description: string;
  date: string;
}

export default function ArticleSchema({
  authorName,
  title,
  description,
  date,
}: ArticleSchemaProps) {
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
