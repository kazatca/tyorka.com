import * as React from 'react'
import * as b_ from 'b_'
import Item from './Item'
import CheckoutModal from '../CheckoutModal'
import { useCart } from './hooks'
import { useTranslate } from '../../hooks/translate'

import './index.scss'

const b = b_.with('cart')

interface Props { }

const Cart: React.SFC<Props> = () => {
  const {list, total} = useCart();
  const { t } = useTranslate();

  const [checkoutModalVisible, setCheckoutModalVisible] = React.useState(false)

  return (
    <div className={b()}>
      <div className={b('title')}>{t('My cart')}</div>
      {!total && <div className={b('empty')}>{t("There is nothing here yet")}</div>}
      <div className={b('list')}>
        {list.map(({ product, count }) => (
          <Item key={product.id} product={product} count={count} />
        ))}
      </div>

      {total > 0 && (
        <>
          <div className={b('total')}>{t('Total')}: {total} ₽</div>
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
          cart={list.map(item => ({ count: item.count, ...item.product }))}
          onClose={() => setCheckoutModalVisible(false)}
        />
      )}
    </div>
  )
}

export default Cart
