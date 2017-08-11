import React from 'react';
import Helmet from 'react-helmet';
import dateformat from "dateformat";
import GatsbyLink from 'gatsby-link';
import Menu from '../components/Menu';

import {
  ShareButtons
} from "react-share";
import ReactDisqusThread from 'react-disqus-thread';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
} = ShareButtons;

const avatarImg = require("./../assets/images/avatar.jpg");

export default function Template({ data, pathContext }) {
  const { markdownRemark: post } = data;
  const { next, prev } = pathContext;
  return (
    <div>
      <Helmet title={`Gatsby Blog - ${post.frontmatter.title}`} />
      <Menu/>
      <main className="blog container" role="main">
        <div className="medium-8 medium-offset-2">
          <header className="header post-head ">
            <h1 className="post-title">{post.frontmatter.title}</h1>
          </header>
          <section className="post-meta">
            <div className="row">
              <div className="large-4">
                <ul className="list-inline">
                  <li>
                    <GatsbyLink to="/" className="author-avatar" itemProp="name">
                      <img src={avatarImg} alt="Kostas Bariotis" />
                    </GatsbyLink>
                  </li>
                  <li>
                    <div className="author-name">
                      Kostas Bariotis
                    </div>
                    <time className="post-date" dateTime={dateformat(post.frontmatter.date, 'isoDateTime')}>{dateformat(post.frontmatter.date, 'd mmmm yyyy')}</time>
                  </li>
                </ul>
              </div>
              <div className="large-8">
                <ul className="tags list-inline text-right">
                  {post.frontmatter.tags && post.frontmatter.tags.split(', ').map(tag => (<li><a href={`/tag/${tag}`}>{tag}</a></li>))}
                </ul>
              </div>
            </div>
          </section>
          <div className="separator">
            <div className="first-level">
              <div className="second-level">
                <div className="third-level"></div>
              </div>
            </div>
          </div>
          <article className="main-post {{post_class}}">
            <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }}>
            </section>
            <div className="separator">
              <div className="first-level">
                <div className="second-level">
                  <div className="third-level"></div>
                </div>
              </div>
            </div>
            <footer className="post-footer">
              <section className="share text-center">
                <ul className="share-buttons list-inline">
                  <li>
                    <b>Share this post on</b>
                  </li>
                  {/* <li className="link-twitter">
                    <TwitterShareButton url={window.location.href} title={post.frontmatter.title} via="kbariotis" className="share-twitter">
                      <span>Twitter</span>
                    </TwitterShareButton>
                  </li>
                  <li className="link-facebook">
                    <FacebookShareButton url={window.location.href} title={post.frontmatter.title} description={post.excerpt} className="share-facebook">
                      <span>Facebook</span>
                    </FacebookShareButton>
                  </li>
                  <li className="link-google-plus">
                    <GooglePlusShareButton url={window.location.href} className="share-google-plus">
                      <span>Google+</span>
                    </GooglePlusShareButton>
                  </li>
                  <li className="link-reddit" title={post.frontmatter.title}>
                    <RedditShareButton url={window.location.href} className="share-reddit">
                      <span>Reddit</span>
                    </RedditShareButton>
                  </li> */}
                </ul>
              </section>
            </footer>

            {/* <div className="navigation">
              {prev &&
                <GatsbyLink className="link prev" to={prev.frontmatter.path}>
                  <BackIcon /> {prev.frontmatter.title}
                </GatsbyLink>}
              {next &&
                <GatsbyLink className="link next" to={next.frontmatter.path}>
                  {next.frontmatter.title} <ForwardIcon />
                </GatsbyLink>}
            </div> */}

            <header className="header">
              <h2>Comments</h2>
            </header>
            <ReactDisqusThread shortname="kostasbariotis" />
          </article>
        </div>
      </main>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
      }
    }
  }
`;
