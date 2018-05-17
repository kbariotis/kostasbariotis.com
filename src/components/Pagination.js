import React from 'react';
import GatsbyLink from 'gatsby-link';
import PropTypes from 'prop-types';

import { css } from 'glamor';

const newerPostsStyle = css({
  float: 'left',
  fontSize: '0.8em',
  '@media(max-width: 768px)': {
    display: 'block',
    float: 'none',
    marginBottom: '1em',
  },
});
const olderPostsStyle = css({
  float: 'right',
  fontSize: '0.8em',
  '@media(max-width: 768px)': {
    display: 'block',
    float: 'none',
    marginTop: '1em',
  },
});

const Pagination = ({ prevPath, nextPath, page, pagesSum }) => (
  <header className="header extra-pagination inner text-center">
    <nav className="pagination" role="navigation">
      {prevPath ? (
        <GatsbyLink className={newerPostsStyle} to={prevPath}>
          <span aria-hidden="true">←</span> Newer Posts
        </GatsbyLink>
      ) : (
        <div className={newerPostsStyle}>No more pages</div>
      )}
      <span className="page-number">{`Page ${page} of ${pagesSum}`}</span>
      {nextPath ? (
        <GatsbyLink className={olderPostsStyle} to={nextPath}>
          Older Posts <span aria-hidden="true">→</span>
        </GatsbyLink>
      ) : (
        <div className={olderPostsStyle}>No more pages</div>
      )}
    </nav>
  </header>
);

Pagination.propTypes = {
  prevPath: PropTypes.string,
  nextPath: PropTypes.string,
  page: PropTypes.number,
  pagesSum: PropTypes.number,
};

export default Pagination;
