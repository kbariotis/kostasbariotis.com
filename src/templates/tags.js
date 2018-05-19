/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import Posts from '../components/Posts';
import Pagination from '../components/TagsPagination';
import Separator from '../components/Separator';
import MetaTags from '../components/MetaTags';
import RedHeader from '../components/RedHeader';

import { Row, Col } from 'react-flexbox-grid';

const tagMeta = css({
  marginBottom: '2.5em',
});

export default function Tags({ pathContext, data }) {
  const { siteUrl } = data.site.siteMetadata;
  const { posts, tag, pagesSum, page } = pathContext;

  return (
    <Row>
      <MetaTags
        title={`Tag ${tag}`}
        description={`All posts talking about ${tag}`}
        tags={tag}
        siteUrl={siteUrl}
        path={`/tag/${tag}`}
        noIndex={false}
      />
      <Col md={8} mdOffset={2} lg={10} lgOffset={1}>
        <RedHeader>{tag}</RedHeader>
        <section className={tagMeta}>A {posts.length} posts collection</section>
        <Pagination page={page} pagesSum={pagesSum} tag={tag} />
        <Separator />
        <Posts posts={posts} />
        <Separator />
        <Pagination page={page} pagesSum={pagesSum} tag={tag} />
      </Col>
    </Row>
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
