import React from "react";
import PropTypes from "prop-types";
import dateformat from "dateformat";
import { graphql, Link } from "gatsby";
import { DiscussionEmbed } from "disqus-react";
import { v5 as uuidv5 } from "uuid";
import Img from "gatsby-image";
import { css } from "emotion";
import { Row, Col } from "../components/grid";
import "prismjs/themes/prism-tomorrow.css";

import IndexLayout from "../components/layouts/Index";
import Share from "../components/blog/Share";
import Post from "../components/blog/Post";
import BulletListTags from "../components/blog/BulletListTags";
import Separator from "../components/blog/Separator";
import MetaTags from "../components/blog/MetaTags";
import Variables from "../components/blog/variables";
import ArticleSchema from "../components/blog/schemas/ArticleSchema";

const postTitle = css({
  color: Variables.red,
  fontSize: "2.6em",
  fontWeight: 700,
  "@media(max-width: 768px)": {
    textAlign: "left",
  },
});

const authorAvatar = css({
  display: "inline-block",
  width: "100%",
  maxWidth: "100px",
});

const authorAvatarImg = css({
  borderRadius: "50%",
  border: "3px solid white",
});

const authorName = css({
  fontSize: "1.3em",
});

const postFooter = css({
  paddingTop: "2em",
  paddingBottom: "2em",
  fontSize: "1.2em",
});
const blogSection = css({
  marginTop: "2.5em",
});

const blogSectionHeader = css({
  marginBottom: "1.25em",
});

const postMetaStyle = css({
  color: "white",
});

const mainPostStyle = css({
  marginTop: "2.5em",
  color: "rgba(255, 255, 255, 0.8)",
  "& img": {
    maxWidth: "100%",
    display: "block",
    margin: "0 auto",
  },
  "& h1": {
    color: Variables.lightblue,
  },
  "& h2": {
    color: Variables.lightblue,
  },
  "& h3": {
    color: Variables.lightblue,
  },
  "& h4": {
    color: Variables.lightblue,
  },
  "& h5": {
    color: Variables.lightblue,
  },
  "& h6": {
    color: Variables.lightblue,
  },
  "& code": {
    background: "#2d2d2d",
    color: "#FF9619",
    borderRadius: "4px",
  },
  "& .anchor": {
    color: "white",
    fill: "currentColor",
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
  "& .gatsby-resp-image-wrapper": {
    zIndex: "1 !important",
  },
});

export default function Template({ data, location }) {
  const { mainPost: post } = data;
  const { nextPost: next } = data;
  const { siteUrl } = data.site.siteMetadata;

  const isProduction = process.env.NODE_ENV === "production";
  const fullUrl = `${siteUrl}${post.frontmatter.path}`;

  return (
    <IndexLayout canonical={post.frontmatter.canonical} location={location}>
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
        noIndex={post.frontmatter.draft}
      />
      <header className="post-head">
        <h1 className={postTitle}>{post.frontmatter.title}</h1>
      </header>
      <section className={postMetaStyle}>
        <Row middle="xs">
          <Col md={6}>
            <Row middle="xs">
              <Col md={4}>
                <Link to="/" className={authorAvatar} itemProp="name">
                  <Img
                    fluid={data.file.childImageSharp.fluid}
                    className={authorAvatarImg}
                  />
                </Link>
              </Col>
              <Col md={8}>
                <div className={authorName}>Kostas Bariotis</div>
                {!post.frontmatter.draft && (
                  <time
                    dateTime={dateformat(post.frontmatter.date, "isoDateTime")}
                  >
                    {dateformat(post.frontmatter.date, "d mmmm yyyy")}
                  </time>
                )}
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <BulletListTags
              tags={post.frontmatter.tags}
              draft={post.frontmatter.draft}
            />
          </Col>
        </Row>
      </section>
      <Separator />
      <article className={mainPostStyle}>
        <section
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
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
            <DiscussionEmbed
              shortname="kostasbariotis"
              config={{
                identifier: uuidv5(
                  fullUrl,
                  "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
                ),
                title: post.frontmatter.title,
                url: fullUrl,
              }}
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
    </IndexLayout>
  );
}

Template.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  pageContext: PropTypes.object,
};

export const pageQuery = graphql`
  query BlogPostByPath($mainPostPath: String!, $nextPostPath: String!) {
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
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
        canonical
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
