/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'glamor';

import Separator from './../components/Separator';
import AuthorHeader from './../components/AuthorHeader';
import RedHeader from './../components/RedHeader';
import Menu from './../components/Menu';
import Posts from './../components/Posts';
import MetaTags from './../components/MetaTags';

import WebPageSchema from '../components/schemas/WebPageSchema';

import { Grid, Row, Col } from 'react-flexbox-grid';

const blogContainer = css({
  marginTop: '4em',
  textAlign: 'left',
});

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
      <Grid className={blogContainer}>
        <Row>
          <Col xs={8} xsOffset={2}>
            <AuthorHeader sizes={data.file.childImageSharp.sizes} author={author}>
              {description}
            </AuthorHeader>
            <RedHeader>Latest Posts</RedHeader>
            <Separator />
            <Posts posts={posts} />
          </Col>
        </Row>
      </Grid>
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
