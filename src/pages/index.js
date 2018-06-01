/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import GatsbyLink from 'gatsby-link';

import Separator from '../components/blog/Separator';
import AuthorHeader from '../components/blog/AuthorHeader';
import RedHeader from '../components/blog/RedHeader';
import Posts from '../components/blog/Posts';
import MetaTags from '../components/blog/MetaTags';
import WebPageSchema from '../components/blog/schemas/WebPageSchema';

import Variables from './../components/blog/variables';

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
      <Row>
        <Col sm={8} smOffset={2}>
          <AuthorHeader sizes={data.file.childImageSharp.sizes} author={author}>
            {description}
          </AuthorHeader>
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
                <GatsbyLink to="/page/2">Older Posts &gt;</GatsbyLink>
              </h3>
            </header>
          </article>
        </Col>
      </Row>
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
