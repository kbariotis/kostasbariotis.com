import React from 'react';
import GatsbyLink from 'gatsby-link';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { Row, Col } from 'react-flexbox-grid';

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

const Pagination = ({ tag, page, pagesSum }) => (
  <nav>
    <Row>
      <Col sm>
        {page === 2 && (
          <GatsbyLink className={newerPostsStyle} to={`/tag/${tag}/`}>
            <span aria-hidden="true">←</span> Newer Posts
          </GatsbyLink>
        )}
        {page > 2 && (
          <GatsbyLink className={newerPostsStyle} to={`/tag/${tag}/page/${page - 1}/`}>
            <span aria-hidden="true">←</span> Newer Posts
          </GatsbyLink>
        )}
      </Col>
      <Col>
        <span className="page-number">{`Page ${page} of ${pagesSum}`}</span>
      </Col>
      <Col sm>
        {page < pagesSum && (
          <GatsbyLink className={olderPostsStyle} to={`/tag/${tag}/page/${page + 1}/`}>
            Older Posts <span aria-hidden="true">→</span>
          </GatsbyLink>
        )}
      </Col>
    </Row>
  </nav>
);

Pagination.propTypes = {
  tag: PropTypes.string,
  page: PropTypes.number,
  pagesSum: PropTypes.number,
};

export default Pagination;
