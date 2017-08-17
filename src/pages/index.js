import React from 'react';
import GatsbyLink from 'gatsby-link';
import dateformat from 'dateformat';

import Link from '../components/Link';
import Separator from './../components/Separator';
import Menu from './../components/Menu';
import Posts from './../components/Posts';
import MetaTags from './../components/MetaTags';
import LazyLoad from 'react-lazyload';

import avatarImage from './../../static/images/avatar.jpg';

export default function Index({ data }) {
  let { edges: posts } = data.allMarkdownRemark;
  let { description, title } = data.site.siteMetadata;
  posts = posts.map(post => post.node);
  return (
    <div>
      <MetaTags
        title={title}
        path="/"
        tags="webdev, programming, javascript"
        description={description}
      />
      <Menu />
      <section className="blog container">
        <div className="medium-8 medium-offset-2">
          <div className="blog-header">
            <GatsbyLink to="/" className="blog-header__link" itemProp="name">
              <LazyLoad height={250}>
                <img
                  className="header-avatar blog-header__img"
                  src={avatarImage}
                  alt="Kostas Bariotis"
                />
              </LazyLoad>
            </GatsbyLink>
            <h1>Kostas Bariotis</h1>
            <p>
              I'm Kostas Bariotis, a web developer, a proud wanderer and a
              passionate doer. My mission is to write clean and efficient code, to
              solve problems on the web and to learn something more.
            </p>
          </div>
          <header className="header">Latest Posts</header>
          <Separator />
          <div className="posts">
            <Posts posts={posts} />
            <Separator />
            <article className="post text-right">
              <header className="post-head">
                <h3 className="post-title">
                  <Link to="/page/2">Older Posts &gt;</Link>
                </h3>
              </header>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5,
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            draft
          }
        }
      }
    }
  }
`;
