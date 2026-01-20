import React from 'react';
import { graphql } from 'gatsby';
import type { FC } from 'react';

import IndexLayout from '../components/layouts/Index';
import Separator from '../components/blog/Separator';
import Posts from '../components/blog/Posts';
import MetaTags from '../components/blog/MetaTags';
import RedHeader from '../components/blog/RedHeader';
import type { GatsbyPageProps, BasePageData } from '../types';

interface DraftsPageData extends BasePageData {
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

const Drafts: FC<GatsbyPageProps<DraftsPageData>> = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;
  const postNodes = posts.map((post) => post.node);
  return (
    <IndexLayout>
      <MetaTags
        path={'/drafts'}
        title={`My drafts`}
        description={
          'These are the draft posts either I am currently working on either I have abandoned them for some reason. You can read them and comment on them if you think you can help me complete them.'
        }
        noIndex={true}
      />
      <RedHeader>Drafts</RedHeader>
      <p className="drafts-description">
        These are the draft posts either I am currently working on either I have abandoned them for
        some reason. You can read them and comment on them if you think you can help me complete
        them. It will be fun to write an article together. I will also include you as a co-author.
      </p>
      <Separator />
      <div>
        <Posts posts={postNodes} />
      </div>
    </IndexLayout>
  );
};

export default Drafts;

export const pageQuery = graphql`
  query DraftsQuery {
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
