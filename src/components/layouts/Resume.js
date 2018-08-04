import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import { css } from 'react-emotion';

const containerStyle = css({
  color: 'black',
});

export default function ResumeLayout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query ResumeLayoutQuery {
          site {
            siteMetadata {
              title
              description
              author
            }
          }
        }
      `}
      render={data => {
        let { description, title } = data.site.siteMetadata;

        return (
          <div>
            <Helmet titleTemplate={`%s - ${title}`} defaultTitle={title}>
              <meta name="description" content={description} />
              <html lang="en" /> {/* this is valid react-helmet usage! */}
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
              <meta name="HandheldFriendly" content="True" />
            </Helmet>
            <section className={containerStyle}>{children}</section>
          </div>
        );
      }}
    />
  );
}

ResumeLayout.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object,
};
