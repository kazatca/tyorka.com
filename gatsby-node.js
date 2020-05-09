const path = require('path')
const fs = require('fs')
const { products } = require('./src/products/products.json')

exports.createPages = ({ actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: `/single`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/',
  })
  
  createSinglePages(createPage);

  createProductPages(createPage);
}

function createSinglePages(createPage) {
  products.forEach(node => {
    createPage({
      path: `/single/${node.path}`,
      component: path.resolve(`./src/templates/single.tsx`),
      context: {
        id: node.id,
        name: node.path,
        slug: node.path,
        price: node.price,
        slides: node.slides,
      },
    })
  })
}

function createProductPages(createPage) {
  products
    .filter(node => !!node.price)
    .forEach(node => {
      createPage({
        path: `/shop/${node.path}`,
        component: path.resolve(`./src/templates/product.tsx`),
        context: {
          id: node.id,
          slug: node.path,
          name: node.path,
          price: node.price,
          slides: node.slides,
        },
      })
    })
}
