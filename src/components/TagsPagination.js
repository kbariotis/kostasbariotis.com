import React from 'react';
import GatsbyLink from 'gatsby-link';
import PropTypes from 'prop-types';

const Pagination = ({ tag, page, pagesSum }) =>
  <header className="header extra-pagination inner text-center">
    <nav className="pagination" role="navigation">
      {page === 2 &&
        <GatsbyLink className="newer-posts" to={`/tag/${tag}/`}>
          <span aria-hidden="true">←</span> Newer Posts
        </GatsbyLink>}
      {page > 2 &&
        <GatsbyLink
          className="newer-posts"
          to={`/tag/${tag}/page/${page - 1}/`}
        >
          <span aria-hidden="true">←</span> Newer Posts
        </GatsbyLink>}
      <span className="page-number">{`Page ${page} of ${pagesSum}`}</span>
      {page < pagesSum &&
        <GatsbyLink
          className="older-posts"
          to={`/tag/${tag}/page/${page + 1}/`}
        >
          Older Posts <span aria-hidden="true">→</span>
        </GatsbyLink>}
    </nav>
  </header>;

Pagination.propTypes = {
  tags: PropTypes.string,
  page: PropTypes.number,
  pagesSum: PropTypes.number,
};

export default Pagination;
