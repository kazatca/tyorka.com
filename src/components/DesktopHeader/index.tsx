import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'
import CornerMenu from '../CornerMenu';

import './index.scss';

import * as logo from "./static/logo.png";
import { useTranslate } from '../../hooks/translate';

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
        <Link to='/'>{t('Main page')}</Link>
        <Link to='/about'>{t('About page')}</Link>
      </div>
      <Link to="/"><img className={b("logo")} src={logo} ref={logoRef}/></Link>
      <div className={b("menu")}>
        <Link to='/blog'>{t('Blog page')}</Link>
        <Link to='/shop'>{t('Shop page')}</Link>
      </div>
    </section>
  );
}

export default DesktopHeader
