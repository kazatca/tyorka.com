import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'
import CartIcon from '../CartIcon'

import './index.scss'

const b = b_.with('corner-menu')

const CornerMenu = () => (
  <div className={b()}>
    <div className={b('inner')}>
      <Link className={b('cart')} to="/cart">
        <CartIcon />
      </Link>
    </div>
  </div>
)

export default CornerMenu
