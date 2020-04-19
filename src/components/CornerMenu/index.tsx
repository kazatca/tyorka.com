import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'

import './index.scss';

import * as cart from "./static/cart.png"

const b = b_.with('corner-menu');

const CornerMenu = () => (
  <div className={b()}>
    <div className={b("inner")}>
      {/* <a className={b("language")} href="#">eng</a> */}
      <Link className={b("cart")} to="/cart">
        <img src={cart} alt="" />
      </Link>
    </div>
  </div>
)

export default CornerMenu
