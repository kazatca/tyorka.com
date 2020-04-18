const path = require('path');
const fs = require('fs');

function getDescription(edges, name){
  const result = edges.find(({node}) => node.relativeDirectory === name);
  if(result){
    return fs.readFileSync(path.resolve(`./src/products/${result.node.relativePath}`), 'utf-8');
  }
  return '';
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: `/single`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/',
  })

  return new Promise((resolve) => {
    graphql(`{
      allProductsJson {
        edges {
          node {
            products{
              id
              path
              title
              description
              price
              tags
              slides{
                id
                size
                positionX
                positionY
              }
            }
          }
        }
      }
      allFile(filter: { extension: { eq: "html" } }) {
        edges {
          node {
            relativePath,
            relativeDirectory
          }
        }
      }
    }`)
    .then(result => {
      result.data.allProductsJson.edges[0].node.products.forEach(node => {
        const description = getDescription(result.data.allFile.edges, node.path);
        createPage({
          path: `/single/${node.path}`,
          component: path.resolve(`./src/templates/single.tsx`),
          context: {
            id: node.id,
            slug: node.path,
            title: node.title,
            description,
            price: node.price,
            slides: node.slides
          }
        })
      });
      resolve();
    })
  })
}