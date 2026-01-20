import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "../grid";
import Variables from "./variables";

const BioEntry = ({ year, children }) => (
  <Row
    css={{
      marginBottom: "1em",
    }}
  >
    <Col
      md={2}
      css={{
        color: Variables.lightblue,
      }}
    >
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
