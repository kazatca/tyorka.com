import * as React from 'react'
import * as b_ from 'b_';
import { Image } from '../../../../types';

import './index.scss';

const b = b_.with('zoom');

type Props = Image & {
  onClose: () => void;
  mouseX: number;
  mouseY: number;
};

const Zoom: React.FC<Props> = ({ src, width, height, mouseX, mouseY, onClose }) => {

  const overlay = React.useRef<HTMLDivElement>(null);
  const image = React.useRef<HTMLImageElement>(null);

  const onMouseMove = (e: MouseEvent) => {
    move(e.clientX, e.clientY);
  }

  const move = (mouseX: number, mouseY: number) => {
    if (!image.current || !overlay.current) {
      return;
    }

    const { clientWidth, clientHeight } = overlay.current;

    if(!clientWidth || !clientHeight) {
      return;
    }

    const left = (clientWidth - (width || 0)) / 2;
    const top = (clientHeight - (height || 0)) / 2;

    const x = (mouseX / clientWidth * 2 - 1) * Math.max(-left, 0);
    const y = (mouseY / clientHeight * 2 - 1) * Math.max(-top, 0);

    image.current.style.transform = `translate(${-x}px, ${-y}px)`;
    image.current.style.marginLeft = `${left}px`;
    image.current.style.marginTop = `${top}px`;
  }


  React.useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.document.body.classList.add('overflow-hidden');
    move(mouseX, mouseY);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.document.body.classList.remove('overflow-hidden');
    }
  })

  return (
    <div
      className={b()}
      onClick={onClose}
      ref={overlay}
    >
      <img
        ref={image}
        src={src || undefined}
      />
    </div>);
}

export default Zoom;