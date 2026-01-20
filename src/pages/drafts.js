import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../components/grid';
import { graphql } from 'gatsby';

import IndexLayout from '../components/layouts/Index';
import Separator from '../components/blog/Separator';
import Posts from '../components/blog/Posts';
import MetaTags from '../components/blog/MetaTags';
import RedHeader from '../components/blog/RedHeader';

export default function Drafts({ data }) {
  let { edges: posts } = data.allMarkdownRemark;
  posts = posts.map((post) => post.node);
  return (
    <IndexLayout>
      <Row>
        <Col
          lg={8}
          lgOffset={2}
          style={{
            'text-align': 'left',
          }}
        >
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
            These are the draft posts either I am currently working on either I have abandoned them
            for some reason. You can read them and comment on them if you think you can help me
            complete them. It will be fun to write an article together. I will also include you as a
            co-author.
          </p>
          <Separator />
          <div>
            <Posts posts={posts} />
          </div>
        </Col>
      </Row>
    </IndexLayout>
  );
}

Drafts.propTypes = {
  data: PropTypes.object,
};

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
