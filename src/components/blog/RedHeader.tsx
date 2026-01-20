import React from 'react';
import type { ReactNode } from 'react';

import Variables from './variables';

interface RedHeaderProps {
  children: ReactNode;
}

const RedHeader = ({ children }: RedHeaderProps) => (
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

export default RedHeader;
