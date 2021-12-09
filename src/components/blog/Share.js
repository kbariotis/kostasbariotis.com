import React from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton, TwitterShareButton, RedditShareButton } from 'react-share';

import { Row, Col } from 'react-flexbox-grid';

const shareButtonsListItem = {
  marginLeft: '5px',
  marginRight: '5px',
  '@media (max-width: 768px)': {
    width: '100%',
  },
};
const shareTwitterButton = {
  color: '#00aced',
  cursor: 'pointer',
  '@media (max-width: 768px)': {
    backgroundColor: '#00aced',
    color: '#fff',
    padding: '0.25em',
    width: '100%',
    display: 'block',
  },
};
const shareRedditButton = {
  cursor: 'pointer',
  color: '#ff5700',
  '@media (max-width: 768px)': {
    backgroundColor: '#ff5700',
    color: '#fff',
    padding: '0.25em',
    width: '100%',
    display: 'block',
  },
};
const shareFacebookButton = {
  color: '#3b5998',
  cursor: 'pointer',
  '@media (max-width: 768px)': {
    backgroundColor: '#3b5998',
    color: '#fff',
    padding: '0.25em',
    width: '100%',
    display: 'block',
  },
};

const Share = ({ draft, title, fullUrl }) => (
  <div>
    {!draft ? (
      <Row center="sm">
        <Col css={shareButtonsListItem}>
          <b>Share this post on:</b>
        </Col>
        <Col css={shareButtonsListItem}>
          <TwitterShareButton url={fullUrl} title={title} via="kbariotis">
            <span css={shareTwitterButton}>Twitter</span>
          </TwitterShareButton>
        </Col>
        <Col css={shareButtonsListItem}>
          <FacebookShareButton url={fullUrl}>
            <span css={shareFacebookButton}>Facebook</span>
          </FacebookShareButton>
        </Col>
        <Col css={shareButtonsListItem}>
          <RedditShareButton title={title} url={fullUrl}>
            <span css={shareRedditButton}>Reddit</span>
          </RedditShareButton>
        </Col>
      </Row>
    ) : (
      <small>
        This is a draft post, thus sharing is disabled. Please do not share untill is ready for
        prime time.
      </small>
    )}
  </div>
);

Share.propTypes = {
  draft: PropTypes.bool,
  title: PropTypes.string,
  fullUrl: PropTypes.string,
};

export default Share;
