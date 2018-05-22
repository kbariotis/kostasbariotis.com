import React from 'react';
import GatsbyLink from 'gatsby-link';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { Row, Col } from 'react-flexbox-grid';

import Variables from './variables';

const tagsItemStyle = css({
  fontSize: '0.8em',
  margin: '5px 5px',
  border: `2px solid ${Variables.lightblue}`,
  textAlign: 'center',
  borderRadius: '100px / 100px',
  '&:hover': {
    background: Variables.lightblue,
    a: {
      color: Variables.darkpurple,
    },
  },
});

const tagsItemLink = css({
  color: Variables.lightblue,
  display: 'block',
  width: 'auto',
  height: '30px',
  lineHeight: '27px',
  padding: '2px 20px',
  'a:hover,a:active': {
    textDecoration: 'none',
  },
});

const tagsDraftItemStyle = css({
  borderColor: Variables.red,
});

const tagsDraftItemLink = css({
  color: Variables.red,
  '&:hover': {
    background: Variables.red,
    a: {
      color: 'white',
    },
  },
});

const BulletListTags = ({ tags, draft }) => (
  <Row end="md">
    {tags &&
      tags.split(', ').map((tag, index) => (
        <Col key={index} className={tagsItemStyle.toString()}>
          <GatsbyLink className={tagsItemLink} to={`/tag/${tag}`}>
            {tag}
          </GatsbyLink>
        </Col>
      ))}
    {draft && (
      <Col className={`${tagsDraftItemStyle.toString()} ${tagsItemStyle.toString()}`}>
        <GatsbyLink className={tagsDraftItemLink} to={`/drafts`}>
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
