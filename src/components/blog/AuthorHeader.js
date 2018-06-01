import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import GatsbyLink from 'gatsby-link';

const AuthorHeader = ({ sizes, children, author }) => (
  <div
    css={{
      display: 'block',
      marginBottom: '4em',
    }}
  >
    <GatsbyLink
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
        sizes={sizes}
      />
    </GatsbyLink>
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
      dangerouslySetInnerHTML={{ __html: children }}
    />
  </div>
);

AuthorHeader.propTypes = {
  sizes: PropTypes.object,
  author: PropTypes.string,
  children: PropTypes.string,
};

export default AuthorHeader;
