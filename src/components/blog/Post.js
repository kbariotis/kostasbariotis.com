import React from 'react';
import GatsbyLink from 'gatsby-link';
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
        <GatsbyLink to={post.frontmatter.path}>{post.frontmatter.title}</GatsbyLink>
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
