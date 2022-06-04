import * as React from 'react'
import { Product } from '../components/Product'
import { Layout } from '../components/Layout'
import { ProductItem } from '../gatsby/context/products'
import { MetaTags } from '../components/MetaTags'

interface Props {
  pageContext: ProductItem
  path: string
}

const ProductPage: React.FC<Props> = ({ pageContext: product, path }) => (
  <Layout>
    <MetaTags
      path={path}
      title={product.title}
      description={product.descriptionText}
      image={product.pictures[0].src}
    />
    <Product product={product} />
  </Layout>
)

export default ProductPage
