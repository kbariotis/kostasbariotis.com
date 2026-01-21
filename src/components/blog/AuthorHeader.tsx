import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, StaticQuery, Link } from 'gatsby';

const AuthorHeader = () => (
  <StaticQuery
    query={graphql`
      query AuthorHeaderQuery {
        file(relativePath: { eq: "avatar.jpg" }) {
          childImageSharp {
            gatsbyImageData
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
    render={(data) => {
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
            {data.file?.childImageSharp?.gatsbyImageData && (
              <GatsbyImage
                image={data.file.childImageSharp.gatsbyImageData}
                alt={author}
                css={{
                  width: '100px',
                  borderRadius: '50%',
                  border: '4px solid #fff',
                  marginRight: '25px',
                  '@media(max-width: 768px)': {
                    margin: '0 auto',
                  },
                }}
              />
            )}
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
