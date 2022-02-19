import * as React from 'react'
import { Link } from 'gatsby';
import * as b_ from 'b_'
import { CornerMenu } from '../CornerMenu';
import { Logo } from './components/Logo'
import { useTranslate } from '../../hooks/translate';

import './index.scss';

const b = b_.with('mobile-header');

export const MobileHeader: React.FC = () => {

  const { t } = useTranslate();

  return (
    <section className={b()}>
      <CornerMenu />
      <Logo />
      <div className={b("menu-wrap")}>
        <Link className={b("menu")} activeClassName='active' partiallyActive to="/about">{t('About page')}</Link>
        <Link className={b("menu")} activeClassName='active' partiallyActive to="/shop">{t('Shop page')}</Link>
      </div>
    </section>);
}
