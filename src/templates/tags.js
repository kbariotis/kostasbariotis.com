/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import Posts from '../components/Posts';
import Menu from '../components/Menu';
import Pagination from '../components/TagsPagination';
import Separator from '../components/Separator';
import MetaTags from '../components/MetaTags';
import Variables from '../components/variables';

import { Grid, Row, Col } from 'react-flexbox-grid';

const tagTitle = css({
  color: Variables.red,
});
const tagMeta = css({
  marginBottom: '2.5em',
});

const blogContainer = css({
  marginTop: '4em',
  textAlign: 'left',
});
export default function Tags({ pathContext, data }) {
  const { siteUrl } = data.site.siteMetadata;
  const { posts, tag, pagesSum, page } = pathContext;

  return (
    <section className="main-content">
      <MetaTags
        title={`Tag ${tag}`}
        description={`All posts talking about ${tag}`}
        tags={tag}
        siteUrl={siteUrl}
        path={`/tag/${tag}`}
        noIndex={false}
      />
      <Menu />
      <Grid className={blogContainer}>
        <Row>
          <Col md={8} mdOffset={2} lg={10} lgOffset={1}>
            <header className="header">
              <h1 className={tagTitle}>{tag}</h1>
            </header>
            <section className={tagMeta}>A {posts.length} posts collection</section>
            <Pagination page={page} pagesSum={pagesSum} tag={tag} />
            <Separator />
            <Posts posts={posts} />
            <Separator />
            <Pagination page={page} pagesSum={pagesSum} tag={tag} />
          </Col>
        </Row>
      </Grid>
    </section>
  );
}

Tags.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object,
};

export const tagsQuery = graphql`
  query TagsSiteMetadata {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
