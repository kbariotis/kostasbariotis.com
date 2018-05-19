import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const sectionTitle = css({
  color: '#8ab2ff',
  textTransform: 'uppercase',
});

export default function Sectino({ title, children }) {
  return (
    <section>
      <h2 className={sectionTitle}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

Sectino.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
};
