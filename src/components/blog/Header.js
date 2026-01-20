import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

import { rhythm } from "../../typography";
import { Row, Col } from "../grid";
import Separator from "./Separator";
import Variables from "./variables";

const Header = ({ fluid, children }) => (
  <Row center="xs">
    <Col
      css={{
        textAlign: "center",
      }}
    >
      <header
        css={{
          color: Variables.red,
        }}
      >
        <Row center="xs">
          <Col>
            <Img
              fluid={fluid}
              css={{
                display: "inline-block",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                border: "4px solid #fff",
                marginBottom: rhythm(1),
              }}
            />
            <h1>{children}</h1>
          </Col>
        </Row>
      </header>
      <Separator />
    </Col>
  </Row>
);

Header.propTypes = {
  fluid: PropTypes.object,
  children: PropTypes.string,
};

export default Header;
