import React from "react"
import GatsbyLink from 'gatsby-link';

const Pagination = ({page, pagesSum}) => (
  <header className="header extra-pagination inner text-center">
    <nav className="pagination" role="navigation">
      {page > 0 && (<GatsbyLink className="newer-posts" to={`/page/${page - 1}/`}><span aria-hidden="true">←</span> Newer Posts</GatsbyLink>)}
      <span className="page-number">{`Page ${page} of ${pagesSum}`}</span>
      {page < pagesSum && (<GatsbyLink className="older-posts" to={`/page/${page + 1}/`}>Older Posts <span aria-hidden="true">→</span></GatsbyLink>)}
    </nav>
  </header>
)

export default Pagination
