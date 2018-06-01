import React from 'react';
import PropTypes from 'prop-types';

import Variables from './variables';

const RedHeader = ({ children }) => (
  <header
    css={{
      color: Variables.red,
      fontSize: '1.5em',
      fontWeight: '700',
    }}
  >
    {children}
  </header>
);

RedHeader.propTypes = {
  children: PropTypes.string.isRequired,
};

export default RedHeader;
