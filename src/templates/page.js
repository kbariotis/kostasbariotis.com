import React from 'react';
import GatsbyLink from 'gatsby-link';

import Link from '../components/Link';
import Pagination from '../components/Pagination';
import Posts from '../components/Posts';
import Separator from '../components/Separator';
import MenuWithLogo from '../components/MenuWithLogo';
import MetaTags from '../components/MetaTags';

export default function Pages({ pathContext }) {
  const { posts, page, pagesSum } = pathContext;
  return (
    <section className="main-content">
      <MetaTags
        title="Kostas Bariotis"
        path={`/page/${page}`}
        tags="webdev, programming, javascript"
        description="I'm Kostas Bariotis, a web developer, a proud wanderer and a passionate doer. My mission is to write clean and efficient code, to solve problems on the web and to learn something more."
      />
      <MenuWithLogo />
      <section className="blog container">
        <div className="medium-8 medium-offset-2">
          <div className="posts">
            <Pagination page={page} pagesSum={pagesSum} />
            <Separator />
            <Posts posts={posts} />
            <Separator />
            <Pagination page={page} pagesSum={pagesSum} />
          </div>
        </div>
      </section>
    </section>
  );
}
