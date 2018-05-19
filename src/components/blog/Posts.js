import React from 'react';
import GatsbyLink from 'gatsby-link';
import PropTypes from 'prop-types';

import { css } from 'glamor';

import Separator from './Separator';
import Post from './Post';
import Variables from './variables';

const postTitle = css({
  fontSize: '1.5em',
  fontWeight: '700',
  color: Variables.lightblue,
  '@media(max-width: 768px)': {
    textAlign: 'left',
  },
});
const postStyle = css({
  marginBottom: '2em',
  color: 'rgba(255, 255, 255, 0.8)',
});

const Posts = ({ posts }) => (
  <div>
    {posts
      .filter(post => post.frontmatter.title.length > 0)
      .map((post, index) => <Post key={index} post={post} />)}
    <Separator />
    <article className={postStyle}>
      <header>
        <h3 className={postTitle}>
          <GatsbyLink to="/page/2">Older Posts &gt;</GatsbyLink>
        </h3>
      </header>
    </article>
  </div>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

export default Posts;
