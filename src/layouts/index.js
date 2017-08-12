import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import '../scss/boot.scss';
// import 'bootstrap-sass/assets/javascripts/bootstrap/collapse.js';

import Footer from '../components/Footer';

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func,
  };

  render() {
    const { location } = this.props;

    const isRoot = location.pathname === '/';

    return (
      <div>
        <Helmet
          title="Kostas Bariotis"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" /> {/* this is valid react-helmet usage! */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="HandheldFriendly" content="True" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href={`${__PATH_PREFIX__}/favicon/apple-touch-icon-57x57.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href={`${__PATH_PREFIX__}/favicon/apple-touch-icon-60x60.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href={`${__PATH_PREFIX__}/favicon/apple-touch-icon-72x72.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={`${__PATH_PREFIX__}/favicon/apple-touch-icon-76x76.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href={`${__PATH_PREFIX__}/favicon/apple-touch-icon-114x114.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={`${__PATH_PREFIX__}/favicon/apple-touch-icon-120x120.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={`${__PATH_PREFIX__}/favicon/apple-touch-icon-144x144.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={`${__PATH_PREFIX__}/favicon/apple-touch-icon-152x152.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${__PATH_PREFIX__}/favicon/apple-touch-icon-180x180.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${__PATH_PREFIX__}/favicon/favicon-36x36.png`}
            sizes="36x36"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${__PATH_PREFIX__}/favicon/android-chrome-192x192.png`}
            sizes="192x192"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${__PATH_PREFIX__}/favicon/favicon-96x96.png`}
            sizes="96x96"
          />
          <link
            rel="manifest"
            href={`${__PATH_PREFIX__}/favicon/manifest.json`}
          />

          <link rel="icon" href={`${__PATH_PREFIX__}/favicon/favicon.ico`} type="image/x-icon" />

          <meta name="msapplication-TileColor" content="#603cba" />
          <meta
            name="msapplication-TileImage"
            content={`${__PATH_PREFIX__}/favicon/mstile-144x144.png`}
          />
          <meta property="og:site_name" content="Kostas Bariotis" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Kostas Bariotis" />
          <meta
            property="og:description"
            content="I&#x27;m Kostas Bariotis, a web developer, a proud wanderer and a passionate doer. My mission is to write clean and efficient code, to solve problems on the web and to learn something more."
          />
          <meta property="og:url" content="http://kostasbariotis.com/" />
          <meta
            property="og:image"
            content={`${__PATH_PREFIX__}/images/header_index.jpg`}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kostas Bariotis" />
          <meta
            name="twitter:description"
            content="I&#x27;m Kostas Bariotis, a web developer, a proud wanderer and a passionate doer. My mission is to write clean and efficient code, to solve problems on the web and to learn something more."
          />
          <meta name="twitter:url" content="http://kostasbariotis.com/" />
          <meta
            name="twitter:image"
            content={`${__PATH_PREFIX__}/images/header_index.jpg`}
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Kostas Bariotis"
            href="http://kostasbariotis.com/rss/"
          />
        </Helmet>
        <section className="main-content">
          {this.props.children()}
        </section>
        <Footer />
      </div>
    );
  }
}
