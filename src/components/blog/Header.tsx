import React from 'react';
import Img from 'gatsby-image';
import type { FC, ReactNode } from 'react';

import { rhythm } from '../../typography';
import { Row, Col } from '../grid';
import Separator from './Separator';
import Variables from './variables';

interface HeaderProps {
  fluid?: any;
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ fluid, children }) => (
  <Row center="xs">
    <Col
      css={{
        textAlign: 'center',
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
                display: 'inline-block',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                border: '4px solid #fff',
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

export default Header;
