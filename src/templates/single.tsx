import * as React from 'react'
import Single from '../components/Single'
import Layout from '../components/Layout';

interface Props {
  pathContext: {
    id: number
    slug: string
    price?: number
  }
}

const SinglePage = ({pathContext: {price, slug}}: Props) => {
  return (
    <Layout>
      <Single
        name={slug}
        price={price}
      />
    </Layout>);
}

export default SinglePage;