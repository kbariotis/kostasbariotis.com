import React from 'react';
import PropTypes from 'prop-types';

export default function ExperienceItem({ title, description, duration }) {
  return (
    <div>
      <h3>{title}</h3>
      <h4>{duration}</h4>
      <p>{description}</p>
    </div>
  );
}

ExperienceItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.string,
};
