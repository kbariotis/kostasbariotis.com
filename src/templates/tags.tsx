import React from 'react';
import { css } from '@emotion/react';
import type { FC } from 'react';

import IndexLayout from '../components/layouts/Index';
import Posts from '../components/blog/Posts';
import Pagination from '../components/blog/TagsPagination';
import Separator from '../components/blog/Separator';
import MetaTags from '../components/blog/MetaTags';
import RedHeader from '../components/blog/RedHeader';
import type { GatsbyPageProps, BasePageData, Frontmatter } from '../types';

interface TagsPageContext {
  tag: string;
  posts: Array<{
    excerpt: string;
    html: string;
    id: string;
    timeToRead: number;
    frontmatter: Frontmatter;
  }>;
  pagesSum: number;
  page: number;
}

const tagMeta = css({
  marginBottom: '2.5em',
});

const Tags: FC<GatsbyPageProps<any, TagsPageContext>> = ({ pageContext, location }) => {
  const { posts, tag, pagesSum, page } = pageContext;

  return (
    <IndexLayout location={location}>
      <MetaTags
        title={`Tag ${tag}`}
        description={`All posts talking about ${tag}`}
        tags={tag}
        path={`/tag/${tag}`}
      />
      <RedHeader>{tag}</RedHeader>
      <section className={tagMeta}>A {posts.length} posts collection</section>
      <Pagination page={page} pagesSum={pagesSum} tag={tag} />
      <Separator />
      <Posts posts={posts} />
      <Separator />
      <Pagination page={page} pagesSum={pagesSum} tag={tag} />
    </IndexLayout>
  );
};

export default Tags;
