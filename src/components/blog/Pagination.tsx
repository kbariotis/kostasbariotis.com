import React from 'react';
import { Link } from 'gatsby';
import { Row, Col } from '../grid';

interface PaginationProps {
  prevPath?: string;
  nextPath?: string;
  page: number;
  pagesSum: number;
}

const newerPostsStyle = {
  float: 'left',
  '@media(max-width: 768px)': {
    display: 'block',
    float: 'none',
    marginBottom: '1em',
  },
};
const olderPostsStyle = {
  float: 'right',
  '@media(max-width: 768px)': {
    display: 'block',
    float: 'none',
    marginTop: '1em',
  },
};

const Pagination = ({ prevPath, nextPath, page, pagesSum }: PaginationProps) => (
  <nav role="navigation">
    <Row>
      <Col sm>
        {prevPath ? (
          <Link css={newerPostsStyle} to={prevPath}>
            <span aria-hidden="true">←</span> Newer Posts
          </Link>
        ) : (
          <div css={newerPostsStyle}>No more pages</div>
        )}
      </Col>
      <Col>
        <span>{`Page ${page} of ${pagesSum}`}</span>
      </Col>
      <Col sm>
        {nextPath ? (
          <Link css={olderPostsStyle} to={nextPath}>
            Older Posts <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <div css={olderPostsStyle}>No more pages</div>
        )}
      </Col>
    </Row>
  </nav>
);

export default Pagination;
