import React from 'react';
import Img from 'gatsby-image';
import { graphql, StaticQuery, Link } from 'gatsby';

const AuthorHeader = () => (
  <StaticQuery
    query={graphql`
      query AuthorHeaderQuery {
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
            author
          }
        }
      }
    `}
    render={data => {
      let { description, author } = data.site.siteMetadata;
      return (
        <div
          css={{
            display: 'block',
            marginBottom: '4em',
            color: 'white',
          }}
        >
          <Link
            to="/"
            css={{
              fontSize: '1.5em',
              height: 'auto',
              padding: '10px 15px',
              float: 'left',
              '@media(max-width: 1200px)': {
                height: '7.5em',
              },
              '@media(max-width: 768px)': {
                float: 'none',
              },
            }}
            itemProp="name"
          >
            <Img
              css={{
                width: '100px',
                borderRadius: '50%',
                border: '4px solid #fff',
                marginRight: '25px',
                '@media(max-width: 768px)': {
                  margin: '0 auto',
                },
              }}
              alt={author}
              fluid={data.file.childImageSharp.fluid}
            />
          </Link>
          <h1
            css={{
              marginBottom: '0.3em',
            }}
          >
            {author}
          </h1>
          <p
            css={{
              fontSize: '1.1em',
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      );
    }}
  />
);

export default AuthorHeader;
