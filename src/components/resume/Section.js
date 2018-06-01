import React from 'react';
import PropTypes from 'prop-types';

export default function Sectino({ title, children }) {
  return (
    <section>
      <h2
        css={{
          color: '#8ab2ff',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

Sectino.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
};
