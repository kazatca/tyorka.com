import * as React from 'react'
import { Single } from '../components/Single'
import { ProductItem } from '../gatsby/context/products'
import { Layout } from '../components/Layout'
import { MetaTags } from '../components/MetaTags'

interface Props {
  pageContext: ProductItem
  location: Location
}

const SinglePage: React.FC<Props> = ({ pageContext: product, location }) => (
  <Layout noHeaderOnDesktop>
    <MetaTags
      path={location.pathname}
      title={product.title}
      description={product.descriptionText}
      image={product.pictures[0].src}
    />
    <Single product={product} />
  </Layout>
)

export default SinglePage
