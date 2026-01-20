import React from "react";
import { parse } from "url";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { css } from "emotion";
import { Global } from "@emotion/react";
import { Grid, Row, Col } from "../grid";
import { graphql, StaticQuery } from "gatsby";

import Footer from "../blog/Footer";
import Variables from "../blog/variables";
import Menu from "../blog/Menu";

import "./fonts.css";

const globalStyles = css`
  body,
  html {
    font-weight: 300;
    font-style: normal;
    font-smoothing: 'antialiased',
    text-rendering: 'optimizeLegibility',
    word-wrap: 'break-word',
    hyphens: 'auto',
  }
  html.subset-fonts-enabled {
    font-family: 'Roboto Subset', sans-serif;
  }
  html.fonts-enabled {
    font-family: 'Roboto', sans-serif;
  }
  html.subset-fonts-enabled h1,
  html.subset-fonts-enabled h2,
  html.subset-fonts-enabled h3,
  html.subset-fonts-enabled h4,
  html.subset-fonts-enabled h5,
  html.subset-fonts-enabled h6 {
    font-family: 'Roboto Slab Subset', sans-serif;
  }
  html.fonts-enabled h1,
  html.fonts-enabled h2,
  html.fonts-enabled h3,
  html.fonts-enabled h4,
  html.fonts-enabled h5,
  html.fonts-enabled h6 {
    font-family: 'Roboto Slab', sans-serif;
  }
`;

const containerStyle = css({
  color: "rgba(255,255,255,0.8)",
  backgroundColor: Variables.background,
  background: Variables.background,
  backgroundSize: "100% 300px",
  filter:
    "progid:DXImageTransform.Microsoft.gradient(startColorstr='#007db9e8', endColorstr='#221931', GradientType=0)",
  backgroundRepeat: "no-repeat",
  "& a": {
    color: Variables.lightblue,
    "&:hover": {
      color: Variables.red,
    },
    "&:active": {
      color: Variables.red,
    },
  },
  "@media (max-width: 767px)": {
    backgroundSize: "1400px 300px",
    backgroundPosition: "center top",
  },
  "& blockquote": {
    color: "rgba(255, 255, 255, 0.5)",
    borderLeft: `5px solid ${Variables.purple}`,
    paddingLeft: "20px",
    marginLeft: 0,
    fontSize: "2em",
    fontStyle: "italic",
  },
});

const blogContainer = css({
  textAlign: "left",
  paddingTop: "4em",
  marginBottom: "4em",
});

export default function IndexLayout({ children, canonical, location }) {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          file(relativePath: { eq: "header.jpg" }) {
            childImageSharp {
              fixed(width: 1400) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          site {
            siteMetadata {
              title
              siteUrl
              description
              author
            }
          }
        }
      `}
      render={(data) => {
        let { description, title, siteUrl } = data.site.siteMetadata;
        let { src } = data.file.childImageSharp.fixed;

        const backgroundImageStyle = css(containerStyle, {
          backgroundImage: `linear-gradient(to bottom, rgba(125, 185, 232, 0) 0%, rgba(34, 25, 49, 1) 100%), url('${src}')`,
        });

        const parsedPageUrl = parse(
          canonical
            ? canonical
            : `${siteUrl.replace(/\/$/, ``)}${
                (location && location.pathname) || "/"
              }`,
        );
        const pageUrl = `${parsedPageUrl.protocol}//${parsedPageUrl.host}${parsedPageUrl.pathname}`;

        return (
          <>
            <Global styles={globalStyles} />
            <div css={backgroundImageStyle}>
              <Menu />
              <Helmet titleTemplate={`%s - ${title}`} defaultTitle={title}>
                <link
                  rel="preload"
                  href="/fonts/Roboto_Subset/Roboto-Light-subset.ttf"
                  as="font"
                  crossOrigin="anonymous"
                />
                <link
                  rel="preload"
                  href="/fonts/Roboto_Slab_Subset/RobotoSlab-Regular-subset.ttf"
                  as="font"
                  crossOrigin="anonymous"
                />
                <link
                  rel="canonical"
                  key={pageUrl}
                  href={pageUrl}
                  data-baseprotocol={parsedPageUrl.protocol}
                  data-basehost={parsedPageUrl.host}
                />
                <meta name="description" content={description} />
                <html lang="en" />
                <meta charSet="utf-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="HandheldFriendly" content="True" />
                <meta
                  name="google-site-verification"
                  content="2cN-EmJ2d00_gaP6eUs43tdcXd1UL965Rs_UBQc0Oec"
                />
              </Helmet>
              <Grid css={blogContainer}>
                <Row>
                  <Col md={12}>{children}</Col>
                </Row>
              </Grid>
              <Footer />
            </div>
          </>
        );
      }}
    />
  );
}

IndexLayout.propTypes = {
  children: PropTypes.func,
  canonical: PropTypes.string,
  location: PropTypes.object,
};
