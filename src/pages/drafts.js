import React from 'react';
import GatsbyLink from 'gatsby-link';
import dateformat from 'dateformat';

import Separator from './../components/Separator';
import Menu from './../components/Menu';
import Posts from './../components/Posts';
import MetaTags from './../components/MetaTags';

export default function Index({ data }) {
  let { edges: posts } = data.allMarkdownRemark;
  let { description, title, siteUrl } = data.site.siteMetadata;
  posts = posts.map(post => post.node);
  return (
    <div>
      <MetaTags
        title={`My drafts - ${title}`}
        path={`/drafts`}
        siteUrl={siteUrl}
        tags="webdev, programming, javascript"
        description={description}
        noIndex={true}
      />
      <Menu />
      <section className="blog container">
        <div className="medium-8 medium-offset-2 large-10 large-offset-1">
          <header className="header">Drafts</header>
          <p className="drafts-description">
            These are the draft posts either I'm currently working on either I
            have abandoned them for some reason. You can read them and comment
            on them if you think you can help me complete them. It will be fun
            to write an article together. I will also include you as a
            co-author.
          </p>
          <Separator />
          <div className="posts">
            <Posts posts={posts} />
            <Separator />
            <article className="post text-right">
              <header className="post-head">
                <h3 className="post-title">
                  <GatsbyLink to="/drafts/page/2">Older Posts &gt;</GatsbyLink>
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
  query DraftsQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
      filter: { frontmatter: { draft: { eq: true } } }
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
