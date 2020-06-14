import * as glob from 'glob'
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'
import { ProductsJson } from '../types'

const ROOT = './src/products'

export function updateProducts(json: ProductsJson) {
  const allProductName = glob
    .sync('*', { cwd: ROOT })
    .filter(filename => fs.lstatSync(path.join(ROOT, filename)).isDirectory())

  const newProductNames = allProductName.filter(
    filename => !json.products.some(product => product.path === filename)
  )

  const newProducts: ProductsJson['products'] = newProductNames.map(path => ({
    id: uuid.v4(),
    path,
  }))

  json.products = [...json.products, ...newProducts].filter(({ path }) =>
    allProductName.some(name => name === path)
  )
  json.gallery = [
    ...newProducts.map(product => product.id),
    ...json.gallery,
  ].filter(id => json.products.some(product => product.id === id))
  return json
}
