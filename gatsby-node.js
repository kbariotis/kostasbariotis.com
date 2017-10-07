const path = require('path');

/**
 * This is where all starts
 */
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  /**
   * Fetch our posts
   */
  return graphql(`{
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
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
  }`)
    .then(result => generateContent(createPage, result))
};

function generateContent(createPage, graphqlResults) {
  if (graphqlResults.errors) {
    return Promise.reject(graphqlResults.errors)
  }

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

  /**
   * Separate published posts and and drafts
   */
  const posts = graphqlResults.data.allMarkdownRemark.edges;
  const published = posts.filter(post => !post.node.frontmatter.draft);
  const drafts = posts.filter(post => post.node.frontmatter.draft);

  createTagPages(createPage, published);
  createPagination(createPage, published, `/page`);
  createPagination(createPage, drafts, `/drafts/page`);

  /**
   * Create pages for each markdown file.
   */
  posts.forEach(({ node }, index) => {
    const prev = index === 0 ? false : posts[index - 1].node;
    const next = index === posts.length - 1 ? false : posts[index + 1].node;
    createPage({
      path: node.frontmatter.path,
      refPath: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        prev,
        next
      }
    });
  });

  return drafts;
}

/**
 * Create pages for tags
 */
function createTagPages (createPage, edges) {
  const tagTemplate = path.resolve(`src/templates/tags.js`);
  const posts = {};

  edges
    .forEach(({ node }) => {
      if (node.frontmatter.tags) {
        node.frontmatter.tags.split(', ')
          .forEach(tag => {
            if (!posts[tag]) {
              posts[tag] = [];
            }
            posts[tag].push(node);
          });
      }
    });

  Object.keys(posts)
    .forEach(tagName => {

      const pageSize = 5;
      const pagesSum = Math.ceil(posts[tagName].length / pageSize);

      for (let page = 1; page <= pagesSum; page++) {
        createPage({
          path: page === 1 ? `/tag/${tagName}` : `/tag/${tagName}/page/${page}`,
          component: tagTemplate,
          context: {
            posts: paginate(posts[tagName], pageSize, page),
            tag: tagName,
            pagesSum,
            page
          }
        })
      }
    });
};

/**
 * Create pagination for posts
 */
function createPagination (createPage, edges, pathPrefix) {
  const pageTemplate = path.resolve(`src/templates/page.js`);

  const pageSize = 5;
  const pagesSum = Math.ceil(edges.length / pageSize);

  for(let page = 1; page <= pagesSum; page++) {
    createPage({
      path: `${pathPrefix}/${page}`,
      component: pageTemplate,
      context: {
        posts: paginate(edges, pageSize, page).map(({node}) => node),
        page,
        pagesSum,
        prevPath: (page - 1) > 0 ? `${pathPrefix}/${page - 1}` : null,
        nextPath: (page + 1) <= pagesSum ? `${pathPrefix}/${page + 1}` : null,
      }
    })
  }
};

function paginate(array, page_size, page_number) {
  return array.slice(0).slice((page_number - 1) * page_size, page_number * page_size);
}
