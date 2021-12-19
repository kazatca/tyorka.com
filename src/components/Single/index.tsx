import 'isomorphic-fetch';
import * as React from 'react'
import * as b_ from 'b_'
import Slider from '../Slider';
import { ProductItem } from '../../gatsby/context/products';

import './index.scss';

const b = b_.with('single');

interface Props {
  product: ProductItem
}

const Single: React.FC<Props> = ({ product }) => {


  return (
    <section className={b()}>
      <Slider pictures={product.pictures} />
      <section>
        <div className={b('title')}>{product.title}</div>
        <div className={b('description')} dangerouslySetInnerHTML={{ __html: product.description }} />
      </section>
    </section>);
}

export default Single;