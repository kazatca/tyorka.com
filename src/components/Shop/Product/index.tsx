import * as React from 'react'
import * as b_ from 'b_'
import { Link } from 'gatsby'
import { ShopItem } from '../../../hooks/shop'
import { Image } from '../../FastImage'

import './index.scss'

interface Props {
  product: ShopItem
}

const b = b_.with('shop-product')

export const ProductView: React.FC<Props> = ({
  product: { price, title, id, cover },
}) => (
    <Link className={b()} to={`/shop/${id}`}>
      <Image
        src={cover.src}
        color={cover.color}
        cropped
      />
      <div className={b('title')}>{title}</div>
      {price && <div className={b('price')}>{price} ₽</div>}
    </Link>
  )