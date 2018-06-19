import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

import Variables from './variables';

const tagsItemStyle = {
  fontSize: '0.8em',
  margin: '5px 5px',
  border: `2px solid ${Variables.lightblue}`,
  textAlign: 'center',
  borderRadius: '100px / 100px',
  '&:hover': {
    background: Variables.lightblue,
    '& a': {
      color: Variables.darkpurple,
    },
  },
};

const tagsItemLink = {
  color: Variables.lightblue,
  display: 'block',
  width: 'auto',
  height: '30px',
  lineHeight: '27px',
  padding: '2px 20px',
  'a:active': {
    textDecoration: 'none',
  },
  'a:hover': {
    textDecoration: 'none',
  },
};

const tagsDraftItemStyle = Object.assign({}, tagsItemStyle, {
  border: `2px solid ${Variables.red}`,
  '& a': {
    color: Variables.red,
  },
  '&:hover': {
    background: Variables.red,
    '& a': {
      color: 'white',
    },
  },
});

const BulletListTags = ({ tags, draft }) => (
  <Row end="md">
    {tags &&
      tags.split(', ').map((tag, index) => (
        <Col key={index} css={tagsItemStyle}>
          <Link css={tagsItemLink} to={`/tag/${tag}`}>
            {tag}
          </Link>
        </Col>
      ))}
    {draft && (
      <Col css={tagsDraftItemStyle}>
        <Link css={tagsItemLink} to={`/drafts`}>
          Draft
        </Link>
      </Col>
    )}
  </Row>
);

BulletListTags.propTypes = {
  tags: PropTypes.string,
  draft: PropTypes.bool,
};

export default BulletListTags;
