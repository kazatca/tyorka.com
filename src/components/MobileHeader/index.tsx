import * as React from 'react'
import { Link } from 'gatsby';
import * as b_ from 'b_'
import CornerMenu from '../CornerMenu';
import { useTranslate } from '../../hooks/translate';

import './index.scss';

import logo from './static/logo.png';

const b = b_.with('mobile-header');

const MobileHeader = () => {

  const { t } = useTranslate();

  return (
    <section className={b()}>
      <CornerMenu />
      <Link to='/'>
        <img className={b("logo")} src={logo} />
      </Link>
      <div className={b("menu-wrap")}>
        <Link className={b("menu")} to="/about">{t('About page')}</Link>
        <Link className={b("menu")} to="/shop">{t('Shop page')}</Link>
      </div>
    </section>);
}

export default MobileHeader;