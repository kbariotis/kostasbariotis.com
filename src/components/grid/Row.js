import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

const rowStyle = css({
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "-8px",
  marginRight: "-8px",
});

const Row = ({ children, css: customCss, ...props }) => (
  <div css={[rowStyle, customCss]} {...props}>
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node,
  css: PropTypes.object,
};

export default Row;
