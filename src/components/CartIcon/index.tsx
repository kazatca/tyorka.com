import * as React from 'react'
import * as b_ from 'b_'
import { useSelector } from 'react-redux'
import { Link } from 'gatsby'
import { RootState } from '../../state/reducer'

import './index.scss'

import cart from './static/cart.png'

const b = b_.with('cart-icon')

export const CartIcon: React.FC = () => {
  const count = useSelector((state: RootState) => state.cart.items.length)

  return (
    <Link className={b('cart')} to="/cart">

    <div className={b({ active: count > 0 })}>
      <img src={cart} alt="" />
      {count > 0 && <div className={b('size')}>{count}</div>}
    </div>
    </Link>
  )
}
