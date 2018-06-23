/* global graphql */

import React from 'react';
import { StaticQuery } from 'gatsby';

export default function WebPageSchema() {
  <StaticQuery
    query={graphql`
      query WebPageSchemaQuery {
        site {
          siteMetadata {
            siteUrl
            title
            description
          }
        }
      }
    `}
    render={data => {
      let { siteUrl, title, description } = data.site.siteMetadata;

      const payload = `{
        "@context": "http://schema.org/",
        "@type": "WebPage",
        "name": "${title}",
        "url": "${siteUrl}",
        "description": "${description}"
      }`;
      return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: payload }} />;
    }}
  />;
}
