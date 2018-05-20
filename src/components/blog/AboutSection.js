import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { Row, Col } from 'react-flexbox-grid';
import Variables from './variables';

const aboutSectionTitle = css({
  color: Variables.red,
  fontWeight: '700',
});
const aboutSection = css({
  marginTop: '2em',
  marginBottom: '2em',
});

const AboutSection = ({ title, children }) => (
  <Row className={aboutSection.toString()}>
    <Col md={2} className={aboutSectionTitle.toString()}>
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
