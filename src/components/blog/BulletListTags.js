import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Variables from "./variables";

const tagsContainerStyle = css({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  gap: "5px",
  alignItems: "center",
});

const tagsItemStyle = css({
  fontSize: "0.8em",
  border: `2px solid ${Variables.lightblue}`,
  textAlign: "center",
  borderRadius: "100px / 100px",
  "&:hover": {
    background: Variables.lightblue,
    "& a": {
      color: Variables.darkpurple,
    },
  },
});

const tagsItemLink = css({
  color: Variables.lightblue,
  display: "block",
  padding: "2px 20px",
  height: "30px",
  lineHeight: "27px",
  textDecoration: "none",
  "&:active": {
    textDecoration: "none",
  },
  "&:hover": {
    textDecoration: "none",
  },
});

const tagsDraftItemStyle = css({
  border: `2px solid ${Variables.red}`,
  "& a": {
    color: Variables.red,
  },
  "&:hover": {
    background: Variables.red,
    "& a": {
      color: "white",
    },
  },
});

const BulletListTags = ({ tags, draft }) => (
  <div css={tagsContainerStyle}>
    {tags &&
      tags.split(", ").map((tag, index) => (
        <div key={index} css={tagsItemStyle}>
          <Link css={tagsItemLink} to={`/tag/${tag}`}>
            {tag}
          </Link>
        </div>
      ))}
    {draft && (
      <div css={[tagsItemStyle, tagsDraftItemStyle]}>
        <Link css={tagsItemLink} to={`/drafts`}>
          Draft
        </Link>
      </div>
    )}
  </div>
);

BulletListTags.propTypes = {
  tags: PropTypes.string,
  draft: PropTypes.bool,
};

export default BulletListTags;
