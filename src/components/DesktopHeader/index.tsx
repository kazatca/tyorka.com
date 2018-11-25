import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'
import CornerMenu from './components/CornerMenu';

import './index.scss';

import * as logo from "./static/logo.png";

const b = b_.bind(null, 'desktop-header');


const headerHeightMax = 400;
const headerHeightMin = 140;

const marginMax = 120;
const marginMin = 35;

const ratio = (headerHeightMax - headerHeightMin)/(marginMax - marginMin);


class DesktopHeader extends React.Component {
  private logo?: HTMLImageElement = undefined;
  private left?: HTMLAnchorElement = undefined;
  private right?: HTMLAnchorElement = undefined;

  render(){
    return (
      <section className={b()}>
        <CornerMenu />
        <a className={b("menu")} ref={el => this.left = el}>керамика</a>
        <Link to="/"><img className={b("logo")} src={logo} ref={el => this.logo = el}/></Link>
        <a className={b("menu")} ref={el => this.right = el}>валяние</a>
      </section>
    );
  }

  componentDidMount(){
    if(typeof window !== 'undefined'){
      window.addEventListener('scroll', this.resizeHeader);
    }
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.resizeHeader);  
  }

  resizeHeader = () => {
    const top = window.scrollY;
    this.logo && (this.logo.style.width = Math.max(headerHeightMax - top, headerHeightMin) + 'px'); 

    this.left && (this.left.style.marginBottom = Math.max(marginMax - top/ratio, marginMin) + 'px');
    this.right && (this.right.style.marginBottom = Math.max(marginMax - top/ratio, marginMin) + 'px');

  }
}

export default DesktopHeader
