import React from 'react';
import { Link } from 'gatsby';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaMedium from 'react-icons/lib/fa/medium';
import FaLinkedIn from 'react-icons/lib/fa/linkedin';
import FaGitHub from 'react-icons/lib/fa/github';
import FaEnvelope from 'react-icons/lib/fa/envelope';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Variables from './variables';

const footer = {
  background: Variables.darkpurple,
  color: Variables.lightpurple,
  fontSize: '1em',
  fontFamily: "'Roboto', sans-serif",
  fontWeight: '300',
  padding: '3.25em 0',
};
const footerLink = {
  marginTop: '2em',
  marginBottom: '2em',
};

const footerLinkSeparator = {
  color: '#3B4B7D',
  margin: '0 5px',
  fontSize: '0.8em',
};

const footerSocial = {
  background: Variables.darkerpurple,
  color: Variables.darkpurple,
  fontSize: '0.9em',
  paddingTop: '4em',
};
const footerSocialLink = {
  color: Variables.lightpurple,
  textDecoration: 'none',
  '&:active,&:hover': {
    color: Variables.lightblue,
  },
};

const footerSocialList = {
  fontSize: '0.5em',
  textAlign: 'center',
  padding: '0',
};
const footerSocialListLink = {
  color: Variables.lightblue,
  textDecoration: 'none',
};
const footerSocialListItem = {
  display: 'inline-block',
  width: '2em',
  height: '2em',
  fontSize: '3em',
  textAlign: 'center',
  lineHeight: '2em',
  borderRadius: '50%',
  margin: '0.5em',
  transition: 'all .1s ease',
  '&:hover,&:focus': {
    backgroundColor: Variables.darkpurple,
    transform: 'rotate(360deg)',
    a: {
      textDecoration: 'none',
    },
  },
};

const footerText = {
  textAlign: 'center',
  paddingBottom: '4em',
};
const Footer = () => (
  <div>
    <footer css={footer}>
      <Grid>
        <Row center="xs">
          <Col>
            I am{' '}
            <Link css={footerLink} to="/" title="Kostasbariotis.com Home">
              Kostas Bariotis
            </Link>, a web developer, a proud wanderer and a passionate doer. My mission is to write
            clean and efficient code, to solve problems on the Web and to learn something more. Read{' '}
            <Link css={footerLink} to="/about/" title="About Kostasbariotis.com">
              more about me
            </Link>{' '}
            or{' '}
            <Link css={footerLink} to="/contact/" title="Contact Kostas">
              {' '}
              get in touch{' '}
            </Link>.
          </Col>
        </Row>
      </Grid>
    </footer>

    <footer css={footerSocial}>
      <ul css={footerSocialList}>
        <li css={footerSocialListItem}>
          <a
            css={footerSocialListLink}
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/kbariotis"
            title="tweet me"
          >
            <FaTwitter />
          </a>
        </li>
        <li css={footerSocialListItem}>
          <a
            css={footerSocialListLink}
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/kbariotis"
            title="contribute"
          >
            <FaGitHub />
          </a>
        </li>
        <li css={footerSocialListItem}>
          <a
            css={footerSocialListLink}
            rel="noopener noreferrer"
            target="_blank"
            href="https://medium.com/@kbariotis"
            title="medium"
          >
            <FaMedium />
          </a>
        </li>
        <li css={footerSocialListItem}>
          <a
            css={footerSocialListLink}
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/pub/kostas-bariotis/81/b74/2a8"
            title="linkedin"
          >
            <FaLinkedIn />
          </a>
        </li>
        <li css={footerSocialListItem}>
          <a
            css={footerSocialListLink}
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:konmpar@gmail.com?subject=Hi!"
            title="konmpar@gmail.com"
          >
            <FaEnvelope />
          </a>
        </li>
      </ul>
      <div css={footerText}>
        Copyright {new Date().getFullYear()}{' '}
        <Link css={footerSocialLink} to="/" title="Kostas Bariotis Blog">
          Kostas Bariotis
        </Link>
        <span css={footerLinkSeparator}> • </span> Design by{' '}
        <a
          css={footerSocialLink}
          rel="noopener noreferrer"
          href="http://www.attheo.do"
          target="_blank"
        >
          Thanos Theodoridis
        </a>
      </div>
    </footer>
  </div>
);

export default Footer;
