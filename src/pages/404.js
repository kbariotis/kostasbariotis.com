import React from 'react';
import GatsbyLink from 'gatsby-link';
import Helmet from 'react-helmet';

import Separator from './../components/Separator';
import Menu from './../components/Menu';

function tweet() {
  window.open(
    'https://twitter.com/intent/tweet?text=@kbariotis%20I%20found%20a%20missing%20page!%20You%20should%20really%20check%20it.%20🙏',
    'twitter-share',
    'width=550,height=235'
  );
  return false;
}

export default () =>
  <div>
    <Helmet
      title="Not found - Kostas Bariotis"
      meta={[{ name: 'description', content: 'Not found' }]}
      noIndex={true}
    />
    <Menu />
    <section className="blog container about">
      <div className="medium-8 medium-offset-2 large-10 large-offset-1">
        <header className="header">
          <div className="row text-center">
            <h1>AW NO! The page you are trying to access is not here.</h1>
          </div>
        </header>
        <Separator />
        <p className="not-found-section">
          Sorry for the inconvience. You can go to the{' '}
          <GatsbyLink to="/">home page</GatsbyLink> or{' '}
          <a href="#" onClick={tweet}>
            tweet me
          </a>{' '}
          about this incident. Thanks ✌️
        </p>
      </div>
    </section>
  </div>;
