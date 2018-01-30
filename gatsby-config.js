module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    author: 'Kostas Bariotis!',
    title: `Kostas Bariotis' Blog`,
    siteUrl: `https://kostasbariotis.com`,
    description: `I'm Kostas Bariotis, a web developer, a proud wanderer and a passionate doer. My mission is to write clean and efficient code, to solve problems on the web and to learn something more.`
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-image',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: true
            }
          },
        ]
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-40793458-2',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Kostas Bariotis",
        short_name: "KBariotis",
        start_url: "/",
        theme_color: "#676d9c",
        display: "minimal-ui",
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
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://kostasbariotis.com`,
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
      }
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
            setup: ({ query: { site: { siteMetadata } } }) => {
              return {
                title: siteMetadata.title,
                description: siteMetadata.description,
                feed_url: siteMetadata.siteUrl + `/blog/rss.xml`,
                site_url: siteMetadata.siteUrl,
                generator: `GatsbyJS`,
              }
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
            output: '/rss.xml'
          }
        ]
      }
    }
  ],
}
