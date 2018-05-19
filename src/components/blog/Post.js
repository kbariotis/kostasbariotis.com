import React from 'react';
import GatsbyLink from 'gatsby-link';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';

import { css } from 'glamor';

import CommaSeparatedTags from './CommaSeparatedTags';
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
const postTime = css({
  color: 'rgba(255, 255, 255, 0.5)',
});
const postExcerpt = css({
  marginTop: '1em',
});

const Post = ({ post }) => (
  <article className={postStyle}>
    <header>
      <h1 className={postTitle}>
        <GatsbyLink to={post.frontmatter.path}>{post.frontmatter.title}</GatsbyLink>
      </h1>
    </header>
    <time className={postTime} dateTime={dateformat(post.frontmatter.date, 'isoDateTime')}>
      {dateformat(post.frontmatter.date, 'dd mmmm yyyy')}
    </time>
    <section className={postExcerpt}>
      <p>
        {post.excerpt} <GatsbyLink to={post.frontmatter.path}>&raquo;</GatsbyLink>
      </p>
    </section>
    <footer>
      <CommaSeparatedTags tags={post.frontmatter.tags} />
    </footer>
  </article>
);

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
