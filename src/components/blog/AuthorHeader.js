import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { css } from 'glamor';
import GatsbyLink from 'gatsby-link';

const blogHeader = css({
  display: 'block',
});

const blogHeaderLink = css({
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
});

const blogHeaderImg = css({
  width: '100px',
  borderRadius: '50%',
  border: '4px solid #fff',
  marginRight: '25px',
  '@media(max-width: 768px)': {
    margin: '0 auto',
  },
});

const headerDescriptionStyles = css({
  // fontSize: '1.2em',
});

const AuthorHeader = ({ sizes, children, author }) => (
  <div className={blogHeader}>
    <GatsbyLink to="/" className={blogHeaderLink} itemProp="name">
      <Img className={`header-avatar ${blogHeaderImg}`} alt={author} sizes={sizes} />
    </GatsbyLink>
    <h1>{author}</h1>
    <p className={headerDescriptionStyles} dangerouslySetInnerHTML={{ __html: children }} />
  </div>
);

AuthorHeader.propTypes = {
  sizes: PropTypes.object,
  author: PropTypes.string,
  children: PropTypes.string,
};

export default AuthorHeader;
