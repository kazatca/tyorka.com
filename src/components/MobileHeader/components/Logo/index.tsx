import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'

import './index.scss'

import logoMobile from './static/logo_200.png'
import leftMustache from './static/left-mustache.png'
import rightMustache from './static/right-mustache.png'

const b = b_.with('mobile-header-logo');

export const Logo = () => (
  <Link to="/" className={b()}>
    <img className={b('left-mustache')} src={leftMustache}/>
    <img className={b('logo')} src={logoMobile} />
    <img className={b('right-mustache')} src={rightMustache}/>
  </Link>
)
