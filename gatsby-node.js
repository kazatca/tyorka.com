const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const getPics = (fileNodes, productName) =>
  fileNodes
    .filter(({node}) => node.relativePath.indexOf(`${productName}/`) === 0)
    .map(({node}) => node.childImageSharp.fluid.src);


exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: `/single`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/',
  })

  return new Promise((resolve, reject) => {
    graphql(`{
      allProductsJson {
        edges {
          node {
            path
            title
            description
          }
        }
      }
    }`)
    .then(result => {
      result.data.allProductsJson.edges.forEach(({ node }) => {
        createPage({
          path: `/single/${node.path}`,
          component: path.resolve(`./src/templates/single.tsx`),
          context: {
            slug: node.path,
            title: node.title,
            description: node.description
          }
        })
      });
      resolve();
    })
  })
}