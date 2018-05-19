import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import Variables from './variables';

const header = css({
  color: Variables.red,
  fontSize: '1.5em',
  fontWeight: '700',
});

const RedHeader = ({ children }) => <header className={header}>{children}</header>;

RedHeader.propTypes = {
  children: PropTypes.string.isRequired,
};

export default RedHeader;
