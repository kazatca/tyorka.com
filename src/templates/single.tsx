import * as React from 'react'
import Single from '../components/Single'
import Layout from '../components/Layout'
import { ProductItem } from '../types'

interface Props {
  pageContext: ProductItem
}

const SinglePage: React.FC<Props> = ({ pageContext }) => (
  <Layout>
    <Single product={pageContext} />
  </Layout>
)

export default SinglePage
