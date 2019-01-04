import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { graphql, Link } from 'gatsby';

import IndexLayout from '../components/layouts/Index';
import Separator from '../components/blog/Separator';
import AuthorHeader from '../components/blog/AuthorHeader';
import RedHeader from '../components/blog/RedHeader';
import Posts from '../components/blog/Posts';
import MetaTags from '../components/blog/MetaTags';
import WebPageSchema from '../components/blog/schemas/WebPageSchema';

import Variables from './../components/blog/variables';

export default function Index({ data }) {
  let { edges: posts } = data.allMarkdownRemark;
  let { description } = data.site.siteMetadata;
  posts = posts.map(post => post.node);
  return (
    <IndexLayout>
      <WebPageSchema />
      <MetaTags title={'Home'} description={description} />
      <Row>
        <Col sm={8} smOffset={2}>
          <AuthorHeader />
          <RedHeader>Latest Posts</RedHeader>
          <Separator />
          <Posts posts={posts} />
          <Separator />
          <article
            css={{
              marginBottom: '2em',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <header>
              <h3
                css={{
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
        </Col>
      </Row>
    </IndexLayout>
  );
}

Index.propTypes = {
  data: PropTypes.object,
};

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
