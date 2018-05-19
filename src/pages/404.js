import React from 'react';
import GatsbyLink from 'gatsby-link';
import Helmet from 'react-helmet';
import { css } from 'glamor';
import { Grid, Row, Col } from 'react-flexbox-grid';

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
    <div>
      <Helmet
        title="Not found - Kostas Bariotis"
        meta={[{ name: 'description', content: 'Not found' }]}
        noIndex={true}
      />
      <Grid>
        <Row>
          <Col md={8} mdOffset={2} lg={10} lgOffset={1} xs="center">
            <RedHeader>AW NO! The page you are trying to access is not here.</RedHeader>
            <Separator />
            <p className={notFoundSection}>
              Sorry for the inconvience. You can go to the <GatsbyLink to="/">home page</GatsbyLink>{' '}
              or{' '}
              <a href="#" onClick={tweet}>
                tweet me
              </a>{' '}
              about this incident. Thanks ✌️
            </p>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
