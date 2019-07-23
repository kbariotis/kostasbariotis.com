import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const style = css({
  '& a': {
    textDecoration: 'none',
  },
  '& a:hover': {
    textDecoration: 'underline',
  },
  '@media print': {
    '& a': {
      color: 'grey',
      position: 'relative',
    },
    '& a[href^="http"]::after': {
      position: 'absolute',
      color: '#8ab2ff',
      top: 0,
      left: '110%',
      content: '" (" attr(href) ") "',
      fontSize: '0.8em',
      fontWeight: 'normal',
    },
  },
});

const noPrintStyle = css({
  '@media print': {
    display: 'none',
  },
});

export default function ExternalLink({ title, url }) {
  return (
    <div className={style}>
      <a rel="noopener noreferrer" target="_blank" href={url}>
        {title} <span className={noPrintStyle}>&#x2197;</span>
      </a>
    </div>
  );
}

ExternalLink.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
};
