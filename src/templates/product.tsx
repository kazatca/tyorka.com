import * as React from 'react'
import Product from '../components/Product'
import Layout from '../components/Layout';
import { ProductItem } from '../types';

interface Props {
  pageContext: ProductItem
}

const ProductPage: React.FC<Props> = ({ pageContext }) => (
  <Layout>
    <Product product={pageContext} />
  </Layout>
);

export default ProductPage
