import React from 'react';
import GatsbyLink from 'gatsby-link';

const CommaSeparatedTags = ({ tags, draft }) =>
  <ul className="tags list-inline text-right">
    {tags &&
      tags.split(', ').map((tag, index) =>
        <li key={index}>
          <GatsbyLink to={`/tag/${tag}`}>
            {tag}
          </GatsbyLink>
        </li>
      )}
    {draft &&
      <li className="draft-tag">
        <GatsbyLink to={`/drafts`}>Draft</GatsbyLink>
      </li>}
  </ul>;

export default CommaSeparatedTags;
