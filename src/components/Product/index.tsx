import * as React from 'react';
import * as b_ from 'b_';

import './index.scss';

interface Product {
  url: string;
  cover: string;
  title: string
  price?: number
}

interface Props {
  product: Product
}

const b = b_.with('product');

const Product: React.SFC<Props> = ({product}) => {
  return (
    <div className={b()}>
      <div className={b('photo')}>
        <img src={product.cover} />
      </div>
    </div>
  );
}

export default Product