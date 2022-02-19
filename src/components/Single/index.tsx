import 'isomorphic-fetch'
import * as React from 'react'
import * as b_ from 'b_'
import { SliderView } from '../Slider'
import { ProductItem } from '../../gatsby/context/products'

import './index.scss'

const b = b_.with('single')

interface Props {
  product: ProductItem
}

export const Single: React.FC<Props> = ({ product }) => (
  <section className={b()}>
    <SliderView pictures={product.pictures} />
    <section>
      <div className={b('title')}>{product.title}</div>
      <div
        className={b('description')}
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    </section>
  </section>
)
