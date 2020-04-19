import * as React from 'react'
import * as b_ from 'b_'
import ProductView from './Product';

import './index.scss';

const b = b_.with('shop');

interface Product {
  url: string;
  cover: string;
  title: string
  price?: number
}

interface Props {
  products: Product[]
}

const Shop = ({products}: Props) => 
  <section className={b()}>
    {products
      .map((product, i) => <ProductView key={i} product={product} />)}  
  </section>


export default Shop;