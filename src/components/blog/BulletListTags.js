import React from 'react';
import GatsbyLink from 'gatsby-link';
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
          <GatsbyLink css={tagsItemLink} to={`/tag/${tag}`}>
            {tag}
          </GatsbyLink>
        </Col>
      ))}
    {draft && (
      <Col css={tagsDraftItemStyle}>
        <GatsbyLink css={tagsItemLink} to={`/drafts`}>
          Draft
        </GatsbyLink>
      </Col>
    )}
  </Row>
);

BulletListTags.propTypes = {
  tags: PropTypes.string,
  draft: PropTypes.bool,
};

export default BulletListTags;
