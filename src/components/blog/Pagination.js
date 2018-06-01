import React from 'react';
import GatsbyLink from 'gatsby-link';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

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

const Pagination = ({ prevPath, nextPath, page, pagesSum }) => (
  <nav role="navigation">
    <Row>
      <Col sm>
        {prevPath ? (
          <GatsbyLink css={newerPostsStyle} to={prevPath}>
            <span aria-hidden="true">←</span> Newer Posts
          </GatsbyLink>
        ) : (
          <div css={newerPostsStyle}>No more pages</div>
        )}
      </Col>
      <Col>
        <span>{`Page ${page} of ${pagesSum}`}</span>
      </Col>
      <Col sm>
        {nextPath ? (
          <GatsbyLink css={olderPostsStyle} to={nextPath}>
            Older Posts <span aria-hidden="true">→</span>
          </GatsbyLink>
        ) : (
          <div css={olderPostsStyle}>No more pages</div>
        )}
      </Col>
    </Row>
  </nav>
);

Pagination.propTypes = {
  prevPath: PropTypes.string,
  nextPath: PropTypes.string,
  page: PropTypes.number,
  pagesSum: PropTypes.number,
};

export default Pagination;
