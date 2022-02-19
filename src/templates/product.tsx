import * as React from 'react'
import { Product } from '../components/Product'
import { Layout } from '../components/Layout'
import { ProductItem } from '../gatsby/context/products'

interface Props {
  pageContext: ProductItem
}

const ProductPage: React.FC<Props> = ({ pageContext }) => (
  <Layout>
    <Product product={pageContext} />
  </Layout>
)

export default ProductPage
