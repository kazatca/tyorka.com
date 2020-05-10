import * as React from 'react'
import Product from '../components/Product'
import Layout from '../components/Layout';

interface Props {
  pathContext: {
    id: string
    slug: string
    price?: number
  }
}

const ProductPage: React.FC<Props> = ({ pathContext: { id, slug, price } }) => (
  <Layout>
    <Product id={id} name={slug} price={price} />
  </Layout>
);

export default ProductPage
