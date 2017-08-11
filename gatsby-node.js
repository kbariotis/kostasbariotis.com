const path = require('path');

const createTagPages = (createPage, edges) => {
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

function paginate(array, page_size, page_number) {
  --page_number; // because pages logically start with 1, but technically with 0
  return array.slice(0).slice(page_number * page_size, (page_number + 1) * page_size);
}

const createPagination = (createPage, edges) => {
  const pageTemplate = path.resolve(`src/templates/page.js`);

  const pageSize = 5;
  const pagesSum = Math.ceil(edges.length / pageSize);

  for(let page = 0; page < pagesSum; page++) {
    createPage({
      path: `/page/${page}`,
      component: pageTemplate,
      context: {
        posts: paginate(edges, pageSize, page).map(({node}) => node),
        page,
        pagesSum,
      }
    })
  }

};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  return graphql(`{
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
  .then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges.filter(post => !post.node.frontmatter.draft);

    createTagPages(createPage, posts);
    createPagination(createPage, posts);

    // Create pages for each markdown file.
    posts.forEach(({ node }, index) => {
      const prev = index === 0 ? false : posts[index - 1].node;
      const next = index === posts.length - 1 ? false : posts[index + 1].node;
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          prev,
          next
        }
      });
    });

    return posts;
  })
};
