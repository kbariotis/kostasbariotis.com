import React from 'react';
import GatsbyLink from 'gatsby-link';
import dateformat from 'dateformat';
import Helmet from 'react-helmet';

import Link from '../components/Link';
import Separator from './../components/Separator';
import MenuWithLogo from './../components/MenuWithLogo';
import Posts from './../components/Posts';

export default function Index({ data }) {
  let { edges: posts } = data.allMarkdownRemark;
  posts = posts.map(post => post.node);
  return (
    <section className="main-content">
      <Helmet
        title="Kostas Bariotis"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <MenuWithLogo />
      <section className="blog container">
        <div className="medium-8 medium-offset-2">
          <header className="header">Latest Posts</header>
          <Separator />
          <div className="posts">
            <Posts posts={posts} />
            <Separator />
            <article className="post text-right">
              <header className="header post-head">
                <h3 className="post-title">
                  <Link to="/page/2">Older Posts &gt;</Link>
                </h3>
              </header>
            </article>
          </div>
        </div>
      </section>
    </section>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
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
