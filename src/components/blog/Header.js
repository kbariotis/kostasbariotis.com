import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { css } from 'glamor';

import { Row, Col } from 'react-flexbox-grid';
import Separator from './Separator';
import Variables from './variables';

const headerStyles = css({
  color: Variables.red,
});
const headerAvatarStyles = css({
  display: 'inline-block',
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  border: '4px solid #fff',
});

const columnStyles = css({
  textAlign: 'center',
});

const Header = ({ sizes, children }) => (
  <Row center="xs">
    <Col xs={8} classNames={`${columnStyles}`}>
      <header className={`${headerStyles}`}>
        <Row center="xs">
          <Col>
            <Img sizes={sizes} className={`${headerAvatarStyles}`} />
            <h1>{children}</h1>
          </Col>
        </Row>
      </header>
      <Separator />
    </Col>
  </Row>
);

Header.propTypes = {
  sizes: PropTypes.object,
  children: PropTypes.object,
};

export default Header;
