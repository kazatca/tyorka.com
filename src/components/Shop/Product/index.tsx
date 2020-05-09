import * as React from 'react';
import * as b_ from 'b_';
import { Link, graphql } from 'gatsby';
import {useSquareCovers} from '../../../hooks/squareCovers'
import { useDescription } from '../../../hooks/md';

import './index.scss';

interface Props {
  url: string;
  name: string;
  price?: number
}

const b = b_.with('shop-product');

const Product: React.SFC<Props> = ({ url, name, price }) => {
  const covers = useSquareCovers();

  const {title} = useDescription(name);

  return (
    <Link
      className={b()}
      to={url}
    >
      <div className={b("photo")}>
        <img src={covers[name]} />
      </div>
      <div className={b('title')}>{title}</div>
      {price && <div className={b('price')}>{price} ₽</div>}
    </Link>

  );
}

export default Product;