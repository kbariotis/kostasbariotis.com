import React from 'react';
import PropTypes from 'prop-types';

export default function ExperienceItem({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

ExperienceItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
