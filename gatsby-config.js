module.exports = {
  siteMetadata: {
    author: 'Kostas Bariotis!',
    title: `Kostas Bariotis' Blog`,
    siteUrl: `https://kostasbariotis.com`,
    pathPrefix: '/'
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
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
            },
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
            // Everything in /static will be copied to an equivalent
            // directory in /public during development and build, so
            // assuming your favicons are in /static/favicons,
            // you can reference them here
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/android-chrome-512x512.png`,
            sizes: `512x512`,
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
    }
  ],
}
