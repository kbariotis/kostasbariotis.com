/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import Pagination from '../components/Pagination';
import Posts from '../components/Posts';
import Separator from '../components/Separator';
import Menu from '../components/Menu';
import MetaTags from '../components/MetaTags';

import { Grid, Row, Col } from 'react-flexbox-grid';

const blogContainer = css({
  marginTop: '4em',
  textAlign: 'left',
});

export default function Pages({ pathContext, data }) {
  const { description, siteUrl } = data.site.siteMetadata;
  const { posts, page, pagesSum, prevPath, nextPath } = pathContext;
  return (
    <section className="main-content">
      <MetaTags
        title={`Page ${page}`}
        path={`/page/${page}`}
        siteUrl={siteUrl}
        tags="webdev, programming, javascript"
        description={description}
        noIndex={false}
      />
      <Menu />
      <Grid className={blogContainer}>
        <Row center="xs">
          <Col md={8} mdOffset={2} lg={10} lgOffset={1}>
            <Pagination page={page} pagesSum={pagesSum} prevPath={prevPath} nextPath={nextPath} />
            <Separator />
            <Posts posts={posts} />
            <Separator />
            <Pagination page={page} pagesSum={pagesSum} prevPath={prevPath} nextPath={nextPath} />
          </Col>
        </Row>
      </Grid>
    </section>
  );
}

Pages.propTypes = {
  pathContext: PropTypes.object,
  data: PropTypes.object,
};

export const pagesQuery = graphql`
  query PagesSiteMetadata {
    site {
      siteMetadata {
        description
        siteUrl
      }
    }
  }
`;
