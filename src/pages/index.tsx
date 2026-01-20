import React from 'react';
import { graphql, Link } from 'gatsby';
import type { FC } from 'react';

import IndexLayout from '../components/layouts/Index';
import Separator from '../components/blog/Separator';
import AuthorHeader from '../components/blog/AuthorHeader';
import RedHeader from '../components/blog/RedHeader';
import Posts from '../components/blog/Posts';
import MetaTags from '../components/blog/MetaTags';
import WebPageSchema from '../components/blog/schemas/WebPageSchema';
import Variables from './../components/blog/variables';
import type { GatsbyPageProps, PageData } from '../types';

interface IndexPageData extends PageData {
  allMarkdownRemark: {
    edges: Array<{
      node: {
        excerpt: string;
        id: string;
        frontmatter: {
          title: string;
          date: string;
          path: string;
          tags: string;
          draft: boolean;
        };
      };
    }>;
  };
}

const Index: FC<GatsbyPageProps<IndexPageData>> = ({ data }) => {
  let { edges: posts } = data.allMarkdownRemark;
  let { description } = data.site.siteMetadata;
  const postNodes = posts.map((post) => post.node);
  return (
    <IndexLayout>
      <WebPageSchema />
      <MetaTags title={'Home'} description={description} />
      <AuthorHeader />
      <RedHeader>Latest Posts</RedHeader>
      <Separator />
      <Posts posts={postNodes} />
      <Separator />
      <article
        style={{
          marginBottom: '2em',
          color: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <header>
          <h3
            style={{
              fontSize: '1.5em',
              fontWeight: '700',
              float: 'right',
              color: Variables.lightblue,
              '@media(max-width: 768px)': {
                textAlign: 'left',
              },
            }}
          >
            <Link to="/page/2">Older Posts &gt;</Link>
          </h3>
        </header>
      </article>
    </IndexLayout>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        description
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
