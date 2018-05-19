import React from 'react';
import { css } from 'glamor';
import { Row, Col } from 'react-flexbox-grid';

const headerItem = css({
  paddingRight: '10px',
  paddingLeft: '10px',
});

export default function QuickLinks() {
  return (
    <Row center="xs">
      <Col className={headerItem.toString()}>
        <b>Site:</b> <a href="https://kostasbariotis.com">https://kostasbariotis.com</a>
      </Col>
      <Col className={headerItem.toString()}>
        <b>Email:</b> <a href="mailto:konmpar@gmail.com">konmpar@gmail.com</a>
      </Col>
      <Col className={headerItem.toString()}>
        <b>Skype:</b> <a href="skype:konstantinos.mpariotis">konstantinos.mpariotis</a>
      </Col>
    </Row>
  );
}
