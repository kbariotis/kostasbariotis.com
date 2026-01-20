import React from 'react';
import type { ReactNode } from 'react';

import { Row, Col } from '../grid';
import Variables from './variables';

interface BioEntryProps {
  year: string;
  children: ReactNode;
}

const BioEntry = ({ year, children }: BioEntryProps) => (
  <Row
    css={{
      marginBottom: '1em',
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

export default BioEntry;
