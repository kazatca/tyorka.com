import { resolve } from 'path'
import { CreatePagesArgs } from 'gatsby'
import { collectItems } from './context/products'

exports.createPages = async ({
  actions: { createPage, createRedirect },
  graphql,
}: CreatePagesArgs) => {
  createRedirect({
    fromPath: `/single`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/',
  })

  const products = await collectItems(graphql)

  products.forEach(product => {
    createPage({
      path: `/single/${product.id}`,
      component: resolve(`./src/templates/single.tsx`),
      context: product,
    })
  })

  products.forEach(product => {
    createPage({
      path: `/shop/${product.id}`,
      component: resolve(`./src/templates/product.tsx`),
      context: product,
    })
  })
}
