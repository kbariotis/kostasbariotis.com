import React from 'react';
import GatsbyLink from 'gatsby-link';

import { css } from 'glamor';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Variables from './variables';

const footer = css({
  background: Variables.darkpurple,
  color: Variables.lightpurple,
  fontSize: '1em',
  fontFamily: "'Roboto', sans-serif",
  fontWeight: '300',
  padding: '3.25em 0',
});
const footerLink = css({
  marginTop: '2em',
  marginBottom: '2em',
});

const footerLinkSeparator = css({
  color: '#3B4B7D',
  margin: '0 5px',
  fontSize: '0.8em',
});

const footerSocial = css({
  background: Variables.darkerpurple,
  color: Variables.darkpurple,
  fontSize: '0.9em',
});
const footerSocialLink = css({
  color: Variables.lightpurple,
  textDecoration: 'none',
  '&:active,&:hover': {
    color: Variables.lightblue,
  },
});

const footerSocialList = css({
  fontSize: '0.5em',
  textAlign: 'center',
  padding: '0',
});
const footerSocialListLink = css({
  color: Variables.lightblue,
  textDecoration: 'none',
});
const footerSocialListItem = css({
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
});

const footerText = css({
  textAlign: 'center',
  paddingTop: '4em',
});
const Footer = () => (
  <div>
    <footer className={footer}>
      <Grid>
        <Row center="xs">
          <Col md={8} mdOffset={2} lg={10} lgOffset={1}>
            I am{' '}
            <GatsbyLink className={footerLink} to="/" title="Kostasbariotis.com Home">
              Kostas Bariotis
            </GatsbyLink>, a web developer, a proud wanderer and a passionate doer. My mission is to
            write clean and efficient code, to solve problems on the Web and to learn something
            more. Read{' '}
            <GatsbyLink className={footerLink} to="/about" title="About Kostasbariotis.com">
              more about me
            </GatsbyLink>{' '}
            or{' '}
            <GatsbyLink className={footerLink} to="/contact" title="Contact Kostas">
              {' '}
              get in touch{' '}
            </GatsbyLink>.
          </Col>
        </Row>
      </Grid>
    </footer>

    <footer className={footerSocial}>
      <ul className={footerSocialList}>
        <li className={footerSocialListItem}>
          <a
            className={footerSocialListLink}
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/kbariotis"
            title="tweet me"
          >
            <i className="icon-twitter" />
          </a>
        </li>
        <li className={footerSocialListItem}>
          <a
            className={footerSocialListLink}
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/kbariotis"
            title="contribute"
          >
            <i className="icon-github" />
          </a>
        </li>
        <li className={footerSocialListItem}>
          <a
            className={footerSocialListLink}
            rel="noopener noreferrer"
            target="_blank"
            href="https://medium.com/@kbariotis"
            title="medium"
          >
            <i className="icon-medium" />
          </a>
        </li>
        <li className={footerSocialListItem}>
          <a
            className={footerSocialListLink}
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/pub/kostas-bariotis/81/b74/2a8"
            title="linkedin"
          >
            <i className="icon-linkedin" />
          </a>
        </li>
        <li className={footerSocialListItem}>
          <a
            className={footerSocialListLink}
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:konmpar@gmail.com?subject=Hi!"
            title="konmpar@gmail.com"
          >
            <i className="icon-mail" />
          </a>
        </li>
      </ul>
      <div className={footerText}>
        Copyright {new Date().getFullYear()}{' '}
        <GatsbyLink className={footerSocialLink} to="/" title="Kostas Bariotis Blog">
          Kostas Bariotis
        </GatsbyLink>
        <span className={footerLinkSeparator}> • </span> Design by{' '}
        <a
          className={footerSocialLink}
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
