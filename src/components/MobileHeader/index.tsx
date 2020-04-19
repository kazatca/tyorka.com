import * as React from 'react'
import { Link } from 'gatsby';
import * as b_ from 'b_'
import CornerMenu from '../CornerMenu';

import './index.scss';

import logo from './static/logo.png';

const b = b_.with('mobile-header');

const MobileHeader = () => 
  <section className={b()}>
    <CornerMenu />
    <Link to='/'>
      <img className={b("logo")} src={logo} />
    </Link>
    <div className={b("menu-wrap")}>
      <Link className={b("menu")} to="/about">обо мне</Link>
      <Link className={b("menu")} to="/shop">магазин</Link>
    </div>
  </section>

export default MobileHeader;