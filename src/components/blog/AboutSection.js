import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from '../grid';
import Variables from './variables';

const AboutSection = ({ title, children }) => (
  <Row
    css={{
      marginTop: '2em',
      marginBottom: '2em',
    }}
  >
    <Col
      md={2}
      css={{
        color: Variables.red,
        fontWeight: '700',
      }}
    >
      {title}
    </Col>
    <Col md={10}>{children}</Col>
  </Row>
);

AboutSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array,
};

export default AboutSection;
