import React from 'react';
import GatsbyLink from 'gatsby-link';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';

import CommaSeparatedTags from './CommaSeparatedTags';

const Posts = ({ posts }) =>
  <div>
    {posts
      .filter(post => post.frontmatter.title.length > 0)
      .map((post, index) =>
        <article className="post" key={index}>
          <header className="post-head">
            <h1 className="post-title">
              <GatsbyLink
                to={post.frontmatter.path}
              >
                {post.frontmatter.title}
              </GatsbyLink>
            </h1>
          </header>
          <time
            className="post-date"
            dateTime={dateformat(post.frontmatter.date, 'isoDateTime')}
          >
            {dateformat(post.frontmatter.date, 'dd mmmm yyyy')}
          </time>
          <section className="post-excerpt">
            <p>
              {post.excerpt}{' '}
              <GatsbyLink
                to={post.frontmatter.path}
              >
                &raquo;
              </GatsbyLink>
            </p>
          </section>
          <footer className="post-meta">
            <CommaSeparatedTags tags={post.frontmatter.tags} />
          </footer>
        </article>
      )}
  </div>;

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};

export default Posts;
