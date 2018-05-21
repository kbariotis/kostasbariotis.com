/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';
import GatsbyLink from 'gatsby-link';
import ReactDisqusThread from 'react-disqus-thread';
import uuidv5 from 'uuid/v5';
import Img from 'gatsby-image';
import { css } from 'glamor';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Share from '../components/blog/Share';
import Post from '../components/blog/Post';
import BulletListTags from '../components/blog/BulletListTags';
import Separator from '../components/blog/Separator';
import MetaTags from '../components/blog/MetaTags';
import Variables from '../components/blog/variables';
import ArticleSchema from '../components/blog/schemas/ArticleSchema';

const postTitle = css({
  color: Variables.red,
  fontSize: '2.6em',
  fontWeight: 700,
  '@media(max-width: 768px)': {
    textAlign: 'left',
  },
});

const authorAvatar = css({
  display: 'inline-block',
  width: '100%',
});

const authorAvatarImg = css({
  borderRadius: '50%',
  border: '3px solid white',
});

const postFooter = css({
  paddingTop: '2em',
  paddingBottom: '2em',
  fontSize: '1.2em',
});
const blogSection = css({
  marginTop: '2.5em',
});

const blogSectionHeader = css({
  marginBottom: '1.25em',
});

const mainPostStyle = css({
  marginTop: '2.5em',
  color: 'rgba(255, 255, 255, 0.8)',
  '& blockquote': {
    color: 'rgba(255, 255, 255, 0.5)',
    borderLeft: `5px solid ${Variables.purple}`,
    paddingLeft: '20px',
    marginLeft: 0,
  },
  '& img': {
    maxWidth: '100%',
  },
  '& h1': {
    color: Variables.lightblue,
  },
  '& h2': {
    color: Variables.lightblue,
  },
  '& h3': {
    color: Variables.lightblue,
  },
  '& h4': {
    color: Variables.lightblue,
  },
  '& h5': {
    color: Variables.lightblue,
  },
  '& h6': {
    color: Variables.lightblue,
  },
  '& code': {
    background: '#2d2d2d',
    color: '#FF9619',
    borderRadius: '4px',
  },
  '& .anchor': {
    color: 'white',
    fill: 'currentColor',
  },
  // '& .gatsby-highlight-code-line': {
  //   // backgroundColor: '#feb',
  //   display: 'block',
  //   marginRight: '-1em',
  //   marginLeft: '-1em',
  //   paddingRight: '1em',
  //   paddingLeft: '0.75em',
  //   borderLeft: '0.25em solid #f99',
  // },
  // '& .gatsby-highlight': {
  //   // backgroundColor: '#fdf6e3',
  //   borderRadius: '0.3em',
  //   margin: '0.5em 0',
  //   padding: '1em',
  //   overflow: 'auto',
  // },
  // '& .gatsby-highlight pre[class*="language-"]': {
  //   backgroundColor: 'transparent',
  //   margin: '0',
  //   padding: '0',
  //   overflow: 'initial',
  //   float: 'left',
  //   minWidth: '100%',
  // },
  '& .gatsby-resp-image-wrapper': {
    zIndex: '1 !important',
  },
});

require('prismjs/themes/prism-tomorrow.css');

export default function Template({ data }) {
  const { mainPost: post } = data;
  const { nextPost: next } = data;
  const { siteUrl } = data.site.siteMetadata;

  const isProduction = process.env.NODE_ENV === 'production';
  const fullUrl = `${siteUrl}${post.frontmatter.path}`;

  return (
    <div>
      <ArticleSchema
        authorName={`Kostas Bariotis`}
        title={`${post.frontmatter.title}`}
        description={post.excerpt}
        date={post.frontmatter.date}
      />
      <MetaTags
        title={`${post.frontmatter.title}`}
        description={post.excerpt}
        tags={post.frontmatter.tags}
        path={post.frontmatter.path}
        siteUrl={siteUrl}
        noIndex={post.frontmatter.draft}
      />
      <Grid>
        <Row>
          <Col lg={8} lgOffset={2}>
            <header className="post-head">
              <h1 className={postTitle}>{post.frontmatter.title}</h1>
            </header>
            <section className="post-meta">
              <Row middle="xs">
                <Col md={4}>
                  <Row middle="xs">
                    <Col sm={4}>
                      <GatsbyLink to="/" className={authorAvatar} itemProp="name">
                        <Img sizes={data.file.childImageSharp.sizes} className={authorAvatarImg} />
                      </GatsbyLink>
                    </Col>
                    <Col sm={8}>
                      <div className="author-name">Kostas Bariotis</div>
                      <time
                        className="post-date"
                        dateTime={dateformat(post.frontmatter.date, 'isoDateTime')}
                      >
                        {dateformat(post.frontmatter.date, 'd mmmm yyyy')}
                      </time>
                    </Col>
                  </Row>
                </Col>
                <Col md={8}>
                  <BulletListTags tags={post.frontmatter.tags} draft={post.frontmatter.draft} />
                </Col>
              </Row>
            </section>
            <Separator />
            <article className={mainPostStyle}>
              <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
              <Separator />
              <footer className={postFooter}>
                <Share
                  title={post.frontmatter.title}
                  draft={post.frontmatter.draft}
                  fullUrl={fullUrl}
                />
              </footer>

              <section className={blogSection}>
                <header className={blogSectionHeader}>
                  <h2>Comments</h2>
                </header>
                <Separator />
                {isProduction && (
                  <ReactDisqusThread
                    shortname="kostasbariotis"
                    identifier={uuidv5(fullUrl, uuidv5.URL)}
                    title={post.frontmatter.title}
                    url={fullUrl}
                  />
                )}
              </section>

              <section className={blogSection}>
                <header className={blogSectionHeader}>
                  <h2>Read Next</h2>
                </header>
                <Separator />
                {next && <Post post={next} />}
              </section>
            </article>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

Template.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object,
};

export const pageQuery = graphql`
  query BlogPostByPath($mainPostPath: String!, $nextPostPath: String!) {
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        sizes {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    mainPost: markdownRemark(frontmatter: { path: { eq: $mainPostPath } }) {
      html
      excerpt
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
        draft
      }
    }
    nextPost: markdownRemark(frontmatter: { path: { eq: $nextPostPath } }) {
      html
      excerpt
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
        draft
      }
    }
  }
`;
