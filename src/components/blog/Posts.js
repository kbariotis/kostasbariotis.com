import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const Posts = ({ posts }) => (
  <div>
    {posts
      .filter((post) => post.frontmatter.title.length > 0)
      .map((post, index) => (
        <Post key={index} post={post} />
      ))}
  </div>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

export default Posts;
