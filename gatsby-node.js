const path = require('path')
const fs = require('fs')

function getDescription(edges, name) {
  const result = edges.find(({ node }) => node.relativeDirectory === name)
  if (result) {
    return fs.readFileSync(
      path.resolve(`./src/products/${result.node.relativePath}`),
      'utf-8'
    )
  }
  return ''
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: `/single`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/',
  })
  return Promise.all([
    createSinglePages(graphql, createPage),
    createProductPages(graphql, createPage),
  ])
}

async function createSinglePages(graphql, createPage) {
  const result = await graphql(`
    query SinglePage{
      allProductsJson {
        edges {
          node {
            products {
              id
              path
              title
              description
              price
              tags
              slides {
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
            relativePath
            relativeDirectory
          }
        }
      }
    }
  `)

  result.data.allProductsJson.edges[0].node.products.forEach(node => {
    createPage({
      path: `/single/${node.path}`,
      component: path.resolve(`./src/templates/single.tsx`),
      context: {
        id: node.id,
        slug: node.path,
        title: node.title,
        description: getDescription(result.data.allFile.edges, node.path),
        price: node.price,
        slides: node.slides,
      },
    })
  })
}

async function createProductPages(graphql, createPage) {
  const result = await graphql(`
    query ShopProductPage{
      allProductsJson {
        edges {
          node {
            products {
              id
              path
              title
              description
              price
              tags
              slides {
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
            relativePath
            relativeDirectory
          }
        }
      }
    }
  `)

  result.data.allProductsJson.edges[0].node.products
    .filter(node => !!node.price)
    .forEach(node => {
      createPage({
        path: `/shop/${node.path}`,
        component: path.resolve(`./src/templates/product.tsx`),
        context: {
          id: node.id,
          slug: node.path,
          title: node.title,
          description: getDescription(result.data.allFile.edges, node.path),
          price: node.price,
          slides: node.slides,
        },
      })
    })
}
