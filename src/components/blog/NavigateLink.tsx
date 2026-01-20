import React from 'react';
import { Link } from 'gatsby';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';

const NavigateLink = ({ post }) =>
  post && (
    <div>
      <Link
        css={{
          fontSize: '1.11em',
          fontWeight: 'bold',
          color: '#8ab2ff',
          marginBottom: '5px',
        }}
        to={post.frontmatter.path}
      >
        {post.frontmatter.title}
      </Link>
      <div>{dateformat(post.frontmatter.date, 'd mmmm yyyy')}</div>
      <p>{`${post.excerpt}`}</p>
    </div>
  );

NavigateLink.propTypes = {
  post: PropTypes.object,
};

export default NavigateLink;
