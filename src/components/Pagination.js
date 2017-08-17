import React from 'react';
import GatsbyLink from 'gatsby-link';

const Pagination = ({ prevPath, nextPath, page, pagesSum }) =>
  <header className="header extra-pagination inner text-center">
    <nav className="pagination" role="navigation">
      {prevPath &&
        <GatsbyLink className="newer-posts" to={prevPath}>
          <span aria-hidden="true">←</span> Newer Posts
        </GatsbyLink>}
      <span className="page-number">{`Page ${page} of ${pagesSum}`}</span>
      {nextPath &&
        <GatsbyLink className="older-posts" to={nextPath}>
          Older Posts <span aria-hidden="true">→</span>
        </GatsbyLink>}
    </nav>
  </header>;

export default Pagination;
