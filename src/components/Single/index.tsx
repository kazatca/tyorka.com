import 'isomorphic-fetch'
import * as React from 'react'
import * as b_ from 'b_'
import { navigate } from 'gatsby'
import { SliderView } from '../Slider'
import { ProductItem } from '../../gatsby/context/products'

import './index.scss'

import cross from './static/cross.svg'

const b = b_.with('single')

interface Props {
  product: ProductItem
}

export const Single: React.FC<Props> = ({ product }) => (
  <section className={b()}>
    <div className={b('close')} onClick={() => navigate('/')}>
      <img src={cross} />
    </div>
    <SliderView pictures={product.pictures} />
    <section className={b('section')}>
      <div className={b('title')}>{product.title}</div>
      <div
        className={b('description')}
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    </section>
  </section>
)
