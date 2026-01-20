import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const getColStyle = (xs, sm, md, lg, xl, xsOffset, smOffset, mdOffset, lgOffset, xlOffset) => {
  const getWidth = (size) => {
    if (!size) return '100%';
    if (size === 12) return '100%';
    return `${(size / 12) * 100}%`;
  };

  const getOffset = (size) => {
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
}) => {
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

Col.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xsOffset: PropTypes.number,
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,
  xlOffset: PropTypes.number,
  children: PropTypes.node,
  css: PropTypes.object,
  className: PropTypes.string,
};

export default Col;
