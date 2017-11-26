import React from 'react';
import Helmet from 'react-helmet';
import dateformat from 'dateformat';
import GatsbyLink from 'gatsby-link';
import { ShareButtons } from 'react-share';
import ReactDisqusThread from 'react-disqus-thread';
import uuidv5 from 'uuid/v5';

import Menu from '../components/Menu';
import BulletListTags from '../components/BulletListTags';
import NavigateLink from '../components/NavigateLink';
import Separator from '../components/Separator';
import MetaTags from '../components/MetaTags';

import avatarImg from './../../static/images/avatar.jpg';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
} = ShareButtons;

export default function Template({ data, pathContext }) {
  const { markdownRemark: post } = data;
  const { title, siteUrl } = data.site.siteMetadata;
  const { next, prev } = pathContext;

  const isProduction = process.env.NODE_ENV === 'production';
  const fullUrl = `${siteUrl}${post.frontmatter.path}`;

  return (
    <div>
      <MetaTags
        title={`${post.frontmatter.title} - ${title}`}
        description={post.excerpt}
        tags={post.frontmatter.tags}
        path={post.frontmatter.path}
        siteUrl={siteUrl}
        noIndex={post.frontmatter.draft}
      />
      <Menu />
      <main className="blog container" role="main">
        <div className="medium-8 medium-offset-2 large-10 large-offset-1 post">
          <header className="post-head">
            <h1 className="post-title">
              {post.frontmatter.title}
            </h1>
          </header>
          <section className="post-meta">
            <div className="row">
              <div className="medium-4">
                <ul className="list-inline">
                  <li>
                    <GatsbyLink
                      to="/"
                      className="author-avatar"
                      itemProp="name"
                    >
                      <img src={avatarImg} alt="Kostas Bariotis" />
                    </GatsbyLink>
                  </li>
                  <li>
                    <div className="author-name">Kostas Bariotis</div>
                    <time
                      className="post-date"
                      dateTime={dateformat(
                        post.frontmatter.date,
                        'isoDateTime'
                      )}
                    >
                      {dateformat(post.frontmatter.date, 'd mmmm yyyy')}
                    </time>
                  </li>
                </ul>
              </div>
              <div className="medium-8">
                <BulletListTags
                  tags={post.frontmatter.tags}
                  draft={post.frontmatter.draft}
                />
              </div>
            </div>
          </section>
          <Separator />
          <article className="main-post {{post_class}}">
            <section
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <Separator />
            <footer className="post-footer">
              <section className="share text-center">
                {!post.frontmatter.draft
                  ? <ul className="share-buttons list-inline">
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
                        <FacebookShareButton
                          url={fullUrl}
                          className="share-facebook"
                        >
                          <span>Facebook</span>
                        </FacebookShareButton>
                      </li>
                      <li className="link-google-plus">
                        <GooglePlusShareButton
                          url={fullUrl}
                          className="share-google-plus"
                        >
                          <span>Google+</span>
                        </GooglePlusShareButton>
                      </li>
                      <li
                        className="link-reddit"
                        title={post.frontmatter.title}
                      >
                        <RedditShareButton
                          url={fullUrl}
                          className="share-reddit"
                        >
                          <span>Reddit</span>
                        </RedditShareButton>
                      </li>
                    </ul>
                  : <small>
                      This is a draft post, thus sharing is disabled. Please do
                      not share untill is ready for prime time.
                    </small>}
              </section>
            </footer>

            <section className="blog-section">
              <header className="header">
                <h2>Comments</h2>
              </header>
              {isProduction &&
                <ReactDisqusThread
                  shortname="kostasbariotis"
                  identifier={uuidv5(fullUrl, uuidv5.URL)}
                  title={post.frontmatter.title}
                  url={fullUrl}
                />}
            </section>

            <section className="blog-section">
              <header className="header">
                <h2>Read Next</h2>
              </header>
              <NavigateLink post={next} />
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($refPath: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $refPath } }) {
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
