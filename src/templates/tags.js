import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Row, Col } from 'react-flexbox-grid';

import IndexLayout from '../components/layouts/Index';
import Posts from '../components/blog/Posts';
import Pagination from '../components/blog/TagsPagination';
import Separator from '../components/blog/Separator';
import MetaTags from '../components/blog/MetaTags';
import RedHeader from '../components/blog/RedHeader';

const tagMeta = css({
  marginBottom: '2.5em',
});

export default function Tags({ pageContext, location }) {
  const { posts, tag, pagesSum, page } = pageContext;

  return (
    <IndexLayout location={location}>
      <Row>
        <MetaTags
          title={`Tag ${tag}`}
          description={`All posts talking about ${tag}`}
          tags={tag}
          path={`/tag/${tag}`}
        />
        <Col lg={8} lgOffset={2}>
          <RedHeader>{tag}</RedHeader>
          <section className={tagMeta}>A {posts.length} posts collection</section>
          <Pagination page={page} pagesSum={pagesSum} tag={tag} />
          <Separator />
          <Posts posts={posts} />
          <Separator />
          <Pagination page={page} pagesSum={pagesSum} tag={tag} />
        </Col>
      </Row>
    </IndexLayout>
  );
}

Tags.propTypes = {
  location: PropTypes.object,
  pageContext: PropTypes.object,
};
