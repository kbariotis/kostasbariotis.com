import React from 'react';
import type { ReactNode } from 'react';

import { Row, Col } from '../grid';
import Variables from './variables';

interface AboutSectionProps {
  title: string;
  children: ReactNode;
}

const AboutSection = ({ title, children }: AboutSectionProps) => (
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

export default AboutSection;
