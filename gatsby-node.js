const path = require('path');

/**
 * This is where all starts
 */
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  /**
   * Fetch our posts
   */
  return graphql(`
    {
      publishedPosts: allMarkdownRemark(
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
      draftPosts: allMarkdownRemark(
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
    }
  `).then(results => {
    if (results.errors) {
      return Promise.reject(results.errors);
    }

    const published = results.data.publishedPosts.edges;
    const drafts = results.data.draftPosts.edges;

    generateContent(createPage, published);
    generateContent(createPage, drafts);

    createTagPages(createPage, published);

    createPagination(createPage, published, `/page`);
    createPagination(createPage, drafts, `/drafts/page`);
  });
};

function generateContent(createPage, posts) {
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

  /**
   * Create pages for each markdown file.
   */
  posts.forEach(({ node, next }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        mainPostPath: node.frontmatter.path,
        nextPostPath: next ? next.frontmatter.path : 'none',
      },
    });
  });
}

/**
 * Create pages for tags
 */
function createTagPages(createPage, edges) {
  const tagTemplate = path.resolve(`src/templates/tags.js`);
  const posts = {};

  edges.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.split(', ').forEach(tag => {
        if (!posts[tag]) {
          posts[tag] = [];
        }
        posts[tag].push(node);
      });
    }
  });

  Object.keys(posts).forEach(tagName => {
    const pageSize = 5;
    const pagesSum = Math.ceil(posts[tagName].length / pageSize);

    for (let page = 1; page <= pagesSum; page++) {
      createPage({
        path:
          page === 1
            ? `/tag/${tagName.toLowerCase()}`
            : `/tag/${tagName.toLowerCase()}/page/${page}`,
        component: tagTemplate,
        context: {
          posts: paginate(posts[tagName], pageSize, page),
          tag: tagName,
          pagesSum,
          page,
        },
      });
    }
  });
}

/**
 * Create pagination for posts
 */
function createPagination(createPage, edges, pathPrefix) {
  const pageTemplate = path.resolve(`src/templates/page.js`);

  const pageSize = 5;
  const pagesSum = Math.ceil(edges.length / pageSize);

  for (let page = 1; page <= pagesSum; page++) {
    createPage({
      path: `${pathPrefix}/${page}`,
      component: pageTemplate,
      context: {
        posts: paginate(edges, pageSize, page).map(({ node }) => node),
        page,
        pagesSum,
        prevPath: page - 1 > 0 ? `${pathPrefix}/${page - 1}` : null,
        nextPath: page + 1 <= pagesSum ? `${pathPrefix}/${page + 1}` : null,
      },
    });
  }
}

function paginate(array, page_size, page_number) {
  return array.slice(0).slice((page_number - 1) * page_size, page_number * page_size);
}
