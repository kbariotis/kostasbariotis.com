import React from 'react';
import GatsbyLink from 'gatsby-link';

import Link from '../components/Link';
import Posts from '../components/Posts';
import Menu from '../components/Menu';
import Pagination from '../components/TagsPagination';
import Separator from '../components/Separator';
import MetaTags from '../components/MetaTags';

export default function Tags({ pathContext }) {
  const { posts, tag, pagesSum, page } = pathContext;

  return (
    <section className="main-content">
      <MetaTags
        title={`${tag} - Kostas Bariotis`}
        description={`All posts about ${tag}`}
        tags={tag}
        path={`/tag/${tag}`}
      />
      <Menu />
      <section className="blog container tags-collection">
        <div className="medium-8 medium-offset-2">
          <header className="header">
            <h1 className="tag-title tag-page-title">
              {tag}
            </h1>
          </header>
          <section className="tag-meta">
            A {posts.length} posts collection
          </section>

          <div className="posts">
            <Pagination page={page} pagesSum={pagesSum} tag={tag} />
            <Separator />
            <Posts posts={posts} />
            <Separator />
            <Pagination page={page} pagesSum={pagesSum} tag={tag} />
          </div>
        </div>
      </section>
    </section>
  );
}
