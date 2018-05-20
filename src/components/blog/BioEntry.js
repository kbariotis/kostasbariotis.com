import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { Row, Col } from 'react-flexbox-grid';
import Variables from './variables';

const row = css({
  marginBottom: '1em',
});
const bioDate = css({
  color: Variables.lightblue,
});

const BioEntry = ({ year, children }) => (
  <Row className={row.toString()}>
    <Col md={2} className={bioDate.toString()}>
      {year}
    </Col>
    <Col md={10}>{children}</Col>
  </Row>
);

BioEntry.propTypes = {
  year: PropTypes.string,
  children: PropTypes.string,
};

export default BioEntry;
