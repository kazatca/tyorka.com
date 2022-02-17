import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'
import { useTranslate } from '../../hooks/translate';
import CornerMenu from '../CornerMenu';

import './index.scss';

import logo from "./static/logo_377.png";

const b = b_.with('desktop-header');

interface Props {
  fixed?: boolean
}

const headerHeightMax = 400;
const headerHeightMin = 140;

const DesktopHeader: React.FC<Props> = ({fixed}) => {
  const logoRef = React.useRef<HTMLImageElement>(null);
  
  const { t } = useTranslate()

  const resizeHeader = () => {
    const top = window.scrollY;
    if(logoRef.current) {
      logoRef.current.style.width = Math.max(headerHeightMax - top, headerHeightMin) + 'px'
    }
  }

  React.useEffect(() => {
    if(typeof window !== 'undefined' && fixed){
      window.addEventListener('scroll', resizeHeader);
    }
    return () => {
      window.removeEventListener('scroll', resizeHeader);  
    }
  })

  return (
    <section className={b({fixed})}>
      <CornerMenu />
      <div className={b("menu")}>
        <Link to='/' activeClassName='active'>{t('Main page')}</Link>
        <Link partiallyActive to='/about' activeClassName='active'>{t('About page')}</Link>
      </div>
      <Link to="/"><img className={b("logo")} src={logo} ref={logoRef}/></Link>
      <div className={b("menu")}>
        <Link partiallyActive to='/blog' activeClassName='active'>{t('Blog page')}</Link>
        <Link partiallyActive to='/shop' activeClassName='active'>{t('Shop page')}</Link>
      </div>
    </section>
  );
}

export default DesktopHeader
