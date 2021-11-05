import * as React from 'react'
import Single from '../components/Single'
import Layout from '../components/Layout'
import { ProductItem } from '../types'

interface Props {
  pageContext: ProductItem
}

const SinglePage: React.FC<Props> = ({ pageContext }) => (
  <Layout>
    <Single product={pageContext} name={'botanist'} price={0} />
  </Layout>
)

export default SinglePage
