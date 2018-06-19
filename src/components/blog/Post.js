import React from 'react';
import { Link } from 'gatsby';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';

import CommaSeparatedTags from './CommaSeparatedTags';
import Variables from './variables';

const Post = ({ post }) => (
  <article
    css={{
      marginBottom: '3em',
      color: 'rgba(255, 255, 255, 0.8)',
    }}
  >
    <header>
      <h1
        css={{
          fontSize: '1.5em',
          fontWeight: '700',
          color: Variables.lightblue,
          '@media(max-width: 768px)': {
            textAlign: 'left',
          },
        }}
      >
        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
      </h1>
    </header>
    <time
      css={{
        color: 'rgba(255, 255, 255, 0.5)',
      }}
      dateTime={dateformat(post.frontmatter.date, 'isoDateTime')}
    >
      {dateformat(post.frontmatter.date, 'dd mmmm yyyy')}
    </time>
    <section
      css={{
        marginTop: '1em',
      }}
    >
      <p>
        {post.excerpt} <Link to={post.frontmatter.path}>&raquo;</Link>
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
