import * as React from 'react'
import Single from '../components/Single'
import Layout from '../components/Layout';

interface Props {
  pageContext: {
    id: number
    slug: string
    price?: number
  }
}

const SinglePage = ({pageContext: {price, slug}}: Props) => {
  return (
    <Layout>
      <Single
        name={slug}
        price={price}
      />
    </Layout>);
}

export default SinglePage;