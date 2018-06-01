import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ title, subtitle }) {
  return (
    <section>
      <div
        css={{
          textAlign: 'center',
        }}
      >
        <h1>{title}</h1>
        <div
          css={{
            color: '#8ab2ff',
            fontSize: '1.5em',
          }}
        >
          {subtitle}
        </div>
      </div>
      <hr />
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
