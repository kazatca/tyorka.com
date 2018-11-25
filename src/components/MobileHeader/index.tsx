import * as React from 'react'
import * as b_ from 'b_'

import './index.scss';

import logo from './static/logo.png';

const b = b_.bind(null, 'mobile-header');

const MobileHeader = () => 
  <section className={b()}>
    <div>
      <img className={b("logo")} src={logo} />
    </div>
    <div className={b("menu-wrap")}>
      <a className={b("menu")} href="/">керамика</a>
      <a className={b("menu")} href="/">валяние</a>
    </div>
  </section>

export default MobileHeader;