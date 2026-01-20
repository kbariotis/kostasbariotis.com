import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import { css } from '@emotion/react';

import IndexLayout from '../components/layouts/Index';
import Separator from '../components/blog/Separator';
import RedHeader from '../components/blog/RedHeader';

const notFoundSection = css({
  marginTop: '2.50em',
});

function tweet() {
  window.open(
    'https://twitter.com/intent/tweet?text=@kbariotis%20I%20found%20a%20missing%20page!%20You%20should%20really%20check%20it.%20🙏',
    'twitter-share',
    'width=550,height=235'
  );
  return false;
}

export default function NotFound() {
  return (
    <IndexLayout>
      <Helmet
        title="Not found - Kostas Bariotis"
        meta={[{ name: 'description', content: 'Not found' }]}
        noIndex={true}
      />
      <RedHeader>AW NO! The page you are trying to access is not here.</RedHeader>
      <Separator />
      <p className={notFoundSection}>
        Sorry for the inconvience. You can go to the <Link to="/">home page</Link> or{' '}
        <a href="#" onClick={tweet}>
          tweet me
        </a>{' '}
        about this incident. Thanks ✌️
      </p>
    </IndexLayout>
  );
}
