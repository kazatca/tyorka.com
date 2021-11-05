import 'isomorphic-fetch';
import * as React from 'react'
import * as b_ from 'b_'
import Slider from '../Slider';
import { ProductItem } from '../../types';

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
        <div className={b('description')} dangerouslySetInnerHTML={{ __html: '' }} />
      </section>
    </section>);
}

export default Single;