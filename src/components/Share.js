import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { ShareButtons } from 'react-share';

import { Row, Col } from 'react-flexbox-grid';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  RedditShareButton,
} = ShareButtons;

const shareButtonsListItem = css({
  '@media (max-width: 768px)': {
    display: 'block',
    lineHeight: '2em',
  },
});
const shareTwitterButton = css({
  color: '#00aced',
  '@media (max-width: 768px)': {
    backgroundColor: '#00aced',
    color: '#fff',
    padding: '0.25em',
    width: '100%',
    display: 'block',
  },
});
const shareRedditButton = css({
  color: '#ff5700',
  '@media (max-width: 768px)': {
    backgroundColor: '#ff5700',
    color: '#fff',
    padding: '0.25em',
    width: '100%',
    display: 'block',
  },
});
const shareFacebookButton = css({
  color: '#3b5998',
  '@media (max-width: 768px)': {
    backgroundColor: '#3b5998',
    color: '#fff',
    padding: '0.25em',
    width: '100%',
    display: 'block',
  },
});
const shareGooglePlusButton = css({
  color: '#dd4b39',
  '@media (max-width: 768px)': {
    backgroundColor: '#dd4b39',
    color: '#fff',
    padding: '0.25em',
    width: '100%',
    display: 'block',
  },
});

const Share = ({ draft, title, fullUrl }) => (
  <section className="share text-center">
    {!draft ? (
      <Row>
        <Col>
          <b>Share this post on</b>
        </Col>
        <Col className={shareButtonsListItem}>
          <TwitterShareButton
            url={fullUrl}
            title={title}
            via="kbariotis"
            className={shareTwitterButton}
          >
            <span>Twitter</span>
          </TwitterShareButton>
        </Col>
        <Col className={shareButtonsListItem}>
          <FacebookShareButton url={fullUrl} className={shareFacebookButton}>
            <span>Facebook</span>
          </FacebookShareButton>
        </Col>
        <Col className={shareButtonsListItem}>
          <GooglePlusShareButton url={fullUrl} className={shareGooglePlusButton}>
            <span>Google+</span>
          </GooglePlusShareButton>
        </Col>
        <Col className={shareButtonsListItem}>
          <RedditShareButton title={title} url={fullUrl} className={shareRedditButton}>
            <span>Reddit</span>
          </RedditShareButton>
        </Col>
      </Row>
    ) : (
      <small>
        This is a draft post, thus sharing is disabled. Please do not share untill is ready for
        prime time.
      </small>
    )}
  </section>
);

Share.propTypes = {
  draft: PropTypes.boolean,
  title: PropTypes.string,
  fullUrl: PropTypes.string,
};

export default Share;
