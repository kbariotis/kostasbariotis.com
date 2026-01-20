import React from 'react';
import { graphql } from 'gatsby';
import type { FC } from 'react';

import IndexLayout from '../components/layouts/Index';
import Pagination from '../components/blog/Pagination';
import Posts from '../components/blog/Posts';
import Separator from '../components/blog/Separator';
import MetaTags from '../components/blog/MetaTags';
import type { GatsbyPageProps, BasePageData, MarkdownRemarkConnection } from '../types';

interface PaginationPageContext {
  posts: Array<{
    excerpt: string;
    html: string;
    id: string;
    timeToRead: number;
    frontmatter: {
      date: string;
      path: string;
      tags?: string;
      title: string;
      draft: boolean;
    };
  }>;
  page: number;
  pagesSum: number;
  prevPath?: string;
  nextPath?: string;
}

interface PaginationPageData extends BasePageData {
  allMarkdownRemark: MarkdownRemarkConnection;
}

const Pages: FC<GatsbyPageProps<PaginationPageData, PaginationPageContext>> = ({
  pageContext,
  data,
  location,
}) => {
  const { description } = data.site.siteMetadata;
  const { posts, page, pagesSum, prevPath, nextPath } = pageContext;

  return (
    <IndexLayout location={location}>
      <section className="main-content">
        <MetaTags
          title={`Page ${page}`}
          path={`/page/${page}`}
          tags="webdev, programming, javascript"
          description={description}
        />
        <Pagination page={page} pagesSum={pagesSum} prevPath={prevPath} nextPath={nextPath} />
        <Separator />
        <Posts posts={posts} />
        <Separator />
        <Pagination page={page} pagesSum={pagesSum} prevPath={prevPath} nextPath={nextPath} />
      </section>
    </IndexLayout>
  );
};

export default Pages;

export const pagesQuery = graphql`
  query PagesSiteMetadata {
    site {
      siteMetadata {
        description
      }
    }
  }
`;
