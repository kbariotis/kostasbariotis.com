import React from 'react';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  css?: any;
  className?: string;
  [key: string]: any;
}

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

const Grid = ({ children, css: customCss, className, ...props }: GridProps) => (
  <div css={[gridStyle, customCss]} className={className} {...props}>
    {children}
  </div>
);

export default Grid;
