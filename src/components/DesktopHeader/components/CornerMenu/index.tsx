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
      <a className={b("cart")} href="/">
        <img src={cart} alt="" />
      </a>
    </div>
  </div>
)

export default CornerMenu
