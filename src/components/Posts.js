import React from 'react';
import GatsbyLink from 'gatsby-link';
import dateformat from 'dateformat';

const Posts = ({ posts }) =>
  <div>
    {posts
      .filter(post => post.frontmatter.title.length > 0)
      .filter(post => !post.frontmatter.draft)
      .map((post, index) =>
        <article className="dsa" key={index}>
          <header className="header post-head">
            <h1 className="post-title">
              <GatsbyLink to={post.frontmatter.path}>
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
              <GatsbyLink className="read-more" to={post.frontmatter.path}>
                &raquo;
              </GatsbyLink>
            </p>
          </section>
          <footer className="post-meta">
            <div className="tags">
              Talking about:{' '}
              {post.frontmatter.tags &&
                post.frontmatter.tags.split(', ').map(tag =>
                  <a href={`/tag/${tag}/`}>
                    {tag},{' '}
                  </a>
                )}
            </div>
          </footer>
        </article>
      )}
  </div>;

export default Posts;
