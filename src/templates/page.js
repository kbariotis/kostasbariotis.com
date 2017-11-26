import React from 'react';
import GatsbyLink from 'gatsby-link';

import Pagination from '../components/Pagination';
import Posts from '../components/Posts';
import Separator from '../components/Separator';
import Menu from '../components/Menu';
import MetaTags from '../components/MetaTags';

export default function Pages({ pathContext, data }) {
  const { title, description, siteUrl } = data.site.siteMetadata;
  const { posts, page, pagesSum, prevPath, nextPath } = pathContext;
  return (
    <section className="main-content">
      <MetaTags
        title={`Page ${page} - ${title}`}
        path={`/page/${page}`}
        siteUrl={siteUrl}
        tags="webdev, programming, javascript"
        description={description}
      />
      <Menu />
      <section className="blog container">
        <div className="medium-8 medium-offset-2 large-10 large-offset-1">
          <div className="posts">
            <Pagination
              page={page}
              pagesSum={pagesSum}
              prevPath={prevPath}
              nextPath={nextPath}
            />
            <Separator />
            <Posts posts={posts} />
            <Separator />
            <Pagination
              page={page}
              pagesSum={pagesSum}
              prevPath={prevPath}
              nextPath={nextPath}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export const pagesQuery = graphql`
  query PagesSiteMetadata {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
