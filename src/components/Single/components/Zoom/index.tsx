import * as React from 'react'
import * as b_ from 'b_';
import { Image } from '../../types';

import './index.scss';

const b = b_.bind(null, 'zoom');

type Props = Image & {
  onClose: () => void;
  mouseX: number;
  mouseY: number;
};

class Zoom extends React.Component<Props, {}> {

  private overlay: HTMLDivElement | null = null;
  private image: HTMLImageElement | null = null;

  render(){
    const {src, onClose} = this.props;
    return (
      <div
        className={b()}
        onClick={onClose}
        ref={el => this.overlay = el}
      >
        <img
          ref={el => this.image = el}
          src={src}
        />
      </div>);
  }

  componentDidMount(){
    const {mouseX, mouseY} = this.props;
    window.addEventListener('mousemove', this.onMouseMove);
    window.document.body.classList.add('overflow-hidden');
    this.move(mouseX, mouseY);
  }

  componentWillUnmount(){
    window.removeEventListener('mousemove', this.onMouseMove);
    window.document.body.classList.remove('overflow-hidden');
  }

  onMouseMove = (e: MouseEvent) => {
    this.move(e.clientX, e.clientY);
  }

  move(mouseX: number, mouseY: number){
    if(!this.image){
      return;
    }
    const {clientWidth, clientHeight} = this.overlay;
    const {width, height} = this.props;

    const left = (clientWidth - width) / 2;
    const top = (clientHeight - height) / 2;

    const x = (mouseX / clientWidth * 2 - 1) * Math.max( -left, 0 ) ;
    const y = (mouseY / clientHeight * 2 - 1) * Math.max( -top, 0 ) ;

    this.image.style.transform = `translate(${-x}px, ${-y}px)`;
    this.image.style.marginLeft = `${left}px`;
    this.image.style.marginTop = `${top}px`;
  }
}

export default Zoom;