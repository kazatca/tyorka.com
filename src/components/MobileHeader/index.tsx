import * as React from 'react'
import { Link } from 'gatsby';
import * as b_ from 'b_'
import { useTranslate } from '../../hooks/translate';
import { CartIcon } from '../CartIcon';
import { Logo } from './components/Logo'

import './index.scss';

const b = b_.with('mobile-header');

export const MobileHeader: React.FC = () => {

  const { t } = useTranslate();

  return (
    <section className={b()}>
      <Logo />
      <div className={b("menu-wrap")}>
        <Link className={b("menu")} activeClassName='active' partiallyActive to="/about">{t('About page')}</Link>
        <Link className={b("menu")} activeClassName='active' partiallyActive to="/shop">{t('Shop page')}</Link>
      </div>
      <div className={b('corner')}>
        <CartIcon />
      </div>
    </section>);
}
