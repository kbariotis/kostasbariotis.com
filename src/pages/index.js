/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';
import Img from 'gatsby-image';

import Separator from './../components/Separator';
import Menu from './../components/Menu';
import Posts from './../components/Posts';
import MetaTags from './../components/MetaTags';

import WebPageSchema from '../components/schemas/WebPageSchema';

export default function Index({ data }) {
  let { edges: posts } = data.allMarkdownRemark;
  let { siteUrl, description, author } = data.site.siteMetadata;
  posts = posts.map(post => post.node);
  return (
    <div>
      <WebPageSchema title={author} description={description} url={siteUrl} />
      <MetaTags
        noIndex={false}
        tags=""
        title={'Home'}
        description={description}
        siteUrl={siteUrl}
        path={'/'}
      />
      <Menu />
      <section className="blog container">
        <div className="medium-8 medium-offset-2 large-10 large-offset-1">
          <div className="blog-header">
            <GatsbyLink to="/" className="blog-header__link" itemProp="name">
              <Img
                className="header-avatar blog-header__img"
                alt={author}
                sizes={data.file.childImageSharp.sizes}
              />
            </GatsbyLink>
            <h1>{author}</h1>
            <p className="header-description" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          <header className="header">Latest Posts</header>
          <Separator />
          <div className="posts">
            <Posts posts={posts} />
            <Separator />
            <article className="post text-right">
              <header className="post-head">
                <h3 className="post-title">
                  <GatsbyLink to="/page/2">Older Posts &gt;</GatsbyLink>
                </h3>
              </header>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

Index.propTypes = {
  data: PropTypes.object,
};

export const pageQuery = graphql`
  query IndexQuery {
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        sizes {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    site {
      siteMetadata {
        description
        siteUrl
        author
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
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
