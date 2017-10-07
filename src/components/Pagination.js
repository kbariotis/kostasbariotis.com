import React from 'react';
import GatsbyLink from 'gatsby-link';
import PropTypes from 'prop-types';

const Pagination = ({ prevPath, nextPath, page, pagesSum }) =>
  <header className="header extra-pagination inner text-center">
    <nav className="pagination" role="navigation">
      {prevPath ?
        <GatsbyLink className="newer-posts" to={prevPath}>
          <span aria-hidden="true">←</span> Newer Posts
        </GatsbyLink> : <div className="newer-posts">No more pages</div>}
      <span className="page-number">{`Page ${page} of ${pagesSum}`}</span>
      {nextPath ?
        <GatsbyLink className="older-posts" to={nextPath}>
          Older Posts <span aria-hidden="true">→</span>
        </GatsbyLink> : <div className="older-posts">No more pages</div>}
    </nav>
  </header>;

Pagination.propTypes = {
  prevPath: PropTypes.string,
  nextPath: PropTypes.string,
  page: PropTypes.number,
  pagesSum: PropTypes.number,
};

export default Pagination;
