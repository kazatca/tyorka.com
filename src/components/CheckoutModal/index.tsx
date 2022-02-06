import * as React from 'react'
import * as b_ from 'b_'
import { Cart } from './types'
import { useTranslate } from '../../hooks/translate'
import Modal from '../Modal'
import { CheckoutForm  } from './Form'

import './index.scss'

const b = b_.with('checkout-modal')

interface Props {
  total: number
  cart: Cart
  onClose: () => void
}

const CheckoutModal: React.SFC<Props> = ({ total, cart, onClose }) => {
  const { t } = useTranslate()

  return (
    <Modal onClose={onClose}>
      <div className={b('container')}>
        <div className={b('title')}>{t('Order checkout')}</div>
        <CheckoutForm cart={cart} total={total}/>
      </div>
    </Modal>
  )
}

export default CheckoutModal
