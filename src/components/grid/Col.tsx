import React from 'react';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';

interface ColProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xsOffset?: number;
  smOffset?: number;
  mdOffset?: number;
  lgOffset?: number;
  xlOffset?: number;
  children: ReactNode;
  css?: any;
  className?: string;
  [key: string]: any;
}

const getColStyle = (
  xs: number | undefined,
  sm: number | undefined,
  md: number | undefined,
  lg: number | undefined,
  xl: number | undefined,
  xsOffset: number | undefined,
  smOffset: number | undefined,
  mdOffset: number | undefined,
  lgOffset: number | undefined,
  xlOffset: number | undefined
) => {
  const getWidth = (size: number | undefined) => {
    if (!size) return '100%';
    if (size === 12) return '100%';
    return `${(size / 12) * 100}%`;
  };

  const getOffset = (size: number | undefined) => {
    if (!size) return 0;
    return `${(size / 12) * 100}%`;
  };

  return css({
    paddingLeft: '8px',
    paddingRight: '8px',
    flexGrow: 0,
    flexShrink: 0,
    width: getWidth(md),
    marginLeft: getOffset(mdOffset),
    '@media(max-width: 600px)': {
      width: getWidth(xs),
      marginLeft: getOffset(xsOffset),
    },
    '@media(min-width: 601px) and (max-width: 960px)': {
      width: getWidth(sm || md),
      marginLeft: getOffset(smOffset || mdOffset),
    },
    '@media(min-width: 961px) and (max-width: 1264px)': {
      width: getWidth(lg || md),
      marginLeft: getOffset(lgOffset || mdOffset),
    },
    '@media(min-width: 1265px)': {
      width: getWidth(xl || lg || md),
      marginLeft: getOffset(xlOffset || lgOffset || mdOffset),
    },
  });
};

const Col = ({
  xs,
  sm,
  md,
  lg,
  xl,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  xlOffset,
  children,
  css: customCss,
  className,
  ...props
}: ColProps) => {
  const colStyle = getColStyle(
    xs,
    sm,
    md,
    lg,
    xl,
    xsOffset,
    smOffset,
    mdOffset,
    lgOffset,
    xlOffset
  );
  return (
    <div css={[colStyle, customCss]} className={className} {...props}>
      {children}
    </div>
  );
};

export default Col;
