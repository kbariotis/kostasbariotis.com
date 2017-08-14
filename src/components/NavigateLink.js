import React from 'react';
import GatsbyLink from 'gatsby-link';
import dateformat from 'dateformat';

const NavigateLink = ({ post }) =>
  post &&
  <div>
    <GatsbyLink className="navigate-link" to={post.frontmatter.draft ? `/drafts${post.frontmatter.path}` : post.frontmatter.path}>
      {post.frontmatter.title}
    </GatsbyLink>
    <div>
      {dateformat(post.frontmatter.date, 'd mmmm yyyy')}
    </div>
    <p className="navigate-desc">{`${post.excerpt.slice(0, 100)}...`}</p>
  </div>;

export default NavigateLink;
