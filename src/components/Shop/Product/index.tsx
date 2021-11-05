import * as React from 'react'
import * as b_ from 'b_'
import { Link } from 'gatsby'
import { Product } from '../type'
import { CroppedImage } from '../../CroppedImage'

import './index.scss'

interface Props {
  product: Product
}

const b = b_.with('shop-product')

const price = 2000

export const ProductView: React.FC<Props> = ({ product }) => (
  <Link className={b()} to={`/shop/${product.id}`}>
    <div>
      <CroppedImage className={b('photo')}>{product.cover!}</CroppedImage>
    </div>
    <div className={b('title')}>{product.title}</div>
    {price && <div className={b('price')}>{price} ₽</div>}
  </Link>
)
