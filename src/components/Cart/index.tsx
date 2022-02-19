import * as React from 'react'
import * as b_ from 'b_'
import { Item } from './Item'
import { CheckoutModal } from '../CheckoutModal'
import { useCart } from './hooks'
import { useTranslate } from '../../hooks/translate'

import './index.scss'

const b = b_.with('cart')

interface Props {}

export const Cart: React.FC<Props> = () => {
  const { cart, total } = useCart()
  const { t } = useTranslate()

  const [checkoutModalVisible, setCheckoutModalVisible] = React.useState(false)

  if (typeof window === 'undefined') {
    return <div className={b()} />
  }

  return (
    <div className={b()}>
      <div className={b('title')}>{t('My cart')}</div>
      {!total && (
        <div className={b('empty')}>{t('There is nothing here yet')}</div>
      )}
      <div className={b('list')}>
        {cart.map(({ product }) => (
          <Item key={product.id} product={product} />
        ))}
      </div>

      {total > 0 && (
        <>
          <div className={b('total')}>
            {t('Total')}: {total} ₽
          </div>
          <div className={b('btn-wrapper')}>
            <button
              className={b('submit-btn')}
              onClick={() => setCheckoutModalVisible(true)}
            >
              {t('Checkout')}
            </button>
          </div>
        </>
      )}
      {checkoutModalVisible && (
        <CheckoutModal
          total={total}
          cart={cart}
          onClose={() => setCheckoutModalVisible(false)}
        />
      )}
    </div>
  )
}
