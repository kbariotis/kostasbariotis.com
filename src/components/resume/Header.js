import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const textCenterStyle = css({
  textAlign: 'center',
});

const subTitleStyle = css({
  color: '#8ab2ff',
  fontSize: '1.5em',
});

export default function Header({ title, subtitle }) {
  return (
    <section>
      <div className={textCenterStyle}>
        <h1>{title}</h1>
        <div className={subTitleStyle}>{subtitle}</div>
      </div>
      <hr />
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
