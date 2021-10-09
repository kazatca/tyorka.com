import * as React from 'react'
import * as b_ from 'b_'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/reducer'

import './index.scss'

import cart from './static/cart.png'

const b = b_.with('cart-icon')

const CartIcon: React.SFC<{}> = () => {
  const count = useSelector((state: RootState) => state.cart.items.length)

  return (
    <div className={b({active: count > 0})}>
      <img src={cart} alt="" />
      {count > 0 && <div className={b('size')}>{count}</div>}
    </div>
  )
}

export default CartIcon
