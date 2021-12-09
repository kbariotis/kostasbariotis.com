module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    author: 'Kostas Bariotis',
    title: `Kostas Bariotis' Blog`,
    siteUrl: `https://kostasbariotis.com`,
    description: `Product engineer <a href="https://bulb.co.uk">@BulbEnergy</a>, co-organizer of <a href="https://devitconf.org">@devitconf</a> & <a href="https://www.meetup.com/Thessaloniki-Node-js-Meetup/">@skgnodejs</a>, host of <a href="http://devastation.tv">Devastation Podcast</a>.`,
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/typography.js`,
      },
    },
    {
      resolve: `gatsby-plugin-paginate`,
      options: {
        sources: [
          {
            path: `/page`,
            template: `${__dirname}/src/templates/page.js`,
            serialize: results => results.allMarkdownRemark.edges,
            query: `{
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
                filter: { frontmatter: { draft: { ne: true } } }
              ) {
                edges {
                  next {
                    frontmatter {
                      path
                    }
                  }
                  node {
                    excerpt(pruneLength: 250)
                    html
                    id
                    timeToRead
                    frontmatter {
                      date
                      path
                      tags
                      title
                      draft
                    }
                  }
                }
              }
            }`,
          },
          {
            path: `/drafts/page`,
            template: `${__dirname}/src/templates/page.js`,
            serialize: results => results.allMarkdownRemark.edges,
            query: `{
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
                filter: { frontmatter: { draft: { eq: true } } }
              ) {
                edges {
                  next {
                    frontmatter {
                      path
                    }
                  }
                  node {
                    excerpt(pruneLength: 250)
                    html
                    id
                    timeToRead
                    frontmatter {
                      date
                      path
                      tags
                      title
                      draft
                    }
                  }
                }
              }
            }`,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-emoji`,
          {
            resolve: 'gatsby-remark-graph',
            options: {
              language: 'mermaid',
              theme: 'dark',
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer noopener',
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-40793458-2',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Kostas Bariotis',
        short_name: 'KBariotis',
        start_url: '/',
        theme_color: '#676d9c',
        display: 'minimal-ui',
        icons: [
          {
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
          {
            src: `/favicon/apple-touch-icon-57x57.png`,
            sizes: `57x57`,
            type: `image/png`,
          },
          {
            src: `/favicon/apple-touch-icon-60x60.png`,
            sizes: `60x60`,
            type: `image/png`,
          },
          {
            src: `/favicon/apple-touch-icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `/favicon/apple-touch-icon-76x76.png`,
            sizes: `76x76`,
            type: `image/png`,
          },
          {
            src: `/favicon/apple-touch-icon-114x114.png`,
            sizes: `114x114`,
            type: `image/png`,
          },
          {
            src: `/favicon/apple-touch-icon-120x120.png`,
            sizes: `120x120`,
            type: `image/png`,
          },
          {
            src: `/favicon/apple-touch-icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `/favicon/apple-touch-icon-152x152.png`,
            sizes: `152x152`,
            type: `image/png`,
          },
          {
            src: `/favicon/apple-touch-icon-180x180.png`,
            sizes: `180x180`,
            type: `image/png`,
          },
          {
            src: `/favicon/favicon-36x36.png`,
            sizes: `36x36`,
            type: `image/png`,
          },
          {
            src: `/favicon/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicon/favicon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            title: "Kostas Bariotis's blog",
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges
                .filter(post => !post.node.frontmatter.draft)
                .map(edge => {
                  return Object.assign({}, edge.node.frontmatter, {
                    description: edge.node.excerpt,
                    url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                    guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                    custom_elements: [{ 'content:encoded': edge.node.html }],
                  });
                });
            },
            setup: ({
              query: {
                site: { siteMetadata },
              },
            }) => {
              return {
                title: siteMetadata.title,
                description: siteMetadata.description,
                feed_url: siteMetadata.siteUrl + `/blog/rss.xml`,
                site_url: siteMetadata.siteUrl,
                generator: `GatsbyJS`,
              };
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    frontmatter {
                      title
                      date
                      path
                      draft
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
};
