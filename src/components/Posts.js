import React from 'react';
import GatsbyLink from 'gatsby-link';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';

import { css } from 'glamor';

import Separator from './../components/Separator';
import CommaSeparatedTags from './CommaSeparatedTags';
import Variables from './variables';

const postTitle = css({
  fontSize: '1.5em',
  fontWeight: '700',
  marginBottom: 2 * Variables.vpadding,
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

const Posts = ({ posts }) => (
  <div>
    {posts.filter(post => post.frontmatter.title.length > 0).map((post, index) => (
      <article className={postStyle} key={index}>
        <header className="post-head">
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
    ))}
    <Separator />
    <article className={`${postStyle} text-right`}>
      <header className="post-head">
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
