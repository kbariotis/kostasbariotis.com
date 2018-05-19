/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';

import Separator from './../components/Separator';
import Posts from './../components/Posts';
import MetaTags from './../components/MetaTags';
import RedHeader from './../components/RedHeader';

import { Row, Col } from 'react-flexbox-grid';

export default function Drafts({ data }) {
  let { edges: posts } = data.allMarkdownRemark;
  let { siteUrl } = data.site.siteMetadata;
  posts = posts.map(post => post.node);
  return (
    <div>
      <MetaTags
        siteUrl={siteUrl}
        path={'/drafts'}
        title={`My drafts`}
        tags=""
        description={
          'These are the draft posts either I am currently working on either I have abandoned them for some reason. You can read them and comment on them if you think you can help me complete them.'
        }
        noIndex={true}
      />
      <Row center="xs">
        <Col xs={8}>
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
    </div>
  );
}

Drafts.propTypes = {
  data: PropTypes.object,
};

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
