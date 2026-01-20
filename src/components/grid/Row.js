import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const getRowStyle = (start, center, end, around, between) => {
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
}) => {
  const rowStyle = getRowStyle(start, center, end, around, between);
  return (
    <div css={[rowStyle, customCss]} className={className} {...props}>
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node,
  css: PropTypes.object,
  className: PropTypes.string,
  start: PropTypes.bool,
  center: PropTypes.bool,
  end: PropTypes.bool,
  around: PropTypes.bool,
  between: PropTypes.bool,
};

export default Row;
