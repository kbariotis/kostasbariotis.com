import React from 'react';
import GatsbyLink from 'gatsby-link';

const Footer = () =>
  <div>
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="medium-8 medium-offset-2 large-10 large-offset-1 text-center">
            I'm{' '}
            <GatsbyLink
              className="footer-link"
              to="/"
              title="Kostasbariotis.com Home"
            >
              Kostas Bariotis
            </GatsbyLink>, a web developer, a proud wanderer and a passionate
            doer. My mission is to write clean and efficient code, to solve
            problems on the Web and to learn something more. Read{' '}
            <GatsbyLink
              className="footer-link"
              to="/about"
              title="About Kostasbariotis.com"
            >
              more about me
            </GatsbyLink>{' '}
            or <GatsbyLink
              className="footer-link"
              to="/contact"
              title="Contact Kostas"
            >
            get in touch
            </GatsbyLink>.
          </div>
        </div>
      </div>
    </footer>

    <footer className="footer-social">
      <ul className="social">
        <li>
          <a
            target="_blank"
            href="https://twitter.com/kbariotis"
            title="tweet me"
          >
            <i className="icon-twitter" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://github.com/kbariotis"
            title="contribute"
          >
            <i className="icon-github" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://medium.com/@kbariotis"
            title="medium"
          >
            <i className="icon-medium" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.linkedin.com/pub/kostas-bariotis/81/b74/2a8"
            title="linkedin"
          >
            <i className="icon-linkedin" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="mailto:konmpar@gmail.com?subject=Hi!"
            title="konmpar@gmail.com"
          >
            <i className="icon-mail" />
          </a>
        </li>
      </ul>
      <div className="text-center">
        Copyright {new Date().getFullYear()}{' '}
        <GatsbyLink to="/" title="Kostas Bariotis Blog">
          Kostas Bariotis
        </GatsbyLink>{' '}
        <span className="separator"> • </span> Design by{' '}
        <a href="http://www.attheo.do" target="_blank">
          Thanos Theodoridis
        </a>
      </div>
    </footer>
  </div>;

export default Footer;
