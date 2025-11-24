import React from "react";
import PropTypes from "prop-types";

export default function ExperienceItem({
  title,
  description,
  duration,
  bullets,
}) {
  return (
    <div style={{ paddingBottom: "1rem" }}>
      <h4>{title}</h4>
      <h5>{duration}</h5>
      <p style={{ marginBottom: "0.5rem" }}>{description}</p>
      {bullets && (
        <ul style={{ paddingBottom: 0, marginBottom: 0 }}>
          {bullets.map((bullet, index) => (
            <li style={{ marginBottom: "0.3rem" }} key={index}>
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ExperienceItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.string,
};
