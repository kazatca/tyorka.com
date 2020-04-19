import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'
import CornerMenu from '../CornerMenu';

import './index.scss';

import * as logo from "./static/logo.png";

const b = b_.with('desktop-header');

interface Props {
  fixed?: boolean
}

const headerHeightMax = 400;
const headerHeightMin = 140;

class DesktopHeader extends React.Component<Props> {
  private logo: HTMLImageElement | null= null;

  render(){
    const {fixed} = this.props;
    return (
      <section className={b({fixed})}>
        <CornerMenu />
        <div className={b("menu")}>
          <Link to='/'>главная</Link>
          <Link to='/about'>обо мне</Link>
        </div>
        <Link to="/"><img className={b("logo")} src={logo} ref={el => this.logo = el}/></Link>
        <div className={b("menu")}>
          <Link to='/blog'>блог</Link>
          <Link to='/shop'>магазин</Link>
        </div>
      </section>
    );
  }

  componentDidMount(){
    if(typeof window !== 'undefined' && this.props.fixed){
      window.addEventListener('scroll', this.resizeHeader);
    }
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.resizeHeader);  
  }

  resizeHeader = () => {
    const top = window.scrollY;
    this.logo && (this.logo.style.width = Math.max(headerHeightMax - top, headerHeightMin) + 'px'); 
  }
}

export default DesktopHeader
