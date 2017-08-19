import React from 'react';
import GatsbyLink from 'gatsby-link';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';

const NavigateLink = ({ post }) =>
  post &&
  <div>
    <GatsbyLink
      className="navigate-link"
      to={post.frontmatter.path}
    >
      {post.frontmatter.title}
    </GatsbyLink>
    <div>
      {dateformat(post.frontmatter.date, 'd mmmm yyyy')}
    </div>
    <p className="navigate-desc">{`${post.excerpt}`}</p>
  </div>;

NavigateLink.propTypes = {
  post: PropTypes.object
};

export default NavigateLink;
