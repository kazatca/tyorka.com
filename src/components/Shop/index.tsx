import * as React from 'react'
import * as b_ from 'b_'
import ProductView from './Product';
import { ProductsJson } from '../../types';

const { products }:  ProductsJson = require('../../products/products.json');

import './index.scss';

const b = b_.with('shop');

const Shop: React.SFC = () => {
  return (
    <section className={b()}>
      {products
        .filter(product => !!product.price)
        .map((product) =>
          <ProductView
            key={product.id}
            name={product.path}
            url={`/shop/${product.path}`}
            price={product.price}
          />
      )}
    </section>
  );
}

export default Shop;