import React from "react";
import PropTypes from "prop-types";

export default function Header({ title, subtitle, summary }) {
  return (
    <section>
      <div>
        <h1>{title}</h1>
        <div
          css={{
            color: "#8ab2ff",
            fontSize: "1.3rem",
          }}
        >
          {subtitle}
        </div>
        <div
          css={{
            color: "rgba(138, 178, 255, 0.7)",
            fontSize: "1.1rem",
            paddingTop: "0.3rem",
            paddingBottom: "0.5rem",
          }}
        >
          {summary}
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
