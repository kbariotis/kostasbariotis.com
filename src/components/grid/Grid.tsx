import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const gridStyle = css({
  boxSizing: 'border-box',
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '8px',
  paddingRight: '8px',
  maxWidth: '780px',
});

const Grid = ({ children, css: customCss, className, ...props }) => (
  <div css={[gridStyle, customCss]} className={className} {...props}>
    {children}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node,
  css: PropTypes.object,
  className: PropTypes.string,
};

export default Grid;
