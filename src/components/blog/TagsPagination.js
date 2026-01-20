import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import { Row, Col } from "../grid";

const newerPostsStyle = {
  float: "left",
  "@media(max-width: 768px)": {
    display: "block",
    float: "none",
    marginBottom: "1em",
  },
};
const olderPostsStyle = {
  float: "right",
  "@media(max-width: 768px)": {
    display: "block",
    float: "none",
    marginTop: "1em",
  },
};

const Pagination = ({ tag, page, pagesSum }) => (
  <nav>
    <Row>
      <Col sm>
        {page === 2 && (
          <Link css={newerPostsStyle} to={`/tag/${tag}/`}>
            <span aria-hidden="true">←</span> Newer Posts
          </Link>
        )}
        {page > 2 && (
          <Link css={newerPostsStyle} to={`/tag/${tag}/page/${page - 1}/`}>
            <span aria-hidden="true">←</span> Newer Posts
          </Link>
        )}
      </Col>
      <Col>
        <span>{`Page ${page} of ${pagesSum}`}</span>
      </Col>
      <Col sm>
        {page < pagesSum && (
          <Link css={olderPostsStyle} to={`/tag/${tag}/page/${page + 1}/`}>
            Older Posts <span aria-hidden="true">→</span>
          </Link>
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
