/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { Row, Col } from 'react-flexbox-grid';

import Posts from '../components/blog/Posts';
import Pagination from '../components/blog/TagsPagination';
import Separator from '../components/blog/Separator';
import MetaTags from '../components/blog/MetaTags';
import RedHeader from '../components/blog/RedHeader';

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
