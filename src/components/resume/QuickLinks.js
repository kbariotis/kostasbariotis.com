import React from "react";
import { Row, Col } from "../grid";

const headerItem = {
  paddingRight: "10px",
  paddingLeft: "10px",
};

export default function QuickLinks() {
  return (
    <Row>
      <Col css={headerItem}>
        <b>Site:</b>{" "}
        <a href="https://kostasbariotis.com">https://kostasbariotis.com</a>
      </Col>
      <Col css={headerItem}>
        <b>Email:</b>{" "}
        <a href="mailto:kostas@bariotis.com">kostas@bariotis.com</a>
      </Col>
    </Row>
  );
}
