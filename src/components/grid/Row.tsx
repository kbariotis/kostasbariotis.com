import React from 'react';
import { css } from '@emotion/react';
import type { ReactNode, CSSProperties } from 'react';

interface RowProps {
  children: ReactNode;
  css?: any;
  className?: string;
  start?: boolean;
  center?: boolean;
  end?: boolean;
  around?: boolean;
  between?: boolean;
  middle?: string;
  [key: string]: any;
}

const getRowStyle = (
  start: boolean | undefined,
  center: boolean | undefined,
  end: boolean | undefined,
  around: boolean | undefined,
  between: boolean | undefined
) => {
  let justifyContent = 'flex-start';
  if (start) justifyContent = 'flex-start';
  if (center) justifyContent = 'center';
  if (end) justifyContent = 'flex-end';
  if (around) justifyContent = 'space-around';
  if (between) justifyContent = 'space-between';

  return css({
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '-8px',
    marginRight: '-8px',
    justifyContent,
  });
};

const Row = ({
  children,
  css: customCss,
  className,
  start,
  center,
  end,
  around,
  between,
  ...props
}: RowProps) => {
  const rowStyle = getRowStyle(start, center, end, around, between);
  return (
    <div css={[rowStyle, customCss]} className={className} {...props}>
      {children}
    </div>
  );
};

export default Row;
