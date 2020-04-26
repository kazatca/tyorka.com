import * as React from 'react'
import * as b_ from 'b_'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/reducer'
import Item, { Product } from './Item'
import CheckoutModal from '../CheckoutModal'

import './index.scss'

const b = b_.with('cart')

interface Props {
  products: Product[]
}

interface CartItem {
  product: Product
  count: number
}

const Cart: React.SFC<Props> = ({ products }) => {
  const items = useSelector((state: RootState) => state.cart.items)

  const [checkoutModalVisible, setCheckoutModalVisible] = React.useState(false)

  const list = items
    .map(item => ({
      product: products.find(product => product.id === item.id),
      count: item.count,
    }))
    .filter(item => !!item.product) as CartItem[]

  const total = list.reduce(
    (result, { product, count }) => result + (product.price || 0) * count,
    0
  )

  return (
    <div className={b()}>
      <div className={b('title')}>Моя корзина</div>
      {!total && <div className={b('empty')}>Тут пока ничего нет</div>}
      <div className={b('list')}>
        {list.map(({ product, count }) => (
          <Item product={product} count={count} />
        ))}
      </div>

      {total > 0 && (
        <>
          <div className={b('total')}>Итого: {total} ₽</div>
          <div className={b('btn-wrapper')}>
            <button
              className={b('submit-btn')}
              onClick={() => setCheckoutModalVisible(true)}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
      {checkoutModalVisible && (
        <CheckoutModal
          total={total}
          cart={list.map(item => ({count: item.count, name: item.product.id}))}
          onClose={() => setCheckoutModalVisible(false)}
        />
      )}
    </div>
  )
}

export default Cart
