import * as React from 'react'
import * as b_ from 'b_'
import { useTranslate } from '../../hooks/translate'
import { ProductItem } from '../../gatsby/context/products'
import Slider from '../Slider'
import { useCart } from './hooks'

import './index.scss'

interface Props {
  product: ProductItem
}

const b = b_.with('product')

export const Product: React.FC<Props> = ({
  product: { id, pictures, title, price },
}) => {
  const { t } = useTranslate()
  const { addToCart, goToCart, inCart } = useCart(id)

  return (
    <div className={b()}>
      <section>
        <Slider pictures={pictures} />
      </section>

      <section>
        <div className={b('column')}>
          <div className={b('title')}>{title}</div>

          {price && <div className={b('price')}>{price} ₽</div>}

          <div>
            <button
              className={b('btn')}
              onClick={inCart ? goToCart : addToCart}
            >
              {inCart ? t('Go to cart') : t('Add to cart')}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
