import * as React from 'react'
import { Single } from '../components/Single'
import { ProductItem } from '../gatsby/context/products'
import { Layout } from '../components/Layout'

interface Props {
  pageContext: ProductItem
}

const SinglePage: React.FC<Props> = ({ pageContext }) => (
  <Layout noHeaderOnDesktop>
    <Single product={pageContext} />
  </Layout>
)

export default SinglePage
