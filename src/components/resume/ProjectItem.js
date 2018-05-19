import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

export default function ProjectItem({ title, url, description }) {
  return (
    <Row>
      <Col md={3}>
        <b>
          {title}
          <a href={url}>&#x2197;</a>
        </b>
      </Col>
      <Col md>
        <p>{description}</p>
      </Col>
    </Row>
  );
}

ProjectItem.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
};
