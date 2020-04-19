import * as React from 'react';
import * as b_ from 'b_';
import { Link } from 'gatsby';

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

const b = b_.with('shop-product');

const Product: React.SFC<Props> = ({ product }) => {
  return (
    <Link
      className={b()}
      to={product.url}
    >
      <div className={b("photo")}>
        <img src={product.cover} />
      </div>
      <div className={b('title')}>{product.title}</div>
      {product.price && <div className={b('price')}>{product.price} ₽</div>}
    </Link>

  );
}

export default Product;