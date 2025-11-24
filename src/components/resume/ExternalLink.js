import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";

const noPrintStyle = css({
  "@media print": {
    display: "none",
  },
});

export default function ExternalLink({ title, url }) {
  return (
    <a rel="noopener noreferrer" target="_blank" href={url}>
      {title} <span className={noPrintStyle}>&#x2197;</span>
    </a>
  );
}

ExternalLink.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
};
