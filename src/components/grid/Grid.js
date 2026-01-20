import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

const gridStyle = css({
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "-8px",
  marginRight: "-8px",
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
