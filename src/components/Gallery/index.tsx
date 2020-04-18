import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'

import './index.scss';

const b = b_.with('gallery');

interface Product {
  url: string;
  cover: string;
  sale: boolean;
}

interface Props {
  products: Product[]
}

const Gallery = ({products}: Props) => 
  <section className={b()}>
    {products
      .map(product => 
      <Link
        to={product.url}
        key={product.url}
        className={b("photo")}
      >
        <img src={product.cover} />
        {product.sale && <div className={b("sale")} />}
      </Link>
    )}  
  </section>


export default Gallery;