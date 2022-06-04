import * as React from 'react'
import { Single } from '../components/Single'
import { ProductItem } from '../gatsby/context/products'
import { Layout } from '../components/Layout'

interface Props {
  pageContext: ProductItem
  path: string
}

const SinglePage: React.FC<Props> = ({ pageContext: product, path }) => (
  <Layout noHeaderOnDesktop>
    <Single
      product={product}
      path={path}
    />
  </Layout>
)

export default SinglePage
