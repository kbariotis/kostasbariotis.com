/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';
import GatsbyLink from 'gatsby-link';
import { ShareButtons } from 'react-share';
import ReactDisqusThread from 'react-disqus-thread';
import uuidv5 from 'uuid/v5';
import Img from 'gatsby-image';
import { css } from 'glamor';

import { Grid, Row, Col } from 'react-flexbox-grid';

import Menu from '../components/Menu';
import BulletListTags from '../components/BulletListTags';
import NavigateLink from '../components/NavigateLink';
import Separator from '../components/Separator';
import MetaTags from '../components/MetaTags';
import Variables from '../components/variables';

import ArticleSchema from '../components/schemas/ArticleSchema';

const blogContainer = css({
  marginTop: '4em',
  textAlign: 'left',
});

const postTitle = css({
  color: Variables.red,
  fontSize: '2.6em',
  fontWeight: 700,
  marginBottom: 2 * Variables.vpadding,
  '@media(max-width: 768px)': {
    textAlign: 'left',
  },
});

const authorAvatar = css({
  display: 'inline-block',
  width: '2.5em',
  height: '2.5em',
});

const authorAvatarImg = css({
  borderRadius: '50%',
  border: '3px solid white',
});

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  RedditShareButton,
} = ShareButtons;

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
      <Menu />
      <Grid>
        <Row center="sm">
          <Col sm={8}>
            <section className={blogContainer}>
              <header className="post-head">
                <h1 className={postTitle}>{post.frontmatter.title}</h1>
              </header>
              <section className="post-meta">
                <Row center="sm">
                  <Col md={4}>
                    <Row start="sm">
                      <Col sm>
                        <GatsbyLink to="/" className={authorAvatar} itemProp="name">
                          <Img
                            sizes={data.file.childImageSharp.sizes}
                            className={authorAvatarImg}
                          />
                        </GatsbyLink>
                      </Col>
                      <Col sm>
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
              <article className="main-post {{post_class}}">
                <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
                <Separator />
                <footer className="post-footer">
                  <section className="share text-center">
                    {!post.frontmatter.draft ? (
                      <ul className="share-buttons list-inline">
                        <li>
                          <b>Share this post on</b>
                        </li>
                        <li className="link-twitter">
                          <TwitterShareButton
                            url={fullUrl}
                            title={post.frontmatter.title}
                            via="kbariotis"
                            className="share-twitter"
                          >
                            <span>Twitter</span>
                          </TwitterShareButton>
                        </li>
                        <li className="link-facebook">
                          <FacebookShareButton url={fullUrl} className="share-facebook">
                            <span>Facebook</span>
                          </FacebookShareButton>
                        </li>
                        <li className="link-google-plus">
                          <GooglePlusShareButton url={fullUrl} className="share-google-plus">
                            <span>Google+</span>
                          </GooglePlusShareButton>
                        </li>
                        <li className="link-reddit" title={post.frontmatter.title}>
                          <RedditShareButton url={fullUrl} className="share-reddit">
                            <span>Reddit</span>
                          </RedditShareButton>
                        </li>
                      </ul>
                    ) : (
                      <small>
                        This is a draft post, thus sharing is disabled. Please do not share untill
                        is ready for prime time.
                      </small>
                    )}
                  </section>
                </footer>

                <section className="blog-section">
                  <header className="header">
                    <h2>Comments</h2>
                  </header>
                  {isProduction && (
                    <ReactDisqusThread
                      shortname="kostasbariotis"
                      identifier={uuidv5(fullUrl, uuidv5.URL)}
                      title={post.frontmatter.title}
                      url={fullUrl}
                    />
                  )}
                </section>

                <section className="blog-section">
                  <header className="header">
                    <h2>Read Next</h2>
                  </header>
                  <NavigateLink post={next} />
                </section>
              </article>
            </section>
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
