import * as React from 'react'
import * as b_ from 'b_'
import Item from './Item'
import CheckoutModal from '../CheckoutModal'
import { useCart } from './hooks'

import './index.scss'

const b = b_.with('cart')

interface Props { }

const Cart: React.SFC<Props> = () => {
  const {list, total} = useCart();

  const [checkoutModalVisible, setCheckoutModalVisible] = React.useState(false)

  return (
    <div className={b()}>
      <div className={b('title')}>Моя корзина</div>
      {!total && <div className={b('empty')}>Тут пока ничего нет</div>}
      <div className={b('list')}>
        {list.map(({ product, count }) => (
          <Item key={product.id} product={product} count={count} />
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
          cart={list.map(item => ({ count: item.count, id: item.product.id, name: item.product.title }))}
          onClose={() => setCheckoutModalVisible(false)}
        />
      )}
    </div>
  )
}

export default Cart
