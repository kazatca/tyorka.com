import * as React from 'react'
import { Product } from '../components/Product'
import { Layout } from '../components/Layout'
import { ProductItem } from '../gatsby/context/products'
import { MetaTags } from '../components/MetaTags'

interface Props {
  pageContext: ProductItem
  location: Location
}

const ProductPage: React.FC<Props> = ({ pageContext: product, location }) => (
  <Layout>
    <MetaTags
      path={location.pathname}
      title={product.title}
      description={product.descriptionText}
      image={product.pictures[0].src}
      price={product.price}
    />
    <Product product={product} />
  </Layout>
)

export default ProductPage
