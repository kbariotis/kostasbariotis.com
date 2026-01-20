import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

const gridStyle = css({
  boxSizing: "border-box",
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "8px",
  paddingRight: "8px",
  maxWidth: "780px",
});

const Grid = ({ children, css: customCss, ...props }) => (
  <div css={[gridStyle, customCss]} {...props}>
    {children}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node,
  css: PropTypes.object,
};

export default Grid;
