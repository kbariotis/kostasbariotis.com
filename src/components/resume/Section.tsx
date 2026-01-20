import React from "react";
import PropTypes from "prop-types";

export default function Section({ title, children }) {
  return (
    <section>
      <h3
        css={{
          color: "#8ab2ff",
          textTransform: "uppercase",
          paddingBottom: "1rem",
          marginBottom: "0",
        }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
};
