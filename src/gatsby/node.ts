import { resolve } from 'path'
import { CreatePagesArgs, CreateWebpackConfigArgs } from 'gatsby'
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

  products
    .filter(product => product.showInGallery)
    .forEach(product => {
      createPage({
        path: `/single/${product.id}`,
        component: resolve(`./src/templates/single.tsx`),
        context: product,
      })
    })

  products
    .filter(product => product.showInShop)
    .forEach(product => {
      createPage({
        path: `/shop/${product.id}`,
        component: resolve(`./src/templates/product.tsx`),
        context: product,
      })
    })
}

exports.onCreateWebpackConfig = ({
  actions,
  getConfig,
}: CreateWebpackConfigArgs) => {
  const config = getConfig() as { plugins: Object[] }
  const miniCssExtractPlugin = config.plugins.find(
    plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
  )
  if (miniCssExtractPlugin) {
    // @ts-ignore
    miniCssExtractPlugin.options.ignoreOrder = true
  }
  actions.replaceWebpackConfig(config)
}
